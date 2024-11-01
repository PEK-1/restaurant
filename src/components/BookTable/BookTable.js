import React, { useState } from 'react';
import './BookTable.css'
import SubHeading from '../SubHeading/SubHeading';
const BookTable = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Table booked for ${guests} guests on ${date} at ${time}`);
  };

  return (
    <div className='book-table'>
      <h2>"Don't just eat, indulge! Secure your spot at our table for an unforgettable dining experience."</h2>
      <SubHeading title='Book a Table' />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        <input type="number" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} />
        <button type="submit">Book Table</button>
      </form>
    </div>
  );
};

export default BookTable;
