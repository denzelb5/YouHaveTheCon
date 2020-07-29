import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './EventCard.scss';

class EventCard extends React.Component {
    render() {
        const { event } = this.props;
        return (
            <div className="container">
                <div className="row">
                   
                    <div className="col-sm">
                        
                        {event.eventName}
                    </div>
                    
                    <div className="col-sm">
                        {moment(event.eventDateTime).format('LL')} 
                    </div>

                    <div className="col-sm">
                         {moment(event.eventDateTime).format('LT')} - {moment(event.eventEndDate).format('LT')}
                    </div>

                    <div className="col-sm">
                        {event.eventLocation}
                    </div>
                    <Link className="btn btn-light" to={`/editevent/${event.eventId}/${event.conId}/${event.userId}`}>Edit</Link>
                </div>
            </div>
        )
    }
}

export default EventCard;