# JSX: JavaScript XML

JSX es una extensión de la sintaxis de JavaScript que se parece mucho a HTML, pero tiene todo el poder de JavaScript.

!!! quote "Recuerda"
    React no requiere usar JSX, pero es la forma estándar porque hace que el código sea mucho más legible y fácil de escribir.

## Reglas de Oro de JSX

Para escribir JSX correctamente, debes seguir estas reglas:

1.  **Devolver un solo elemento raíz**: Si tienes varios elementos, debes envolverlos en un solo contenedor (como un `div` o un Fragment `<>`).
2.  **Cerrar todas las etiquetas**: Incluso las que en HTML son "huérfanas" (como `<img>` o `<br>`), en JSX deben cerrarse: `<img />` o `<br />`.
3.  **camelCase para atributos**: En lugar de `class` usamos `className`, y en lugar de `onclick` usamos `onClick`.

## El Poder de las Llaves `{}`

Cualquier cosa dentro de llaves `{}` en JSX es tratada como JavaScript puro.

```javascript
const name = 'Mundo';
const element = <h1>Hola, {name}</h1>; // Resultado: Hola, Mundo

const user = { firstName: 'Ana', lastName: 'Pérez' };
const greeting = <h2>Bienvenida, {user.firstName + ' ' + user.lastName}</h2>;
```

## Renderizado Condicional

En JSX no podemos usar `if/else` directamente dentro del return, pero tenemos alternativas potentes:

=== "Operador Ternario"
    Ideal para mostrar una cosa u otra.
    ```javascript
    {isLoggedIn ? <LogoutButton /> : <LoginButton />}
    ```

=== "Operador Lógico &&"
    Ideal para mostrar algo solo si se cumple una condición.
    ```javascript
    {hasMessages && <NotificationBadge count={messages.length} />}
    ```

=== "Early Return"
    Si el componente no debe renderizar nada bajo ciertas condiciones.
    ```javascript
    if (!user) return null;
    return <div>...</div>;
    ```

## Fragmentos (`<>`)

A veces no queremos añadir un `div` extra al DOM solo para cumplir con la regla del "elemento raíz único". Para eso usamos los **Fragments**.

```javascript
function List() {
  return (
    <>
      <li>Elemento A</li>
      <li>Elemento B</li>
    </>
  );
}
```

## Renderizado de Listas

Para transformar una lista de datos en elementos visuales, usamos `.map()`. 

!!! bug "Cuidado con la `key`"
    Cada elemento de una lista debe tener una prop `key` única. React la usa para saber qué elementos han cambiado, se han movido o se han eliminado, optimizando el rendimiento.

```javascript
const users = [{id: 1, name: 'Ana'}, {id: 2, name: 'Luis'}];

return (
  <ul>
    {users.map(user => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>
);
```
