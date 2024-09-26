import React, { useState } from 'react';
import axios from 'axios'
const Contact = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    company: '',
    message: ''
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const contactHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contacts', formData);
      console.log('Contact saved successfully:', response.data);
    } catch (error) {
      console.error('There was an error saving the contact!', error);
    }
  };

  return (
    <div id='contact'>
      <h1 className='contact_h1'>CONTACT US</h1>
      <form onSubmit={contactHandler}>
        <input
          type='text'
          name='first_name'
          placeholder='First Name'
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='last_name'
          placeholder='Last Name'
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Type your E-Mail'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type='number'
          name='phone_number'
          placeholder='Type your Number'
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='company'
          placeholder='Type your Company'
          value={formData.company}
          onChange={handleChange}
          required
        />
        <textarea
          name='message'
          placeholder='Write Here.....'
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default Contact;