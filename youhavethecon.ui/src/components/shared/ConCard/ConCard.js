import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './ConCard.scss';

class ConCard extends React.Component {

    deleteConEvent = (e) => {
        e.preventDefault();
        const { con, deleteCon } = this.props;
        deleteCon(con.conId);
    }

    render() {
        const { con } = this.props;
        
        return (
           <div className="container d-flex justify-content-center con-card">
                <div className="card col-10">
                    <div className="row">
                        <div className="card-header  col-3 con-name">
                        {con.conName}                       
                        </div>
                        <div className="card-body con-card-body">
                            <button className="btn btn-link delete-con" onClick={this.deleteConEvent}>x</button>
                            <h5 className="card-title con-date">Date: {moment(con.conStartDate).format('LL')} - {moment(con.conEndDate).format('LL')}</h5>
                            <p className="card-text con-loc">Location: {con.locationName}</p>
                            <p className="card-text con-address">Address: {con.locationInfo}</p>
                            <Link to={`/con/${con.conId}/${con.userId}`} className="card-link details">View Details</Link>
                        </div>
                    </div>
                </div>
           </div>

        );
    }
}

export default ConCard;


    