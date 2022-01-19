import React from 'react';

const WaveCounter = (props) => (
    <div className="container-wave">
        <button className="waveButton waves-number-btn w-100 pe-none">
        Number of waves: {props.waveCount}
        </button>
    </div>
)

export default WaveCounter;
