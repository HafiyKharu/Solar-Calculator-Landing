'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import styles from '../styles/contactform.module.css';

// Initialize Supabase client
const supabaseUrl = 'https://gmgpggofykhjnlknuqtb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZ3BnZ29meWtoam5sa251cXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1NTg5MDMsImV4cCI6MjA1NDEzNDkwM30.SBvnnQJNkGmjpkp-cgpYyBaD63D7OLVtdOq6kgttmIs';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ContactForm({ onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\+?(\d.*){3,}$/;
    return re.test(String(phoneNumber));
  };

  const validateName = (name) => {
    const re = /^[A-Za-z\s]+$/;
    return re.test(String(name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(phoneOrEmail) && !validatePhoneNumber(phoneOrEmail)) {
      setMessage('Please enter a valid email or phone number.');
      return;
    }
    if (!validateName(name)) {
      setMessage('Please enter a valid name with alphabetic characters only.');
      return;
    }

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('PotentialCustomer')
      .insert([{ name, phoneOrEmail, location }]);

    if (error) {
      console.error('Error inserting data:', error);
      setMessage('Error submitting form. Please try again.');
    } else {
      console.log('Data inserted:', data);
      setMessage('Form submitted successfully!');
      setName('');
      setPhoneOrEmail('');
      setLocation('');
      onSubmit({ name, phoneOrEmail, location }); // Pass customer details to parent component
      onClose(); // Close the contact form
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
      <div>
        <label htmlFor="location">Location</label>
        <select
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={styles.input}
          required
        >
          <option value="">Select your state</option>
          <option value="Johor">Johor</option>
          <option value="Kedah">Kedah</option>
          <option value="Kelantan">Kelantan</option>
          <option value="Kuala Lumpur">Kuala Lumpur</option>
          <option value="Labuan">Labuan</option>
          <option value="Melaka">Melaka</option>
          <option value="Negeri Sembilan">Negeri Sembilan</option>
          <option value="Pahang">Pahang</option>
          <option value="Perak">Perak</option>
          <option value="Perlis">Perlis</option>
          <option value="Pulau Pinang">Pulau Pinang</option>
          <option value="Putrajaya">Putrajaya</option>
          <option value="Sabah">Sabah</option>
          <option value="Sarawak">Sarawak</option>
          <option value="Selangor">Selangor</option>
          <option value="Terengganu">Terengganu</option>
        </select>
      </div>
      <button type="submit">Submit</button>
      {message && <p className={styles.errorMessage}>{message}</p>}
    </form>
  );
}