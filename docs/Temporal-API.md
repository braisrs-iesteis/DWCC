# Temporal API en JavaScript

## Introducción

Temporal es la API moderna de JavaScript para trabajar con fechas y horas. Resuelve todos los problemas del objeto `Date`: inmutabilidad, zonas horarias claras, aritmética sencilla y APIs intuitivas.

**Estado actual**: Stage 3 (requiere polyfill)

```bash
npm install @js-temporal/polyfill
```

```javascript
import { Temporal } from "https://esm.sh/@js-temporal/polyfill";
import { Temporal } from "@js-temporal/polyfill"; //Si usas algún bundler;
```

[📚 Documentación oficial](https://tc39.es/proposal-temporal/docs/)

---

## Tipos principales

### `Temporal.PlainDate`

Representa una fecha del calendario sin hora ni zona horaria.

```javascript
// Fecha actual
const hoy = Temporal.Now.plainDateISO();

// Desde string
const fecha = Temporal.PlainDate.from("2025-10-16");

// Desde componentes
const navidad = Temporal.PlainDate.from({
  year: 2025,
  month: 12,
  day: 25,
});

// Acceder a propiedades
console.log(fecha.year); // 2025
console.log(fecha.month); // 10 (¡por fin del 1 al 12!)
console.log(fecha.day); // 16
console.log(fecha.dayOfWeek); // 4 (1=lunes, 7=domingo)
console.log(fecha.dayOfYear); // 289
console.log(fecha.daysInMonth); // 31
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate)

### `Temporal.PlainTime`

Representa una hora del día sin fecha ni zona horaria.

```javascript
// Desde string
const hora = Temporal.PlainTime.from("14:30:00");

// Desde componentes
const mediodia = Temporal.PlainTime.from({
  hour: 12,
  minute: 0,
  second: 0,
});

// Acceder a propiedades
console.log(hora.hour); // 14
console.log(hora.minute); // 30
console.log(hora.second); // 0
console.log(hora.millisecond); // 0
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime)

### `Temporal.PlainDateTime`

Combina fecha y hora sin zona horaria específica.

```javascript
// Fecha y hora actual
const ahora = Temporal.Now.plainDateTimeISO();

// Desde string
const fechaHora = Temporal.PlainDateTime.from("2025-10-16T14:30:00");

// Desde componentes
const reunion = Temporal.PlainDateTime.from({
  year: 2025,
  month: 10,
  day: 16,
  hour: 15,
  minute: 30,
});

// Acceder a fecha y hora
console.log(reunion.year); // 2025
console.log(reunion.hour); // 15
console.log(reunion.toPlainDate()); // Solo la fecha
console.log(reunion.toPlainTime()); // Solo la hora
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime)

### `Temporal.ZonedDateTime`

Representa una fecha y hora en una zona horaria específica.

```javascript
// Fecha y hora actual con zona horaria
const ahora = Temporal.Now.zonedDateTimeISO("Europe/Madrid");

// Desde string con zona horaria
const evento = Temporal.ZonedDateTime.from({
  timeZone: "Europe/Madrid",
  year: 2025,
  month: 10,
  day: 16,
  hour: 15,
  minute: 30,
});

// Propiedades adicionales
console.log(evento.timeZone); // 'Europe/Madrid'
console.log(evento.offset); // '+02:00' (varía según DST)
console.log(evento.offsetNanoseconds); // Offset en nanosegundos

// Convertir entre zonas horarias
const enNY = evento.withTimeZone("America/New_York");
console.log(enNY.hour); // Hora ajustada a Nueva York
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime)

### `Temporal.Instant`

Representa un punto exacto en el tiempo (timestamp).

```javascript
// Instante actual
const ahora = Temporal.Now.instant();

// Desde epoch (nanosegundos)
const instant = Temporal.Instant.fromEpochMilliseconds(1697457600000);

// Convertir a diferentes zonas horarias
const enMadrid = instant.toZonedDateTimeISO("Europe/Madrid");
const enTokio = instant.toZonedDateTimeISO("Asia/Tokyo");

console.log(instant.epochMilliseconds); // Timestamp en ms
console.log(instant.epochSeconds); // Timestamp en segundos
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Instant)

### `Temporal.Duration`

Representa una cantidad de tiempo (años, meses, días, horas, etc.).

```javascript
// Crear duración
const duracion = Temporal.Duration.from({
  hours: 2,
  minutes: 30,
  seconds: 15,
});

// Desde string ISO 8601
const tresDias = Temporal.Duration.from("P3D"); // 3 días
const dosHoras = Temporal.Duration.from("PT2H"); // 2 horas

// Acceder a componentes
console.log(duracion.hours); // 2
console.log(duracion.minutes); // 30
console.log(duracion.seconds); // 15

// Duración total
console.log(duracion.total("hours")); // 2.504166...
console.log(duracion.total("minutes")); // 150.25
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration)

---

## Aritmética de fechas

### `add()`

Añade una duración a una fecha/hora.

```javascript
const fecha = Temporal.PlainDate.from("2025-10-16");

// Añadir días
const enUnaSemana = fecha.add({ days: 7 });

// Añadir múltiples unidades
const futuro = fecha.add({
  years: 1,
  months: 2,
  days: 10,
});

// Añadir duración
const duracion = Temporal.Duration.from({ days: 30 });
const enUnMes = fecha.add(duracion);

console.log(enUnaSemana.toString()); // '2025-10-23'
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/add)

### `subtract()`

Resta una duración de una fecha/hora.

```javascript
const fecha = Temporal.PlainDate.from("2025-10-16");

// Restar días
const haceUnaSemana = fecha.subtract({ days: 7 });

// Restar meses
const haceUnAño = fecha.subtract({ years: 1 });

console.log(haceUnaSemana.toString()); // '2025-10-09'
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/subtract)

### `until()`

Calcula la duración desde una fecha hasta otra.

```javascript
const inicio = Temporal.PlainDate.from("2025-10-16");
const fin = Temporal.PlainDate.from("2025-12-25");

// Diferencia en días
const diferencia = inicio.until(fin);
console.log(diferencia.days); // 70

// Diferencia en meses
const enMeses = inicio.until(fin, { largestUnit: "months" });
console.log(enMeses.months); // 2
console.log(enMeses.days); // 9

// Diferencia total
console.log(diferencia.total("days")); // 70
console.log(diferencia.total("weeks")); // 10
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/until)

### `since()`

Calcula la duración desde otra fecha hasta esta.

```javascript
const fin = Temporal.PlainDate.from("2025-12-25");
const inicio = Temporal.PlainDate.from("2025-10-16");

// Mismo resultado que until() pero en dirección opuesta
const diferencia = fin.since(inicio);
console.log(diferencia.days); // 70
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/since)

---

## Comparaciones

### `compare()`

Compara dos fechas/horas. Devuelve -1, 0, o 1.

```javascript
const fecha1 = Temporal.PlainDate.from("2025-10-16");
const fecha2 = Temporal.PlainDate.from("2025-10-20");
const fecha3 = Temporal.PlainDate.from("2025-10-16");

Temporal.PlainDate.compare(fecha1, fecha2); // -1 (fecha1 es anterior)
Temporal.PlainDate.compare(fecha2, fecha1); // 1 (fecha2 es posterior)
Temporal.PlainDate.compare(fecha1, fecha3); // 0 (son iguales)

// Útil para ordenar arrays
const fechas = [fecha2, fecha1, fecha3];
fechas.sort(Temporal.PlainDate.compare);
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/compare)

### `equals()`

Verifica si dos fechas/horas son exactamente iguales.

```javascript
const fecha1 = Temporal.PlainDate.from("2025-10-16");
const fecha2 = Temporal.PlainDate.from("2025-10-16");
const fecha3 = Temporal.PlainDate.from("2025-10-20");

console.log(fecha1.equals(fecha2)); // true
console.log(fecha1.equals(fecha3)); // false
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/equals)

---

## Modificación de componentes

### `with()`

Crea una nueva fecha/hora modificando ciertos componentes.

```javascript
const fecha = Temporal.PlainDate.from("2025-10-16");

// Cambiar el día
const primerDia = fecha.with({ day: 1 });

// Cambiar múltiples componentes
const navidad = fecha.with({ month: 12, day: 25 });

// Con PlainDateTime
const hora = Temporal.PlainDateTime.from("2025-10-16T14:30:00");
const nuevaHora = hora.with({ hour: 9, minute: 0 });

console.log(primerDia.toString()); // '2025-10-01'
console.log(navidad.toString()); // '2025-12-25'
console.log(nuevaHora.toString()); // '2025-10-16T09:00:00'
```

⚠️ **Nota**: `with()` no modifica el objeto original, devuelve uno nuevo.

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/with)

---

## Conversiones y formato

### `toString()`

Convierte a string en formato ISO 8601.

```javascript
const fecha = Temporal.PlainDate.from("2025-10-16");
console.log(fecha.toString()); // '2025-10-16'

const hora = Temporal.PlainTime.from("14:30:00");
console.log(hora.toString()); // '14:30:00'

const fechaHora = Temporal.PlainDateTime.from("2025-10-16T14:30:00");
console.log(fechaHora.toString()); // '2025-10-16T14:30:00'
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/toString)


### `toLocaleString()`

Formatea según la configuración regional.

```javascript
const fecha = Temporal.PlainDate.from("2025-10-16");

// Formato español
console.log(fecha.toLocaleString("es-ES"));
// '16/10/2025'

// Con opciones
console.log(
  fecha.toLocaleString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
);
// 'jueves, 16 de octubre de 2025'
```

---

### Formateo manual con `padStart()`

A veces necesitas un formato personalizado (por ejemplo, YYYY-MM-DD o DD/MM/YYYY). Puedes usar `padStart()` para rellenar con ceros a la izquierda:

```javascript
const fecha = Temporal.PlainDate.from("2025-3-7");

// Formato YYYY-MM-DD
const year = fecha.year;
const month = String(fecha.month).padStart(2, '0');
const day = String(fecha.day).padStart(2, '0');
const formatoISO = `${year}-${month}-${day}`;
console.log(formatoISO); // '2025-03-07'

// Formato DD/MM/YYYY
const formatoEuropeo = `${day}/${month}/${year}`;
console.log(formatoEuropeo); // '07/03/2025'

// También puedes formatear horas y minutos
const hora = Temporal.PlainTime.from({ hour: 8, minute: 5 });
const h = String(hora.hour).padStart(2, '0');
const m = String(hora.minute).padStart(2, '0');
console.log(`${h}:${m}`); // '08:05'
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/toLocaleString)

### Conversión entre tipos

```javascript
const fecha = Temporal.PlainDate.from("2025-10-16");
const hora = Temporal.PlainTime.from("14:30:00");

// PlainDate + PlainTime = PlainDateTime
const fechaHora = fecha.toPlainDateTime(hora);

// PlainDateTime a PlainDate/PlainTime
const soloFecha = fechaHora.toPlainDate();
const soloHora = fechaHora.toPlainTime();

// PlainDateTime + TimeZone = ZonedDateTime
const conZona = fechaHora.toZonedDateTime("Europe/Madrid");

// ZonedDateTime a Instant
const instante = conZona.toInstant();

// Instant a ZonedDateTime
const deVuelta = instante.toZonedDateTimeISO("Europe/Madrid");
```

---

## Trabajar con zonas horarias

### `withTimeZone()`

Convierte un ZonedDateTime a otra zona horaria manteniendo el instante.

```javascript
const madrid = Temporal.ZonedDateTime.from({
  timeZone: "Europe/Madrid",
  year: 2025,
  month: 10,
  day: 16,
  hour: 15,
  minute: 30,
});

// Misma instante en diferentes zonas
const enNY = madrid.withTimeZone("America/New_York");
const enTokio = madrid.withTimeZone("Asia/Tokyo");

console.log(madrid.hour); // 15
console.log(enNY.hour); // 9 (6 horas menos)
console.log(enTokio.hour); // 22 (7 horas más)
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/withTimeZone)

### Manejo de horario de verano (DST)

```javascript
// Fecha con cambio de horario
const verano = Temporal.ZonedDateTime.from({
  timeZone: "Europe/Madrid",
  year: 2025,
  month: 7,
  day: 16,
  hour: 15,
});

const invierno = Temporal.ZonedDateTime.from({
  timeZone: "Europe/Madrid",
  year: 2025,
  month: 12,
  day: 16,
  hour: 15,
});

console.log(verano.offset); // '+02:00' (horario de verano)
console.log(invierno.offset); // '+01:00' (horario de invierno)
```

---

## Operaciones con duraciones

### Sumar y restar duraciones

```javascript
const duracion1 = Temporal.Duration.from({ hours: 2, minutes: 30 });
const duracion2 = Temporal.Duration.from({ hours: 1, minutes: 45 });

// Sumar duraciones
const suma = duracion1.add(duracion2);
console.log(suma.hours); // 4
console.log(suma.minutes); // 15

// Restar duraciones
const resta = duracion1.subtract(duracion2);
console.log(resta.hours); // 0
console.log(resta.minutes); // 45
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/add)

### `total()`

Convierte una duración a una única unidad.

```javascript
const duracion = Temporal.Duration.from({
  days: 2,
  hours: 3,
  minutes: 30,
});

console.log(duracion.total("hours")); // 51.5
console.log(duracion.total("minutes")); // 3090
console.log(duracion.total("seconds")); // 185400
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/total)

### `round()`

Redondea una duración a una unidad específica.

```javascript
const duracion = Temporal.Duration.from({
  hours: 2,
  minutes: 37,
  seconds: 45,
});

// Redondear a horas
const redondeado = duracion.round({ largestUnit: "hours" });
console.log(redondeado.hours); // 3 (redondeado hacia arriba)

// Redondear a minutos
const enMinutos = duracion.round({
  largestUnit: "minutes",
  smallestUnit: "minutes",
});
console.log(enMinutos.minutes); // 158
```

[📚 Documentación MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration/round)

---

## Validación y límites

### Opciones de desbordamiento

```javascript
// Por defecto, rechaza valores inválidos
try {
  const invalida = Temporal.PlainDate.from({
    year: 2025,
    month: 13, // Mes inválido
    day: 1,
  });
} catch (e) {
  console.log("Fecha inválida"); // Se ejecuta
}

// Opción 'constrain': ajusta valores al rango válido
const ajustada = Temporal.PlainDate.from(
  {
    year: 2025,
    month: 13,
    day: 35,
  },
  { overflow: "constrain" }
);

console.log(ajustada.toString()); // '2025-12-31'
```

[📚 Documentación: overflow](https://tc39.es/proposal-temporal/docs/options.html#overflow)

---

## Ejemplos prácticos

### Calcular edad

```javascript
const nacimiento = Temporal.PlainDate.from("1990-05-15");
const hoy = Temporal.Now.plainDateISO();

const edad = nacimiento.until(hoy, { largestUnit: "years" });
console.log(`Edad: ${edad.years} años`);
```

### Días laborables entre dos fechas

```javascript
function diasLaborables(inicio, fin) {
  let dias = 0;
  let actual = inicio;

  while (Temporal.PlainDate.compare(actual, fin) <= 0) {
    const diaSemana = actual.dayOfWeek;
    if (diaSemana <= 5) {
      // Lunes a viernes
      dias++;
    }
    actual = actual.add({ days: 1 });
  }

  return dias;
}

const inicio = Temporal.PlainDate.from("2025-10-01");
const fin = Temporal.PlainDate.from("2025-10-31");
console.log(diasLaborables(inicio, fin)); // Días laborables en octubre
```

### Próximo cumpleaños

```javascript
function proximoCumpleaños(fechaNacimiento) {
  const hoy = Temporal.Now.plainDateISO();
  const esteAño = fechaNacimiento.with({ year: hoy.year });

  if (Temporal.PlainDate.compare(esteAño, hoy) < 0) {
    // Ya pasó este año
    return fechaNacimiento.with({ year: hoy.year + 1 });
  }

  return esteAño;
}

const nacimiento = Temporal.PlainDate.from("1990-05-15");
const proximo = proximoCumpleaños(nacimiento);
const faltan = Temporal.Now.plainDateISO().until(proximo);
console.log(`Faltan ${faltan.days} días para tu cumpleaños`);
```

### Horario de reunión internacional

```javascript
function reunionInternacional(horaLocal, zonaOrigen, zonasDestino) {
  const reunion =
    Temporal.PlainDateTime.from(horaLocal).toZonedDateTime(zonaOrigen);

  console.log(`Reunión programada:`);
  console.log(`${zonaOrigen}: ${reunion.toPlainTime()}`);

  zonasDestino.forEach((zona) => {
    const horaDestino = reunion.withTimeZone(zona);
    console.log(`${zona}: ${horaDestino.toPlainTime()}`);
  });
}

reunionInternacional("2025-10-16T15:00:00", "Europe/Madrid", [
  "America/New_York",
  "Asia/Tokyo",
  "Australia/Sydney",
]);
```
