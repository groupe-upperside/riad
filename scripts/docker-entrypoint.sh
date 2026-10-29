#!/bin/sh
set -eu

node --experimental-strip-types --conditions=react-server /app/scripts/staff-seed.mjs
exec "$@"
