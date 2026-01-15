import styles from '../styles/Card.module.css'

const Card = ({ product, onClick }) => {
  const { nombre, rareza, codigo, precio, img } = product

  const formatPrice = (value) => new Intl.NumberFormat('es-CO').format(value)

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper} onClick={onClick}>
        <img src={img} alt={nombre} className={styles.image} />
      </div>

      <div className={styles.info}>
        <div className={styles.meta}>
          <span>{nombre}</span>
          <span className={styles.separator}>•</span>
          <span>{rareza}</span>
          <span className={styles.separator}>•</span>
          <span>{codigo}</span>
        </div>

        <div className={styles.price}>$ {formatPrice(precio)} COP</div>
      </div>
    </div>
  )
}

export default Card
