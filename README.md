# m6c11 - Bosque Helado B2B

Aplicacion frontend en Vue 3 + Vite para una heladeria con dos caras bien diferenciadas:

- una landing comercial/operativa para presentar la propuesta B2B;
- un dashboard interno con tareas, KPI, gestor de imagenes, inventario y proveedores.

## Estado real del repositorio (2026-03-13)

- El frontend esta operativo.
- La navegacion principal vive en [`src/App.vue`](/home/cz/Desktop/m6c11/src/App.vue): no usa `vue-router`; cambia vistas con estado local.
- Existe una carpeta [`backend/`](/home/cz/Desktop/m6c11/backend), pero hoy es solo un scaffold: `server.js`, `db.js` y `package.json` estan vacios.
- El proyecto usa persistencia local en navegador para:
  - `imagenes`;
  - `tareas`;
  - `stock`;
  - `proveedores`.
- Las dependencias de Cloudinary estan instaladas, pero la implementacion activa trabaja en modo local.

## Que incluye el sitio hoy

### Landing B2B

Implementada en [`src/modules/panelTareas/views/LandingPage.vue`](/home/cz/Desktop/m6c11/src/modules/panelTareas/views/LandingPage.vue).

- Hero comercial con CTA hacia dashboard, proveedores e inventario.
- Secciones de propuesta, onboarding, modulos, KPI, casos, FAQ y contacto.
- Modal para detalle de soluciones.
- Animaciones de aparicion con `IntersectionObserver`.
- Boton flotante de WhatsApp.
- Boton flotante para volver arriba.
- Formulario de contacto con validacion basica.
- Mapa embebido de Temuco.

### Dashboard interno

Implementado con [`src/modules/panelTareas/views/PanelEmpleado.vue`](/home/cz/Desktop/m6c11/src/modules/panelTareas/views/PanelEmpleado.vue) y componentes asociados.

- Panel de tareas por turno.
- Estado del dia activo/inactivo.
- Alta, edicion, completado y eliminacion de tareas.
- Resumen operativo.
- Agenda del dia.
- KPI del turno calculados desde las tareas.

### Gestor de imagenes

Implementado en [`src/modules/panelTareas/views/GestorImagenes.vue`](/home/cz/Desktop/m6c11/src/modules/panelTareas/views/GestorImagenes.vue).

- Seleccion multiple de archivos.
- Seleccion de carpetas completas desde el navegador.
- Drag and drop.
- Validacion de formato y peso.
- Carga por lote.
- Biblioteca visual persistida en `localStorage`.
- Eliminacion de imagenes.

### Inventario

Implementado en [`src/modules/inventario/views/Stock.vue`](/home/cz/Desktop/m6c11/src/modules/inventario/views/Stock.vue).

- Tabla de stock con estado visual para productos sin stock.
- Alta, edicion y eliminacion de productos.
- Regla de negocio: si la tienda esta cerrada, el inventario queda bloqueado.
- Validacion de campos obligatorios.
- Categoria, unidad y alergenos por producto.
- Integracion con carga de imagen para cada producto.

### Proveedores

Implementado en [`src/modules/inventario/views/Proveedores.vue`](/home/cz/Desktop/m6c11/src/modules/inventario/views/Proveedores.vue).

- Tabla de proveedores.
- Alta, edicion y eliminacion.
- Tiempo de entrega en dias u horas.
- Integracion con carga de imagen por proveedor.
- Validacion basica de formulario.

## Arquitectura actual

### Navegacion

La app arranca mostrando la landing. Desde ahi se puede entrar al sistema interno y cambiar entre estas vistas:

- `panel`
- `tareas`
- `kpi`
- `imagenes`
- `stock`
- `proveedores`

La seleccion de vista se controla desde [`src/App.vue`](/home/cz/Desktop/m6c11/src/App.vue) y [`src/modules/panelTareas/layout/Sidebar.vue`](/home/cz/Desktop/m6c11/src/modules/panelTareas/layout/Sidebar.vue).

### Persistencia real

| Modulo | Fuente de datos | Persiste al recargar |
| --- | --- | --- |
| Tareas | `localStorage` via `falsoBackTareas.js` | Si |
| Inventario | `localStorage` via `falsoBackInventario.js` | Si |
| Proveedores | `localStorage` via `falsoBackInventario.js` | Si |
| Imagenes | `localStorage` via `falsoBackImagenes.js` | Si |

### Falso backend de imagenes

El flujo de imagenes vive en [`src/modules/panelTareas/services/falsoBackImagenes.js`](/home/cz/Desktop/m6c11/src/modules/panelTareas/services/falsoBackImagenes.js).

Hace lo siguiente:

- guarda metadatos en `localStorage` bajo la clave `bosque_helado_imagenes`;
- lee archivos con `FileReader`;
- genera thumbnails con `canvas`;
- normaliza carpetas de destino;
- devuelve una estructura compatible con una futura subida real (`cloudinary_url`, `thumbnail_url`, `carpeta_cloudinary`, `public_id`).

Importante:

- aunque el naming apunte a Cloudinary, hoy no hay subida real a nube;
- `cloudinary_url` contiene una `data URL` local generada en el navegador.

## Stack tecnico

- Vue `^3.5.29`
- Vite `^7.3.1`
- `@vitejs/plugin-vue`
- `vite-plugin-vue-devtools`
- `@cloudinary/url-gen` y `@cloudinary/vue` instalados para futura integracion, no usados activamente en la UI actual

## Estructura principal

```text
backend/
  db.js              # scaffold vacio
  package.json       # scaffold vacio
  server.js          # scaffold vacio
public/
src/
  App.vue
  main.js
  modules/
    inventario/
      components/
      data/
      views/
    panelTareas/
      components/
      layout/
      services/
      views/
index.html
package.json
vite.config.js
```

## Requisitos

- Node.js `^20.19.0 || >=22.12.0`
- npm

## Instalacion y ejecucion

```bash
npm install
npm run dev
```

Build de produccion:

```bash
npm run build
```

Preview del build:

```bash
npm run preview
```

## Decisiones de implementacion que conviene conocer

- Se mezclan `Options API` y `script setup` segun el modulo.
- No hay store global (`Pinia`/`Vuex`) ni router.
- El proyecto esta pensado como demo funcional de flujo interno + landing comercial.
- El cargador de imagenes esta bien separado de las vistas, lo que facilita cambiar el falso backend por una API real.
- El dashboard ya cruza datos reales del flujo local: tareas, recetas, proveedores, imagenes y stock sin disponibilidad.

## Limitaciones actuales

- No hay API real ni base de datos.
- No hay autenticacion.
- No hay tests automaticos en el repositorio.
- El backend no esta implementado todavia.
- El naming de campos de imagen sugiere nube, pero hoy la operacion real es local.

## Siguiente evolucion recomendada

1. Implementar API real para imagenes, stock, proveedores y tareas.
2. Sustituir el servicio local por una integracion real con almacenamiento externo.
3. Agregar `vue-router` si la app va a crecer en rutas reales.
4. Mover estado compartido a `Pinia` cuando haya persistencia y sincronizacion.
5. Incorporar tests de componentes y flujos principales.
