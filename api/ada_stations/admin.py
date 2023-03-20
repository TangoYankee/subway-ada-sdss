from django.contrib import admin
from .models import (
    BusRoute,
    BusStop,
    BusRouteExpress,
    BusStopExpress,
    Hospital,
    Park,
    School,
    SubwayEntrance,
    SubwayRoute,
    SubwayStation,
    TractDemographic,
)

admin.site.register(BusRoute, admin.ModelAdmin)
admin.site.register(BusStop, admin.ModelAdmin)
admin.site.register(BusRouteExpress, admin.ModelAdmin)
admin.site.register(BusStopExpress, admin.ModelAdmin)
admin.site.register(Hospital, admin.ModelAdmin)
admin.site.register(Park, admin.ModelAdmin)
admin.site.register(School, admin.ModelAdmin)
admin.site.register(SubwayEntrance, admin.ModelAdmin)
admin.site.register(SubwayRoute, admin.ModelAdmin)
admin.site.register(SubwayStation, admin.ModelAdmin)
admin.site.register(TractDemographic, admin.ModelAdmin)
