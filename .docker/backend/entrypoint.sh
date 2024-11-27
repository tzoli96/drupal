#!/bin/sh

echo "Installing dependencies with Composer..."
composer install --no-interaction --optimize-autoloader

echo "Initializing the application..."

bin/console sulu:admin:download-language
bin/adminconsole sulu:build dev
bin/adminconsole sulu:document:initialize
bin/adminconsole sulu:content:validate:webspaces

echo "Setting permissions for the var directory..."
chmod -R 775 /var/www/html/var
chown -R www-data:www-data /var/www/html/var

nginx &

exec "$@"
