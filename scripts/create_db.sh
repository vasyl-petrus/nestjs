#! /usr/bin/env bash

set -e

source ./.env

args=('-u' "$DB_USER")
args+=('-e' "CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; CREATE DATABASE IF NOT EXISTS \`${DB_NAME_TEST}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
if [ -n "$DB_PASSWORD" ]; then
  args+=("-p${DB_PASSWORD}")
fi

mysql "${args[@]}"
