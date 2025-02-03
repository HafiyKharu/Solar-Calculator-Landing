import styles from "../styles/header.module.css";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className={styles.logo}>
          <Image
            src="/logo.svg"
            alt="Rooftop Energy Logo"
            width={60}
            height={40}
          />
        </div>
        <div>
          <nav className={styles.nav}>
            <Link href="/">Home</Link>
            <Link
              href="https://rooftop.my/"
              target="_blank"
              rel="noopener noreferrer"
            >
              About
            </Link>
            <Link
              href="https://rooftop.my/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Services
            </Link>
            <Link
              href="https://rooftop.my/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
