'use client';
import { useState } from 'react';
import styles from '../styles/calculator.module.css';

const Calculator = ({ onShowPopup, onCalculate }) => {
  const [bill, setBill] = useState(0);
  const [savings, setSavings] = useState(0);
  const [billMonthlyPayments, setBillMonthlyPayments] = useState(0);
  const [loanMonthlyPayments, setLoanMonthlyPayments] = useState([]);

  const T = 0.509; // TNB Tariff: RM0.509/kWh
  const SPC = 3000; // Solar Panel Cost: RM3000/kWp
  const p = 3; // Peak Sun Hours: 3 hours/day
  const r = 0.05; // Interest Rate: 5% p.a
  const Ts = bill * 0.3; // Target Savings: 30% of current bill

  const calculateMonthlyPayments = () => {
    const Me = bill / T; // Monthly Energy (kWh) = Monthly Bill ÷ RM0.509
    const De = Me / 30; // Daily Energy = Monthly Energy ÷ 30
    const SS = De / (p * 0.8); // System Size (kWp) = Daily Energy ÷ (3 hours × 0.8)
    const TSC = SS * SPC; // Total System Cost = System Size × RM3000
    const TMP = bill * 0.7; // Target Monthly Payment = Current Bill × 0.7
    const x = r / 12; 

    let payments = [];
    for (let i = 1; i <= 5; i++) {
      const n = i * 12; // Number of months
      const PMTtop = x * Math.pow((1 + x), n); // (r/12 × (1 + r/12)^n)
      const PMTbot = Math.pow((1 + x), n) - 1; // ((1 + r/12)^n - 1)
      const PMT = TSC * (PMTtop / PMTbot); // Monthly Payment = Total System Cost × (r/12 × (1 + r/12)^n) ÷ ((1 + r/12)^n - 1)
      payments.push(PMT);
    }

    setSavings(Ts);
    setBillMonthlyPayments(TMP);
    setLoanMonthlyPayments(payments);
    onShowPopup(); // Call the callback function to show the contact form
    onCalculate({ savings: Ts, billMonthlyPayments: TMP, loanMonthlyPayments: payments });
  };

  return (
    <div className={styles.calculator}>
      <h2>Solar Savings Calculator</h2>
      <div className={styles.inputGroup}>
        <label htmlFor="bill">Monthly TNB Bill Amount (RM):</label>
        <input
          type="number"
          id="bill"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        />
      </div>
      <button type='submit' onClick={calculateMonthlyPayments}>Calculate Savings</button>
    </div>
  );
};

export default Calculator;