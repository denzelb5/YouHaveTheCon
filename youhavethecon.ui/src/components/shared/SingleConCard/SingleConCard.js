import React from 'react';
import moment from 'moment';
import './SingleConCard.scss';

class SingleConCard extends React.Component {
    render() {
        const { singleCon } = this.props;
        return (
            <div className="card col-3">
                <div className="card-body">
                    <h4 className="card-title">{singleCon.conName}</h4>
                    <h5 className="card-subtitle mb-2 text-muted">{moment(singleCon.conStartDate).format('LL')} - {moment(singleCon.conEndDate).format('LL')}</h5>
                    <h6 className="location-name">{singleCon.locationName}</h6>
                    <p className="card-text">{singleCon.locationInfo}</p>
                   
                </div>
            </div>
        );
    }
}

export default SingleConCard;