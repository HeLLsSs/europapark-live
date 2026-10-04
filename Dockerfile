# Europa-Park Live : page mobile + relais PHP + collecte, dans une seule image.
# nginx sert en HTTP sur le port 8080 : place le conteneur derrière un reverse proxy
# qui fournit le HTTPS (obligatoire pour le GPS, les notifications et l'installation).
FROM php:8.3-fpm-alpine

# openssl, curl, json et mbstring sont déjà compilés dans l'image PHP officielle.
# tzdata : fuseau horaire de la collecte (TZ) ; tini : processus init (signaux, zombies).
RUN apk add --no-cache nginx tzdata tini \
    && cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Fuseau horaire du parc : la collecte tourne chaque minute de 8 h à 20 h 59, heure locale
ENV TZ=Europe/Berlin

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --chmod=755 docker/entrypoint.sh /usr/local/bin/europapark-entrypoint
COPY www/ /var/www/europapark/www/

# Collecte en www-data, comme PHP-FPM ; voir aussi deploy/cron/europapark
RUN mkdir -p /var/www/europapark/www/data \
    && chown www-data:www-data /var/www/europapark/www/data \
    && echo '* 8-20 * * * . /etc/europapark-cron.env && /usr/local/bin/php /var/www/europapark/www/api.php collect >/dev/null 2>&1' \
        > /etc/crontabs/www-data

# Cache, historique, profils et clés VAPID
VOLUME /var/www/europapark/www/data

EXPOSE 8080

HEALTHCHECK --interval=1m --timeout=10s --start-period=10s \
    CMD wget -q -O /dev/null 'http://127.0.0.1:8080/api.php?r=health' || exit 1

ENTRYPOINT ["/sbin/tini", "--", "/usr/local/bin/europapark-entrypoint"]
