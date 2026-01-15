import styles from '../styles/Footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {currentYear} Duel & Bite. Todos los derechos reservados.
      </p>
    </footer>
  )
}

export default Footer
