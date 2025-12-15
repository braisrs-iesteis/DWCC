# React

## Introducción

React es una biblioteca de JavaScript para construir interfaces de usuario, desarrollada y mantenida por Facebook (Meta). Desde su lanzamiento en 2013, se ha convertido en una de las herramientas más populares para el desarrollo frontend moderno.

## Historia del Desarrollo Frontend

### La Evolución de las Interfaces Web

#### 1. Era Estática (1990s)

- **HTML + CSS básico**: Páginas web estáticas sin interactividad
- Contenido fijo que requería recargar toda la página para mostrar cambios
- Experiencia de usuario limitada

#### 2. Era de jQuery (2006-2015)

```javascript
// Manipulación DOM tradicional con jQuery
$("#button").click(function () {
  $("#message").text("¡Hola Mundo!");
});
```

- Facilitó la manipulación del DOM
- Resolvió problemas de compatibilidad entre navegadores
- Pero el código se volvía difícil de mantener en aplicaciones grandes

#### 3. Era de los Frameworks MVC (2010+)

- **Backbone.js**, **Angular.js**: Estructura organizada con patrones MVC/MVVM
- Separación de responsabilidades
- Two-way data binding (enlace bidireccional de datos)
- Todavía con manipulación directa del DOM

#### 4. Era de las Bibliotecas Reactivas (2013+)

- **React**, **Vue**, **Angular 2+**: Arquitectura basada en componentes
- Virtual DOM para optimización
- Flujo de datos unidireccional
- Enfoque declarativo vs imperativo

### El Problema que React Resolvió

Antes de React, actualizar la interfaz de usuario era:

```javascript
// Enfoque imperativo (jQuery)
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

Con React, se volvió:

```javascript
// Enfoque declarativo (React)
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

#### 1. **Declarativo**

Describes _qué_ quieres mostrar, no _cómo_ hacerlo.

```javascript
// Imperativo - describes el "cómo"
const element = document.createElement("h1");
element.className = "greeting";
element.textContent = "Hola Mundo";
document.body.appendChild(element);

// Declarativo - describes el "qué"
const element = <h1 className="greeting">Hola Mundo</h1>;
```

#### 2. **Basado en Componentes**

La UI se divide en piezas reutilizables e independientes.

```javascript
function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
```

#### 3. **"Learn Once, Write Anywhere"**

El mismo conocimiento de React se puede usar para:

- Aplicaciones web (React DOM)
- Aplicaciones móviles (React Native)
- Aplicaciones de escritorio (Electron + React)
- VR (React 360)

### Virtual DOM

React utiliza una representación virtual del DOM para optimizar las actualizaciones:

1. **Estado cambia** → React actualiza el Virtual DOM
2. **Diffing** → Compara el Virtual DOM anterior con el nuevo
3. **Reconciliación** → Actualiza solo lo necesario en el DOM real

```javascript
// React optimiza automáticamente estas actualizaciones
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
}
```

## Componentes Web

### Tipos de Componentes

#### 1. Componentes Funcionales

```javascript
// Componente funcional básico
function Welcome(props) {
  return <h1>Hola, {props.name}</h1>;
}

// Con arrow function
const Welcome = ({ name }) => {
  return <h1>Hola, {name}</h1>;
};
```

#### 2. Componentes de Clase (Legacy)

```javascript
// Estilo antiguo, menos común ahora
class Welcome extends React.Component {
  render() {
    return <h1>Hola, {this.props.name}</h1>;
  }
}
```

### Props: Comunicación entre Componentes

Las **props** (propiedades) son argumentos que se pasan a los componentes.

```javascript
function UserCard({ name, email, avatar, isPremium }) {
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
      {isPremium && <span className="badge">⭐ Premium</span>}
    </div>
  );
}

// Uso
<UserCard
  name="Ana García"
  email="ana@example.com"
  avatar="/images/ana.jpg"
  isPremium={true}
/>;
```

**Características de las Props:**

- Son **inmutables** (read-only)
- Flujo de datos **unidireccional** (de padre a hijo)
- Pueden ser cualquier tipo de dato JavaScript

### Children: Composición de Componentes

```javascript
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">{children}</div>
    </div>
  );
}

// Uso
<Card title="Mi Tarjeta">
  <p>Este es el contenido</p>
  <button>Acción</button>
</Card>;
```

## JSX: JavaScript XML

JSX es una extensión de sintaxis para JavaScript que permite escribir HTML en JavaScript.

### Sintaxis Básica

```javascript
// JSX
const element = <h1 className="title">Hola Mundo</h1>;

// Se compila a JavaScript puro
const element = React.createElement("h1", { className: "title" }, "Hola Mundo");
```

### Expresiones en JSX

```javascript
function Greeting({ name, timeOfDay }) {
  const message = `Buen${timeOfDay === "morning" ? "os días" : "as tardes"}`;

  return (
    <div>
      <h1>
        {message}, {name}!
      </h1>
      <p>Hoy es {new Date().toLocaleDateString()}</p>
      <p>2 + 2 = {2 + 2}</p>
    </div>
  );
}
```

### Renderizado Condicional

```javascript
function LoginButton({ isLoggedIn, user }) {
  // Con if-else
  if (isLoggedIn) {
    return <button>Cerrar Sesión</button>;
  }
  return <button>Iniciar Sesión</button>;

  // Con operador ternario
  return (
    <div>
      {isLoggedIn ? (
        <span>Bienvenido, {user.name}</span>
      ) : (
        <span>Por favor, inicia sesión</span>
      )}
    </div>
  );

  // Con operador &&
  return <div>{isLoggedIn && <span>Sesión activa</span>}</div>;
}
```

### Renderizado de Listas

```javascript
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input type="checkbox" checked={todo.completed} />
          <span>{todo.text}</span>
        </li>
      ))}
    </ul>
  );
}
```

⚠️ **Importante**: Siempre usa una `key` única cuando renderices listas.

## Hooks: La Revolución de React

Los **Hooks** (introducidos en React 16.8, 2019) permiten usar estado y otras características de React en componentes funcionales.

### ¿Por qué Hooks?

**Antes de Hooks:**

- Componentes funcionales eran "tontos" (solo presentacionales)
- Componentes de clase para lógica y estado
- Código difícil de reutilizar
- Confusión con `this` en JavaScript

**Con Hooks:**

- Componentes funcionales con todas las capacidades
- Lógica reutilizable fácilmente
- Código más limpio y legible

### useState: Gestión del Estado

```javascript
import { useState } from "react";

function Counter() {
  // Declaración del estado
  const [count, setCount] = useState(0);

  // count: valor actual
  // setCount: función para actualizar el estado
  // 0: valor inicial

  return (
    <div>
      <p>Has hecho clic {count} veces</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Incrementar</button>
      <button onClick={() => setCount(0)}>Reiniciar</button>
    </div>
  );
}
```

**Estado con objetos:**

```javascript
function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
    </form>
  );
}
```

### useEffect: Efectos Secundarios

```javascript
import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Se ejecuta después del renderizado
  useEffect(() => {
    // Función de efecto
    async function fetchUser() {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    }

    fetchUser();

    // Función de limpieza (cleanup)
    return () => {
      // Cancelar peticiones, limpiar timers, etc.
    };
  }, [userId]); // Dependencias: se re-ejecuta si userId cambia

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

**Casos de uso de useEffect:**

- Peticiones HTTP
- Suscripciones (WebSockets, eventos)
- Timers (setTimeout, setInterval)
- Manipulación directa del DOM
- Sincronización con sistemas externos

**Dependencias:**

```javascript
// Se ejecuta solo una vez (al montar)
useEffect(() => {
  console.log("Componente montado");
}, []);

// Se ejecuta en cada render
useEffect(() => {
  console.log("Cada render");
});

// Se ejecuta cuando cambia 'count'
useEffect(() => {
  console.log("Count cambió:", count);
}, [count]);

// Se ejecuta cuando cambia 'a' o 'b'
useEffect(() => {
  console.log("a o b cambió");
}, [a, b]);
```

### useContext: Contexto Global

Permite compartir datos sin pasar props manualmente en cada nivel.

```javascript
import { createContext, useContext, useState } from "react";

// 1. Crear el contexto
const ThemeContext = createContext();

// 2. Proveedor del contexto
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Usar el contexto
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className={theme} onClick={toggleTheme}>
      Tema: {theme}
    </button>
  );
}

// 4. Uso en la aplicación
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

### useRef: Referencias

Permite acceder directamente a elementos DOM o mantener valores mutables.

```javascript
import { useRef, useEffect } from "react";

function InputFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Enfocar el input al montar
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}

// Mantener valores sin re-renderizar
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>Tiempo: {count}s</p>
      <button onClick={startTimer}>Iniciar</button>
      <button onClick={stopTimer}>Detener</button>
    </div>
  );
}
```

### useMemo: Memorización de Valores

Optimiza cálculos costosos memorizando resultados.

```javascript
import { useMemo, useState } from "react";

function ExpensiveComponent({ numbers }) {
  const [filter, setFilter] = useState("");

  // Solo recalcula cuando 'numbers' o 'filter' cambian
  const filteredAndSorted = useMemo(() => {
    console.log("Calculando...");
    return numbers
      .filter((n) => n.toString().includes(filter))
      .sort((a, b) => a - b);
  }, [numbers, filter]);

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filtrar números"
      />
      <ul>
        {filteredAndSorted.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  );
}
```

### useCallback: Memorización de Funciones

Memoriza funciones para evitar re-creaciones innecesarias.

```javascript
import { useCallback, useState } from "react";

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(false);

  // Sin useCallback, se crearía una nueva función en cada render
  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []); // No depende de nada, nunca cambia

  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onIncrement={increment} />
      <button onClick={() => setOtherState(!otherState)}>Toggle</button>
    </div>
  );
}
```

### useReducer: Estado Complejo

Para gestionar estado complejo con lógica avanzada.

```javascript
import { useReducer } from "react";

// Reducer: función pura que determina cómo cambia el estado
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: Date.now(), text: action.text, completed: false },
      ];
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState("");

  const addTodo = () => {
    dispatch({ type: "ADD", text: input });
    setInput("");
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Añadir</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: "TOGGLE", id: todo.id })}
            />
            <span>{todo.text}</span>
            <button onClick={() => dispatch({ type: "DELETE", id: todo.id })}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Custom Hooks: Reutilización de Lógica

Crea tus propios hooks para extraer lógica reutilizable.

```javascript
// Hook personalizado para fetch de datos
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Uso
function UserList() {
  const { data, loading, error } = useFetch("/api/users");

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Hook para localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Uso
function Settings() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  return (
    <button
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
    >
      Tema actual: {theme}
    </button>
  );
}
```

## Manejo de Eventos

```javascript
function EventExamples() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log("Click!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado");
  };

  const handleChange = (e) => {
    console.log("Valor:", e.target.value);
  };

  return (
    <div>
      {/* Eventos de ratón */}
      <button onClick={handleClick}>Click me</button>
      <div onDoubleClick={() => console.log("Doble click")}>Doble click</div>

      {/* Eventos de formulario */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          onFocus={() => console.log("Focus")}
          onBlur={() => console.log("Blur")}
        />
      </form>

      {/* Eventos de teclado */}
      <input
        onKeyDown={(e) => console.log("Key down:", e.key)}
        onKeyUp={(e) => console.log("Key up:", e.key)}
      />
    </div>
  );
}
```

## Mejores Prácticas

### 1. Composición sobre Herencia

```javascript
// ✅ Bueno: Composición
function Dashboard() {
  return (
    <Layout>
      <Sidebar />
      <MainContent>
        <Header />
        <Body />
      </MainContent>
    </Layout>
  );
}

// ❌ Evitar: Herencia profunda de clases
```

### 2. Mantén los Componentes Pequeños

```javascript
// ✅ Bueno: Componentes pequeños y enfocados
function UserCard({ user }) {
  return (
    <div className="card">
      <UserAvatar src={user.avatar} />
      <UserInfo name={user.name} email={user.email} />
      <UserActions userId={user.id} />
    </div>
  );
}

// ❌ Evitar: Componentes gigantes con demasiada lógica
```

### 3. Naming Conventions

```javascript
// Componentes: PascalCase
function UserProfile() {}

// Hooks: camelCase con prefijo 'use'
function useAuth() {}

// Eventos: handle + EventName
function handleClick() {}
function handleSubmit() {}

// Props booleanas: is/has + descripción
<Button isDisabled hasIcon />;
```

### 4. Destructuring de Props

```javascript
// ✅ Bueno: Destructuring claro
function UserCard({ name, email, avatar, isPremium }) {
  return <div>...</div>;
}

// ❌ Menos claro
function UserCard(props) {
  return <div>{props.name}...</div>;
}
```

### 5. Keys en Listas

```javascript
// ✅ Bueno: ID único como key
{
  users.map((user) => <UserCard key={user.id} user={user} />);
}

// ❌ Evitar: índice como key (puede causar bugs)
{
  users.map((user, index) => <UserCard key={index} user={user} />);
}
```

## Ecosistema React

### Herramientas y Frameworks

- **Create React App**: Bootstrap rápido de aplicaciones React
- **Vite**: Build tool moderno y rápido
- **Next.js**: Framework para React con SSR (Server-Side Rendering)
- **Gatsby**: Generador de sitios estáticos
- **React Native**: Apps móviles nativas con React

### Librerías Populares

- **React Router**: Navegación y routing
- **Redux / Zustand**: Gestión de estado global
- **React Query**: Gestión de estado del servidor
- **Formik / React Hook Form**: Manejo de formularios
- **Styled Components / Emotion**: CSS-in-JS
- **Material-UI / Chakra UI**: Librerías de componentes UI

## Conclusión

React ha revolucionado el desarrollo frontend con:

✅ **Componentización**: UI modular y reutilizable  
✅ **Declaratividad**: Código más legible y predecible  
✅ **Hooks**: Funcionalidad completa en componentes funcionales  
✅ **Ecosistema rico**: Miles de librerías y herramientas  
✅ **Comunidad activa**: Soporte y recursos abundantes  
✅ **Rendimiento**: Virtual DOM y optimizaciones inteligentes

React no es solo una biblioteca, es una nueva forma de pensar sobre las interfaces de usuario.

## Recursos Adicionales

- **Documentación oficial**: [react.dev](https://react.dev)
- **React Hooks**: [Hooks Reference](https://react.dev/reference/react)
- **Tutorial interactivo**: [React Tutorial](https://react.dev/learn/tutorial-tic-tac-toe)
- **Patrones de diseño**: [Patterns.dev](https://patterns.dev)
