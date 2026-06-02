# Dominio, Backend y Produccion - Viajes Turmar

Este archivo deja preparada la parte profesional que no se puede activar sin cuentas reales.

## Dominio recomendado

Dominio principal sugerido:

```txt
viajesturmar.com
```

Alternativas si no estuviera disponible:

```txt
viajesturmar.es
viajes-turmar.com
turmarviajes.com
```

## DNS cuando el dominio este comprado

Para Netlify:

```txt
Tipo: A
Nombre: @
Valor: 75.2.60.5

Tipo: CNAME
Nombre: www
Valor: TU-SITIO.netlify.app
```

Para GitHub Pages, solo si quieres seguir usando GitHub Pages:

```txt
Tipo: CNAME
Nombre: www
Valor: wewesito.github.io
```

Importante: no he creado un archivo `CNAME` activo porque si el dominio no esta comprado o el DNS no esta listo, puede provocar errores de acceso.

## Email profesional

Correos sugeridos:

```txt
info@viajesturmar.com
reservas@viajesturmar.com
legal@viajesturmar.com
soporte@viajesturmar.com
```

## Backend recomendado

Usar Netlify para activar:

```txt
/api/search
/api/lead
/api/analytics
```

Variables que hay que cargar en Netlify:

```txt
ALLOWED_ORIGIN=https://viajesturmar.com
SUPABASE_URL=https://TU-PROYECTO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY
LEAD_WEBHOOK_URL=
TURMAR_ENGINE_URL=
TURMAR_ENGINE_TOKEN=
```

## Base de datos demo

Archivos preparados:

```txt
data/demo-database.json
supabase/schema.sql
supabase/seed.sql
```

Orden para cargar Supabase:

1. Crear proyecto en Supabase.
2. Ejecutar `supabase/schema.sql`.
3. Ejecutar `supabase/seed.sql`.
4. Copiar `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` en Netlify.

## Pendiente cuando haya datos reales

- Sustituir emails y telefonos demo.
- Completar razon social, NIF/CIF y direccion.
- Conectar mayoristas reales en `netlify/functions/search.js`.
- Activar pasarela de pago real: Stripe, Redsys o banco.
- Proteger el panel gestor con autenticacion real.
