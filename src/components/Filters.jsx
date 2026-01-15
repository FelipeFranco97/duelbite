import { useState, useEffect } from 'react'
import styles from '../styles/Filters.module.css'

const Filters = ({ products = [], onChange, cartCount = 0, onOpenCart, isMobile = false, isExpanded = false, onToggleExpanded }) => {
  const [search, setSearch] = useState('')
  const [selectedRarezas, setSelectedRarezas] = useState(new Set())
  const [selectedProductos, setSelectedProductos] = useState(new Set())

  const rarezas = Array.from(new Set(products.map((p) => p.rareza))).filter(Boolean)
  const productos = Array.from(new Set(products.map((p) => p.producto))).filter(Boolean)

  useEffect(() => {
    onChange?.({
      search: search.trim(),
      rarezas: Array.from(selectedRarezas),
      productos: Array.from(selectedProductos),
    })
  }, [search, selectedRarezas, selectedProductos, onChange])

  const toggleRareza = (r) => {
    const next = new Set(selectedRarezas)
    if (next.has(r)) next.delete(r)
    else next.add(r)
    setSelectedRarezas(next)
  }

  const toggleProducto = (p) => {
    const next = new Set(selectedProductos)
    if (next.has(p)) next.delete(p)
    else next.add(p)
    setSelectedProductos(next)
  }

  const clearAll = () => {
    setSearch('')
    setSelectedRarezas(new Set())
    setSelectedProductos(new Set())
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h3>Filtros</h3>
        <div className={styles.headerActions}>
          {isMobile && (
            <button className={styles.cartButtonSmall} onClick={() => onOpenCart?.()}>
              🛒 ({cartCount})
            </button>
          )}
          {isMobile && (
            <button className={styles.toggle} onClick={onToggleExpanded}>
              {isExpanded ? '✕' : '☰'}
            </button>
          )}
        </div>
        {!isMobile && <button className={styles.clear} onClick={clearAll}>Limpiar</button>}
      </div>

      {(!isMobile || isExpanded) && (
        <>
          {!isMobile && (
            <div className={styles.cartWrapTop}>
              <button className={styles.cartButton} onClick={() => onOpenCart?.()}>
                Ver carrito ({cartCount})
              </button>
            </div>
          )}

          <div className={styles.searchWrapper}>
            <label className={styles.searchLabel} htmlFor="search">🔍 Buscar</label>
            <input
              id="search"
              className={styles.search}
              placeholder="Nombre o descripción"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.group}>
            <h4>Rareza</h4>
            {rarezas.map((r) => (
              <label key={r} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedRarezas.has(r)}
                  onChange={() => toggleRareza(r)}
                />
                <span className={styles.checkboxText}>{r}</span>
              </label>
            ))}
          </div>

          <div className={styles.group}>
            <h4>Producto</h4>
            {productos.map((p) => (
              <label key={p} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedProductos.has(p)}
                  onChange={() => toggleProducto(p)}
                />
                <span className={styles.checkboxText}>{p}</span>
              </label>
            ))}
          </div>

          {isMobile && (
            <div className={styles.cartWrap}>
              <button className={styles.clear} onClick={clearAll}>Limpiar</button>
            </div>
          )}
        </>
      )}
    </aside>
  )
}

export default Filters
