# Introducción a React

React es una biblioteca de JavaScript para construir interfaces de usuario, desarrollada y mantenida por Facebook (Meta). Desde su lanzamiento en 2013, ha transformado el desarrollo web con su enfoque en la **reactividad** y los **componentes**.

!!! info "Nota Filosófica"
    React no es un framework completo (como Angular). Se centra únicamente en la "capa de vista", lo que te da total libertad para elegir tus propias herramientas para el routing, estado global y peticiones.

## Historia del Desarrollo Frontend

### La Evolución de las Interfaces Web

#### 1. Era Estática (1990s)
- **HTML + CSS básico**: Páginas web estáticas sin interactividad.
- Contenido fijo que requería recargar toda la página para mostrar cambios.

#### 2. Era de jQuery (2006-2015)
- Facilitó la manipulación del DOM y resolvió compatibilidades.
- El código se volvía "espagueti" en aplicaciones grandes.

#### 3. Era de los Frameworks MVC (2010+)
- **AngularJS**, **Backbone**: Introdujeron estructura, pero la manipulación del DOM seguía siendo compleja.

#### 4. Era de las Bibliotecas Reactivas (2013+)
- **React**, **Vue**: Arquitectura basada en componentes y Virtual DOM.

### El Problema que React Resolvió

Antes de React, actualizar la interfaz de usuario era un proceso **imperativo**: tenías que decirle al navegador paso a paso qué cambiar. Esto llevaba a inconsistencias de estado y errores difíciles de depurar.

=== "Enfoque Imperativo (jQuery)"
    ```javascript
    // Tenemos que buscar el elemento, cambiar el texto, cambiar el atributo...
    function updateUserProfile(user) {
      $("#username").text(user.name);
      $("#email").text(user.email);
      $("#avatar").attr("src", user.avatar);
      if (user.isPremium) {
        $("#badge").show();
      } else {
        $("#badge").hide();
      }
    }
    ```

=== "Enfoque Declarativo (React)"
    ```javascript
    // Solo declaramos cómo debe verse el componente según el objeto 'user'
    function UserProfile({ user }) {
      return (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <img src={user.avatar} alt={user.name} />
          {user.isPremium && <span className="badge">Premium</span>}
        </div>
      );
    }
    ```

## Filosofía de React

### Principios Fundamentales

1. **Declarativo**: Tú describes *qué* quieres ver en pantalla según el estado actual, y React se encarga de que el DOM coincida con esa descripción.
2. **Basado en Componentes**: Encapsulas lógica y diseño en piezas autónomas.
3. **Unidireccionalidad**: El flujo de datos siempre va de padres a hijos (vía props), lo que hace que el flujo sea predecible.

### Virtual DOM: La Magia detrás de la Velocidad

Actualizar el DOM real del navegador es una operación costosa. React soluciona esto mediante el **Virtual DOM**:

1. **Memoria**: React mantiene una copia ligera del DOM en memoria.
2. **Reconciliación (Diffing)**: Cuando el estado cambia, React genera un nuevo Virtual DOM y lo compara con el anterior.
3. **Parcheo Inteligente**: Solo envía al DOM real los cambios mínimos necesarios.

!!! tip "Rendimiento"
    Gracias a este proceso, React puede realizar cientos de actualizaciones por segundo sin que la aplicación se sienta lenta.
