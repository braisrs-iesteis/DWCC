# Componentes y Props

En React, la interfaz de usuario se construye a partir de pequeñas piezas independientes y reutilizables llamadas **componentes**. 

!!! abstract "Concepto Clave"
    Un componente es esencialmente una función de JavaScript que recibe una entrada (llamada **props**) y devuelve un elemento que describe lo que debe aparecer en pantalla.

## Tipos de Componentes

=== "Funcionales (Recomendado)"
    Son simples funciones de JavaScript. Es el estándar moderno de React.
    ```javascript
    const Welcome = ({ name }) => {
      return <h1>Hola, {name}</h1>;
    };
    ```

=== "Clase (Legacy)"
    Basados en clases de ES6. Se consideran antiguos pero siguen funcionando. No se recomiendan para proyectos nuevos.
    ```javascript
    class Welcome extends React.Component {
      render() {
        return <h1>Hola, {this.props.name}</h1>;
      }
    }
    ```

## Props: Comunicación entre Componentes

Las **props** (propiedades) son el mecanismo para pasar datos de un componente padre a un componente hijo.

!!! warning "Importante"
    Las props son **inmutables**. Un componente nunca debe modificar sus propias props. Son de "solo lectura".

```javascript
function UserCard({ name, email, isPremium }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{email}</p>
      {isPremium && <span className="badge">⭐ Premium</span>}
    </div>
  );
}

// Uso del componente
<UserCard 
  name="Ana García" 
  email="ana@example.com" 
  isPremium={true} 
/>
```

### Flujo Unidireccional
El flujo de datos en React es **unidireccional** (top-down). La información siempre viaja del padre al hijo a través de las props. Si el hijo necesita comunicar algo al padre, se suelen pasar funciones como props (callbacks).

## Composición con `children`

A veces no sabemos de antemano qué contenido va a tener un componente. Para eso usamos la prop especial `children`, que permite "inyectar" contenido dentro de las etiquetas del componente.

```javascript
function Modal({ children, title }) {
  return (
    <div className="modal">
      <div className="modal-header">{title}</div>
      <div className="modal-content">
        {children} {/* Aquí se renderizará lo que envuelvas */}
      </div>
    </div>
  );
}

// Uso
<Modal title="Confirmación">
  <p>¿Estás seguro de que quieres borrar esto?</p>
  <button>Sí, borrar</button>
</Modal>
```
