#namespace package boilerplate
try:
    __import__('pkg_resources').declare_namespace(__name__)
except(ImportError, e):
    from pkgutil import extend_path
    __path__ = extend_path(__path__, __name__)
