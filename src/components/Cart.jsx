import { useEffect, useState } from 'react'
import styles from '../styles/Cart.module.css'

const Cart = ({ items = [], onClose, onRemove, onUpdateQuantity }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!items) return

    const prev = document.body.style.overflowY
    document.body.style.overflowY = 'hidden'

    return () => {
      document.body.style.overflowY = prev
    }
  }, [items])

  const total = items.reduce((s, it) => s + (it.precio || 0) * (it.quantity || 1), 0)
  const formatPrice = (v) => new Intl.NumberFormat('es-CO').format(v)

  if (!items) return null

  const generateLink = async () => {
    try {
      const payload = { items }
      const json = JSON.stringify(payload)
      const LZString = (await import('lz-string')).default
      const compressed = LZString.compressToEncodedURIComponent(json)
      const url = `${window.location.origin}${window.location.pathname}?order=${compressed}`

      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error('Error generando link', err)
      alert('Error al generar el link')
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Carrito ({items.length})</h2>
          <button className={styles.close} onClick={onClose}>Cerrar</button>
        </div>

        <div className={styles.list}>
          {items.length === 0 && <div className={styles.empty}>Tu carrito está vacío</div>}

          {items.map((it, idx) => (
            <div className={styles.item} key={`${it.id}-${idx}`}>
              <img src={it.img} alt={it.nombre} />

              <div className={styles.info}>
                <div className={styles.name}>{it.nombre}</div>
                <div className={styles.price}>$ {formatPrice(it.precio)} COP</div>
              </div>

              <div className={styles.qty}>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity?.(idx, (it.quantity || 1) - 1)}
                  aria-label={`Disminuir cantidad de ${it.nombre}`}
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={it.quantity || 1}
                  onChange={(e) => onUpdateQuantity?.(idx, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => onUpdateQuantity?.(idx, (it.quantity || 1) + 1)}
                  aria-label={`Aumentar cantidad de ${it.nombre}`}
                >
                  +
                </button>
              </div>

              <div className={styles.lineTotal}>$ {formatPrice((it.precio || 0) * (it.quantity || 1))}</div>

              <button className={styles.remove} onClick={() => onRemove?.(idx)}>Eliminar</button>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.total}>Total: $ {formatPrice(total)} COP</div>
          <div>
            <button className={styles.cartGenerate} type="button" onClick={generateLink}>Generar link</button>
            {copied && <span className={styles.copied}>Link copiado al portapapeles</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
