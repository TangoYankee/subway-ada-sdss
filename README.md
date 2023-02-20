## Python Django env
From root directory  
`source venv/bin/activate`  

## Docker
From root directory  
`docker build -t postgis .`  
`docker run -p 5432:5432 postgis`  

## Seed data
From top api directory  
`python manage.py migrate`
`python manage.py shell`  
`from world import load`  
`load.run()`

## Admin user
From top api directory  
`python manage.py createsuperuser`  

## Nextjs client
From client directory
```pnpm i```
```pnpm dev```