import React from 'react';
import './SingleCosplay.scss';

class SingleCosplay extends React.Component {
    render() {
        return (
            <div className="all-cosplays">
                
                <div className="head">
                    <h3>Head</h3>
                </div>
                <div className="neck">
                    <h3>Neck</h3>
                </div>
                <div className="torso">
                    <h3>Torso</h3>
                </div>
                <div className="waist">
                    <h3>waist</h3>
                </div>
                <div className="arms">
                    <h3>Arms</h3>
                </div>
                <div className="feet">
                    <h3>Feet</h3>
                </div>
                <div className="acc">
                    <h3>Accoutrements</h3>
                </div>

            </div>
        );
    }
}

export default SingleCosplay;