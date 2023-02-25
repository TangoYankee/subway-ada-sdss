## Python Django env
From root directory  
`python -m venv venv`
`source venv/bin/activate`  
`pip install -r requirements.txt`

## Docker
From root directory  
`docker build -t postgis .`  
`docker run -p 5432:5432 --name postgis_app postgis`  
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