import React, { useState, useEffect } from 'react';
import './BookTable.css'
import { images } from '../../constants';
import SubHeading from '../SubHeading/SubHeading';

const BookTable = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [ bookings, setBookings ] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/bookings'); 
      const data = await response.json();
      if (response.ok) {
        setBookings(data);
      } else {
        console.error('Error fetching bookings:', data.error);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);


  const calculateAvailableSlots = (selectedDate) => {
    const slots = [];
    const startTime = new Date(`${selectedDate}T10:00`); 
    const endTime = new Date(`${selectedDate}T22:00`); 

    while (startTime < endTime) {
      const timeString = startTime.toTimeString().substring(0, 5); 
      const bookingsForTime = bookings.filter(
        (booking) => booking.date === selectedDate && booking.time === timeString
      );
      if (bookingsForTime.length < 25) {
        slots.push(timeString); 
      }
      startTime.setMinutes(startTime.getMinutes() + 30); 
    }

    setAvailableSlots(slots);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    calculateAvailableSlots(selectedDate); 
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = { name, date, time, guests, email, phone };

    const totalGuestsForDate = bookings.filter((booking) => booking.date === date).length;

  if (totalGuestsForDate >= 25) {
    alert('Booking limit reached for the selected date. Please choose another date.');
    return;
  }  

    try {
      const response = await fetch('http://localhost:3001/api/book-table', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Table booked successfully! A Confirmation message will be sent to your Email...');

        window.Email.send({
          SecureToken: "f8100048-74cd-4308-9cb2-aa7d2ed78cfa",
          To: email,
          From: "worktogain24@gmail.com",
          Subject: "Table Booking Confirmation",
          Body: "<h1> HI this is text email </h1>",
        }).then((message) => {
          console.log("SMTP.js Test Response:", message);
        }).catch((error) => {
          console.error("SMTP.js Test error:", error);
          alert('didnt work')
        });

        setName('');
        setEmail('');
        setPhone('');
        setDate('');
        setTime('');
        setGuests(1);
        setShowPopup(false);
        fetchBookings();
      } else {
        alert(result.error || 'An error occurred while booking.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while booking.');
    }
  };

  return (
    <div className='book-table-container'>
    <div className='book-table'>
      <SubHeading title='Book a Table' />
      <h1 className='Booktable_heading'>Don't just eat, <br /> indulge!</h1> 
        <p className='p__opensans' style={{ margin: '2rem 0' }}> Secure your spot at our table for an unforgettable dining experience.</p>
        <button className='custom__button' onClick={() => setShowPopup(true)}>
          Book a Table
        </button>
    </div>
    <div className='book-table-image'>
      <img src={images.Plate} alt='diningtable' />
    </div>

    {showPopup && (
        <div className='popup-container'>
          <div className='popup'>
            <SubHeading title='Book Your Table'/>
            <form onSubmit={handleSubmit}>
              <input type='text' placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} required style={{fontFamily: 'var(--font-base)'}}/>
              <input type='email' placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required style={{fontFamily: 'var(--font-base)'}} />
              <input type= 'number' placeholder='Your Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} required style={{fontFamily: 'var(--font-base)'}} />
              <input type='date' value={date} onChange={handleDateChange} required  style={{fontFamily: 'var(--font-base)'}}/>
              <select value={time} onChange={(e) => setTime(e.target.value)} required style={{fontFamily: 'var(--font-base)', background: 'var(--color-golden)'}} >
                <option  value=''>Select Time</option>
                {availableSlots.map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </select>              
              <input type='number' min='1' max='25' value={guests} onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (value <= 25 ) {
                  setGuests(value);
                }
              }}
              required
              style={{fontFamily: 'var(--font-base)'}} />
              <div className='popup-buttons'>
                <button className='custom__button' type='submit'>Confirm Booking</button>
                <button  style={{fontFamily: 'var(--font-base)', background: 'var(--color-grey)'}} type='button' onClick={() => setShowPopup(false)} > Cancel </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookTable;
