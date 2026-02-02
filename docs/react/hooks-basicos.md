# Hooks Básicos: useState y useEffect

Los Hooks son funciones especiales que te permiten "engancharte" a las características de React desde componentes funcionales.

!!! failure "Reglas de los Hooks"
    1.  **Solo llámalos en el nivel superior**: No los uses dentro de bucles, condiciones o funciones anidadas.
    2.  **Solo llámalos en componentes de React**: O en tus propios Custom Hooks. No en funciones normales de JavaScript.

## useState: El Corazón del Estado

El estado permite que los componentes "recuerden" información y reaccionen a ella.

```javascript
import { useState } from 'react';

function Counter() {
  // const [valorActual, funcionParaActualizar] = useState(valorInicial);
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Has hecho clic {count} veces</p>
      <button onClick={() => setCount(count + 1)}>
        Aumentar
      </button>
    </div>
  );
}
```

!!! tip "Actualizaciones basadas en el estado anterior"
    Si tu nuevo estado depende del anterior, usa una función de actualización para evitar errores de sincronización:
    `setCount(prevCount => prevCount + 1)`

## useEffect: Sincronización con el Mundo

`useEffect` te permite ejecutar código en respuesta a cambios en el componente (efectos secundarios).

```javascript
useEffect(() => {
  // Código que se ejecuta (ej: peticiones API, suscripciones)
  console.log("El componente se ha montado o actualizado");

  return () => {
    // Función de limpieza (opcional)
    console.log("Limpieza antes de que el componente desaparezca");
  };
}, [dependencias]);
```

### El Array de Dependencias
Es la parte más crucial de `useEffect`. Define **cuándo** se debe volver a ejecutar el efecto:

| Dependencia | Comportamiento |
| :--- | :--- |
| **Sin array** `useEffect(() => ...)` | Se ejecuta en **cada renderizado**. (Poco común/peligroso) |
| **Array vacío** `useEffect(() => ..., [])` | Se ejecuta **solo una vez**, cuando el componente se monta. |
| **Con variables** `useEffect(() => ..., [id])` | Se ejecuta en el montaje y **cada vez que `id` cambie**. |

!!! warning "Cuidado con los bucles infinitos"
    Si dentro de un `useEffect` actualizas un estado que está en su propio array de dependencias, crearás un bucle infinito. ¡React te avisará en la consola!
