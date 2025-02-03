'use client';
import { useState } from 'react';
import Image from "next/image";
import Header from "app/components/Header";
import Calculator from "app/components/Calculator";
import Footer from "app/components/Footer";
import styles from "./styles/page.module.css";
import ContactForm from "./components/ContactForm";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [calculationResults, setCalculationResults] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleHidePopup = () => {
    setShowPopup(false);
  };

  const handleCalculate = (results) => {
    setCalculationResults(results);
  };

  const handleCustomerDetails = (details) => {
    setCustomerDetails(details);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.page}>
      <Header />
      <Calculator onShowPopup={handleShowPopup} onCalculate={handleCalculate} />
      {showPopup && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ContactForm onClose={handleHidePopup} onSubmit={handleCustomerDetails} />
        </div>
      )}
      {calculationResults && customerDetails && (
        <div className={styles.result}>
          <h3>Calculation Results</h3>
          <div className={styles.customerDetails}>
            <p><strong>Name:</strong> {customerDetails.name}</p>
            <p><strong>Contact:</strong> {customerDetails.phoneOrEmail}</p>
          </div>
          <table>
            <tbody>
              <tr>
                <td>Target Monthly Savings:</td>
                <td>RM{calculationResults.savings.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Target Bill Monthly Payment:</td>
                <td>RM{calculationResults.billMonthlyPayments.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="2">Monthly Payments for 5 Years:</td>
              </tr>
              {calculationResults.loanMonthlyPayments.map((payment, index) => (
                <tr key={index}>
                  <td>Year {index + 1}:</td>
                  <td>RM{payment.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handlePrint}>Print Quote</button>
        </div>
      )}
      <Footer />
    </div>
  );
}