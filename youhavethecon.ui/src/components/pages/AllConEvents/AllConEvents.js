import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import EventCard from '../../shared/EventCard/EventCard';
import eventData from '../../../helpers/data/eventData';
import conData from '../../../helpers/data/conData';
import './AllConEvents.scss';

class AllConEvents extends React.Component {
    state = {
        allConEvents: [],
        con: {}
    }

    static props = {
        conId: PropTypes.int,
        userId: PropTypes.int
    }

    getConEventsData = () => {
        const userId = parseInt(this.props.match.params.userId);
        const conId = parseInt(this.props.match.params.conId);
        eventData.getConEventsByConId(conId, userId)
        .then((result) => this.setState({ allConEvents: result.data }))
        .catch((error) => console.error(error));
    }

    getConNameData = () => {
        const userId = parseInt(this.props.match.params.userId);
        const conId = parseInt(this.props.match.params.conId);
        conData.getSingleCon(conId, userId)
        .then((request) => this.setState({ con: request.data }))
        .catch((error) => console.error(error));
    }

    deleteEvent = (eventId) => {
        eventData.deleteEvent(eventId)
          .then(() => this.getConEventsData())
          .catch((error) => console.error(error));
    }

    componentDidMount() {
        this.getConEventsData();
        this.getConNameData();
    }

    render() {
        const { allConEvents, con } = this.state;
        const userId = parseInt(this.props.match.params.userId);
        const conId = parseInt(this.props.match.params.conId);
        return (
            <div className="container event-box">
                <h1 className="event-headline">My Events</h1>
                <div className="row">
                    <div className="col-3">
                        <img src="https://cdn.pixabay.com/photo/2017/05/14/09/51/tardis-2311634_960_720.png" className="tardis d-flex justify-content-start" alt="tardis"/>
                    </div>
                   
                    <div className="container events col-9">
                        <h3>{con.conName}</h3>
                        <div className="row">
                            <div className="col-sm event-header">
                                Name
                            </div>
                            <div className="col-sm event-header">
                                Date
                            </div>
                            <div className="col-sm event-header">
                                Time
                            </div>
                            <div className="col-sm event-header">
                                Location
                            </div>
                        </div>
                <div className="events">
                    {allConEvents.map((event) => <EventCard key={event.eventId} event={event} deleteEvent={this.deleteEvent} />)}
                </div> 
                    </div>
                </div>

                <div className="add-event-btn">
                    <Link className="btn btn-dark" to={`/addevent/${conId}/${userId}`}>Add Event</Link>
                </div>
            </div>

        );
    }
}

export default AllConEvents;