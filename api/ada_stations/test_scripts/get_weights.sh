#!/bin/bash
DOMAIN=localhost:8001

# Count Factor Weights
PARKS=60
SCHOOLS=40
HOSPITALS=80
BUS_STOPS=50
# BUS_STOPS_EXPRESS=30
# Factor has weight of zero
BUS_STOPS_EXPRESS=0

# Tract factor Weights
# TOTAL=20
TOTAL=0
UNDER_FIVE=50
SIXTY_FIVE_AND_OVER=80
POVERTY_TOTAL=40
POVERTY_UNDER_FIVE=60
POVERTY_SIXTY_FIVE_AND_OVER=90
UNDER_EIGHTEEN_AMBULATORY=40
OVER_EIGHTEEN_UNDER_SIXTY_FIVE_AMBULATORY=30
SIXTY_FIVE_AND_OVER_AMBULATORY=90

#Trait factor weights
RIDERSHIP=30
ADA_NEIGHBOR_GAP=50
BETWEENNESS_CENTRALITY=70

# Count factors query string
# QUERY_STRING="parks=${PARKS}\
# &schools=${SCHOOLS}\
# &hospitals=${HOSPITALS}&\
# bus_stops=${BUS_STOPS}&\
# bus_stops_express=${BUS_STOPS_EXPRESS}"

# Count factors Query string with a parameter missing
# QUERY_STRING="parks=${PARKS}\
# &hospitals=${HOSPITALS}&\
# bus_stops=${BUS_STOPS}&\
# bus_stops_express=${BUS_STOPS_EXPRESS}"

# Tract factors query string
# QUERY_STRING="total=${TOTAL}\
# &under_five=${UNDER_FIVE}\
# &sixty_five_and_over=${SIXTY_FIVE_AND_OVER}\
# &poverty_total=${POVERTY_TOTAL}\
# &poverty_under_five=${POVERTY_UNDER_FIVE}\
# &poverty_sixty_five_and_over=${POVERTY_SIXTY_FIVE_AND_OVER}\
# &under_eighteen_ambulatory=${UNDER_EIGHTEEN_AMBULATORY}\
# &over_eighteen_under_sixty_five_ambulatory=${OVER_EIGHTEEN_UNDER_SIXTY_FIVE_AMBULATORY}\
# &sixty_five_and_over_ambulatory=${SIXTY_FIVE_AND_OVER_AMBULATORY}"

# Tract and count factors
# QUERY_STRING="total=${TOTAL}\
# &under_five=${UNDER_FIVE}\
# &sixty_five_and_over=${SIXTY_FIVE_AND_OVER}\
# &poverty_total=${POVERTY_TOTAL}\
# &poverty_under_five=${POVERTY_UNDER_FIVE}\
# &poverty_sixty_five_and_over=${POVERTY_SIXTY_FIVE_AND_OVER}\
# &under_eighteen_ambulatory=${UNDER_EIGHTEEN_AMBULATORY}\
# &over_eighteen_under_sixty_five_ambulatory=${OVER_EIGHTEEN_UNDER_SIXTY_FIVE_AMBULATORY}\
# &sixty_five_and_over_ambulatory=${SIXTY_FIVE_AND_OVER_AMBULATORY}\
# &parks=${PARKS}\
# &schools=${SCHOOLS}\
# &hospitals=${HOSPITALS}\
# &bus_stops=${BUS_STOPS}\
# &bus_stops_express=${BUS_STOPS_EXPRESS}"

# Tract, count, and trait factors
QUERY_STRING="total=${TOTAL}\
&under_five=${UNDER_FIVE}\
&sixty_five_and_over=${SIXTY_FIVE_AND_OVER}\
&poverty_total=${POVERTY_TOTAL}\
&poverty_under_five=${POVERTY_UNDER_FIVE}\
&poverty_sixty_five_and_over=${POVERTY_SIXTY_FIVE_AND_OVER}\
&under_eighteen_ambulatory=${UNDER_EIGHTEEN_AMBULATORY}\
&over_eighteen_under_sixty_five_ambulatory=${OVER_EIGHTEEN_UNDER_SIXTY_FIVE_AMBULATORY}\
&sixty_five_and_over_ambulatory=${SIXTY_FIVE_AND_OVER_AMBULATORY}\
&parks=${PARKS}\
&schools=${SCHOOLS}\
&hospitals=${HOSPITALS}\
&bus_stops=${BUS_STOPS}\
&bus_stops_express=${BUS_STOPS_EXPRESS}\
&ridership=${RIDERSHIP}\
&ada_neighbor_gap=${ADA_NEIGHBOR_GAP}\
&betweenness_centrality=${BETWEENNESS_CENTRALITY}"


# Query string with only one factor
# QUERY_STRING="parks=${PARKS}"

# Query string with all parameters missing
# QUERY_STRING=""

time curl http://${DOMAIN}/api/v1/rankings?${QUERY_STRING}
