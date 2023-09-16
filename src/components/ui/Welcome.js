import React from 'react';
import Styles from './Welcome.css';


const Welcome = () => {
  return (
    <main>
      <h1>Welcome! to the Spelling App.</h1>
      <h3>You made a correct decision...</h3>
      <br/>
      <br/>
      <div className='description'>
        <p>Here you will find</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    </main>
  )
}

export default Welcome;