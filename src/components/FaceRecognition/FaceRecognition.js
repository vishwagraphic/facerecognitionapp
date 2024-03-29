import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box}) => {
    return (
       <div className='center ma'>
            <div className="absolute mt2">
                <img id="inputImage" src={imageUrl} alt="face" width="500" height="auto" />
                <div className="bounding-box" style={{top:box.leftCol, left : box.topRow, bottom: box.rightCol, right : box.bottomRow}}></div>
            </div>
       </div>
    )   
}
export default FaceRecognition;