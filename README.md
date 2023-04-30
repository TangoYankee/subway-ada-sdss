## Python Django env
From root directory  
`python -m venv venv`
`source venv/bin/activate`  
## fedora requirements
```sudo dnf install libpq-devel python3-devel gcc gdal```
`pip install -r requirements.txt`

## Servers
From top api directory
#### Dev
```python manage.py runserver 8001```
#### Prod
`gunicorn api.wsgi -b :8001 --daemon`
`ps ax|grep gunicorn`
`pkill gunicorn`

## Docker
From db directory
`docker build -t postgis .`  
`docker run -p 5432:5432 --name postgis_app --env-file .env postgis`  
To start and stop existing container:  
`docker stop postgis_app`
`docker start postgis_app`

## Seed data
From top api directory  
`python manage.py migrate`
`python manage.py shell`  
`from ada_stations.load_scripts import busroute`  
`load_busroute.run()`

## Admin user
From top api directory  
`python manage.py createsuperuser`  

## Nextjs client
From client directory
```pnpm i```
```pnpm dev```

Prod server
```pm2 start npm --name "client" -- start```

## Port permissions on device
```dnf provides semanage```
```setsebool -P httpd_can_network_connect 1```
```sudo semanage port --add --type http_port_t --proto tcp 8001```
```sudo semanage port --list```

## Nginx config
```systemctl status nginx```
```systemctl start nginx```
copy tangled_city.conf to `~/etc/nginx/conf.d`
```sudo nginx -t```
```sudo nginx -s reload```
