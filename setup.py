import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'README.md')) as f:
    README = f.read()
with open(os.path.join(here, 'CHANGES.txt')) as f:
    CHANGES = f.read()

requires = [
    'SQLAlchemy',
    'cornice',
    'pyramid',
    'pyramid_chameleon',
    'pyramid_debugtoolbar',
    'pyramid_tm',
    'rutter',
    'transaction',
    'waitress',
    'zope.sqlalchemy',
    ],

setup(name='neuland.portal',
      version='0.0',
      description='portal for neuland.io',
      long_description=README + '\n\n' + CHANGES,
      classifiers=[
        "Programming Language :: Python",
        "Framework :: Pyramid",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
        ],
      author='',
      author_email='',
      url='',
      keywords='web wsgi bfg pylons pyramid',
      packages=find_packages('src'),
      package_dir={'': 'src'},
      namespace_packages=['neuland'],

      include_package_data=True,
      zip_safe=False,
      test_suite='neuland.portal.tests',
      tests_require=['pytest'],
      install_requires=requires,
      entry_points="""\
      [paste.app_factory]
      portal = neuland.portal:portal
      api = neuland.portal:api
      [console_scripts]
      initialize_portal_db = neuland.portal.scripts.initializedb:main
      """,
)
