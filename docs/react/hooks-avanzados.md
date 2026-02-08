# Hooks Avanzados

A medida que tu aplicación crece, necesitarás herramientas más sofisticadas para gestionar el estado global, el rendimiento y las referencias.

## useContext: Adiós al "Prop Drilling"

El **Prop Drilling** ocurre cuando pasas props a través de muchos niveles de componentes que no necesitan esos datos, solo para llegar a un hijo lejano. `useContext` soluciona esto creando un "túnel" directo.

```javascript
// 1. Creamos el contexto
const ThemeContext = createContext('light');

// 2. En el componente padre (Provider)
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// 3. En cualquier hijo lejano
const theme = useContext(ThemeContext);
```

## useReducer: Estado con Esteroides

Cuando tienes un estado con muchos campos que dependen unos de otros, o una lógica de actualización compleja, `useReducer` es preferible a muchos `useState`.

```javascript
const [state, dispatch] = useReducer(reducer, initialState);

// Ejemplo de dispatch
dispatch({ type: 'incrementar_edad' });
```

!!! info "Patrón Redux"
    `useReducer` sigue el patrón de "Reducción" (acción -> reducer -> nuevo estado), muy similar a cómo funciona Redux.

## useRef: Más allá del DOM

`useRef` devuelve un objeto mutable cuya propiedad `.current` persiste durante todo el ciclo de vida del componente.

1.  **Acceso al DOM**: Como enfocar un input o medir un elemento.
2.  **Variables persistentes**: Guardar valores que no deben disparar un re-renderizado al cambiar (como un timer ID).

```javascript
const inputRef = useRef();
const handleClick = () => inputRef.current.focus();

return <input ref={inputRef} />;
```

## Optimización: El Antes y el Después

### React Compiler: La Revolución de React 19

!!! success "React Compiler (React 19+)"
    Desde **React 19**, existe un **compilador automático** que analiza tu código y aplica optimizaciones de memoización de forma inteligente, sin que tengas que escribir `useMemo`, `useCallback` o `React.memo` manualmente.

El React Compiler transforma tu código durante el build para que React solo vuelva a renderizar lo estrictamente necesario. Esto significa que **en la mayoría de los casos ya no tendrás que preocuparte por optimizar manualmente**.

=== "Con React Compiler (Moderno)"
    ```javascript
    // ¡No necesitas useMemo ni useCallback!
    function SearchResults({ query }) {
      const results = heavySearch(query); // El compilador lo optimiza
      const handleClick = () => console.log(results); // Auto-memoizado
      
      return <ResultsList items={results} onClick={handleClick} />;
    }
    ```

=== "Sin React Compiler (Tradicional)"
    ```javascript
    function SearchResults({ query }) {
      // Tenías que memorizarlo manualmente
      const results = useMemo(() => heavySearch(query), [query]);
      const handleClick = useCallback(() => {
        console.log(results);
      }, [results]);
      
      return <ResultsList items={results} onClick={handleClick} />;
    }
    ```

### ¿Cuándo Seguir Usando `useMemo` y `useCallback`?

Aunque el compilador es muy potente, hay casos donde aún tiene sentido la memoización manual:

| Hook | Qué hace | Cuándo usarlo HOY |
| :--- | :--- | :--- |
| **`useMemo`** | Memoriza un **valor** calculado. | Cálculos **extremadamente costosos** que el compilador no puede optimizar (ej: procesamiento de imágenes). |
| **`useCallback`** | Memoriza una **función**. | Cuando pasas callbacks a librerías externas que comparan referencias (ej: APIs de mapas). |

!!! warning "Consejo de Transición"
    Si tu proyecto aún usa React 18 o anterior, `useMemo` y `useCallback` siguen siendo esenciales. Pero si estás en React 19+, úsalos solo si detectas problemas de rendimiento con las herramientas de React DevTools.

### React.memo: Memoización de Componentes

`React.memo` es un **Higher-Order Component (HOC)** que envuelve un componente para evitar que se re-renderice si sus props no han cambiado.

```javascript
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  console.log("Renderizado!");
  return <div>{/* Renderizado costoso */}</div>;
});

// Ahora solo se renderiza cuando 'data' cambia realmente
<ExpensiveComponent data={items} />
```

#### Comparación Personalizada

Por defecto, `React.memo` hace una comparación superficial de las props. Puedes personalizar esta lógica:

```javascript
const MyComponent = React.memo(
  ({ user }) => <div>{user.name}</div>,
  (prevProps, nextProps) => {
    // Retorna true si las props son iguales (NO re-renderizar)
    // Retorna false si las props son diferentes (SÍ re-renderizar)
    return prevProps.user.id === nextProps.user.id;
  }
);
```

!!! tip "Cuándo Usar React.memo"
    - Componentes que renderizan con frecuencia con las mismas props.
    - Componentes "pesados" que procesan muchas visualizaciones (listas grandes, gráficos).
    - Componentes puros que dependen únicamente de sus props.

!!! danger "Cuándo NO Usar React.memo"
    - Componentes pequeños y rápidos (el overhead de la comparación puede ser peor que re-renderizar).
    - Cuando las props cambian constantemente (la memoización no aportará nada).
    - En proyectos con React 19+ donde el compilador ya optimiza automáticamente.
