import Image from "next/image";
import Header from "app/components/Header";
import Calculator from "app/components/Calculator";
import Footer from "app/components/Footer";
import styles from "./styles/page.module.css";
import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header/>
      <Calculator />
      <ContactForm/>
    </div>
  );
}