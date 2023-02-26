from django.contrib import admin
from .models import BusRoute, BusStop

admin.site.register(BusRoute, admin.ModelAdmin)
admin.site.register(BusStop, admin.ModelAdmin)
