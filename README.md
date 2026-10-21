# SegundoParcial_TecnologiaWeb

Parcial hecho por Daniel Castillo y Devinson Rivaldo con SWAPI.

## Descripción del Proyecto
Esta es una aplicación web desarrollada con React y Vite, diseñada para explorar y gestionar información del universo de Star Wars. La aplicación cuenta con un sistema de enrutamiento que incluye diferentes páginas como Inicio, Lista de elementos, Detalles específicos, Registro de usuarios y una sección de Favoritos. 

Además, implementa un buscador integrado y utiliza Context API para el manejo global del estado (gestión de usuarios y elementos favoritos). La arquitectura está modularizada mediante el uso de componentes reutilizables como tarjetas, barras de navegación y formularios.

## API Utilizada
Los datos consumidos por la aplicación provienen de **SWAPI**, integrados a través de un servicio dedicado en la ruta `src/services/swapiService.js`.

*   **Nombre de la API:** SWAPI (The Star Wars API)
*   **URL Base:** `https://swapi.dev/api/`
*   **Endpoints principales:**
    *   `GET /people/`: Obtiene el listado general de los personajes de Star Wars.
    *   `GET /people/:id/`: Devuelve los detalles específicos de un personaje según su ID.
    *   `GET /planets/`: Obtiene el listado de planetas.
    *   `GET /films/`: Obtiene la información de las películas.

## Tecnologías Principales
*   **Frontend:** React (inicializado con Vite)
*   **Gestión de Estado:** Context API (`FavoritosContext`, `UsuariosContext`)
*   **Estructura:** Modular (Carpetas dedicadas para `components`, `pages`, `hooks`, `context` y `services`).

## Capturas de pantalla

<img width="1600" height="717" alt="image" src="https://github.com/user-attachments/assets/c16992ab-2615-4467-9fa0-7e0e5e5e9ff0" />

<img width="1600" height="722" alt="image" src="https://github.com/user-attachments/assets/f6a56dc5-532d-44e3-a084-1c17e064a9d9" />

<img width="1600" height="720" alt="image" src="https://github.com/user-attachments/assets/3ce4f5b6-f13c-4483-83c6-4b71440647bf" />

## Instrucciones para su ejecucion

Para ejecutar este proyecto de forma local, sigue estos pasos:

### Requisitos previos
* Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior recomendada) en tu computadora.

### Pasos de instalación y ejecución

1. **Abrir la carpeta del proyecto:**
   Descarga y descomprime el archivo del proyecto.

2. **Abrir la terminal:**
   Abre una nueva terminal integrada en dentro de la carpeta del proyecto ya descargado.

3. **Instalar las dependencias:**
   Ejecuta el siguiente comando para descargar todos los paquetes necesarios de React y Vite:
   ```bash
   npm install
  
  y para iniciar el servidor ejecuta:
  ```bash
   npm run dev
  ```
Por ultimo abre la url local en el navegador para poder navegar y visualizar el proyecto.
  
