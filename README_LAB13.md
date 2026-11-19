# NOVA TECH — Laboratorio 13 (TECSUP)
**Curso:** Desarrollo de Aplicaciones Empresariales  
**Docente:** Jean Marco Miranda Llanos  
**Tecnologías:** React + Vite + TypeScript, Tailwind CSS, shadcn/ui, Django 5.2 LTS, Django REST Framework, SQLite.

## Alcance de la guía
Estructura inicial de una tienda de accesorios tecnológicos. Incluye Header, ProductCard, ProductList, CategoryFilter, filtros con useState, datos REST obtenidos con useEffect, modelos Categoria y Producto en relación 1:N, panel admin Django, API JSON, diseño responsive y pruebas.

La guía NO exige carrito, pasarela de pagos ni cuentas de clientes.

## Instalación en Windows/PowerShell
Después de ejecutar `INSTALAR_LAB13EMP.ps1` (en el paquete), abre 2 terminales:

**Terminal backend**
```powershell
cd E:\laboratorio13emp\backend
.\.venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
```
**Terminal frontend**
```powershell
cd E:\laboratorio13emp\frontend
npm.cmd run dev
```

## URLs
- Tienda: http://localhost:5173/
- Categorías JSON: http://127.0.0.1:8000/api/categorias/
- Productos JSON: http://127.0.0.1:8000/api/productos/
- Filtro API: http://127.0.0.1:8000/api/productos/?categoria=1
- Django admin: http://127.0.0.1:8000/admin/

**Para crear usuario administrador (una vez):**
```powershell
cd E:\laboratorio13emp\backend
.\.venv\Scripts\python.exe manage.py createsuperuser
```

## Demostración de comunicación
1. Abre el catálogo y selecciona Audio o Gaming.
2. Abre `/admin/`, modifica precio o existencia de un Producto y guarda.
3. Actualiza el navegador del catálogo; el precio o stock debe cambiar.
4. Detén Django, actualiza el catálogo y comprueba el mensaje de error y botón Reintentar.
5. Reanuda Django, recarga y muestra la recuperación de datos.

## Pruebas automáticas
```powershell
cd E:\laboratorio13emp\backend
.\.venv\Scripts\python.exe manage.py test catalogo
cd ..\frontend
npm.cmd run build
```

## Publicación en GitHub
Instala Git (o PortableGit en disco E) y, desde `E:\laboratorio13emp`:
```powershell
git init
git add .
git commit -m "Laboratorio 13: catálogo React y Django REST"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/laboratorio13emp.git
git push -u origin main
```
Reemplaza `TU_USUARIO` con tu usuario real y crea primero el repositorio vacío. No se incluyen las credenciales, base de datos local ni `node_modules` gracias a `.gitignore`.

## Nota
Proyecto académico local. Antes de publicarlo en Internet, deshabilitar `DEBUG`, configurar `SECRET_KEY` segura y `ALLOWED_HOSTS`, etc.
