# Proyecto de Automatización con Playwright

Este repositorio es una **demostración de mis habilidades en QA y automatización de pruebas** utilizando **Playwright**. No es una tienda real, sino un proyecto creado como parte de mi **portfolio profesional**. El propósito es mostrar mi capacidad para escribir pruebas automatizadas para una aplicación web, simular escenarios de usuario y garantizar la calidad y el correcto funcionamiento de las funcionalidades clave del sistema, como el inicio de sesión, la navegación de productos, y la gestión del carrito de compras.

Las pruebas cubren diferentes funcionalidades de la página de ejemplo, y son ejecutadas en un entorno controlado para validar la estabilidad y la experiencia de usuario de la aplicación.

### Requisitos previos

Para poder ejecutar las pruebas, asegúrate de tener instalado lo siguiente:

• **Node.js**

• **Playwright**

• **dotenv**

Para instalar las dependencias necesarias, corre el siguiente comando en la raíz del proyecto:

```bash
npm install
```

### Estructura del Proyecto

Este proyecto está estructurado de la siguiente manera:

```bash
playwright-saucedemo-automation/
│
├── src/                                
│   ├── tests/                          # Pruebas automatizadas
│   │
│   ├── pages/                          # Implementación del patrón Page Object Model (POM)
│   │   └── (Clases de página, como LoginPage, InventoryPage, etc.)
│   │
│   └── constants/                      
│       ├── enum/                       # Enumeraciones
│       ├── locators/                   # Localizadores de los elementos de la UI
│       └── StringConstants.ts          # Constantes de texto y mensajes
│
├── playwright.config.ts                
├── .gitignore                          
├── package.json                        
├── package-lock.json                   
├── playwright-report/                  
└── README.md                           
```

### Variables de Entorno

El proyecto requiere un archivo .env en la raíz del proyecto para configurar las credenciales de acceso al sistema. En el archivo .env debes añadir las siguientes variables:

### Variables necesarias

• **VALID_USERNAME:** El nombre de usuario válido para realizar el login.

• **VALID_PASSWORD:** La contraseña correspondiente al usuario válido.

• **INVALID_USERNAME:** Un nombre de usuario incorrecto para probar el inicio de sesión fallido.

• **INVALID_PASSWORD:** Una contraseña incorrecta para probar el inicio de sesión fallido.

Este archivo se debe añadir a tu .gitignore para evitar que las credenciales se suban a un repositorio público.

### Ejecución de Pruebas

Una vez tengas las credenciales configuradas en el archivo .env, puedes ejecutar las pruebas utilizando Playwright.

### Ejecutar todas las pruebas

```bash
npx playwright test
```

### Ejecutar una prueba específica

Si solo quieres ejecutar una prueba específica, puedes usar el siguiente comando:

```bash
npx playwright test tests/login.spec.ts
```

### Generar reporte de prueba

Al finalizar la ejecución de las pruebas, Playwright generará automáticamente un reporte que podrás revisar en la terminal o en los archivos de salida configurados.
