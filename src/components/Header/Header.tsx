import styles from './Header.module.css';
import Logo from '/logo.svg';

export const Header = () => {

  return (
    <header className={styles.header}>
      <img className={styles.logo} src={Logo} alt='Логотип' />
    </header>
  )
}