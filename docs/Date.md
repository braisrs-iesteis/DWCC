# Date en JavaScript

## Introducción

El objeto `Date` es la manera nativa de JavaScript para trabajar con fechas y horas. Existe desde los inicios del lenguaje y, aunque tiene limitaciones conocidas, sigue siendo ampliamente utilizado en aplicaciones JavaScript modernas.

!!! abstract "¿Qué es Date?"
    `Date` es un objeto incorporado en JavaScript que representa un único momento en el tiempo en un formato independiente de la plataforma. Internamente almacena un número: los milisegundos desde el 1 de enero de 1970 00:00:00 UTC (Unix Epoch).

!!! warning "Limitaciones de Date"
    El objeto `Date` tiene problemas conocidos:
    - **Mutabilidad**: Los métodos modifican el objeto original
    - **Meses base 0**: Enero es 0, Diciembre es 11 (¡confuso!)
    - **Zonas horarias complicadas**: Difícil de manejar
    - **API inconsistente**: Mezcla de métodos locales y UTC
    
    Por eso se está desarrollando [Temporal API](Temporal-API.md) como reemplazo moderno.

---

## Creación de Objetos Date

### Fecha y hora actual

```javascript
// Fecha y hora actual
const ahora = new Date();
console.log(ahora);
// Mon Feb 02 2026 22:46:29 GMT+0100 (hora estándar de Europa central)
```

### Desde timestamp (milisegundos)

```javascript
// Desde epoch (1 de enero de 1970)
const epoch = new Date(0);
console.log(epoch);
// Thu Jan 01 1970 01:00:00 GMT+0100

// Timestamp específico
const fecha = new Date(1697457600000);
console.log(fecha);
// Mon Oct 16 2023 14:00:00 GMT+0200
```

### Desde string

```javascript
// Formato ISO 8601 (RECOMENDADO)
const iso = new Date('2025-10-16T14:30:00');
console.log(iso);

// Otros formatos (menos confiables, varían por navegador)
const fecha1 = new Date('October 16, 2025 14:30:00');
const fecha2 = new Date('10/16/2025');
```

!!! danger "Cuidado con formatos de string"
    Diferentes navegadores pueden interpretar strings de fecha de manera diferente. **Siempre usa el formato ISO 8601** (`YYYY-MM-DDTHH:mm:ss`) para evitar inconsistencias.

### Desde componentes individuales

```javascript
// new Date(año, mes, día, hora, minutos, segundos, milisegundos)
// ⚠️ IMPORTANTE: Los meses van de 0 (enero) a 11 (diciembre)

const fecha = new Date(2025, 9, 16); // 16 de OCTUBRE de 2025
console.log(fecha);

// Con hora completa
const fechaHora = new Date(2025, 9, 16, 14, 30, 0, 0);
// 16 de octubre de 2025 a las 14:30:00

// Parámetros mínimos requeridos: año y mes
const minima = new Date(2025, 0); // 1 de enero de 2025
```

!!! warning "Meses base 0"
    ```javascript
    new Date(2025, 0, 1);  // Enero
    new Date(2025, 11, 25); // Diciembre (¡no mes 12!)
    ```

---

## Getters: Obtener Componentes

### Métodos locales (zona horaria del navegador)

```javascript
const fecha = new Date('2025-10-16T14:30:45');

// Fecha
console.log(fecha.getFullYear());  // 2025
console.log(fecha.getMonth());     // 9 (octubre, ¡base 0!)
console.log(fecha.getDate());      // 16 (día del mes)
console.log(fecha.getDay());       // 4 (jueves, 0=domingo, 6=sábado)

// Hora
console.log(fecha.getHours());     // 14
console.log(fecha.getMinutes());   // 30
console.log(fecha.getSeconds());   // 45
console.log(fecha.getMilliseconds()); // 0

// Timestamp
console.log(fecha.getTime());      // Milisegundos desde epoch
```

### Métodos UTC (hora universal coordinada)

```javascript
const fecha = new Date('2025-10-16T14:30:45');

console.log(fecha.getUTCFullYear());  // 2025
console.log(fecha.getUTCMonth());     // 9
console.log(fecha.getUTCDate());      // 16
console.log(fecha.getUTCHours());     // 12 (puede diferir por zona horaria)
console.log(fecha.getUTCMinutes());   // 30
console.log(fecha.getUTCSeconds());   // 45
```

### Información adicional

```javascript
const fecha = new Date();

// Desplazamiento de zona horaria en minutos
console.log(fecha.getTimezoneOffset());
// -60 (en España en invierno: UTC+1 = -60 minutos)

// Día de la semana
const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 
              'Jueves', 'Viernes', 'Sábado'];
console.log(dias[fecha.getDay()]);
```

---

## Setters: Modificar Componentes

!!! danger "⚠️ Los setters MUTAN el objeto original"
    ```javascript
    const fecha = new Date('2025-10-16');
    fecha.setMonth(11); // ¡Modifica fecha directamente!
    console.log(fecha); // Ahora es 16 de diciembre
    ```

### Métodos locales

```javascript
const fecha = new Date('2025-10-16T14:30:00');

// Modificar fecha
fecha.setFullYear(2026);
fecha.setMonth(0);        // Enero (base 0)
fecha.setDate(1);         // Día 1

// Modificar hora
fecha.setHours(9);
fecha.setMinutes(0);
fecha.setSeconds(0);
fecha.setMilliseconds(0);

console.log(fecha); // 2026-01-01T09:00:00
```

### Métodos UTC

```javascript
const fecha = new Date();

fecha.setUTCFullYear(2025);
fecha.setUTCMonth(9);
fecha.setUTCDate(16);
fecha.setUTCHours(12);
fecha.setUTCMinutes(0);
```

### Modificar desde timestamp

```javascript
const fecha = new Date();
fecha.setTime(1697457600000);
console.log(fecha); // Mon Oct 16 2023 14:00:00
```

---

## Formateo y Conversión a String

### Métodos básicos

```javascript
const fecha = new Date('2025-10-16T14:30:00');

// Representación completa
console.log(fecha.toString());
// 'Thu Oct 16 2025 14:30:00 GMT+0200 (hora de verano de Europa central)'

// Solo fecha
console.log(fecha.toDateString());
// 'Thu Oct 16 2025'

// Solo hora
console.log(fecha.toTimeString());
// '14:30:00 GMT+0200 (hora de verano de Europa central)'

// Formato ISO 8601
console.log(fecha.toISOString());
// '2025-10-16T12:30:00.000Z' (en UTC)

// Formato local del navegador
console.log(fecha.toLocaleString());
// '16/10/2025, 14:30:00' (varía según configuración)
```

### `toLocaleString()` con opciones

Formato personalizado según configuración regional.

```javascript
const fecha = new Date('2025-10-16T14:30:00');

// Formato español completo
console.log(fecha.toLocaleString('es-ES'));
// '16/10/2025, 14:30:00'

// Solo fecha
console.log(fecha.toLocaleDateString('es-ES'));
// '16/10/2025'

// Solo hora
console.log(fecha.toLocaleTimeString('es-ES'));
// '14:30:00'

// Con opciones personalizadas
console.log(fecha.toLocaleString('es-ES', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}));
// 'jueves, 16 de octubre de 2025, 14:30'

// Fecha corta
console.log(fecha.toLocaleDateString('es-ES', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}));
// '16/10/2025'

// Diferentes locales
console.log(fecha.toLocaleDateString('en-US'));  // '10/16/2025'
console.log(fecha.toLocaleDateString('en-GB'));  // '16/10/2025'
console.log(fecha.toLocaleDateString('ja-JP'));  // '2025/10/16'
```

### Opciones de `toLocaleString()`

```javascript
const opciones = {
  // Día de la semana
  weekday: 'narrow' | 'short' | 'long',
  // 'L' | 'Lun' | 'Lunes'
  
  // Año
  year: 'numeric' | '2-digit',
  // '2025' | '25'
  
  // Mes
  month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long',
  // '10' | '10' | 'O' | 'oct' | 'octubre'
  
  // Día
  day: 'numeric' | '2-digit',
  // '16' | '16'
  
  // Hora
  hour: 'numeric' | '2-digit',
  minute: 'numeric' | '2-digit',
  second: 'numeric' | '2-digit',
  
  // Formato de 12/24 horas
  hour12: true | false,
  
  // Zona horaria
  timeZoneName: 'short' | 'long'
};

const fecha = new Date('2025-10-16T14:30:00');
console.log(fecha.toLocaleString('es-ES', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
}));
// 'jueves, 16 de octubre de 2025, 14:30'
```

---

## Aritmética con Fechas

### Sumar/restar días, horas, etc.

```javascript
const fecha = new Date('2025-10-16');

// Sumar días
fecha.setDate(fecha.getDate() + 7);
console.log(fecha); // 23 de octubre

// Restar días
fecha.setDate(fecha.getDate() - 14);
console.log(fecha); // 9 de octubre

// Sumar meses
fecha.setMonth(fecha.getMonth() + 2);
console.log(fecha); // 9 de diciembre

// Sumar años
fecha.setFullYear(fecha.getFullYear() + 1);
console.log(fecha); // 9 de diciembre de 2026

// Sumar horas
fecha.setHours(fecha.getHours() + 3);

// Sumar minutos
fecha.setMinutes(fecha.getMinutes() + 30);
```

!!! tip "Date maneja desbordamientos automáticamente"
    ```javascript
    const fecha = new Date('2025-01-31');
    fecha.setDate(fecha.getDate() + 3); // 34 de enero
    console.log(fecha); // 3 de febrero de 2025
    ```

### Diferencia entre fechas

```javascript
const inicio = new Date('2025-10-01');
const fin = new Date('2025-10-16');

// Diferencia en milisegundos
const diffMs = fin - inicio;
console.log(diffMs); // 1296000000

// Convertir a días
const diffDias = diffMs / (1000 * 60 * 60 * 24);
console.log(diffDias); // 15

// Convertir a horas
const diffHoras = diffMs / (1000 * 60 * 60);
console.log(diffHoras); // 360
```

### Función auxiliar para diferencias

```javascript
function diferenciaFechas(fecha1, fecha2) {
  const diffMs = Math.abs(fecha2 - fecha1);
  
  const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return { dias, horas, minutos };
}

const fecha1 = new Date('2025-10-16T10:00:00');
const fecha2 = new Date('2025-10-18T14:30:00');

console.log(diferenciaFechas(fecha1, fecha2));
// { dias: 2, horas: 4, minutos: 30 }
```

---

## Comparación de Fechas

### Operadores de comparación

```javascript
const fecha1 = new Date('2025-10-16');
const fecha2 = new Date('2025-10-20');
const fecha3 = new Date('2025-10-16');

// Mayor/menor
console.log(fecha1 < fecha2);  // true
console.log(fecha1 > fecha2);  // false
console.log(fecha1 <= fecha3); // true
console.log(fecha1 >= fecha3); // true

// Igualdad (¡cuidado!)
console.log(fecha1 == fecha3);  // false (diferentes objetos)
console.log(fecha1 === fecha3); // false (diferentes objetos)

// Comparar valores
console.log(fecha1.getTime() === fecha3.getTime()); // true
```

!!! warning "Comparar objetos Date"
    Los operadores `==` y `===` comparan referencias, no valores. Para comparar fechas, usa `getTime()` o los operadores `<`, `>`, `<=`, `>=`.

### Ordenar arrays de fechas

```javascript
const fechas = [
  new Date('2025-10-20'),
  new Date('2025-10-16'),
  new Date('2025-10-18')
];

// Ordenar ascendente
fechas.sort((a, b) => a - b);

// Ordenar descendente
fechas.sort((a, b) => b - a);

console.log(fechas.map(f => f.toISOString().split('T')[0]));
// ['2025-10-16', '2025-10-18', '2025-10-20']
```

### Encontrar fecha más reciente/antigua

```javascript
const fechas = [
  new Date('2025-10-20'),
  new Date('2025-10-16'),
  new Date('2025-10-18')
];

const masReciente = new Date(Math.max(...fechas));
const masAntigua = new Date(Math.min(...fechas));

console.log(masReciente); // 2025-10-20
console.log(masAntigua);  // 2025-10-16
```

---

## Métodos Estáticos

### `Date.now()`

Timestamp actual en milisegundos (más eficiente que `new Date().getTime()`).

```javascript
const ahora = Date.now();
console.log(ahora); // 1738524389000

// Medir rendimiento
const inicio = Date.now();
// ... código a medir ...
const fin = Date.now();
console.log(`Tiempo transcurrido: ${fin - inicio}ms`);
```

### `Date.parse()`

Convierte string a timestamp.

```javascript
const timestamp = Date.parse('2025-10-16T14:30:00');
console.log(timestamp); // 1760616600000

const fecha = new Date(timestamp);
console.log(fecha);
```

!!! warning "Date.parse() es inconsistente"
    Evita `Date.parse()` con formatos no estándar. Usa siempre ISO 8601.

### `Date.UTC()`

Crea timestamp UTC desde componentes.

```javascript
// Date.UTC(año, mes, día, hora, minutos, segundos, ms)
const timestamp = Date.UTC(2025, 9, 16, 12, 30, 0);
const fecha = new Date(timestamp);

console.log(fecha.toISOString());
// '2025-10-16T12:30:00.000Z'
```

---

## Casos de Uso Comunes

### Validar si es fecha válida

```javascript
function esFechaValida(fecha) {
  return fecha instanceof Date && !isNaN(fecha.getTime());
}

console.log(esFechaValida(new Date()));           // true
console.log(esFechaValida(new Date('invalid')));  // false
console.log(esFechaValida('2025-10-16'));         // false
```

### Clonar una fecha

```javascript
const original = new Date('2025-10-16');
const clon = new Date(original.getTime());

// O más simple
const clon2 = new Date(original);

clon.setDate(20);
console.log(original.getDate()); // 16 (no modificado)
console.log(clon.getDate());     // 20
```

### Inicio/fin del día

```javascript
function inicioDia(fecha) {
  const copia = new Date(fecha);
  copia.setHours(0, 0, 0, 0);
  return copia;
}

function finDia(fecha) {
  const copia = new Date(fecha);
  copia.setHours(23, 59, 59, 999);
  return copia;
}

const hoy = new Date();
console.log(inicioDia(hoy)); // 2026-02-02 00:00:00.000
console.log(finDia(hoy));    // 2026-02-02 23:59:59.999
```

### Inicio/fin del mes

```javascript
function inicioMes(fecha) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), 1);
}

function finMes(fecha) {
  return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
}

const hoy = new Date('2025-10-16');
console.log(inicioMes(hoy));  // 2025-10-01
console.log(finMes(hoy));     // 2025-10-31
```

### Calcular edad

```javascript
function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  
  // Ajustar si aún no ha sido el cumpleaños este año
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  
  return edad;
}

console.log(calcularEdad('1990-05-15')); // Edad actual
```

### Días laborables entre fechas

```javascript
function diasLaborables(inicio, fin) {
  let dias = 0;
  const actual = new Date(inicio);
  
  while (actual <= fin) {
    const dia = actual.getDay();
    // 0 = domingo, 6 = sábado
    if (dia !== 0 && dia !== 6) {
      dias++;
    }
    actual.setDate(actual.getDate() + 1);
  }
  
  return dias;
}

const inicio = new Date('2025-10-01');
const fin = new Date('2025-10-31');
console.log(diasLaborables(inicio, fin)); // Días laborables en octubre
```

### Tiempo relativo ("hace 2 horas")

```javascript
function tiempoRelativo(fecha) {
  const ahora = new Date();
  const diff = ahora - fecha;
  
  const segundos = Math.floor(diff / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  
  if (dias > 7) {
    return fecha.toLocaleDateString('es-ES');
  } else if (dias > 0) {
    return `hace ${dias} día${dias > 1 ? 's' : ''}`;
  } else if (horas > 0) {
    return `hace ${horas} hora${horas > 1 ? 's' : ''}`;
  } else if (minutos > 0) {
    return `hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
  } else {
    return 'hace un momento';
  }
}

const hace1Hora = new Date(Date.now() - 60 * 60 * 1000);
console.log(tiempoRelativo(hace1Hora)); // 'hace 1 hora'
```

### Formateo personalizado

```javascript
function formatearFecha(fecha, formato = 'DD/MM/YYYY') {
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const año = fecha.getFullYear();
  const hora = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  const segundos = String(fecha.getSeconds()).padStart(2, '0');
  
  return formato
    .replace('DD', dia)
    .replace('MM', mes)
    .replace('YYYY', año)
    .replace('HH', hora)
    .replace('mm', minutos)
    .replace('ss', segundos);
}

const fecha = new Date('2025-10-16T14:30:45');
console.log(formatearFecha(fecha, 'DD/MM/YYYY'));        // '16/10/2025'
console.log(formatearFecha(fecha, 'YYYY-MM-DD'));        // '2025-10-16'
console.log(formatearFecha(fecha, 'DD/MM/YYYY HH:mm')); // '16/10/2025 14:30'
```

---

## Problemas Comunes y Soluciones

### Problema 1: Meses base 0

```javascript
// ❌ INCORRECTO
const navidad = new Date(2025, 12, 25); // ¡Enero de 2026!

// ✅ CORRECTO
const navidad = new Date(2025, 11, 25); // Diciembre de 2025
```

### Problema 2: Mutabilidad

```javascript
// ❌ PELIGROSO
function añadirDias(fecha, dias) {
  fecha.setDate(fecha.getDate() + dias);
  return fecha; // Modifica el original
}

// ✅ CORRECTO
function añadirDias(fecha, dias) {
  const nueva = new Date(fecha);
  nueva.setDate(nueva.getDate() + dias);
  return nueva; // Devuelve una copia
}
```

### Problema 3: Comparación de objetos

```javascript
// ❌ INCORRECTO
const fecha1 = new Date('2025-10-16');
const fecha2 = new Date('2025-10-16');
console.log(fecha1 === fecha2); // false

// ✅ CORRECTO
console.log(fecha1.getTime() === fecha2.getTime()); // true
```

### Problema 4: Parsing de strings

```javascript
// ❌ EVITAR (inconsistente entre navegadores)
const fecha1 = new Date('10/16/2025');
const fecha2 = new Date('Oct 16, 2025');

// ✅ USAR ISO 8601
const fecha = new Date('2025-10-16');
const fechaHora = new Date('2025-10-16T14:30:00');
```

### Problema 5: Zona horaria implícita

```javascript
// String sin hora asume medianoche UTC
const fecha1 = new Date('2025-10-16'); // UTC medianoche
console.log(fecha1.getHours()); // Puede ser 1 o 2 en España

// String con hora asume zona local
const fecha2 = new Date('2025-10-16T00:00:00'); // Local medianoche
console.log(fecha2.getHours()); // 0

// Especificar UTC explícitamente
const fecha3 = new Date('2025-10-16T00:00:00Z'); // UTC (Z = Zulu time)
```

---

## Mejores Prácticas

!!! tip "Recomendaciones"
    1. **Siempre clona antes de mutar**: `new Date(fecha)` o `new Date(fecha.getTime())`
    2. **Usa formato ISO 8601**: `'YYYY-MM-DDTHH:mm:ss'`
    3. **Documenta zonas horarias**: Deja claro si trabajas en UTC o local
    4. **Valida fechas**: Usa `!isNaN(fecha.getTime())`
    5. **Considera librerías**: Para apps complejas, usa [date-fns](https://date-fns.org/) o [Day.js](https://day.js.org/)
    6. **Mira al futuro**: Evalúa [Temporal API](Temporal-API.md) para proyectos nuevos

!!! warning "Evita"
    - ❌ Mutar fechas directamente sin clonar
    - ❌ Confiar en `Date.parse()` con formatos no estándar
    - ❌ Asumir que los meses van de 1 a 12
    - ❌ Comparar fechas con `===` o `==`
    - ❌ Hacer aritmética compleja con zonas horarias

---

## Librerías Populares

Si trabajas extensivamente con fechas, considera estas librerías:

### date-fns
```javascript
import { format, addDays, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

const fecha = new Date('2025-10-16');
console.log(format(fecha, 'PPP', { locale: es }));
// '16 de octubre de 2025'

const nuevaFecha = addDays(fecha, 7);
const diff = differenceInDays(nuevaFecha, fecha);
```
[📚 date-fns.org](https://date-fns.org/)

### Day.js
```javascript
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');
const fecha = dayjs('2025-10-16');
console.log(fecha.format('DD MMMM YYYY'));
// '16 octubre 2025'

console.log(fecha.add(7, 'day').format('DD/MM/YYYY'));
```
[📚 day.js.org](https://day.js.org/)

### Luxon
```javascript
import { DateTime } from 'luxon';

const fecha = DateTime.fromISO('2025-10-16');
console.log(fecha.setLocale('es').toFormat('DD MMMM yyyy'));
// '16 octubre 2025'
```
[📚 moment.github.io/luxon](https://moment.github.io/luxon/)

---

## Recursos Adicionales

!!! info "Documentación"
    - [MDN: Date](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date)
    - [ECMAScript Specification](https://tc39.es/ecma262/#sec-date-objects)

!!! success "Próximos pasos"
    - Explora [Temporal API](Temporal-API.md) como alternativa moderna
    - Aprende sobre internacionalización con `Intl.DateTimeFormat`
    - Domina zonas horarias con librerías especializadas
