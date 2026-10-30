#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

root=${1:?Missing deployment root}
release=${2:?Missing release identifier}
[[ "$root" =~ ^/[a-zA-Z0-9/_-]+$ && "$root" != / ]]
[[ "$release" =~ ^release-[a-f0-9]{40}-[0-9]+-[0-9]+$ ]]
directory="$root/releases/$release"
cd "$directory"
exec 9> "$root/.deploy.lock"
flock -n 9 || { echo 'Another deployment is running.' >&2; exit 1; }
sha256sum --check --status SHA256SUMS
[[ "$(cat image-tag)" == "$release" ]]
[[ "$(cat image-id)" =~ ^sha256:[a-f0-9]{64}$ ]]
[[ "$(cat cdn-url)" =~ ^https://[^[:space:]]+/$ ]]
test -s runtime.env
chmod 600 runtime.env

compose() {
    local location=$1
    shift
    IMAGE_TAG="$(cat "$location/image-tag")" NEXT_PUBLIC_CDN_URL="$(cat "$location/cdn-url")" \
        docker compose --project-name riad-production --env-file "$location/runtime.env" \
        -f "$location/docker-compose.production.yml" "$@"
}

healthy() {
    local location=$1 container status
    for ((attempt=0; attempt<60; attempt++)); do
        container=$(compose "$location" ps -q next-front)
        if [[ -n "$container" ]]; then
            status=$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}missing{{end}}' "$container")
            if [[ "$status" == healthy ]]; then
                [[ "$(docker inspect --format '{{.Image}}' "$container")" == "$(cat "$location/image-id")" ]] || return 1
                curl --fail --silent --show-error --max-time 10 http://127.0.0.1:3001/api/health > /dev/null || return 1
                curl --fail --silent --show-error --max-time 20 -H 'Host: www.riadnashira.com' -H 'X-Forwarded-Host: www.riadnashira.com' -H 'X-Forwarded-Proto: https' http://127.0.0.1:3001/fr > /dev/null || return 1
                [[ "$(curl --silent --show-error --max-time 10 -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/api/staff/confirmations)" == 401 ]] || return 1
                return 0
            fi
            [[ "$status" != unhealthy && "$status" != missing ]] || return 1
        fi
        sleep 2
    done
    return 1
}

previous=''
started=0
rollback() {
    local result=$?
    trap - ERR
    set +e
    if ((started)); then
        if [[ -n "$previous" ]]; then
            echo 'Deployment failed; restoring previous image and configuration.' >&2
            if compose "$previous" up -d --no-build --pull never next-front && healthy "$previous"; then
                echo 'Previous release restored; staff data preserved.' >&2
            else
                echo 'Rollback failed; manual intervention required. Staff data preserved.' >&2
            fi
        else
            echo 'First deployment failed; stopping the service and preserving its data.' >&2
            compose "$directory" stop next-front
        fi
    fi
    exit "$result"
}
trap rollback ERR

compose "$directory" config --quiet
if [[ -L "$root/current" ]]; then
    previous=$(readlink -f "$root/current")
    [[ "$previous" == "$root/releases/"* && "$previous" != "$directory" ]]
    compose "$previous" config --quiet
    docker image inspect "riad-front:$(cat "$previous/image-tag")" > /dev/null
    docker volume inspect riad-production_staff-data > /dev/null
    docker run --rm --network none -i --user node \
        --mount type=volume,source=riad-production_staff-data,target=/app/data \
        --entrypoint node "riad-front:$(cat "$previous/image-tag")" - "$release" < deployment/backup-staff-db.cjs
else
    # Never silently adopt an existing installation without its rollback metadata.
    [[ -z "$(docker ps -aq --filter label=com.docker.compose.project=riad-production --filter label=com.docker.compose.service=next-front)" ]]
    if docker volume inspect riad-production_staff-data > /dev/null 2>&1; then
        echo 'Existing staff volume without a current release; reconcile it before deploying.' >&2
        exit 1
    fi
fi

docker load --input image.tar.gz > /dev/null
[[ "$(docker image inspect --format '{{.Id}}' "riad-front:$release")" == "$(cat image-id)" ]]
started=1
compose "$directory" up -d --no-build --pull never next-front
healthy "$directory"
ln -s "releases/$release" "$root/current.new"
mv -Tf "$root/current.new" "$root/current"
trap - ERR
echo "Production release $release deployed successfully."
