import React, {useState} from 'react';
import { FiFacebook, FiTwitter, FiInstagram} from 'react-icons/fi';
import { FooterOverlay, Newsletter } from '../../components';
import { images } from '../../constants';
import './Footer.css';

const Footer = () => {

  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);;
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });

      if (response.ok) {
        setFeedbackSubmitted(true);
        setFeedback('');
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback', error);
    }
  };

  
  
  return (
      <div className='app__footer section__padding'>
        <FooterOverlay/>
        <Newsletter/>

        <div className='user-feedback'>
          <h3 className='feedback__heading'>We value your feedback</h3>
          {!feedbackSubmitted ? (
            <form onSubmit={handleFeedbackSubmit} className='app__newsletter-input flex__center'>
              <textarea value={feedback} onChange={handleFeedbackChange} placeholder='Enter your Feedback here' required />
              <button type='submit' className='custom__button'>Submit Feedback</button>
            </form>
          ) : (
            <p>Thank you for your feedback</p>
          )}
        </div>

        <div className='app__footer-links'>
          <div className='app__footer-links_contact'>
            <h1 className='app__footer-headtext'>Contact Us</h1>
            <p className='p__opensans'>217 W Huron St, Chicago, IL 60654</p>
            <p className='p__opensans'>+1 3123585530</p>
            <p className='p__opensans'>+1 8154825848</p>
          </div>
          <div className='app__footer-links_logo'>
            <img src={images.indienne} alt='footer_logo'/>
            <p className='p__opensans'>"Experience the rich flavors of India in every bite"</p>
            <img src={images.spoon} alt='spoon' className='spoon__img' style={{marginTop: 15}} />
            <div className='app__footer-links_icons'>
              <FiFacebook/>
              <FiTwitter/>
              <FiInstagram/>
            </div>
          </div>
          <div className='app__footer-links_work'>
          <h1 className='app__footer-headtext'>Working Hours</h1>
            <p className='p__opensans'>Monday-Friday</p>
            <p className='p__opensans'>08:00 am - 12:00am</p>
            <p className='p__opensans'>Saturday-Sunday</p>
            <p className='p__opensans'>07:00 am - 11:00pm</p>
          </div>
        </div>
        <div className='footer__copyright'>
          <p className='p__opensans'>2024 Indienne. All Rights Reserved</p>
        </div>
      </div>
    );
};

export default Footer;
