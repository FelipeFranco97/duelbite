import styles from '../styles/AdvertisingBanner.module.css'

const AdvertisingBanner = () => {
  return (
    <div className={styles.banner}>
      <p className={styles.text}>
        Aprende a jugar a Souls in Xtinction en Medellín en Draco Hobbies, y compra tus accesorios para tus TCG favoritos en{' '}
        <a href="https://dracostore.co/" target="_blank" rel="noopener noreferrer" className={styles.link}>
          dracostore.co
        </a>
      </p>
    </div>
  )
}

export default AdvertisingBanner
