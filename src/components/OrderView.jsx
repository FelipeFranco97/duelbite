import { useEffect, useState } from 'react'
import styles from '../styles/Cart.module.css'

const OrderView = ({ compressed, onClose }) => {
  const [payload, setPayload] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const LZString = (await import('lz-string')).default
        const json = LZString.decompressFromEncodedURIComponent(compressed)
        const data = JSON.parse(json)
        if (!cancelled) setPayload(data)
      } catch (e) {
        console.error('Error decoding order', e)
        if (!cancelled) setError(e)
      }
    })()

    return () => { cancelled = true }
  }, [compressed])

  if (error) return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Pedido inválido</h2>
          <button className={styles.close} onClick={onClose}>Cerrar</button>
        </div>
        <div className={styles.list}>
          <div className={styles.empty}>No se pudo leer el pedido desde el enlace.</div>
        </div>
      </div>
    </div>
  )

  if (!payload) return null

  const items = payload.items || []
  const total = items.reduce((s, it) => s + (it.precio || 0) * (it.quantity || 1), 0)
  const formatPrice = (v) => new Intl.NumberFormat('es-CO').format(v)

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Pedido ({items.length})</h2>
          <button className={styles.close} onClick={onClose}>Cerrar</button>
        </div>

        <div className={styles.list}>
          {items.length === 0 && <div className={styles.empty}>El pedido está vacío</div>}

          {items.map((it, idx) => (
            <div className={styles.item} key={`${it.id}-${idx}`}>
              <img src={it.img} alt={it.nombre} />
              <div className={styles.info}>
                <div className={styles.name}>{it.nombre}</div>
                <div className={styles.price}>Cantidad: {it.quantity || 1} · $ {formatPrice((it.precio || 0) * (it.quantity || 1))} COP</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.total}>Total: $ {formatPrice(total)} COP</div>
        </div>
      </div>
    </div>
  )
}

export default OrderView