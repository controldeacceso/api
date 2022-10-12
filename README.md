# AsisTEC API
sí.

## Referencia

### Verificación
Para poder usar el API, todos los endpoints usan una clave de autentificación. La clave de autentificación debe ser enviada a través de un encabezado HTTP, de lo contrario, el servidor responderá con una respuesta HTTP 403.

| Header        | Descripción                              |
| ------------- | ---------------------------------------- |
| Authorization | La clave de autentificación para el API. |

### Objeto RFID
| Campo   | Tipo   | Descripción                                       |
| ------- | ------ | ------------------------------------------------- |
| RFID    | string | La RFID.                                          |
| created | number | El timestamp en segundos de la creación del RFID. |


## Rutas
El cuerpo de las rutas debe estar formateado en `application/json`.


### PUT `/rfid`
Inserta una nueva RFID en la base de datos.

#### Cuerpo de la solicitud

| Campo   | Tipo   | Descripción                           |
| ------- | ------ | ------------------------------------- |
| rfid    | string | El RFID que será vinculado al alumno. |

### GET `/rfid`
Retorna un array conteniendo todas las RFIDs registradas en la base de datos.

#### Cuerpo de la respuesta

| Campo   | Tipo   | Descripción                               |
| ------- | ------ | ----------------------------------------- |
| code    | number | Código de respuesta HTTP.                 |
| message | string | Mensaje del servidor.                     |
| data    | RFID[] | Un array de [objetos RFID](#objeto-rfid). |

### DELETE `/rfid/<id>`
Elimina una RFID registrada de la base de datos.


### POST `/check/<rfid>`
Registra una entrada o salida de una RFID en la base de datos.



