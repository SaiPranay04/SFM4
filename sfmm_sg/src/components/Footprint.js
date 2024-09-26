import React, { useState, useEffect } from 'react';
import './Footprint.css';
import axios from 'axios';

const Footprint = () => {

  const [formData, setFormData] = useState({
   company_total_employees: '',
   company_sector: '',
   office_heating_source: '',
   office_surface_area: '',
   fleet_totalcars: '',
   fleet_km_avg: '',
   travel_short_flight: '',
   travel_long_flight: '',
   travel_train: '',
   IT_laptop: '', 
   IT_mobile: '',
   IT_monitor: '',
   IT_desktop: ''
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
      const response = await axios.post('http://localhost:5000/api/organizationcalculations', formData);
      console.log('Details stored successfully:', response.data);
    } catch (error) {
      console.error('There was an error saving the contact!', error);
    }
  };



  return (
    <div id="Form" onSubmit={contactHandler}> 
      <div className="form-nav">
        <h1 className='form-h1'>Organization<br />CALCULATOR</h1>
      </div>
      <div className="form-container2">
        <form>
          <h1 className='footprint-h1'>Fill the details below</h1>

          <div className='form-group'>
            <p className='footprint-p'>Company</p>
            <label htmlFor='no_of_employees'>How many employees are currently working at your company?:</label><br />
            <input type='number'
             id='no_of_employees' 
             name='company_total_employees' 
             className='form-control' 
             placeholder='Number of employees'
             value={formData.company_total_employees}
             onChange={handleChange}
             required /><br />
          </div>

          <div className='form-group'>
            <label htmlFor='company_sector'>What is your company sector?:</label><br />
            <select id='company_sector' 
            className='form-control' 
            name='company_sector' 
            value={formData.company_sector}
            onChange={handleChange}
            required>
              <option value=''>Select sector</option>
              <option value='tech'>Tech</option>
              <option value='finance'>Finance</option>
              <option value='healthcare'>Healthcare</option>
              <option value='education'>Education</option>
              <option value='other'>Other</option>
            </select><br />

          </div>

          <div className='form-group'>
            <p>Office</p>
            <label htmlFor='energy-sorce'>What is your heating source?:</label><br />
            <select id='energy-sorce' 
            className='form-control'
            name='office_heating_source'
            value={formData.office_heating_source}
            onChange={handleChange}
            required>
              <option value=''>Select an option</option>
              <option value='Electricity'>Electricity</option>
              <option value='Natural gas'>Natural gas</option>
              <option value='Domestic Fuel Oil'>Domestic Fuel Oil</option>
              <option value='Biogas'>Biogas</option>
              <option value='Green Electricity'>Green Electricity</option>
              <option value='Heating Network'>Heating Network</option>
            </select><br />
          </div>

          <div className='form-group'>
            <label htmlFor='office_area'>What is the surface area of your office (in sq meters)?:</label><br />
            <input type='number' 
            id='office_area' 
            className='form-control' 
            name='office_surface_area'
            placeholder='Surface area in sq meters'
            value={formData.office_surface_area}
            onChange={handleChange}
            required />
            <br />
          </div>

          <div className='form-group'>
            <p>Fleet</p>
            <label htmlFor='fleet_cars'>How many cars are in your company fleet?:</label><br />
            <input type='number' 
            id='fleet_cars' 
            className='form-control'
            name='fleet_totalcars' 
            placeholder='Number of cars' 
            value={formData.fleet_totalcars}
            onChange={handleChange}
            required/><br />
          </div>

          <div className='form-group'>
            <label htmlFor='km_per_car'>How many kilometers per year does each car in your fleet cover on average?:</label><br />
            <input type='number' 
            id='km_per_car' 
            className='form-control'
            name='fleet_km_avg' 
            placeholder='Kilometers per year' 
            value={formData.fleet_km_avg}
            onChange={handleChange}
            required/><br />
          </div>

          <div className='form-group'>
            <p>Travel</p>
            <label htmlFor='short_haul_flights'>How many short-haul round-trip business flights are taken per year on average?:</label><br />
            <input type='number' 
            id='short_haul_flights' 
            className='form-control'
            name='travel_short_flight' 
            placeholder='Number of flights' 
            value={formData.travel_short_flight}
            onChange={handleChange}
            required/><br />
          </div>

          <div className='form-group'>
            <label htmlFor='long_haul_flights'>How many long-haul round-trip business flights are taken per year on average?:</label><br />
            <input type='number' 
            id='long_haul_flights' 
            className='form-control'
            name='travel_long_flight' 
            placeholder='Number of flights' 
            value={formData.travel_long_flight}
            onChange={handleChange}
            required/><br />
          </div>

          <div className='form-group'>
            <label htmlFor='train_journeys'>How many train journeys are taken per year on average?:</label><br />
            <input type='number' 
            id='train_journeys' 
            className='form-control'
            name='travel_train' 
            placeholder='Number of journeys' 
            value={formData.travel_train}
            onChange={handleChange}
            required/><br />
          </div>

          <div className='form-group'>
            <p>IT</p>
            <label htmlFor='laptops_provided'>How many laptops does your company provide?:</label><br />
            <input type='number' 
            id='laptops_provided' 
            className='form-control'
            name='IT_laptop' 
            placeholder='Number of laptops' 
            value={formData.IT_laptop}
            onChange={handleChange}
            required/><br />
          </div>

          <div className='form-group'>
            <label htmlFor='mobiles_provided'>How many mobiles does your company provide?:</label><br />
            <input type='number' 
            id='mobiles_provided' 
            className='form-control'
            name='IT_mobile' 
            placeholder='Number of mobiles' 
            value={formData.IT_mobile}
            onChange={handleChange}
            required/><br />
          </div>
          <div className='form-group'>
            <label htmlFor='mobiles_provided'>How many monitors does your company provide?:</label><br />
            <input type='number' 
            id='mobiles_provided' 
            className='form-control'
            name='IT_monitor' 
            placeholder='Number of monitors' 
            value={formData.IT_monitor}
            onChange={handleChange}
            required/><br />
          </div>
          <div className='form-group'>
            <label htmlFor='mobiles_provided'>How many desktops does your company provide?:</label><br />
            <input type='number' 
            id='mobiles_provided' 
            className='form-control'
            name='IT_desktop' 
            placeholder='Number of desktops' 
            value={formData.IT_desktop}
            onChange={handleChange}
            required/><br />
          </div>

          <button type='submit' className='btn'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Footprint;
