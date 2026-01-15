import { useEffect } from 'react'
import styles from '../styles/Modal.module.css'

const Modal = ({ product, onClose, onAddToCart }) => {
  useEffect(() => {
    if (!product) return;

    const previousOverflow = document.body.style.overflowY;
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = previousOverflow;
    };
  }, [product]);

  if (!product) return null

  const { nombre, codigo, rareza, descripción, precio, img } = product

  const formatPrice = (value) => new Intl.NumberFormat('es-CO').format(value)

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>
        <div className={styles.info}>
          <span className={styles.code}>{codigo}</span>
          <h2 className={styles.name}>{nombre}</h2>

          <div className={styles.rarity}>
            <strong>Rareza:</strong> {rareza}
          </div>

          <p className={styles.description}>{descripción}</p>

          <div className={styles.bottom}>
            <div className={styles.price}>$ {formatPrice(precio)} COP</div>

            <button
              className={styles.button}
              type="button"
              onClick={() => {
                onAddToCart?.(product);
              }}
            >
              Agregar al carrito
            </button>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <img src={img} alt={nombre} />
        </div>
      </div>
    </div>
  )
}

export default Modal
