# ComuniArte en Firebase Studio

Este es un proyecto de inicio de Next.js para ComuniArte, desarrollado en Firebase Studio.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

*   **Node.js**: Se recomienda la versión LTS más reciente. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
*   **Yarn**: Este proyecto utiliza Yarn como gestor de paquetes. Si no lo tienes, puedes instalarlo siguiendo las instrucciones en [yarnpkg.com](https://classic.yarnpkg.com/en/docs/install).

## Pasos para Ejecutar el Proyecto Localmente

Sigue estos pasos para poner en marcha el proyecto en tu entorno de desarrollo local:

1.  **Clonar el Repositorio (Si es necesario)**:
    Si estás trabajando fuera de Firebase Studio o necesitas una copia local, clona el repositorio a tu máquina.
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>
    ```

2.  **Instalar Dependencias**:
    Una vez que tengas el código del proyecto, navega a la raíz del directorio del proyecto en tu terminal y ejecuta el siguiente comando para instalar todas las dependencias necesarias:
    ```bash
    yarn install
    ```

3.  **Configurar Variables de Entorno (Opcional)**:
    Este proyecto utiliza Genkit para funcionalidades de IA. Si planeas utilizar modelos de IA específicos (por ejemplo, de Google AI), necesitarás configurar las claves API correspondientes.
    Crea un archivo `.env.local` en la raíz del proyecto y añade tus variables de entorno. Por ejemplo:
    ```env
    GOOGLE_API_KEY=TU_CLAVE_API_DE_GOOGLE_AQUI
    ```
    Para el funcionamiento básico con datos mock, este paso puede no ser estrictamente necesario inicialmente. Revisa `src/ai/genkit.ts` para la configuración actual.

4.  **Ejecutar el Servidor de Desarrollo de Next.js**:
    Este comando iniciará la aplicación principal de Next.js. Por defecto, estará disponible en `http://localhost:9002`.
    ```bash
    yarn dev
    ```
    La aplicación se recargará automáticamente si realizas cambios en los archivos.

5.  **Ejecutar el Servidor de Desarrollo de Genkit (Para Funcionalidades de IA)**:
    Si el proyecto incluye flujos de Genkit (para IA generativa), necesitarás ejecutar el servidor de desarrollo de Genkit en una terminal separada. Esto permite que la aplicación Next.js se comunique con los flujos de IA.
    ```bash
    yarn genkit:dev
    ```
    O, si prefieres que se reinicie automáticamente con los cambios en los archivos de IA:
    ```bash
    yarn genkit:watch
    ```
    El servidor de Genkit generalmente se ejecuta en un puerto diferente (configurado en `genkit-config.json` o por defecto, revisa la salida de la terminal de Genkit).

6.  **Acceder a la Aplicación**:
    Una vez que ambos servidores (Next.js y, si es necesario, Genkit) estén en funcionamiento:
    *   Abre tu navegador y ve a `http://localhost:9002` para ver la aplicación ComuniArte.
    *   El Dev UI de Genkit (para inspeccionar flujos, etc.) suele estar disponible en `http://localhost:4000` (o el puerto que indique la terminal de Genkit).

¡Y eso es todo! Ahora deberías tener ComuniArte ejecutándose localmente en tu máquina.

## Scripts Útiles

*   `yarn dev`: Inicia el servidor de desarrollo de Next.js.
*   `yarn genkit:dev`: Inicia el servidor de desarrollo de Genkit.
*   `yarn genkit:watch`: Inicia el servidor de desarrollo de Genkit con recarga automática.
*   `yarn build`: Compila la aplicación para producción.
*   `yarn start`: Inicia un servidor de producción de Next.js (después de ejecutar `yarn build`).
*   `yarn lint`: Ejecuta el linter para revisar el código.
*   `yarn typecheck`: Revisa los tipos de TypeScript en el proyecto.
