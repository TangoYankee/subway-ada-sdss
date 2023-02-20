FROM postgis/postgis:15-3.3-alpine

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=secretpassword

VOLUME postgres:/var/lib/postgresql/data

EXPOSE 5432
