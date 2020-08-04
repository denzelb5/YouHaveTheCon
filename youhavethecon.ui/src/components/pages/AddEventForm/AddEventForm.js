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
        userId: PropTypes.int,
        onSave: PropTypes.func
    }

    // componentDidMount() {
    //     this.getFormInfoEvent();
    // }

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
        .then(() => {
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
        if (eventId !== undefined && conId !== undefined && userId !== undefined) {
            // budgetData.getBudgetForCon(conId, userId).then(() => {

                eventData.updateEvent(eventId, eventToUpdate)
                .then(() => {
                    
                    this.props.history.push(`/event/allevents/${conId}/${userId}`)
                })
                .catch((error) => console.error(error));
    
            // });
        }
    }

    // getFormInfoEvent = () => {
    //     if (this.props.match.params.eventId) {
    //         eventData.getEventDetailsByEventId()
    //         .then((eventData) => {
    //             this.setState({
    //                  eventName: eventData.eventName,
    //                  eventDateTime: eventData.eventDateTime,
    //                  eventEndDate: eventData.eventEndDate,
    //                  eventLocation: eventData.eventLocation
    //                 })
    //         })
    //     }
    // }



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
            <div className="add-event-form container">
                <h1 className="ev-head">Add An Event</h1>
                <div className="d-flex">
                    <div className="card col-3 stark-div">
                        <img className="stark-pic"
                        src="https://upload.wikimedia.org/wikipedia/commons/c/cf/11.-_Casa_Targaryen.png" alt="house-stark-sigil"
                        />
                    </div>
                <form className="add-event col-6"> 
                
                    <div className="row">
                       
                        <div className="form-group col-6 event-inputs">
                            <label htmlFor="event-name">Event Name</label>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Event Name"
                            value={eventName}
                            onChange={this.eventNameChange}
                            />
                        </div>
                        <div className="form-group col-5 event-inputs">
                            <label htmlFor="event-date">Start Time</label>
                            <input
                                type="datetime-local" 
                                className="form-control"
                                placeholder="Enter Start Time"
                                value={eventDateTime}
                                onChange={this.eventDateChange}
                            />
                        </div> 
                        
                    </div>
                    <div className="row">
                    <div className="form-group col-6 event-inputs">
                            <label htmlFor="event-locale">Location</label>
                            <input
                                type="text" 
                                className="form-control"
                                placeholder="Enter Location"
                                value={eventLocation}
                                onChange={this.eventLocationChange}
                            />
                        </div>
                                             
                        <div className="form-group col-5 event-inputs">
                            <label htmlFor="event-end">End Time</label>
                            <input
                                type="datetime-local" 
                                className="form-control"
                                placeholder="Enter Event End"
                                value={eventEndDate}
                                onChange={this.eventEndChange}
                            />
                        </div>
                    </div>
                
                <div>
                    {
                        !eventId
                        ? <button className="btn btn-dark add-buttons" onClick={this.addNewEventEvent}>Save</button>
                        : <button className="btn btn-primary add-buttons" onClick={this.updateEventEvent}>Edit Event</button>
                        

                    }
                    <Link className="btn btn-danger add-buttons" to={`/event/allevents/${conId}/${userId}`}>Cancel</Link>
                </div>

                 
                </form>
                    <div className="col-3 lann-div">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/7.-_Casa_Lannister.png" alt="lannister-pic" className="lannister-pic"/>
                    </div>
                </div>

            </div>

        )
    }
}

export default AddEventForm;