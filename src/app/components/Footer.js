import styles from '../styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} Rooftop Energy. All rights reserved.</p>
        <nav>
          <a href="mailto:sales@rooftop.my">* Sales</a>
          <a href="mailto:partnerships@rooftop.my">* Partnerships</a>
          <a href="mailto:investors@rooftop.my">* Investors</a>
        </nav>
      </div>
    </footer>
  );
}