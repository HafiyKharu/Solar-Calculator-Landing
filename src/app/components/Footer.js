import styles from '../styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} Rooftop Energy. All rights reserved.</p>
        <nav>
          <a href="https://rooftop.my/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          <a href="https://rooftop.my/" target="_blank" rel="noopener noreferrer">Terms of Service</a>
          <a href="https://rooftop.my/" target="_blank" rel="noopener noreferrer">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
}