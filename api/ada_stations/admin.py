from django.contrib import admin
from .models import BusRoute, BusStop, BusStopExpress

admin.site.register(BusRoute, admin.ModelAdmin)
admin.site.register(BusStop, admin.ModelAdmin)
admin.site.register(BusStopExpress, admin.ModelAdmin)
