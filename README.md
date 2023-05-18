## Getting started
The application consists of a database, api, and client. Follow the steps below to run each service

### Database
1. Navigate to the db directory
2. Create an environment variable file from the example  
```cp example.env .env```
3. Set the env variables to unique values
4. Start the docker container  
```docker run -p 5432:5432 --name postgis_app --env-file .env postgis```

### API
1. Navigate to the project root
2. Initialize a virtual environment  
```python -m venv venv```
3. Activate the virtual environment  
```source venv/bin/activate```
4. Install the python requirements  
```pip install -r requirements.txt```
5. Navigate to the api directory
6. Create an environment variable file from the example  
```cp example.env .env```
7. Set the environment variables
  - `ENVIRONMENT=dev`
  - `SECRET_KEY=` some randomly generated sequence
  - `POSTGRES_USER=` the value set in the DB env file
  - `POSTGRES_PASSWORD=` the value set in the DB env file
8. Run the database migrations  
```python manage.py migrate```
9. Load the data into the database
   - Activate the python shell  
   ```python manage.py shell```
   - Import the load scripts  
   ```from ada_stations.load_scripts import all```
   - Run the load scripts  
   ```all.run()```
   - Quit the shell  
   ```quit()```
10. Run the server on port 8001  
```python manage.py runserver 8001```

### Client
1. navigate to the client directory
2. Create an environment variable file from the example  
```cp example.env .env```
3. Set the environment variables
   - `NEXT_PUBLIC_MAPLIBRE_TOKEN=` [Generated maptiler key](https://cloud.maptiler.com/account/keys/)
   - `NEXT_PUBLIC_API_DOMAIN=localhost:8001` (to match the local API port)
4. Install the required packages
   - Ensure node 18 is installed
   - Install the required node modules `npm i` 
5. Run the application
   - `npm run dev`

Key 

## Miscellaneous commands
### Python Django env
From root directory  
`python -m venv venv`
`source venv/bin/activate`  

### fedora requirements
```sudo dnf install libpq-devel python3-devel gcc gdal```
`pip install -r requirements.txt`


### Servers
From top api directory
#### Dev
```python manage.py runserver 8001```
#### Prod
`gunicorn api.wsgi -b :8001 --daemon`
`ps ax|grep gunicorn`
`pkill gunicorn`

### Docker
From db directory
`docker build -t postgis .`  
`docker run -p 5432:5432 --name postgis_app --env-file .env postgis`  
To start and stop existing container:  
`docker stop postgis_app`
`docker start postgis_app`

### Seed data
From top api directory  
`python manage.py migrate`
`python manage.py shell`  
`from ada_stations.load_scripts import busroute`  
`load_busroute.run()`

### Admin user
From top api directory  
`python manage.py createsuperuser`  

### Nextjs client
From client directory
```pnpm i```
```pnpm dev```

Prod server
```pm2 start npm --name "client" -- start```

### Port permissions on device
```dnf provides semanage```
```setsebool -P httpd_can_network_connect 1```
```sudo semanage port --add --type http_port_t --proto tcp 8001```
```sudo semanage port --list```

### Nginx config
```systemctl status nginx```
```systemctl start nginx```
copy tangled_city.conf to `~/etc/nginx/conf.d`
```sudo nginx -t```
```sudo nginx -s reload```
