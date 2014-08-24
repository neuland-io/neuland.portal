from pyramid.config import Configurator
from sqlalchemy import engine_from_config

from .models import (
    DBSession,
    Base,
    )


def portal(global_config, **settings):
    """ This function returns the Portal WSGI application.
    """
    config = Configurator(settings=settings)
    config.include('pyramid_chameleon')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.scan('neuland.portal.views')
    return config.make_wsgi_app()

def api(global_config, **settings):
    """ This function returns the API WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    config = Configurator(settings=settings)
    config.include('pyramid_chameleon')
    config.include('cornice')
    config.scan('neuland.portal.api')
    return config.make_wsgi_app()
