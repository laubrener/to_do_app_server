Documentación del Backend

1. Descripción General
Este backend es responsable de la autenticación de usuarios y el manejo de tareas. Permite crear y autenticar usuarios, así como crear y obtener una lista de tareas.

2. Entorno y Configuración
   
Base de datos: MongoDB, conectado mediante Mongoose.
Autenticación: JSON Web Tokens (JWT) para la autenticación de usuarios.
Framework: Express para manejar las rutas y peticiones HTTP.

3. Endpoints de la API
   
Autenticación

- Crear un nuevo usuario
Endpoint: POST /api/login/new
Descripción: Crea un nuevo usuario con los datos proporcionados.
Ejemplo de solicitud:

{
    "nombre": "JuanPerez",
    "email": "juan@example.com",
    "password": "123456"
}

Respuesta exitosa (201 Created):

{
    "ok": true,
    "msg": "Usuario creado con éxito"
    "usuario": {
        "nombre": "JuanPerez",
        "email": "juan@example.com",
        "uid": "672427b09176596ea71dd6892e"
    }
}

- Iniciar sesión
   
Endpoint: POST /api/login
Descripción: Realiza la autenticación del usuario y devuelve un token JWT si los datos son correctos.
Ejemplo de solicitud:

{
    "nombre": "juanPerez",
    "password": "123456"
}

Gestión de Tareas

- Crear una nueva tarea
   
Endpoint: POST /api/tareas/new
Descripción: Crea una nueva tarea con los datos especificados.
Ejemplo de solicitud:

{
    "nombre": "Almorzar",
    "comienza": "13:30",
    "termina": "14:30"
}

Respuesta exitosa (201 Created):

{
    "ok": true,
    "msg": "Tarea creada con éxito"
}

Respuesta de error (400 Bad Request):

{
    "ok": false,
    "msg": "Ya existe la tarea"
}

- Obtener todas las tareas
   
Endpoint: GET /api/tareas
Descripción: Devuelve una lista de todas las tareas registradas en la base de datos.
Ejemplo de respuesta (200 OK):


{
  “ok”: true,
  “response”: [
    {
        "nombre": "Almorzar",
        "comienza": "13:30",
        "termina": "14:30"
    },
    {
        "nombre": "Reunión",
        "comienza": "15:00",
        "termina": "16:00"
    }
]}

4. Manejo de Errores
   
Cada endpoint devuelve un mensaje de error a través de la clave "msg" en la respuesta. Los errores comunes incluyen:

Usuario existente al intentar crear un nuevo usuario (400 Bad Request).
Credenciales incorrectas al iniciar sesión (401 Unauthorized).
Tarea duplicada al crear una tarea que ya existe (400 Bad Request).

5. Consideraciones
Estado de desarrollo: Algunas funcionalidades pueden estar en desarrollo, y podrían agregarse nuevas validaciones o mejoras en la seguridad.
Limitaciones conocidas: Documentar cualquier posible limitación futura o cualquier situación en la que el backend podría tener dificultades de respuesta o rendimiento.
