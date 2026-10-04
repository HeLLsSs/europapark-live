#!/bin/sh
# Démarre Europa-Park Live : PHP-FPM, la collecte cron et nginx (au premier plan).
set -eu

DATA="${EP_DATA_DIR:-/var/www/europapark/www/data}"

# Volume des données : modifiable par PHP-FPM et par la collecte (www-data)
mkdir -p "$DATA"
chown -R www-data:www-data "$DATA"

# Variables EP_* (et TZ) transmises à PHP-FPM, qui vide l'environnement par défaut
FPM_CONF=/usr/local/etc/php-fpm.d/zz-europapark.conf
{
    echo '[www]'
    echo 'listen = 127.0.0.1:9000'
    env | grep -E '^(EP_[A-Za-z0-9_]*|TZ)=' | while IFS='=' read -r name value; do
        printf 'env[%s] = "%s"\n' "$name" "$value"
    done
} > "$FPM_CONF"

# Mêmes variables pour la collecte : crond ne transmet pas l'environnement du conteneur
CRON_ENV=/etc/europapark-cron.env
env | grep -E '^(EP_[A-Za-z0-9_]*|TZ)=' | while IFS='=' read -r name value; do
    printf "export %s='%s'\n" "$name" "$(printf '%s' "$value" | sed "s/'/'\\\\''/g")"
done > "$CRON_ENV"
chmod 644 "$CRON_ENV"

php-fpm --daemonize
crond -b -L /dev/stderr
exec nginx -g 'daemon off;'
