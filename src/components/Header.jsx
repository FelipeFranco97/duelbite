import styles from '../styles/Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <img src="/img/logo.jpeg" alt="Logo" className={styles.logo} />
    </header>
  );
}

export default Header