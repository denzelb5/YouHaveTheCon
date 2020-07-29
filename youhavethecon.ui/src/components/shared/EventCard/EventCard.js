import React from 'react';
import moment from 'moment';
import './EventCard.scss';

class EventCard extends React.Component {
    render() {
        const { event } = this.props;
        return (
            <div className="container">
                <div className="row">
                   
                    <div className="col-sm">
                        
                      Name: {event.eventName}
                    </div>
                    
                    <div className="col-sm">
                        Date: {moment(event.eventDateTime).format('LL')} 
                    </div>

                    <div className="col-sm">
                       Time: {moment(event.eventDateTime).format('LT')} - {moment(event.eventEndDate).format('LT')}
                    </div>

                    <div className="col-sm">
                       Place: {event.eventLocation}
                    </div>
                </div>
            </div>
        )
    }
}

export default EventCard;