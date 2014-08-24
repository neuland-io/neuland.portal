from pyramid.response import Response
from pyramid.view import view_config

from cornice import Service

from sqlalchemy.exc import DBAPIError

from ..models import (
    DBSession,
    MyModel,
    )

users = Service(name='users', path='/users', description="User handling")

@users.get()
def get_users(request):
    """Returns user data for a logged in user"""
    return {'Hello': 'World'}
