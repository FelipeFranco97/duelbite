import { PRODUCTS } from "./data/products"
import ProductGrid from "./components/ProductGrid"
import Filters from "./components/Filters"
import Header from "./components/Header"
import AdvertisingBanner from "./components/AdvertisingBanner"
import Footer from "./components/Footer"
import { useState, useMemo, useCallback, useEffect } from "react"
import Modal from "./components/Modal"
import Cart from "./components/Cart"
import OrderView from "./components/OrderView"
import "./App.css"

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [filters, setFilters] = useState({ search: '', rarezas: [], productos: [] })
  const [filtersVersion, setFiltersVersion] = useState(0)

  const handleFiltersChange = useCallback((next) => {
    setFilters(next)
    setFiltersVersion((v) => v + 1)
  }, [])

  const filteredProducts = useMemo(() => {
    const search = (filters.search || '').toLowerCase()
    return PRODUCTS.filter((p) => {
      // search by nombre or descripción
      const matchesSearch = !search || (p.nombre && p.nombre.toLowerCase().includes(search)) || (p.descripción && p.descripción.toLowerCase().includes(search))

      const matchesRareza = !filters.rarezas || filters.rarezas.length === 0 || filters.rarezas.includes(p.rareza)
      const matchesProducto = !filters.productos || filters.productos.length === 0 || filters.productos.includes(p.producto)

      return matchesSearch && matchesRareza && matchesProducto
    })
  }, [filters])

  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [orderCompressed, setOrderCompressed] = useState(null)

  const [mobileFiltersExpanded, setMobileFiltersExpanded] = useState(false)

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1126)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1126)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const addToCart = (product) => {
    setCart((s) => {
      const idx = s.findIndex((it) => it.id === product.id)
      if (idx !== -1) {
        return s.map((it, i) => i === idx ? { ...it, quantity: Math.min(100, (it.quantity || 1) + 1) } : it)
      }
      return [...s, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (index) => {
    setCart((s) => s.filter((_, i) => i !== index))
  }

  const updateQuantity = (index, quantity) => {
    const q = Math.max(1, Math.min(100, Number(quantity) || 1))
    setCart((s) => s.map((it, i) => i === index ? { ...it, quantity: q } : it))
  }

  // detectar order en URL y abrir la vista de pedido
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const order = params.get('order')
    if (order) {
      setOrderCompressed(order)
    }
  }, [])

  return (
    <>
     
      <AdvertisingBanner />
      <div className="layout">
        <aside className="sidebar">
          <Filters products={PRODUCTS} onChange={handleFiltersChange} cartCount={cart.length} onOpenCart={() => setCartOpen(true)} isMobile={isMobile} isExpanded={mobileFiltersExpanded} onToggleExpanded={() => setMobileFiltersExpanded(!mobileFiltersExpanded)} />
        </aside>

        <main className="main">
        <ProductGrid
          products={filteredProducts}
          onSelect={setSelectedProduct}
          resetKey={filtersVersion}
        />

        <Modal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p) => addToCart(p)}
        />

        {cartOpen && (
          <Cart
            items={cart}
            onClose={() => setCartOpen(false)}
            onRemove={(i) => removeFromCart(i)}
            onUpdateQuantity={(i, q) => updateQuantity(i, q)}
          />
        )}

        {orderCompressed && (
          <OrderView
            compressed={orderCompressed}
            onClose={() => {
              setOrderCompressed(null)
              // quitar query param para que no vuelva a abrirse
              const url = new URL(window.location.href)
              url.searchParams.delete('order')
              window.history.replaceState({}, '', url.toString())
            }}
          />
        )}
      </main>
    </div>
    <Footer />
    </>
  )
}

export default App
