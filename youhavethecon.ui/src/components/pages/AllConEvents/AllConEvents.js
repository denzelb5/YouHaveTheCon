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
            <div>
                <h3>{con.conName}</h3>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            Name
                        </div>
                        <div className="col-sm">
                            Date
                        </div>
                        <div className="col-sm">
                            Time
                        </div>
                        <div className="col-sm">
                            Location
                        </div>
                    </div>
                </div>
                <div>
                    {allConEvents.map((event) => <EventCard key={event.eventId} event={event} deleteEvent={this.deleteEvent} />)}
                </div>
                <Link className="btn btn-dark" to={`/addevent/${conId}/${userId}`}>Add Event</Link>
            </div>

        );
    }
}

export default AllConEvents;