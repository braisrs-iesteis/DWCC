# Formularios en React

Los formularios son una de las partes más complejas de cualquier aplicación web. En React, hay dos enfoques principales para gestionarlos: **componentes controlados** y **componentes no controlados**.

!!! abstract "Concepto Clave"
    En React, el estado del formulario debe vivir en el componente. React se convierte en la "fuente única de verdad" para el valor del input.

## Componentes Controlados (Recomendado)

Un **componente controlado** es aquel cuyo valor está controlado por React a través del estado.

### Input Simple

```javascript
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del form
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}
```

!!! tip "Ventajas de los Componentes Controlados"
    - Tienes acceso inmediato al valor del input en cualquier momento.
    - Puedes validar mientras el usuario escribe.
    - Facilita la lógica condicional (deshabilitar botones, mostrar mensajes).

### Múltiples Inputs: El Patrón del Objeto

Cuando tienes muchos campos, mantener un `useState` por cada campo es tedioso. La solución: **un solo estado como objeto**.

```javascript
function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value // Usa el atributo 'name' del input como key
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="username" 
        value={formData.username} 
        onChange={handleChange} 
        placeholder="Usuario" 
      />
      <input 
        name="email" 
        type="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="Email" 
      />
      <input 
        name="password" 
        type="password" 
        value={formData.password} 
        onChange={handleChange} 
        placeholder="Contraseña" 
      />
      <input 
        name="age" 
        type="number" 
        value={formData.age} 
        onChange={handleChange} 
        placeholder="Edad" 
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}
```

## Tipos Especiales de Inputs

### Checkboxes

#### Checkbox Simple

```javascript
const [acceptTerms, setAcceptTerms] = useState(false);

<label>
  <input
    type="checkbox"
    checked={acceptTerms}
    onChange={(e) => setAcceptTerms(e.target.checked)} // ¡Nota: .checked, no .value!
  />
  Acepto los términos y condiciones
</label>
```

#### Múltiples Checkboxes (Array)

Cuando tienes varios checkboxes relacionados (ej: hobbies, intereses), necesitas manejarlos como un array.

```javascript
function HobbiesForm() {
  const [hobbies, setHobbies] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      // Añadir al array
      setHobbies([...hobbies, value]);
    } else {
      // Quitar del array
      setHobbies(hobbies.filter(hobby => hobby !== value));
    }
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          value="reading"
          checked={hobbies.includes('reading')}
          onChange={handleCheckboxChange}
        />
        Lectura
      </label>
      <label>
        <input
          type="checkbox"
          value="sports"
          checked={hobbies.includes('sports')}
          onChange={handleCheckboxChange}
        />
        Deportes
      </label>
      <label>
        <input
          type="checkbox"
          value="music"
          checked={hobbies.includes('music')}
          onChange={handleCheckboxChange}
        />
        Música
      </label>
      
      <p>Hobbies seleccionados: {hobbies.join(', ')}</p>
    </div>
  );
}
```

### Radio Buttons

```javascript
const [plan, setPlan] = useState('basic');

<label>
  <input
    type="radio"
    name="plan"
    value="basic"
    checked={plan === 'basic'}
    onChange={(e) => setPlan(e.target.value)}
  />
  Básico
</label>
<label>
  <input
    type="radio"
    name="plan"
    value="premium"
    checked={plan === 'premium'}
    onChange={(e) => setPlan(e.target.value)}
  />
  Premium
</label>
```

### Select (Dropdown)

```javascript
const [country, setCountry] = useState('es');

<select value={country} onChange={(e) => setCountry(e.target.value)}>
  <option value="es">España</option>
  <option value="mx">México</option>
  <option value="ar">Argentina</option>
</select>
```

### Textarea

```javascript
const [bio, setBio] = useState('');

<textarea
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  placeholder="Cuéntanos sobre ti..."
  rows={5}
/>
```

### File Upload

La subida de archivos requiere un enfoque especial porque los archivos no se pueden controlar mediante `value`.

```javascript
function FileUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setSelectedFile(file);
      
      // Crear preview para imágenes
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) return;

    // Crear FormData para enviar el archivo
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    // Enviar con fetch
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*" // Solo imágenes
        onChange={handleFileChange}
      />
      
      {preview && <img src={preview} alt="Preview" style={{ maxWidth: '200px' }} />}
      
      {selectedFile && (
        <div>
          <p>Archivo: {selectedFile.name}</p>
          <p>Tamaño: {(selectedFile.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
      
      <button type="submit" disabled={!selectedFile}>
        Subir archivo
      </button>
    </form>
  );
}
```

!!! tip "Múltiples Archivos"
    Para permitir múltiples archivos, usa el input de tipo file con el atributo `multiple` y accede a `e.target.files` como un array-like object.

## Validación de Formularios


### Validación en Tiempo Real

```javascript
function EmailForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Validación simple de email
    if (value && !value.includes('@')) {
      setError('El email debe contener @');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <input 
        type="email" 
        value={email} 
        onChange={handleChange}
        className={error ? 'input-error' : ''}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

### Validación al Enviar

```javascript
function SignupForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.email.includes('@')) {
      newErrors.email = 'Email inválido';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Si no hay errores, procesar el formulario
    console.log('Formulario válido:', formData);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      {errors.email && <span className="error">{errors.email}</span>}
      
      <input 
        type="password" 
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
      />
      {errors.password && <span className="error">{errors.password}</span>}
      
      <button type="submit">Enviar</button>
    </form>
  );
}
```

## Validación HTML5 Nativa

HTML5 ofrece atributos de validación nativos que funcionan perfectamente con React. Esto te permite aprovechar la validación del navegador sin escribir JavaScript adicional.

### Atributos de Validación HTML5

```javascript
function NativeValidationForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    age: '',
    website: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario válido:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* required: campo obligatorio */}
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Email obligatorio"
      />

      {/* minLength/maxLength: longitud mínima y máxima */}
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        minLength={8}
        maxLength={20}
        placeholder="Contraseña (8-20 caracteres)"
      />

      {/* min/max: valores numéricos */}
      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        required
        min={18}
        max={99}
        placeholder="Edad (18-99)"
      />

      {/* pattern: expresión regular */}
      <input
        name="website"
        type="url"
        value={formData.website}
        onChange={handleChange}
        pattern="https://.*"
        placeholder="Website (debe empezar con https://)"
      />

      <button type="submit">Enviar</button>
    </form>
  );
}
```

!!! info "Validación Automática"
    Cuando el usuario intenta enviar el formulario, el navegador valida automáticamente todos los campos y muestra mensajes de error nativos. No necesitas escribir código JavaScript adicional.

### Mensajes de Error Personalizados

Puedes personalizar los mensajes de error usando el evento `onInvalid` y el método `setCustomValidity`.

```javascript
function CustomMessagesForm() {
  const emailRef = useRef();

  const handleInvalidEmail = (e) => {
    const input = e.target;
    
    if (input.validity.valueMissing) {
      input.setCustomValidity('Por favor, introduce tu email');
    } else if (input.validity.typeMismatch) {
      input.setCustomValidity('Introduce un email válido (ejemplo@dominio.com)');
    } else {
      input.setCustomValidity(''); // Limpia el mensaje si es válido
    }
  };

  const handleInput = (e) => {
    // Importante: limpiar el mensaje cuando el usuario escribe
    e.target.setCustomValidity('');
  };

  return (
    <form>
      <input
        ref={emailRef}
        type="email"
        required
        onInvalid={handleInvalidEmail}
        onInput={handleInput}
        placeholder="Email"
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Constraint Validation API

Puedes acceder programáticamente al estado de validación de un input con la API de validación de restricciones.

```javascript
function ValidationAPIExample() {
  const passwordRef = useRef();
  const [validationMessage, setValidationMessage] = useState('');

  const handleChange = () => {
    const input = passwordRef.current;
    
    if (!input.validity.valid) {
      // input.validity contiene propiedades booleanas:
      // - valueMissing: campo requerido vacío
      // - typeMismatch: tipo incorrecto (email, url, etc.)
      // - patternMismatch: no coincide con el patrón
      // - tooShort / tooLong: longitud incorrecta
      // - rangeUnderflow / rangeOverflow: número fuera de rango
      
      setValidationMessage(input.validationMessage);
    } else {
      setValidationMessage('');
    }
  };

  return (
    <div>
      <input
        ref={passwordRef}
        type="password"
        required
        minLength={8}
        onChange={handleChange}
        placeholder="Contraseña"
      />
      {validationMessage && (
        <span className="error">{validationMessage}</span>
      )}
    </div>
  );
}
```

### Estilos CSS para Estados de Validación

Los navegadores modernos ofrecen pseudo-clases CSS para estilizar inputs según su estado de validación.

```css
/* Input válido */
input:valid {
  border-color: green;
}

/* Input inválido (solo después de interactuar) */
input:invalid:not(:focus):not(:placeholder-shown) {
  border-color: red;
}

/* Campo requerido */
input:required {
  border-left: 3px solid orange;
}

/* Campo opcional */
input:optional {
  border-left: 3px solid lightgray;
}
```

### Deshabilitar la Validación Nativa

Si quieres usar validación personalizada en JavaScript pero mantener los atributos HTML5 para semántica, puedes deshabilitar la validación del navegador:

```javascript
<form noValidate onSubmit={handleSubmit}>
  {/* Los atributos como 'required' siguen estando, 
      pero el navegador no mostrará mensajes automáticos */}
  <input type="email" required />
</form>
```

!!! tip "Cuándo Usar Validación Nativa"
    - Formularios simples sin lógica compleja.
    - Quieres aprovechar la accesibilidad nativa del navegador.
    - No necesitas validación personalizada en tiempo real.

!!! warning "Limitaciones"
    - Los estilos de los mensajes de error son difíciles de personalizar (varían por navegador).
    - No funciona bien con validación asíncrona (ej: comprobar si un email ya existe).
    - Algunos navegadores antiguos tienen soporte limitado.

## Componentes No Controlados (con Refs)


En los **componentes no controlados**, el DOM retiene el estado del input, y usamos `useRef` para acceder a su valor solo cuando lo necesitamos.

```javascript
function UncontrolledForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" ref={emailRef} defaultValue="" />
      <input type="password" ref={passwordRef} defaultValue="" />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

!!! warning "Cuándo Usar Componentes No Controlados"
    Solo en casos muy específicos, como formularios simples de una sola vez o cuando integras React con librerías de terceros que manejan el DOM directamente.

## Librerías Modernas para Formularios

Gestionar formularios complejos con validación, errores y estado puede volverse muy repetitivo. Existen librerías que simplifican este trabajo:

### React Hook Form (Recomendado)

Es la librería más popular y ligera para formularios en React. Minimiza los re-renderizados y usa componentes no controlados internamente.

```bash
npm install react-hook-form
```

```javascript
import { useForm } from 'react-hook-form';

function ModernForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); // { email: '...', password: '...' }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register('email', { 
          required: 'Email requerido',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email inválido'
          }
        })} 
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input 
        type="password"
        {...register('password', { 
          required: 'Contraseña requerida',
          minLength: {
            value: 8,
            message: 'Mínimo 8 caracteres'
          }
        })} 
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Enviar</button>
    </form>
  );
}
```

!!! success "Ventajas de React Hook Form"
    - **Rendimiento**: No causa re-renderizados en cada tecla pulsada.
    - **Validación declarativa**: Reglas claras y concisas.
    - **Integración fácil**: Se puede combinar con librerías de validación como Zod o Yup.
    - **TypeScript**: Soporte excelente para tipado.

### Formik (Alternativa)

Otra librería muy popular, aunque algo más verbosa que React Hook Form.

```bash
npm install formik
```

## Resumen de Mejores Prácticas

| Escenario | Solución Recomendada |
| :--- | :--- |
| Formulario pequeño (2-3 campos) | Componentes controlados con `useState` |
| Formulario mediano (4-10 campos) | Objeto de estado + función genérica `handleChange` |
| Formulario simple con validación básica | **Validación HTML5 nativa** |
| Formulario complejo (validaciones, async) | **React Hook Form** + Zod/Yup |
| File upload | `useState` + `FileReader` API para preview |
| Necesitas acceder al DOM directamente | Componentes no controlados con `useRef` |

!!! tip "Regla de Oro"
    Empieza simple con `useState`. Si el formulario crece y se vuelve complicado, migra a React Hook Form. No optimices prematuramente.

## Patrones Avanzados

### Debouncing en Validación

Para evitar validar en cada tecla pulsada (mejora de rendimiento), puedes usar **debouncing**.

```javascript
import { useState, useEffect } from 'react';

function SearchForm() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce: espera 500ms después de que el usuario deje de escribir
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timeoutId); // Limpieza
  }, [query]);

  // Solo valida cuando debouncedQuery cambia
  useEffect(() => {
    if (debouncedQuery) {
      console.log('Validando:', debouncedQuery);
      // Aquí harías la validación o petición API
    }
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Buscar..."
    />
  );
}
```

### Reset de Formularios

```javascript
function ResetableForm() {
  const initialState = { name: '', email: '' };
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Resetear el formulario después del envío
    setFormData(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <button type="submit">Enviar</button>
      <button type="button" onClick={() => setFormData(initialState)}>
        Limpiar
      </button>
    </form>
  );
}
```
