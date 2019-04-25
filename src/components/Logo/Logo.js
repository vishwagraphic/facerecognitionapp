import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css'
const Logo = () => {
    return (
        <div>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> <img src={brain} style={{paddingTop: '5px'}} alt="Logo" /> </div>
            </Tilt>
        </div>
    )   
}
export default Logo;