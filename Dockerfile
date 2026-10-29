FROM oven/bun:1.3.14-alpine AS bun

FROM node:22-alpine AS base
WORKDIR /app
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS development
COPY . .
EXPOSE 3000
CMD ["bun", "run", "dev"]

FROM base AS builder
ARG NEXT_PUBLIC_CDN_URL
ENV NEXT_PUBLIC_CDN_URL=$NEXT_PUBLIC_CDN_URL \
    NEXT_TELEMETRY_DISABLED=1
COPY . .
RUN test -n "$NEXT_PUBLIC_CDN_URL" && bun run lint && bun run build

FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    STAFF_DATABASE_PATH=/app/data/staff.sqlite
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/email-templates ./email-templates
COPY --from=builder --chown=node:node /app/scripts/staff-user.mjs ./scripts/staff-user.mjs
COPY --from=builder --chown=node:node /app/scripts/staff-seed.mjs ./scripts/staff-seed.mjs
COPY --from=builder --chown=node:node --chmod=755 /app/scripts/docker-entrypoint.sh ./scripts/docker-entrypoint.sh
COPY --from=builder --chown=node:node /app/lib/auth/config.ts ./lib/auth/config.ts
COPY --from=builder --chown=node:node /app/lib/db/database.ts ./lib/db/database.ts
COPY --from=builder --chown=node:node /app/node_modules/server-only ./node_modules/server-only
COPY --from=builder --chown=node:node /app/node_modules/dotenv ./node_modules/dotenv
RUN mkdir -p /app/data && chown node:node /app/data && chmod 700 /app/data
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
ENTRYPOINT ["/app/scripts/docker-entrypoint.sh"]
CMD ["node", "server.js"]
