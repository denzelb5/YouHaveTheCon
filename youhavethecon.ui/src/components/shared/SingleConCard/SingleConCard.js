import React from 'react';
import moment from 'moment';
import './SingleConCard.scss';

class SingleConCard extends React.Component {
    render() {
        const { singleCon } = this.props;
        return (
            <div className="card col-12 single-con-card">
                    <h3 className="card-title s-con-head">{singleCon.conName}</h3>
                <div className="card-body d-flex justify-content-between">
                    <p className="card-subtitle mb-2">{moment(singleCon.conStartDate).format('LL')} - {moment(singleCon.conEndDate).format('LL')}</p>
                    <p className="location-name">{singleCon.locationName}</p>
                    <p className="card-text">{singleCon.locationInfo}</p>
                   
                </div>
            </div>
        );
    }
}

export default SingleConCard;