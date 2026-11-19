# MCP Equastore · Dropi Ecuador

El servidor MCP por stdio busca productos en Dropi Ecuador y publica fichas seleccionadas en Equastore. Los tres comandos MCP son `buscar_dropi_ecuador`, `previsualizar_producto_equastore` y `publicar_producto_equastore`.

## Configuración

Instala dependencias con `npm ci` en Node.js 22 o superior. Configura `DROPI_EC_TOKEN` con la clave de integración de Dropi Ecuador en `.env.local` o en el entorno privado del proceso. Si Dropi restringe el acceso por IP, solicita a soporte la habilitación de la IP de salida de ese proceso.

Para publicar, configura el acceso del destino que vayas a usar.

| Destino | Credencial | Resultado |
| --- | --- | --- |
| `equastore.com` | Application Default Credentials de Google con permisos de lectura y creación de documentos en el proyecto `equastore-a5155`. Si usas un archivo de cuenta de servicio, configura `GOOGLE_APPLICATION_CREDENTIALS` con su ruta absoluta fuera del repositorio. | Crea un documento en la colección `products` que consulta la tienda pública. |
| `github-v2` | `EQUASTORE_GITHUB_TOKEN` con permiso Contents de lectura y escritura para `eddyflores100-lang/equastore-v2`. | Agrega una ficha al catálogo EC con un commit en `main`, que inicia el flujo de GitHub Pages. La publicación web depende del resultado de ese flujo. |

Para registrar el servidor en un cliente local, ajusta la ruta del proyecto:

```json
{
  "mcpServers": {
    "equastore-dropi": {
      "command": "npm",
      "args": ["--silent", "--prefix", "/ruta/equastore-v2", "run", "mcp:dropi"]
    }
  }
}
```

## Publicar una ficha

1. Busca un producto por nombre en Dropi.
2. Previsualiza por ID con el destino, precio de venta final en USD y categoría. La ficha requiere un producto simple con stock positivo y una imagen HTTPS. Puedes indicar la imagen y descripción si necesitas corregirlas.
3. Revisa título, imagen, descripción, precio y destino. Invoca `publicar_producto_equastore` con las mismas entradas y la huella devuelta por la vista previa.

El identificador se deriva del ID de Dropi Ecuador. Repetir la misma publicación no crea duplicados. Las fichas existentes se editan desde el panel del destino. La herramienta consulta stock al preparar la ficha y al publicarla. La actualización continua de stock, las variantes y el envío de pedidos quedan fuera de este flujo.

Esta implementación usa stdio. Una integración desde ChatGPT web requeriría alojar un transporte MCP HTTPS autenticado.
