from django.contrib import admin
from .models import BusRoutes

admin.site.register(BusRoutes, admin.ModelAdmin)
