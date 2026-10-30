#!/usr/bin/env bash
set -euo pipefail
umask 077

: "${SSH_PRIVATE_KEY:?Missing deployment SSH key}"
: "${SSH_KNOWN_HOSTS:?Missing verified SSH host keys}"
: "${PRODUCTION_ENV_FILE:?Missing production environment file}"
test -s "$PRODUCTION_ENV_FILE"
: "${RELEASE_ID:?Missing release identifier}"
: "${BASTION_HOST:=212.106.125.38}"
: "${BASTION_PORT:=3615}"
: "${BASTION_USER:=aurore.louche}"
: "${PRODUCTION_USER:=aurore.louche}"
[[ "$RELEASE_ID" =~ ^release-[a-f0-9]{40}-[0-9]+-[0-9]+$ ]]
[[ "$BASTION_HOST" =~ ^[a-zA-Z0-9.-]+$ ]]
[[ "$BASTION_PORT" =~ ^[0-9]{1,5}$ ]]
[[ "$BASTION_USER" =~ ^[a-zA-Z0-9._-]+$ ]]
[[ "$PRODUCTION_USER" =~ ^[a-zA-Z0-9._-]+$ ]]

ssh_dir=$(mktemp -d)
trap 'rm -rf "$ssh_dir"' EXIT
printf '%s\n' "$SSH_PRIVATE_KEY" > "$ssh_dir/key"
printf '%s\n' "$SSH_KNOWN_HOSTS" > "$ssh_dir/known_hosts"
install -m 600 "$PRODUCTION_ENV_FILE" "$ssh_dir/runtime.env"
unset SSH_PRIVATE_KEY SSH_KNOWN_HOSTS
ssh-keygen -y -P '' -f "$ssh_dir/key" > /dev/null
if [[ "$BASTION_PORT" == 22 ]]; then bastion_lookup=$BASTION_HOST; else bastion_lookup="[$BASTION_HOST]:$BASTION_PORT"; fi
ssh-keygen -F "$bastion_lookup" -f "$ssh_dir/known_hosts" > /dev/null || { echo 'Missing verified bastion host key.' >&2; exit 1; }
ssh-keygen -F 10.3.34.55 -f "$ssh_dir/known_hosts" > /dev/null || { echo 'Missing verified production host key.' >&2; exit 1; }

cat > "$ssh_dir/config" <<EOF
Host riad-bastion
    HostName $BASTION_HOST
    Port $BASTION_PORT
    User $BASTION_USER
Host riad-production
    HostName 10.3.34.55
    Port 22
    User $PRODUCTION_USER
    ProxyJump riad-bastion
Host *
    IdentityFile $ssh_dir/key
    UserKnownHostsFile $ssh_dir/known_hosts
    StrictHostKeyChecking yes
    IdentitiesOnly yes
    IdentityAgent none
    BatchMode yes
    ForwardAgent no
    ConnectTimeout 15
    ServerAliveInterval 15
    ServerAliveCountMax 3
EOF

remote_root=/srv/docker-compose/riad-prod
destination="$remote_root/releases/$RELEASE_ID"
# Check the downloaded artifact before sending anything to production.
echo 'Checking release archive integrity.'
(cd release && sha256sum --check --status SHA256SUMS)
[[ "$(cat release/image-tag)" == "$RELEASE_ID" ]]
echo 'Checking production prerequisites through the bastion.'
ssh -F "$ssh_dir/config" riad-production "set -eu; docker info > /dev/null; docker compose version > /dev/null; command -v bash curl flock sha256sum > /dev/null; umask 077; mkdir -p '$destination'; test ! -e '$destination/runtime.env'"
echo 'Transferring tested release image.'
scp -q -F "$ssh_dir/config" -r release/. "riad-production:$destination/"
scp -q -F "$ssh_dir/config" "$ssh_dir/runtime.env" "riad-production:$destination/runtime.env"
echo 'Activating verified production release.'
ssh -F "$ssh_dir/config" riad-production "bash '$destination/deployment/release.sh' '$remote_root' '$RELEASE_ID'"
