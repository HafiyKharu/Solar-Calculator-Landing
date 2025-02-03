'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import styles from '../styles/contactform.module.css';

// Initialize Supabase client
const supabaseUrl = 'https://gmgpggofykhjnlknuqtb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZ3BnZ29meWtoam5sa251cXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1NTg5MDMsImV4cCI6MjA1NDEzNDkwM30.SBvnnQJNkGmjpkp-cgpYyBaD63D7OLVtdOq6kgttmIs'
const supabase = createClient(supabaseUrl, supabaseKey)

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Insert data into Supabase
    const { data, error } = await supabase
      .from('PotentialCustomer')
      .insert([{ name, phoneOrEmail }]);

    if (error) {
      console.error('Error inserting data:', error);
      setMessage('Error submitting form. Please try again.');
    } else {
      console.log('Data inserted:', data);
      setMessage('Form submitted successfully!');
      setName('');
      setPhoneOrEmail('');
    }
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <h2>Contact Us</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="phoneOrEmail">Phone or Email</label>
        <input
          type="text"
          id="phoneOrEmail"
          value={phoneOrEmail}
          onChange={(e) => setPhoneOrEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}