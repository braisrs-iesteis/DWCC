# Eventos y Buenas Prácticas

## Manejo de Eventos en React

Los eventos en React se nombran usando **camelCase** (en lugar de lowercase) y se pasan como una función (en lugar de un string).

```javascript
// HTML Tradicional
// <button onclick="handleClick()">

// React
const handleClick = (e) => {
  e.preventDefault(); // Sigue siendo necesario para formularios/enlaces
  console.log("¡Click detectado!");
};

return <button onClick={handleClick}>Haz Click</button>;
```

!!! info "Eventos Sintéticos"
    React envuelve los eventos nativos del navegador en sus propios "Synthetic Events" para asegurar que funcionen exactamente igual en todos los navegadores.

## El Gran Patrón: "Lifting State Up"

Cuando dos componentes necesitan acceder al mismo estado, la solución en React es **subir el estado** al ancestro común más cercano.

1.  Mueves el `useState` al componente padre.
2.  Pasas el valor del estado al primer hijo vía props.
3.  Pasas la función para actualizar el estado al segundo hijo vía props.

```javascript
function Padre() {
  const [temperatura, setTemperatura] = useState(0);

  return (
    <>
      <Entrada temperatura={temperatura} onUpdate={setTemperatura} />
      <Verificador temperatura={temperatura} />
    </>
  );
}
```

## Buenas Prácticas de Arquitectura

### 1. Componentes "Tontos" vs "Listos"
- **Componentes de Presentación (Tontos)**: Solo reciben props y muestran UI. Son fáciles de reutilizar.
- **Componentes de Contenedor (Listos)**: Gestionan el estado, hacen peticiones API y pasan los datos a los hijos.

### 2. Estructura de Carpetas
No hay una regla fija, pero una estructura común es:
```text
src/
  components/  # Componentes reutilizables (Botón, Input)
  features/    # Módulos completos (Auth, Dashboard)
    UserProfile/
      UserProfile.jsx
      UserProfile.css
      useUserProfile.js # Hook específico
  hooks/       # Hooks globales (useFetch, useAuth)
  context/     # Contextos globales (ThemeContext)
```

### 3. Evitar el Estado Innecesario
Si un valor se puede calcular a partir de las props o de otro estado, **no lo guardes en el estado**. Calcúlalo directamente en el cuerpo de la función durante el renderizado.

!!! bug "Antipatrón"
    No guardes el mismo dato en varios estados diferentes. Mantén una única "Fuente de la Verdad" (Single Source of Truth).
