from django.contrib import admin
from .models import BusRoute, BusStop, BusRouteExpress, BusStopExpress, School, Park

admin.site.register(BusRoute, admin.ModelAdmin)
admin.site.register(BusStop, admin.ModelAdmin)
admin.site.register(BusRouteExpress, admin.ModelAdmin)
admin.site.register(BusStopExpress, admin.ModelAdmin)
admin.site.register(School, admin.ModelAdmin)
admin.site.register(Park, admin.ModelAdmin)
