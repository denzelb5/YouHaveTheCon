import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './EventCard.scss';

class EventCard extends React.Component {
    static propTypes = {
        deleteEvent: PropTypes.func
    }

    deleteEventEvent = (e) => {
        e.preventDefault();
        const { event, deleteEvent } = this.props;
        deleteEvent(event.eventId);
    }

    render() {
        const { event } = this.props;
        return (
            <div className="container">
                <div className="row">
                   
                    <div className="col-sm event-name event-col">
                        
                        {event.eventName}
                         <button className="btn btn-link event-buttons" onClick={this.deleteEventEvent}>x</button>
                         <Link className="btn btn-link event-buttons" to={`/editevent/${event.eventId}/${event.conId}/${event.userId}`}>Edit</Link>
                    </div>
                    
                    <div className="col-sm event-col">
                        {moment(event.eventDateTime).format('LL')} 
                    </div>

                    <div className="col-sm event-col">
                         {moment(event.eventDateTime).format('LT')} - {moment(event.eventEndDate).format('LT')}
                    </div>

                    <div className="col-sm event-col">
                        {event.eventLocation}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default EventCard;