from django.urls import path
from .views import CategoriaListView, ProductoListView

urlpatterns = [
    path('categorias/', CategoriaListView.as_view(), name='categorias-list'),
    path('productos/', ProductoListView.as_view(), name='productos-list'),
]
