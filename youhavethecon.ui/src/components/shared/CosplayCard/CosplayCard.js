import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './CosplayCard.scss';

class CosplayCard extends React.Component {
    render() {
        const { cosplay } = this.props;
        return (
            <div className="card cosplay-card col-5">
                <img src={cosplay.cosplayImageUrl} className="card-img-top cosplay-image" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{cosplay.cosplayName}</h5>
                    <p className="card-text">Due Date: {moment(cosplay.dueDate).format('LL')}</p>
                    <Link to={`/cosplay/${cosplay.cosplayId}`} className="btn btn-primary">View Details</Link>
                </div>
            </div>

        );

    }
}

export default CosplayCard;

