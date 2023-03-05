## Python Django env
From root directory  
`python -m venv venv`
`source venv/bin/activate`  
`pip install -r requirements.txt`

## Docker
From db directory  
`docker build -t postgis .`  
`docker run -p 5432:5432 --name postgis_app postgis`  
To start and stop existing container:  
`docker stop postgis_app`
`docker start postgis_app`

## Ngnix
From proxy directory
`docker build -t proxy .`
`docker run -p 8088:80 --name proxy_app proxy`

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

## Serving commands
Client:
- `npm run build`  
- `npm run start`

Api:
`gunicorn api.wsgi`
