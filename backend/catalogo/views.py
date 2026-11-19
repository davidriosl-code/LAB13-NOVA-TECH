from rest_framework import generics
from .models import Categoria, Producto
from .serializers import CategoriaSerializer, ProductoSerializer

class CategoriaListView(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProductoListView(generics.ListAPIView):
    serializer_class = ProductoSerializer

    def get_queryset(self):
        consulta = Producto.objects.select_related('categoria').all()
        categoria = self.request.query_params.get('categoria')
        if categoria is not None:
            if categoria.isdecimal():
                return consulta.filter(categoria_id=int(categoria))
            return consulta.none()
        return consulta
