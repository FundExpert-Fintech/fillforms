FROM nginx:1.19

WORKDIR /var/www/public

COPY build .

COPY nginx.conf /etc/nginx/conf.d/default.conf
