import React from 'react';

const AllWavesContainer = (props) => (
    <div>
        {props.allWaves.map((wave, index) => (
            
            <div key={index} className="wave-container">
                <div>Address: {wave.address}</div>
                <div>Time: {wave.timestamp.toString()}</div>
                <div>Message: {wave.message}</div>
            </div>)
            
        )}
    </div>
)

export default AllWavesContainer;
