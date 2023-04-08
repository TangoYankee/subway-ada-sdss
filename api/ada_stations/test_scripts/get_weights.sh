#!/bin/bash
DOMAIN=localhost:8001

# Factor Weights
PARKS=60
SCHOOLS=40
HOSPITALS=80
BUS_STOPS=50
BUS_STOPS_EXPRESS=30

# Full query string
QUERY_STRING="parks=${PARKS}\
&schools=${SCHOOLS}\
&hospitals=${HOSPITALS}&\
bus_stops=${BUS_STOPS}&\
bus_stops_express=${BUS_STOPS_EXPRESS}"

# Query string with a parameter missing
# QUERY_STRING="parks=${PARKS}\
# &hospitals=${HOSPITALS}&\
# bus_stops=${BUS_STOPS}&\
# bus_stops_express=${BUS_STOPS_EXPRESS}"

# Query string with all parameters missing
# QUERY_STRING=""

curl http://${DOMAIN}/api/v1/rankings?${QUERY_STRING}
