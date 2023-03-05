## Python Django env
From root directory  
`python -m venv venv`
`source venv/bin/activate`  
`pip install -r requirements.txt`

## Servers
From top api directory
#### Dev
```python manage.py runserver 8001```
#### Prod
`gunicorn api.wsgi -b :8001 -daemon`

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
`from ada_stations import load_busroute`  
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
```sudo semanage port --add --type http_port_t --proto tcp 8001```
```sudo semanage port --list```
