import json

from pyramid.response import Response
from pyramid.view import view_config

from cornice import Service

from sqlalchemy.exc import DBAPIError

from neuland.portal.models import DBSession
from neuland.portal.models.user import User


users = Service(name='users', path='/users', description="User handling")

@users.get()
def get_users(request):
    """Returns user data for a logged in user"""
    return {'Hello': 'World'}

@users.post()
def create_user(request):
    """Registers a new user"""
    try:
        content = json.loads(request.body.decode(encoding='UTF-8'))
    except ValueError:
        return False
    print(content)
    return True
