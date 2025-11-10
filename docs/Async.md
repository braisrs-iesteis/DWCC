# Programación Asíncrona en JavaScript

La programación asíncrona en JavaScript permite ejecutar operaciones que toman tiempo (como leer archivos o hacer peticiones) sin bloquear el hilo principal. JavaScript evolucionó desde callbacks hasta promesas y finalmente async/await para manejar este tipo de operaciones de manera más limpia y legible.

## Callbacks

Los callbacks son funciones que se pasan como argumentos a otras funciones para ser ejecutadas cuando una operación asíncrona se completa.

```javascript
// Función que simula lavar los platos
function lavarPlatos(callback) {
    console.log("Comenzando a lavar los platos...");
    setTimeout(() => {
        console.log("Platos lavados!");
        callback();
    }, 2000);
}

// Función que simula secar los platos
function secarPlatos(callback) {
    console.log("Comenzando a secar los platos...");
    setTimeout(() => {
        console.log("Platos secos!");
        callback();
    }, 1500);
}

// Función que simula guardar los platos
function guardarPlatos(callback) {
    console.log("Guardando los platos...");
    setTimeout(() => {
        console.log("Platos guardados!");
        callback();
    }, 1000);
}

// Uso con callbacks - Callback Hell
lavarPlatos(() => {
    secarPlatos(() => {
        guardarPlatos(() => {
            console.log("¡Todos los platos están listos!");
        });
    });
});
```


### Problemas con Callbacks

Los callbacks pueden crear el "Callback Hell" o "Pyramid of Doom", donde el código se vuelve difícil de leer y mantener cuando hay muchas operaciones asíncronas anidadas.

## Promesas

Las promesas representan el resultado eventual de una operación asíncrona. Pueden estar en tres estados: pending (pendiente), fulfilled (cumplida) o rejected (rechazada).

```javascript
// Función que simula hacer la cama
function hacerCama() {
    return new Promise((resolve, reject) => {
        console.log("Haciendo la cama...");
        setTimeout(() => {
            const exito = Math.random() > 0.2; // 80% de probabilidad de éxito
            if (exito) {
                console.log("¡Cama hecha!");
                resolve("Cama lista");
            } else {
                console.log("Error al hacer la cama");
                reject("No se pudo hacer la cama");
            }
        }, 1800);
    });
}

// Función que simula aspirar el cuarto
function aspirarCuarto() {
    return new Promise((resolve, reject) => {
        console.log("Aspirando el cuarto...");
        setTimeout(() => {
            const exito = Math.random() > 0.1; // 90% de probabilidad de éxito
            if (exito) {
                console.log("¡Cuarto aspirado!");
                resolve("Cuarto limpio");
            } else {
                console.log("La aspiradora se descompuso");
                reject("Error con la aspiradora");
            }
        }, 2200);
    });
}

// Función que simula ordenar el armario
function ordenarArmario() {
    return new Promise((resolve, reject) => {
        console.log("Ordenando el armario...");
        setTimeout(() => {
            console.log("¡Armario ordenado!");
            resolve("Armario organizado");
        }, 1600);
    });
}

// Uso con promesas - más limpio que callbacks
hacerCama()
    .then(resultado => {
        console.log(resultado);
        return aspirarCuarto();
    })
    .then(resultado => {
        console.log(resultado);
        return ordenarArmario();
    })
    .then(resultado => {
        console.log(resultado);
        console.log("¡Cuarto completamente arreglado!");
    })
    .catch(error => {
        console.error("Error en la limpieza:", error);
    });
```


### Métodos Útiles de Promesas

```javascript
// Promise.all - Ejecuta todas las promesas en paralelo
Promise.all([hacerCama(), aspirarCuarto(), ordenarArmario()])
    .then(resultados => {
        console.log("Todas las tareas completadas:", resultados);
    })
    .catch(error => {
        console.error("Una de las tareas falló:", error);
    });

// Promise.allSettled - Espera a que todas las promesas se resuelvan
Promise.allSettled([hacerCama(), aspirarCuarto(), ordenarArmario()])
    .then(resultados => {
        resultados.forEach((resultado, index) => {
            if (resultado.status === 'fulfilled') {
                console.log(`Tarea ${index + 1} exitosa:`, resultado.value);
            } else {
                console.log(`Tarea ${index + 1} falló:`, resultado.reason);
            }
        });
    });
```


## Async/Await

Async/await es sintaxis moderna que hace que el código asíncrono se vea y se comporte más como código síncrono, siendo más fácil de leer y debuggear.

```javascript
// Funciones que simulan tareas de cocina
function prepararIngredientes() {
    return new Promise((resolve) => {
        console.log("Preparando ingredientes...");
        setTimeout(() => {
            console.log("Ingredientes listos!");
            resolve("Ingredientes preparados");
        }, 1500);
    });
}

function cocinarComida() {
    return new Promise((resolve, reject) => {
        console.log("Cocinando...");
        setTimeout(() => {
            const exito = Math.random() > 0.15; // 85% de probabilidad de éxito
            if (exito) {
                console.log("¡Comida lista!");
                resolve("Comida cocinada");
            } else {
                console.log("Se quemó la comida");
                reject("Error al cocinar");
            }
        }, 3000);
    });
}

function lavarUtensilios() {
    return new Promise((resolve) => {
        console.log("Lavando utensilios...");
        setTimeout(() => {
            console.log("Utensilios limpios!");
            resolve("Utensilios lavados");
        }, 1200);
    });
}

// Función async que usa await
async function prepararAlmuerzo() {
    try {
        console.log("Comenzando preparación del almuerzo...");
        
        // Ejecutar tareas de forma secuencial
        const ingredientes = await prepararIngredientes();
        console.log("✓", ingredientes);
        
        const comida = await cocinarComida();
        console.log("✓", comida);
        
        const utensilios = await lavarUtensilios();
        console.log("✓", utensilios);
        
        console.log("🍽️ ¡Almuerzo completamente listo!");
        return "Almuerzo exitoso";
        
    } catch (error) {
        console.error("❌ Error en la preparación:", error);
        throw error;
    }
}

// Llamar la función async
prepararAlmuerzo()
    .then(resultado => console.log("Resultado final:", resultado))
    .catch(error => console.error("El almuerzo falló:", error));
```


### Ejecutar Tareas en Paralelo con Async/Await

```javascript
async function limpiezaGeneral() {
    try {
        console.log("Iniciando limpieza general de la casa...");
        
        // Ejecutar múltiples tareas en paralelo
        const [cama, cuarto, armario] = await Promise.all([
            hacerCama(),
            aspirarCuarto(),
            ordenarArmario()
        ]);
        
        console.log("Resultados de la limpieza:");
        console.log("- " + cama);
        console.log("- " + cuarto);
        console.log("- " + armario);
        console.log("🏠 ¡Casa completamente limpia!");
        
    } catch (error) {
        console.error("Error durante la limpieza:", error);
    }
}

// Función que maneja errores individualmente
async function limpiezaFlexible() {
    console.log("Iniciando limpieza flexible...");
    
    const tareas = [hacerCama(), aspirarCuarto(), ordenarArmario()];
    const nombres = ["Hacer cama", "Aspirar cuarto", "Ordenar armario"];
    
    const resultados = await Promise.allSettled(tareas);
    
    resultados.forEach((resultado, index) => {
        if (resultado.status === 'fulfilled') {
            console.log(`✅ ${nombres[index]}: ${resultado.value}`);
        } else {
            console.log(`❌ ${nombres[index]}: ${resultado.reason}`);
        }
    });
    
    console.log("Limpieza flexible completada");
}
```


## Comparación de Enfoques

### Ventajas y Desventajas

| Enfoque | Ventajas | Desventajas |
| :-- | :-- | :-- |
| **Callbacks** | Simple de entender, amplio soporte | Callback hell, difícil manejo de errores |
| **Promesas** | Mejor manejo de errores, evita callback hell | Sintaxis más verbosa que async/await |
| **Async/Await** | Código más limpio y legible, fácil debugging | Requiere soporte ES2017+, puede ocultar la naturaleza asíncrona |

### Cuándo Usar Cada Uno

- **Callbacks**: Para operaciones simples o cuando se trabaja con APIs que solo soportan callbacks
- **Promesas**: Cuando necesitas mejor control de errores o trabajas con múltiples operaciones asíncronas
- **Async/Await**: Para código más legible y cuando trabajas con operaciones asíncronas complejas


## Mejores Prácticas

### Manejo de Errores

```javascript
// Siempre maneja errores en funciones async
async function tareaSegura() {
    try {
        const resultado = await operacionRiesgosa();
        return resultado;
    } catch (error) {
        console.error("Error capturado:", error);
        // Decide si relanzar el error o manejarlo
        return "valor por defecto";
    }
}

// Con promesas, siempre incluye .catch()
operacionAsincrona()
    .then(resultado => procesarResultado(resultado))
    .catch(error => manejarError(error));
```


### Evitar Bloqueos

```javascript
// ❌ Malo: operaciones secuenciales innecesarias
async function limpiezaLenta() {
    await lavarPlatos();
    await hacerCama();        // No depende de lavar platos
    await ordenarArmario();    // No depende de las anteriores
}

// ✅ Bueno: operaciones en paralelo cuando es posible
async function limpiezaRapida() {
    await Promise.all([
        lavarPlatos(),
        hacerCama(),
        ordenarArmario()
    ]);
}
```

La programación asíncrona es fundamental en JavaScript moderno. Comenzar con callbacks ayuda a entender los conceptos básicos, las promesas proporcionan mejor control y estructura, mientras que async/await ofrece la sintaxis más limpia y legible para trabajar con operaciones asíncronas complejas.
