# ProgressFit — Guía de despliegue

Aplicación de control de entrenamientos desarrollada con Spring Boot y React.

## Requisitos previos

Antes de empezar necesitas tener instalado en tu ordenador:

- [Docker](https://www.docker.com/get-started) (versión 20 o superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (versión 2 o superior)
- [Git](https://git-scm.com/downloads) (para clonar el repositorio)

Para comprobar que los tienes instalados ejecuta:

```bash
docker --version
docker compose version
```

Docker Desktop debe estar abierto y arrancado mientras se ejecuta el proyecto.

## Pasos para ejecutar el proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/AngelD87/ProgressFit.git
cd ProgressFit
```

### 2. Arranca el proyecto con Docker Compose

```bash
docker compose up --build
```

Este comando hará automáticamente:

- Descargará la imagen de MySQL 8.0
- Compilará el backend de Spring Boot
- Compilará el frontend de React
- Levantará los tres contenedores

La primera vez puede tardar entre 3 y 5 minutos.

### 3. Accede a la aplicación

Cuando veas en la terminal que el backend ha arrancado correctamente:

Started ProgressfitApplication in X seconds

Abre el navegador y ve a: http://localhost

## Puertos utilizados

| Servicio | Puerto |
| -------- | ------ |
| Frontend | 80     |
| Backend  | 8080   |
| MySQL    | 3307   |

## Credenciales de prueba

Puedes registrarte directamente desde la aplicación o usar estas credenciales de prueba:

| Rol     | Email            | Contraseña |
| ------- | ---------------- | ---------- |
| Usuario | test@hotmail.es  | test12345  |
| Admin   | admin@hotmail.es | test12345  |

El usuario test@hotmail.es tiene entrenamientos, series y registros de peso de ejemplo, por lo que las gráficas de estadísticas y progreso se ven con datos. El usuario admin@hotmail.es tiene acceso al panel de administración.

## Parar el proyecto

Para parar todos los contenedores conservando los datos:

```bash
docker compose down
```

Para parar y eliminar también los datos de la base de datos:

```bash
docker compose down -v
```

> **Importante:** la opción `-v` borra el volumen donde se guardan los datos. Si la usas, perderás los usuarios y entrenamientos cargados y tendrás que volver a crearlos.

## Problemas frecuentes

**Error: "ports are not available: exposing port TCP 0.0.0.0:8080"**
Significa que el puerto 8080 ya está ocupado, normalmente porque el backend está arrancado en el IDE (IntelliJ). Solución: para el backend en el IDE y vuelve a ejecutar `docker compose up`.

**La primera vez tarda mucho**
Es normal: la primera ejecución descarga las imágenes y compila el backend y el frontend. Las siguientes veces es mucho más rápido gracias a la caché.

**El puerto 80 está ocupado**
Si algún otro programa usa el puerto 80, el frontend no arrancará. Cierra ese programa o cambia el puerto en el archivo `docker-compose.yml`.

## Estructura del proyecto

ProgressFit/
├── backend/ ← API REST con Spring Boot
│ └── Dockerfile
├── frontend/ ← Interfaz con React + Vite
│ ├── Dockerfile
│ └── nginx.conf
├── docker-compose.yml
└── despliegue.md

## Tecnologías utilizadas

**Backend**

- Java 17 + Spring Boot 3
- Spring Security + JWT
- Spring Data JPA + Hibernate
- MySQL 8

**Frontend**

- React + Vite
- React Router
- Axios
- Recharts

**Infraestructura**

- Docker
- Docker Compose
- Nginx
