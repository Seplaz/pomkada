import styles from './Footer.module.css';
import Heart from '/heart.svg';

type FooterProps = {
  text: string;
}

export const Footer = (props: FooterProps) => {
  const { text } = props;

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>{text}</p>
      <img src={Heart} alt="Сердечко" />
    </footer>
  )
}