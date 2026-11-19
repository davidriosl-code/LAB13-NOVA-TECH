from django.test import TestCase
from django.urls import reverse
from .models import Categoria, Producto

class CatalogoAPITests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.cat = Categoria.objects.create(nombre='Audio', slug='audio')
        Categoria.objects.create(nombre='Gaming', slug='gaming')
        Producto.objects.create(
            nombre='Audífonos', descripcion='Prueba API', precio='199.90',
            imagen_url='/images/audifonos-pro.svg', cantidad_disponible=10, categoria=cls.cat
        )

    def test_obtener_categorias(self):
        response = self.client.get(reverse('categorias-list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_obtener_productos_json(self):
        response = self.client.get(reverse('productos-list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]['categoria_nombre'], 'Audio')
        self.assertEqual(response.json()[0]['precio'], '199.90')

    def test_filtrar_por_categoria(self):
        response = self.client.get(reverse('productos-list'), {'categoria': self.cat.id})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        response = self.client.get(reverse('productos-list'), {'categoria': 'no-valida'})
        self.assertEqual(response.json(), [])
