import React from 'react'

const Result = () => {
  return (
    <div>
       <div id='result'>
        
        <form>
            <h1>Result</h1>
            <input type='text' placeholder='First Name' required/>
            <input type='text' placeholder='Last Name' required/>
            <input type='email' placeholder='Type your E-Mail' required/>
            <input type='number' placeholder='Type your Number' required/>
            <input type='text' placeholder='Type your Company' required/>
            <input type='number' placeholder='Type your ID' required/>
            <textarea placeholder='Write Here.....' name='message'></textarea>
          
            <button type='GET RESULT'>GET RESULTS</button>
            
        </form>
      
       </div>
    </div>
  )
}

export default Result;
