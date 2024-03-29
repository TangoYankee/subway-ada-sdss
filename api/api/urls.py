"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from ada_stations.views import (
    BusRouteViewSet,
    BusStopViewSet,
    BusRouteExpressViewSet,
    BusStopExpressViewSet,
    HospitalViewSet,
    ParkViewSet,
    SchoolViewSet,
    SubwayRouteViewSet,
    SubwayStationViewSet,
    SubwayStation500BufferViewSet,
    TractDemographicViewSet,
    RankingView,
)

router = routers.DefaultRouter()
router.register("bus-routes", BusRouteViewSet)
router.register("bus-stops", BusStopViewSet)
router.register("bus-routes-express", BusRouteExpressViewSet)
router.register("bus-stops-express", BusStopExpressViewSet)
router.register("hospitals", HospitalViewSet)
router.register("parks", ParkViewSet)
router.register("schools", SchoolViewSet)
router.register("subway-routes", SubwayRouteViewSet)
router.register("subway-stations", SubwayStationViewSet)
router.register("subway-stations-buffer", SubwayStation500BufferViewSet)
router.register("tract-demographics", TractDemographicViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(router.urls)),
    path("api/v1/rankings", RankingView.as_view(), name="rankings"),
]
