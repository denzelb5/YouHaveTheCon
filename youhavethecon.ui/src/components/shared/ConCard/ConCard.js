import React from 'react';
import moment from 'moment';
import './ConCard.scss';

class ConCard extends React.Component {
    render() {
        const { con } = this.props;
        return (
            <div className="card col-3">
                <div className="card-body">
                    <h4 className="card-title">{con.conName}</h4>
                    <h5 className="card-subtitle mb-2 text-muted">{moment(con.conStartDate).format('LL')}</h5>
                    <h6 className="location-name">{con.locationName}</h6>
                    <p className="card-text">{con.locationInfo}</p>
                    <a href="#" className="card-link">View Details</a>
                    
                </div>
            </div>
        );
    }
}

export default ConCard;