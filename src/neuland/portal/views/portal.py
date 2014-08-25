from pyramid.response import Response
from pyramid.view import view_config


@view_config(route_name='home', renderer='../templates/neuland.io.pt')
def my_view(request):
    return({})
