# Ecosistema y Conclusión

React es solo el comienzo. Para construir aplicaciones reales, necesitarás herramientas que resuelvan problemas comunes como la navegación, el estado global y el estilo.

## El Nuevo Estándar: Vite

!!! warning "Importante"
    `Create React App` (CRA) ha dejado de ser la recomendación oficial. Hoy en día, **Vite** es la herramienta preferida por su velocidad extrema y simplicidad.

```bash
# Crear un proyecto con Vite
npm create vite@latest mi-app -- --template react
```

## Librerías Indispensables

### 1. Navegación: React Router
Permite tener múltiples "páginas" en tu aplicación sin recargar el navegador (Single Page Application).

### 2. Estado Global: Zustand vs Redux
- **Redux**: El gigante clásico. Potente pero con mucho código repetitivo (*boilerplate*).
- **Zustand**: La alternativa moderna. Extremadamente simple, minimalista y basada en hooks. (Recomendado para empezar).

### 3. Peticiones e Intercambio de Datos
- **TanStack Query (React Query)**: Imprescindible. Gestiona el caché de las peticiones API, estados de carga, reintentos automáticos y mucho más.

### 4. Estilos y UI
- **Tailwind CSS**: Estilos mediante clases de utilidad directamente en el HTML.
- **Shadcn/ui**: Un conjunto de componentes de alta calidad, accesibles y personalizables.
- **Framer Motion**: La mejor librería para animaciones fluidas en React.

---

## Conclusión

React no es solo una biblioteca, es una **forma de pensar**. Se basa en entender que la interfaz de usuario es una función del estado: `UI = f(state)`.

!!! success "Siguientes Pasos"
    1.  Practica creando componentes pequeños.
    2.  Domina el flujo de props y el `useState`.
    3.  Aprende a usar `useEffect` para conectar con APIs reales.
    4.  ¡Construye algo! La mejor forma de aprender React es rompiendo cosas en un proyecto personal.

## Recursos Oficiales
- [Documentación Oficial (Beta)](https://react.dev) - La mejor fuente, muy completa e interactiva.
- [React Cheat Sheet](https://react-tutorial.app/cheatsheet.html) - Referencia rápida de sintaxis.
