from decimal import Decimal
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from catalogo.models import Categoria, Producto

DATOS = [
    ('Audio', 'Audífonos Studio Pro', 'Sonido envolvente, almohadillas premium y diseño moderno.', '289.90', 'audifonos-pro.svg', 18),
    ('Audio', 'Parlante Pulse Mini', 'Altavoz portátil inalámbrico con graves profundos.', '159.90', 'parlante-mini.svg', 23),
    ('Audio', 'Micrófono Stream X', 'Captura de voz clara para streaming y videollamadas.', '229.90', 'microfono.svg', 12),
    ('Gaming', 'Teclado Mecánico RGB', 'Teclas precisas y retroiluminación para tus sesiones de juego.', '349.90', 'teclado-rgb.svg', 14),
    ('Gaming', 'Mouse Gamer Vector', 'Sensor de alta precisión y diseño ergonómico.', '129.90', 'mouse-gamer.svg', 30),
    ('Gaming', 'Control Wireless One', 'Mando inalámbrico cómodo para jugar en PC.', '199.90', 'control.svg', 8),
    ('Oficina', 'Monitor UltraView 24', 'Pantalla de 24 pulgadas para trabajo y productividad.', '799.90', 'monitor.svg', 7),
    ('Oficina', 'Webcam Vision HD', 'Cámara para reuniones y clases con imagen nítida.', '139.90', 'webcam.svg', 21),
    ('Oficina', 'Soporte Laptop Flex', 'Soporte ajustable que mejora la postura frente al equipo.', '99.90', 'soporte.svg', 17),
    ('Accesorios', 'Smartwatch Orbit', 'Reloj inteligente con notificaciones y seguimiento diario.', '269.90', 'reloj.svg', 16),
    ('Accesorios', 'Hub USB-C Connect', 'Adaptador multipuerto para ampliar tus conexiones.', '119.90', 'hub.svg', 28),
    ('Accesorios', 'Cargador FastCharge', 'Carga rápida y formato compacto para escritorio.', '89.90', 'cargador.svg', 35),
]

class Command(BaseCommand):
    help = 'Carga 4 categorías y 12 productos de ejemplo de NOVA TECH (repetible).'

    def handle(self, *args, **kwargs):
        for categoria_nombre, nombre, descripcion, precio, imagen, cantidad in DATOS:
            categoria, _ = Categoria.objects.get_or_create(
                nombre=categoria_nombre, defaults={'slug': slugify(categoria_nombre)}
            )
            Producto.objects.update_or_create(
                nombre=nombre,
                defaults={
                    'descripcion': descripcion,
                    'precio': Decimal(precio),
                    'imagen_url': '/images/' + imagen,
                    'cantidad_disponible': cantidad,
                    'categoria': categoria,
                }
            )
        self.stdout.write(self.style.SUCCESS(
            f'Datos listos: {Categoria.objects.count()} categorías, {Producto.objects.count()} productos.'
        ))
