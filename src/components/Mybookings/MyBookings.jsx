import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './MyBookings.css';

const MyBookings = () => {
  const user = useSelector((state) => state.auth.user);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings?userId=${user.id}`);
        const data = await response.json();

        if (!response.ok) {
          console.error('Failed to fetch bookings:', data.error);
        } else {
          setBookings(data);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (!user) {
    return <p>Please log in to view your bookings.</p>;
  }

  return (
    <div className="my-bookings">
      <h1 className="my-bookings__heading">My Bookings</h1>
      {bookings.length > 0 ? (
        <ul className="my-bookings__list">
          {bookings.map((booking) => (
            <li key={booking.id} className="my-bookings__item">
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Guests:</strong> {booking.guests}</p>
              <p><strong>Special Requests:</strong> {booking.specialRequests || 'None'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;
