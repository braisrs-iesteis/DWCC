# Custom Hooks: Tu Propio Superpoder

Un **Custom Hook** es simplemente una función de JavaScript que empieza por `use` y que puede llamar a otros Hooks. Te permiten extraer la lógica de un componente para que pueda ser reutilizada en otros.

!!! success "Ventaja Principal"
    Hacen que tus componentes sean más pequeños, legibles y fáciles de testear al separar la lógica de negocio de la UI.

## Ejemplo 1: `useFetch`

Imagina que en varios componentes necesitas pedir datos a una API. En lugar de repetir `useState` y `useEffect`, creamos un hook.

```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Así de fácil se usa ahora:
const { data, loading } = useFetch('https://api.ejemplo.com/users');
```

## Ejemplo 2: `useForm`

Gestionar formularios puede ser tedioso. Un hook puede simplificar la captura de datos.

```javascript
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => setValues(initialValues);

  return [values, handleChange, resetForm];
}

// Uso:
const [form, handleInput, reset] = useForm({ email: '', password: '' });
```

!!! tip "Composición de Hooks"
    Puedes crear hooks que usen otros hooks (incluso otros custom hooks). La lógica de React es totalmente modular.
    Por ejemplo, un `useAuth` podría usar internamente `useState`, `useEffect` y un `useLocalStorage`.
