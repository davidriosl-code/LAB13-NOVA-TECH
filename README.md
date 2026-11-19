# NOVA TECH | Laboratorio 13

**Curso:** Desarrollo de Aplicaciones Empresariales â€” TECSUP  
**Docente:** Jean Marco Miranda Llanos  
**Proyecto:** Estructura inicial de una tienda virtual de accesorios tecnolÃ³gicos.

## TecnologÃ­as
- **Frontend:** ReactJS, Vite, TypeScript, Tailwind CSS y shadcn/ui.
- **Backend:** Django 5.2, Django REST Framework y SQLite.
- **ComunicaciÃ³n:** API REST con respuestas JSON y peticiones `fetch`.

## Requisitos de la guÃ­a
1. AnÃ¡lisis del negocio, requisitos y arquitectura React â†’ Django REST â†’ SQLite.
2. Carpetas independientes de `frontend` y `backend`.
3. Componentes reutilizables: `Header`, `ProductCard`, `ProductList`, `CategoryFilter`.
4. Modelos `Categoria` y `Producto` con relaciÃ³n 1:N, migraciones y Django Admin.
5. IntegraciÃ³n con `fetch`, `useEffect`, `useState`, filtros, carga y errores.
6. CatÃ¡logo responsive, revisiÃ³n funcional y mejoras propuestas.

## PreparaciÃ³n en Windows PowerShell

Requiere Node.js, Python y npm. Abre una terminal por servicio.

### Backend
```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py seed_lab13
.\.venv\Scripts\python.exe manage.py createsuperuser
.\.venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
```
### Frontend
```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```
Abre la URL que indique Vite (normalmente http://localhost:5173/).

### Rutas
- Productos: http://127.0.0.1:8000/api/productos/
- CategorÃ­as: http://127.0.0.1:8000/api/categorias/
- Filtrar por categorÃ­a: http://127.0.0.1:8000/api/productos/?categoria=1
- AdministraciÃ³n: http://127.0.0.1:8000/admin/

## Pruebas
```powershell
cd backend
.\.venv\Scripts\python.exe manage.py test catalogo
cd ..\frontend
npm.cmd run build
```

## DemostraciÃ³n de integraciÃ³n
Abre `/admin/`, edita el precio de un producto, guarda y actualiza el catÃ¡logo React: el dato nuevo debe visualizarse. TambiÃ©n puedes seleccionar una categorÃ­a y comprobar el filtrado.

## Alcance
El proyecto es acadÃ©mico y local. El laboratorio **no requiere** carrito, pedidos, autenticaciÃ³n de clientes ni pasarela de pago. Django Admin se utiliza para gestionar el catÃ¡logo.

**Seguridad:** no subir `.env`, entorno virtual, claves ni base de datos local. `DEBUG=True` y la configuraciÃ³n de desarrollo no estÃ¡n preparados para producciÃ³n.

La evidencia de ejecuciÃ³n, capturas de cÃ³digo y conclusiones se entregan en el informe del laboratorio.
