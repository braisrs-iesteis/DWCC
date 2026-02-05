# React Router: Navegación en Aplicaciones React

React Router es la biblioteca estándar de facto para gestionar la navegación y el enrutamiento en aplicaciones React. Permite crear aplicaciones de página única (SPA) con múltiples vistas sin recargar la página.

!!! abstract "¿Qué es React Router?"
    React Router te permite cambiar lo que se muestra en pantalla basándose en la URL del navegador, manteniendo la UI sincronizada con la URL y permitiendo la navegación sin recargas completas de página.

## ¿Por qué Necesitamos React Router?

### El Problema de las SPAs

En una aplicación React tradicional, tienes un único archivo HTML. Sin React Router:
- ❌ Solo puedes tener una "página" (URL)
- ❌ No puedes compartir enlaces a secciones específicas
- ❌ Los botones de navegador (atrás/adelante) no funcionan correctamente
- ❌ No hay separación lógica entre diferentes vistas

### La Solución

React Router permite:
- ✅ **Múltiples rutas** en una SPA
- ✅ **URLs navegables** que se pueden compartir
- ✅ **Historial del navegador** funcional
- ✅ **Navegación declarativa** mediante componentes

## Instalación

=== "npm"
    ```bash
    npm install react-router-dom
    ```

=== "yarn"
    ```bash
    yarn add react-router-dom
    ```

=== "pnpm"
    ```bash
    pnpm add react-router-dom
    ```

!!! warning "Versión 6"
    Esta guía cubre **React Router v6**, que tiene diferencias significativas con v5. Asegúrate de instalar la versión correcta.

## Conceptos Fundamentales

### 1. BrowserRouter

Es el componente raíz que envuelve toda tu aplicación. Usa la API de History del navegador para mantener la UI sincronizada con la URL.

```javascript
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

!!! tip "Alternativa: HashRouter"
    Si tu servidor no soporta rutas limpias (URLs sin `#`), puedes usar `HashRouter` en lugar de `BrowserRouter`. Las URLs tendrán este formato: `example.com/#/about`

### 2. Routes y Route

Define qué componente renderizar según la URL actual.

```javascript
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
```

### 3. Link y NavLink

Componentes para crear enlaces de navegación sin recargar la página.

```javascript
import { Link, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      {/* Link básico */}
      <Link to="/">Inicio</Link>
      <Link to="/about">Acerca de</Link>
      
      {/* NavLink añade clase 'active' automáticamente */}
      <NavLink 
        to="/contact"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Contacto
      </NavLink>
    </nav>
  );
}
```

!!! warning "Nunca uses `<a href>`"
    En React Router, siempre usa `<Link>` o `<NavLink>`. Usar `<a href>` provocará una recarga completa de la página.

## Ejemplo Básico Completo

```javascript
// main.jsx o index.jsx
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

```javascript
// App.jsx
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/about">Acerca de</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contacto</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

// Componentes de página
function Home() {
  return <h1>Bienvenido a la página de inicio</h1>;
}

function About() {
  return <h1>Acerca de nosotros</h1>;
}

function Blog() {
  return <h1>Blog</h1>;
}

function Contact() {
  return <h1>Contacto</h1>;
}

function NotFound() {
  return <h1>404 - Página no encontrada</h1>;
}
```

## Parámetros de URL

### URL Params (Parámetros Dinámicos)

Captura valores desde la URL para crear rutas dinámicas.

```javascript
import { Routes, Route, useParams, Link } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/user/:username" element={<UserProfile />} />
    </Routes>
  );
}

// Componente que usa el parámetro
function ProductDetail() {
  const { id } = useParams(); // Extrae el parámetro de la URL
  
  return (
    <div>
      <h1>Producto #{id}</h1>
      <p>Mostrando detalles del producto {id}</p>
    </div>
  );
}

// Lista que genera enlaces dinámicos
function ProductList() {
  const products = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Mouse' },
    { id: 3, name: 'Teclado' }
  ];
  
  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Query Params (Parámetros de Búsqueda)

Para filtros, búsquedas, paginación, etc. Formato: `?key=value&key2=value2`

```javascript
import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Leer parámetros
  const category = searchParams.get('category'); // /products?category=laptops
  const page = searchParams.get('page') || '1';
  const sort = searchParams.get('sort') || 'name';
  
  // Actualizar parámetros
  const handleFilterChange = (newCategory) => {
    setSearchParams({ category: newCategory, page: '1' });
  };
  
  return (
    <div>
      <h1>Productos - Categoría: {category || 'Todas'}</h1>
      <p>Página: {page}, Ordenar por: {sort}</p>
      
      <button onClick={() => handleFilterChange('laptops')}>
        Laptops
      </button>
      <button onClick={() => handleFilterChange('mice')}>
        Ratones
      </button>
      
      {/* URL resultante: /products?category=laptops&page=1 */}
    </div>
  );
}
```

## Rutas Anidadas (Nested Routes)

Permite crear layouts con subrutas.

```javascript
import { Routes, Route, Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* Ruta padre con layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Rutas hijas */}
        <Route index element={<DashboardHome />} />
        <Route path="stats" element={<Stats />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

// Layout padre - incluye navegación compartida
function DashboardLayout() {
  return (
    <div className="dashboard">
      <aside>
        <h2>Dashboard</h2>
        <nav>
          <Link to="/dashboard">Inicio</Link>
          <Link to="/dashboard/stats">Estadísticas</Link>
          <Link to="/dashboard/settings">Configuración</Link>
        </nav>
      </aside>
      
      <main>
        {/* Aquí se renderizan las rutas hijas */}
        <Outlet />
      </main>
    </div>
  );
}

function DashboardHome() {
  return <h1>Bienvenido al Dashboard</h1>;
}

function Stats() {
  return <h1>Estadísticas</h1>;
}

function Settings() {
  return <h1>Configuración</h1>;
}
```

!!! info "Index Route"
    La prop `index` indica la ruta predeterminada que se muestra cuando accedes exactamente al path del padre (`/dashboard` renderiza `<DashboardHome />`).

## Navegación Programática

Navega mediante código en lugar de con enlaces.

```javascript
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleLogin = async (credentials) => {
    try {
      await loginUser(credentials);
      // Redirigir al dashboard después del login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login fallido');
    }
  };
  
  const handleCancel = () => {
    // Volver a la página anterior
    navigate(-1); // Equivalente al botón "atrás" del navegador
  };
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleLogin({ username: '...', password: '...' });
    }}>
      <input type="text" placeholder="Usuario" />
      <input type="password" placeholder="Contraseña" />
      <button type="submit">Iniciar Sesión</button>
      <button type="button" onClick={handleCancel}>Cancelar</button>
    </form>
  );
}
```

### Opciones de navigate

```javascript
// Navegar a una ruta
navigate('/home');

// Navegar con reemplazo (no añade historial)
navigate('/home', { replace: true });

// Navegar con estado
navigate('/profile', { state: { from: 'login' } });

// Navegar hacia atrás/adelante
navigate(-1); // Atrás
navigate(-2); // Dos páginas atrás
navigate(1);  // Adelante
```

## Rutas Protegidas (Protected Routes)

Patrón común para rutas que requieren autenticación.

```javascript
import { Navigate } from 'react-router-dom';

// Componente wrapper para rutas protegidas
function ProtectedRoute({ children }) {
  const isAuthenticated = checkAuth(); // Tu lógica de autenticación
  
  if (!isAuthenticated) {
    // Redirige al login si no está autenticado
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Uso en la configuración de rutas
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Ruta protegida */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* También funciona con rutas anidadas */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="users" element={<UserManagement />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}
```

## Hooks Importantes

### useLocation

Obtiene información sobre la ubicación actual.

```javascript
import { useLocation } from 'react-router-dom';

function CurrentPath() {
  const location = useLocation();
  
  console.log(location.pathname);  // "/products/123"
  console.log(location.search);    // "?category=laptops"
  console.log(location.hash);      // "#reviews"
  console.log(location.state);     // Estado pasado desde navigate
  
  return <p>Ruta actual: {location.pathname}</p>;
}
```

### useParams

Ya visto antes - extrae parámetros dinámicos de la URL.

### useSearchParams

Ya visto antes - maneja query strings.

### useNavigate

Ya visto antes - navegación programática.

## Mejores Prácticas

!!! tip "Organización de Rutas"
    **1. Centraliza la configuración de rutas**
    ```javascript
    // routes.jsx
    export const routes = [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/products/:id', element: <ProductDetail /> }
    ];
    
    // App.jsx
    import { routes } from './routes';
    
    function App() {
      return (
        <Routes>
          {routes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
      );
    }
    ```

!!! tip "Lazy Loading"
    **2. Carga componentes bajo demanda para mejorar el rendimiento**
    ```javascript
    import { lazy, Suspense } from 'react';
    
    const Dashboard = lazy(() => import('./pages/Dashboard'));
    const Profile = lazy(() => import('./pages/Profile'));
    
    function App() {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Suspense>
      );
    }
    ```

!!! tip "Estructura de Carpetas"
    **3. Organiza tus páginas/vistas en una carpeta dedicada**
    ```
    src/
    ├── pages/
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── products/
    │   │   ├── ProductList.jsx
    │   │   └── ProductDetail.jsx
    │   └── NotFound.jsx
    ├── components/
    │   └── Navigation.jsx
    └── App.jsx
    ```

!!! warning "Errores Comunes"
    - ❌ Olvidar envolver la app en `<BrowserRouter>`
    - ❌ Usar `<a href>` en lugar de `<Link to>`
    - ❌ No definir una ruta `path="*"` para 404
    - ❌ Olvidar `<Outlet />` en layouts con rutas anidadas

## Ejemplo Práctico Completo: Blog con React Router

```javascript
// main.jsx
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

```javascript
// App.jsx
import { Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <header>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">Acerca de</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

// Páginas
function Home() {
  return (
    <div>
      <h1>Bienvenido</h1>
      <p>Este es mi blog personal</p>
    </div>
  );
}

function BlogList() {
  const posts = [
    { slug: 'intro-react', title: 'Introducción a React' },
    { slug: 'hooks-guia', title: 'Guía de Hooks' },
    { slug: 'react-router', title: 'React Router Explicado' }
  ];

  return (
    <div>
      <h1>Artículos del Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BlogPost() {
  const { slug } = useParams();
  
  // En una app real, harías fetch del post según el slug
  return (
    <article>
      <h1>Artículo: {slug}</h1>
      <p>Contenido del artículo aquí...</p>
      <Link to="/blog">← Volver al blog</Link>
    </article>
  );
}

function About() {
  return <h1>Acerca de este sitio</h1>;
}

function NotFound() {
  return (
    <div>
      <h1>404 - Página no encontrada</h1>
      <Link to="/">Ir al inicio</Link>
    </div>
  );
}

export default App;
```

## Recursos Adicionales

!!! info "Documentación Oficial"
    - [React Router Docs](https://reactrouter.com/) - Documentación oficial (en inglés)
    - [Tutorial Oficial](https://reactrouter.com/en/main/start/tutorial) - Tutorial interactivo

!!! success "Próximos Pasos"
    Una vez domines React Router básico, investiga:
    - **Loaders y Actions** (v6.4+) - Carga de datos integrada
    - **Error Boundaries** - Manejo de errores por ruta
    - **Data Routers** - `createBrowserRouter` para apps más complejas
    - **Scroll Restoration** - Restaurar posición del scroll
