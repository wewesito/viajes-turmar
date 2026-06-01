# Publicar Viajes Turmar

Esta web es estatica. Puedes publicarla en cualquier hosting de archivos estaticos.

## Opcion rapida: Netlify

1. Entra en https://app.netlify.com/drop
2. Arrastra esta carpeta completa: `/Users/alvaroruiz/Desktop/web`
3. Netlify generara una URL publica permanente.

## Motor privado de mayoristas

La web incluye una plantilla de funcion segura en:

```text
netlify/functions/search.js
```

Las claves de mayoristas deben configurarse como variables de entorno del hosting, nunca dentro de `script.js`.

Cuando el backend este listo, cambia en `script.js`:

```js
const PRIVATE_SEARCH_API_URL = "";
```

por:

```js
const PRIVATE_SEARCH_API_URL = "/.netlify/functions/search";
```

## Gestion y registros

La web incluye un panel gestor en:

```text
admin.html
```

Tambien incluye endpoints de plantilla para centralizar datos si publicas en Netlify u otro hosting con funciones:

```text
netlify/functions/lead.js
netlify/functions/analytics.js
```

En GitHub Pages esos endpoints no se ejecutan, porque GitHub Pages solo sirve archivos estaticos. Para registros centralizados usa Formspree, Airtable, Supabase, CRM o despliega en Netlify/Vercel con funciones.

## Opcion recomendada: GitHub Pages

1. Crea un repositorio publico en GitHub llamado `viajes-turmar`.
2. Sube estos archivos al repositorio.
3. En GitHub, ve a `Settings > Pages`.
4. En `Build and deployment`, elige `Deploy from a branch`.
5. Selecciona `main` y carpeta `/root`.
6. Guarda los cambios.

La URL quedara parecida a:

```text
https://wewesito.github.io/viajes-turmar/
```

## Archivos necesarios

- `index.html`
- `styles.css`
- `script.js`
- `admin.html`
- `admin.js`
- `.nojekyll`
- `GESTION.md`
- `assets/hero-travel-agency.png`
- `assets/logo-viajes-turmar.jpg`
- `netlify/functions/search.js`
- `netlify/functions/lead.js`
- `netlify/functions/analytics.js`
