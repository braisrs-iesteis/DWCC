# Componentes y Props

En React, la interfaz de usuario se construye a partir de pequeñas piezas independientes y reutilizables llamadas **componentes**. 

!!! abstract "Concepto Clave"
    Un componente es esencialmente una función de JavaScript que recibe una entrada (llamada **props**) y devuelve un elemento que describe lo que debe aparecer en pantalla.

## Tipos de Componentes

=== "Funcionales (Recomendado)"
    Son simples funciones de JavaScript. Es el estándar moderno de React.
    ```javascript
    const Welcome = ({ name }) => {
      return <h1>Hola, {name}</h1>;
    };
    ```

=== "Clase (Legacy)"
    Basados en clases de ES6. Se consideran antiguos pero siguen funcionando. No se recomiendan para proyectos nuevos.
    ```javascript
    class Welcome extends React.Component {
      render() {
        return <h1>Hola, {this.props.name}</h1>;
      }
    }
    ```

## Props: Comunicación entre Componentes

Las **props** (propiedades) son el mecanismo para pasar datos de un componente padre a un componente hijo.

!!! warning "Importante"
    Las props son **inmutables**. Un componente nunca debe modificar sus propias props. Son de "solo lectura".

```javascript
function UserCard({ name, email, isPremium }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{email}</p>
      {isPremium && <span className="badge">⭐ Premium</span>}
    </div>
  );
}

// Uso del componente
<UserCard 
  name="Ana García" 
  email="ana@example.com" 
  isPremium={true} 
/>
```

### Flujo Unidireccional
El flujo de datos en React es **unidireccional** (top-down). La información siempre viaja del padre al hijo a través de las props. Si el hijo necesita comunicar algo al padre, se suelen pasar funciones como props (callbacks).

## Composición con `children`

A veces no sabemos de antemano qué contenido va a tener un componente. Para eso usamos la prop especial `children`, que permite "inyectar" contenido dentro de las etiquetas del componente.

```javascript
function Modal({ children, title }) {
  return (
    <div className="modal">
      <div className="modal-header">{title}</div>
      <div className="modal-content">
        {children} {/* Aquí se renderizará lo que envuelvas */}
      </div>
    </div>
  );
}

// Uso
<Modal title="Confirmación">
  <p>¿Estás seguro de que quieres borrar esto?</p>
  <button>Sí, borrar</button>
</Modal>
```

## Thinking in React: Diseño de Componentes

!!! abstract "Filosofía Clave"
    React te obliga a pensar en tu aplicación como una **jerarquía de componentes**. Aprender a dividir tu UI en piezas pequeñas, independientes y reutilizables es fundamental para aprovechar todo el poder de React.

### Principio de Responsabilidad Única

Uno de los principios más importantes en React es el **Single Responsibility Principle** (SRP): cada componente debe hacer **una sola cosa** y hacerla bien.

!!! tip "Regla de Oro"
    Si un componente hace más de una cosa, divídelo en subcomponentes más pequeños.

#### ❌ Mal Ejemplo: Componente Monolítico

```javascript
function ProductPage() {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [newReview, setNewReview] = useState('');
  
  // 100+ líneas de lógica mezclada aquí...
  
  return (
    <div>
      {/* Header del producto */}
      <div className="header">
        <img src={product.image} />
        <h1>{product.name}</h1>
        <p>{product.price}€</p>
        <button onClick={() => setCartItems([...cartItems, product])}>
          Añadir al carrito
        </button>
      </div>
      
      {/* Reviews */}
      <div className="reviews">
        <h2>Reseñas</h2>
        {reviews.map(review => (
          <div key={review.id}>
            <strong>{review.author}</strong>
            <p>{review.text}</p>
            <span>⭐ {review.rating}</span>
          </div>
        ))}
        <textarea 
          value={newReview} 
          onChange={(e) => setNewReview(e.target.value)}
        />
        <button onClick={handleSubmitReview}>Enviar</button>
      </div>
      
      {/* Carrito */}
      <div className="cart">
        {/* Más código... */}
      </div>
    </div>
  );
}
```

#### ✅ Buen Ejemplo: Componentes Divididos

```javascript
// Componente principal: solo orquesta
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [cart, setCart] = useState([]);
  
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };
  
  return (
    <div className="product-page">
      <ProductHeader 
        product={product} 
        onAddToCart={handleAddToCart} 
      />
      <ReviewSection 
        reviews={reviews} 
        productId={productId} 
      />
      <ShoppingCart items={cart} />
    </div>
  );
}

// Componente reutilizable para el header del producto
function ProductHeader({ product, onAddToCart }) {
  return (
    <header className="product-header">
      <ProductImage src={product.image} alt={product.name} />
      <ProductInfo 
        name={product.name} 
        price={product.price} 
      />
      <AddToCartButton 
        onClick={() => onAddToCart(product)} 
      />
    </header>
  );
}

// Componente de imagen con lazy loading
function ProductImage({ src, alt }) {
  return <img src={src} alt={alt} loading="lazy" />;
}

// Información del producto
function ProductInfo({ name, price }) {
  return (
    <div className="product-info">
      <h1>{name}</h1>
      <PriceTag price={price} />
    </div>
  );
}

// Componente de precio con formato
function PriceTag({ price }) {
  return (
    <p className="price">
      {new Intl.NumberFormat('es-ES', { 
        style: 'currency', 
        currency: 'EUR' 
      }).format(price)}
    </p>
  );
}

// Sección de reseñas con su propia lógica
function ReviewSection({ reviews, productId }) {
  const [newReview, setNewReview] = useState('');
  
  const handleSubmit = () => {
    // Lógica específica de reviews
  };
  
  return (
    <section className="reviews">
      <h2>Reseñas</h2>
      <ReviewList reviews={reviews} />
      <ReviewForm 
        value={newReview}
        onChange={setNewReview}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
```

### Proceso de "Thinking in React"

El equipo de React recomienda un proceso de 5 pasos para diseñar aplicaciones:

#### 1️⃣ Empieza con el Mockup

Dibuja o consigue un diseño visual de tu interfaz.

#### 2️⃣ Divide la UI en Jerarquía de Componentes

Dibuja cajas alrededor de cada componente y subcomponente. Usa el **principio de responsabilidad única** para decidir qué debe ser un componente.

!!! example "Ejemplo: Lista de Productos"
    ```
    ProductApp
    ├── SearchBar
    ├── ProductTable
    │   ├── ProductCategoryRow
    │   └── ProductRow
    └── Cart
        └── CartItem
    ```

#### 3️⃣ Construye una Versión Estática

Crea componentes que rendericen datos estáticos (sin estado aún). Solo props.

```javascript
function ProductTable({ products }) {
  return (
    <table>
      {products.map(product => (
        <ProductRow key={product.id} product={product} />
      ))}
    </table>
  );
}

function ProductRow({ product }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}€</td>
    </tr>
  );
}
```

#### 4️⃣ Identifica el Estado Mínimo Necesario

Pregúntate:
- ✅ **¿Cambia con el tiempo?** → Es estado
- ❌ **¿Se pasa desde el padre vía props?** → No es estado
- ❌ **¿Se puede calcular desde otro estado o props?** → No es estado

```javascript
// ✅ Es estado (cambia con interacción del usuario)
const [searchText, setSearchText] = useState('');
const [inStockOnly, setInStockOnly] = useState(false);

// ❌ No es estado (se calcula)
const filteredProducts = products.filter(p => 
  p.name.includes(searchText) && 
  (!inStockOnly || p.inStock)
);
```

#### 5️⃣ Identifica Dónde Debe Vivir el Estado

El estado debe vivir en el **componente padre común más cercano** de todos los componentes que lo necesitan.

```javascript
// Estado en el padre común
function ProductApp() {
  const [searchText, setSearchText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  
  const filteredProducts = filterProducts(products, searchText, inStockOnly);
  
  return (
    <>
      <SearchBar 
        searchText={searchText}
        inStockOnly={inStockOnly}
        onSearchChange={setSearchText}
        onStockFilterChange={setInStockOnly}
      />
      <ProductTable products={filteredProducts} />
    </>
  );
}
```

### Estrategias de Composición

#### Bottom-Up vs Top-Down

=== "Bottom-Up (Recomendado para principiantes)"
    Empieza construyendo los componentes más pequeños (hojas) y avanza hacia arriba.
    
    ```javascript
    // 1. Primer componente más simple
    function StarRating({ rating }) {
      return <span>{'⭐'.repeat(rating)}</span>;
    }
    
    // 2. Componente que usa el anterior
    function ReviewCard({ review }) {
      return (
        <div className="review">
          <h4>{review.author}</h4>
          <StarRating rating={review.rating} />
          <p>{review.text}</p>
        </div>
      );
    }
    
    // 3. Lista que usa ReviewCard
    function ReviewList({ reviews }) {
      return reviews.map(r => <ReviewCard key={r.id} review={r} />);
    }
    ```

=== "Top-Down (Para desarrolladores con experiencia)"
    Empieza desde la raíz y ve descendiendo.
    
    ```javascript
    // 1. Componente raíz
    function App() {
      return (
        <main>
          <Header />
          <ProductSection />
          <Footer />
        </main>
      );
    }
    
    // 2. Luego desarrollas cada sección
    function ProductSection() {
      return (
        <>
          <ProductList />
          <Sidebar />
        </>
      );
    }
    
    // 3. Y continúas hacia abajo...
    ```

### Señales de que Necesitas Dividir un Componente

!!! warning "Refactoriza si..."
    - ❌ El componente tiene **más de 200-300 líneas**
    - ❌ Tienes que **scrollear** constantemente para entender qué hace
    - ❌ Manejas **múltiples estados no relacionados**
    - ❌ El JSX está **anidado más de 5 niveles**
    - ❌ Tienes **lógica repetida** en varias partes del componente
    - ❌ Es difícil de **testear** porque hace demasiadas cosas

### Patrones Comunes de Composición

#### Patrón Container/Presentational

Separa la lógica (container) de la UI (presentational).

```javascript
// CONTAINER: Maneja lógica y estado
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <LoadingSpinner />;
  
  return <UserList users={users} />;
}

// PRESENTATIONAL: Solo renderiza
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}

function UserItem({ user }) {
  return (
    <li>
      <strong>{user.name}</strong> - {user.email}
    </li>
  );
}
```

#### Patrón de Composición con Slots

Usa múltiples props en lugar de solo `children`.

```javascript
function Card({ header, body, footer }) {
  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-body">{body}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
}

// Uso
<Card
  header={<h2>Título de la tarjeta</h2>}
  body={<p>Contenido principal aquí</p>}
  footer={<button>Acción</button>}
/>
```

### Ejemplo Completo: Pensando en Componentes

Imagina que necesitas crear un formulario de contacto. Aquí está cómo pensarlo:

```javascript
// ❌ VERSIÓN MONOLÍTICA
function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  // 50+ líneas de validación y manejo...
  
  return (/* JSX gigante */);
}

// ✅ VERSIÓN COMPONIZADA
function ContactFormContainer() {
  const { formData, errors, handleSubmit } = useContactForm();
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="name">Nombre</Label>
        <Input 
          id="name" 
          value={formData.name}
          error={errors.name}
        />
        <ErrorMessage message={errors.name} />
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email"
          value={formData.email}
          error={errors.email}
        />
        <ErrorMessage message={errors.email} />
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="message">Mensaje</Label>
        <Textarea 
          id="message"
          value={formData.message}
          error={errors.message}
        />
      </FormGroup>
      
      <SubmitButton>Enviar</SubmitButton>
    </Form>
  );
}

// Custom Hook para la lógica
function useContactForm() {
  // Toda la lógica del formulario aquí
  // return { formData, errors, handleSubmit }
}
```

!!! success "Beneficios de esta Arquitectura"
    - ✅ **Reutilización**: Los componentes `Input`, `Label`, etc. se pueden usar en otros formularios
    - ✅ **Testeable**: Cada pieza se puede testear independientemente
    - ✅ **Mantenible**: Los cambios en un componente no afectan a otros
    - ✅ **Legible**: El código se explica a sí mismo
