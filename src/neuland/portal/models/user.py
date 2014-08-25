from sqlalchemy import Column, Integer, Text
from neuland.portal.models import Base


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(Text)
    password = Column(Text)
    email = Column(Text)

