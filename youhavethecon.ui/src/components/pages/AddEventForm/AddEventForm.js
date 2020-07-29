import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AddEventForm.scss';
import eventData from '../../../helpers/data/eventData';

class AddEventForm extends React.Component {
    state = {
        eventName: '',
        eventDateTime: '',
        eventEndDate: '',
        eventLocation: '',
        
    }

    static props = {
        conId: PropTypes.int,
        userId: PropTypes.int
    }

    eventNameChange = (e) => {
        e.preventDefault();
        this.setState({ eventName: e.target.value });
    }

    eventDateChange = (e) => {
        e.preventDefault();
        this.setState({ eventDateTime: e.target.value });
    }

    eventEndChange = (e) => {
        e.preventDefault();
        this.setState({ eventEndDate: e.target.value });
    }

    eventLocationChange = (e) => {
        e.preventDefault();
        this.setState({ eventLocation: e.target.value });
    }

    addNewEventEvent = (e) => {
        e.preventDefault();
        const { 
            eventName, 
            eventDateTime,
            eventEndDate,
            eventLocation
        } = this.state;
        const conId = parseInt(this.props.match.params.conId);
        const userId = parseInt(this.props.match.params.userId);
        const eventToAdd = {
            eventId: '',
            eventName: eventName,
            eventDateTime: eventDateTime,
            eventEndDate: eventEndDate,
            eventLocation: eventLocation,
            conId: conId,
            userId: userId
        };
        eventData.addEvent(eventToAdd)
        .then((result) => {
            this.props.history.push(`/event/allevents/${conId}/${userId}`)
        })
        .catch((error) => console.error(error));
    }

    updateEventEvent = (e) => {
        e.preventDefault();
        const conId = parseInt(this.props.match.params.conId);
        const userId = parseInt(this.props.match.params.userId);
        const eventId = parseInt(this.props.match.params.eventId);
        const {
            eventName,
            eventDateTime,
            eventEndDate,
            eventLocation
        } = this.state;
        const eventToUpdate = {
            eventName: eventName,
            eventDateTime: eventDateTime,
            eventEndDate: eventEndDate,
            eventLocation: eventLocation 
        };
        eventData.updateEvent(eventId, eventToUpdate)
        .then(() => {
            this.props.history.push(`/event/allevents/${conId}/${userId}`)
        })
        .catch((error) => console.error(error));
    }



    render() {
        const { 
            eventName, 
            eventDateTime,
            eventEndDate,
            eventLocation
        } = this.state;

        const eventId = parseInt(this.props.match.params.eventId);
        const conId = parseInt(this.props.match.params.conId);
        const userId = parseInt(this.props.match.params.userId);
        return (
            <div>
                <h1>AddEventForm</h1>
                <form className="add-event">
                    
                <div className="form-group">
                <label htmlFor="event-name">Event Name</label>
                <input
                type="text"
                className="form-control"
                placeholder="Enter Event Name"
                value={eventName}
                onChange={this.eventNameChange}
                />
                
                </div>
                <div className="form-group">
                    <label htmlFor="event-date">Start Time</label>
                    <input
                        type="datetime-local" 
                        className="form-control"
                        placeholder="Enter Start Time"
                        value={eventDateTime}
                        onChange={this.eventDateChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="event-end">End Time</label>
                    <input
                        type="datetime-local" 
                        className="form-control"
                        placeholder="Enter Event End"
                        value={eventEndDate}
                        onChange={this.eventEndChange}
                    />
                    </div>
                <div className="form-group">
                    <label htmlFor="event-locale">Location</label>
                    <input
                        type="text" 
                        className="form-control"
                        placeholder="Enter Location"
                        value={eventLocation}
                        onChange={this.eventLocationChange}
                    />
                    </div>

                    {
                        !eventId
                        ? <button className="btn btn-dark" onClick={this.addNewEventEvent}>Save</button>
                        : <button className="btn btn-primary" onClick={this.updateEventEvent}>Edit Event</button>
                        

                    }


                    <Link className="btn btn-danger" to={`/event/allevents/${conId}/${userId}`}>Cancel</Link>
                </form> 

            </div>

        )
    }
}

export default AddEventForm;