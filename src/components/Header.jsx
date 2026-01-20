import styles from '../styles/Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
  <div className={styles.leftLogoGroup}>
    <img src="/img/BW Logo.png" alt="BW Logo" className={styles.logoMark} />
    <img src="/img/Letras_black_Widow.png" alt="Black Widow" className={styles.logoText} />
  </div>

  <img src="/img/logo.png" alt="Logo" className={styles.mainLogo} />

  <img src="/img/Logo definitivo 3.png" alt="Logo definitivo" className={styles.rightLogo} />
</header>
  );
}

export default Header;