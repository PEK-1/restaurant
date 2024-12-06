import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import './Admin.css';
import MenuItem from '../Menuitem/MenuItem';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Admin = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [feedbackList, setFeedbackList] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [formData, setFormData] = useState({ title: '', price: '', tags: '' });
  const [message, setMessage] = useState([]);
  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Reservations',
        data: [10, 20, 15, 30, 25], // Example data
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/orders/count')
      .then((response) => response.json())
      .then((data) => setOrderCount(data.count || 0))
      .catch((error) => console.error('Error fetching order count:', error));

    fetch('http://localhost:5000/api/feedback')
      .then((response) => response.json())
      .then((data) => setFeedbackList(data))
      .catch((error) => console.error('Error fetching feedback:', error));

      fetch('http://localhost:5000/api/menu')  
      .then((response) => response.json())
      .then((data) => setMenuData(data))
      .catch((error) => console.error('Error fetching menu items:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Menu item added successfully!');
        setMenuData((prevData) => [...prevData, data]);  
        setFormData({ title: '', price: '', tags: '' });
      } else {
        setMessage(data.error || 'Failed to add menu item');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong, please try again later');
    }
  };

  return (
    <div style={{ fontFamily: 'var(--font-base)' }} className="admin-container">
      <h1 style={{ color: 'var(--color-golden)' }}>Welcome, Admin</h1>
      <p style={{ color: 'var(--color-golden)' }}>
        Here you can view reservations and user feedback.
      </p>
      <div className="admin-dashboard">
        <div className="dashboard-item">
            <h3>Add New Menu Item</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange}  required />
              </div>
              <div>
                <label>Price:</label>
                <input type="text" name="price" value={formData.price} onChange={handleChange} required />
              </div>
              <div>
                <label>Tags:</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleChange} required />
              </div>
              <button type="submit">Add Menu Item</button>
            </form>
            {message && <p>{message}</p>}
          </div>
          <div className="dashboard-item">
            <h3>Menu Items</h3>
            <div className="menu-list">
              {menuData.map((item) => (
                <MenuItem key={item.id} title={item.title} price={item.price} tags={item.tags} />
              ))}
            </div>
          </div>
        <div className="dashboard-item reservations-box">
          <h3>View Reservations</h3>
          <p>Total Orders: <strong>{orderCount}</strong></p>
          <div className="bar-chart">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true, position: 'top' },
                  title: { display: true, text: 'Monthly Reservations' },
                },
              }}
            />
          </div>
        </div>

        <div className="dashboard-item">
         <h3>User Feedback</h3>
        <ul>
          {feedbackList.map((feedback, index) => (
          <li key={index}>
          <p>{feedback.content}</p>
          <small>
           <strong>Submitted on:</strong> {feedback.created_at || 'Date not available'}
          </small>
        </li>
        ))}
    </ul>
</div>

      </div>
    </div>
  );
};

export default Admin;
