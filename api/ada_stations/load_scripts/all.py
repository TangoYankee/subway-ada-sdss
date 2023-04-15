from . import (
    busroute,
    busrouteexpress,
    busstop,
    busstopexpress,
    hospitals,
    parks,
    schools,
    subwayentrances,
    subwayroutes,
    subwaystations,
    subwaystationsada,
    subwaystations500buffer,
    tractdemographics,
)


def run():
    busroute.run()
    busrouteexpress.run()
    busstopexpress.run()
    busstop.run()
    busstopexpress.run()
    hospitals.run()
    parks.run()
    schools.run()
    subwayentrances.run()
    subwayroutes.run()
    subwaystations.run()
    subwaystationsada.run()
    subwaystations500buffer.run()
    tractdemographics.run()
