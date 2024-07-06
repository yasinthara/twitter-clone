import React, { useState } from 'react';
import './Subscription.css';

const Subscription = () => {
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('basic');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSuccess('Subscription successful! Thank you for subscribing.');
  };

  return (
    <div className="subscription-page">
      <h1>Subscribe to Twitter</h1>
      <form onSubmit={handleSubmit} className="subscription-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="plan">Select Plan:</label>
          <select
            id="plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          >
            <option value="basic">Basic - $5/month</option>
            <option value="premium">Premium - $10/month</option>
            <option value="pro">Pro - $15/month</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button id="rzp-button1" className="subscribe-button">Subscribe
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script></button>

      </form>
    </div>
  );
};

export default Subscription;
