import React from 'react';
import { Link } from 'react-router-dom';
import conData from '../../../helpers/data/conData';

class AddConForm extends React.Component {
    state = {
        conName: '',
        conStartDate: '',
        conEndDate: '',
        locationName: '',
        locationInfo: ''
    }

    conNameChange = (e) => {
        e.preventDefault();
        this.setState({ conName: e.target.value });
      }

      conStartChange = (e) => {
        e.preventDefault();
        this.setState({ conStartDate: e.target.value });
      }

      conEndChange = (e) => {
        e.preventDefault();
        this.setState({ conEndDate: e.target.value });
      }

      locationNameChange = (e) => {
        e.preventDefault();
        this.setState({ locationName: e.target.value });
      }

      locationInfoChange = (e) => {
        e.preventDefault();
        this.setState({ locationInfo: e.target.value });
      }

    createNewConEvent = (e) => {
        e.preventDefault();
        const newCon = {
            conId: '',
            conName: this.state.conName,
            conStartDate: this.state.conStartDate,
            conEndDate: this.state.conEndDate,
            locationName: this.state.locationName,
            locationInfo: this.state.locationInfo
        };
        conData.addCon(newCon)
            .then((result) => this.props.history.push(`/con/allcons`))
            .catch((error) => console.error(error));
            

    }

    render() {
        const {
            conName, 
            conStartDate,
            conEndDate,
            locationName,
            locationInfo
        } = this.state;
        // const { conId } = this.props.match.params;
        return ( 
          
            <form className="con-form">
              <h1>Add Con Page</h1>
        <div className="form-group">
          <label htmlFor="con-name">Con Name</label>
          <input
          type="text"
          className="form-control"
          id="con-name"
          placeholder="Enter con name"
          value={conName}
          onChange={this.conNameChange}
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="con-start-date">Con Start Date</label>
          <input
          type="datetime-local"
          className="form-control"
          id="con-start-date"
          placeholder=""
          value={conStartDate}
          onChange={this.conStartChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="con-enddate">Con End Date</label>
          <input
          type="datetime-local"
          className="form-control"
          id="con-end-date"
          placeholder=""
          value={conEndDate}
          onChange={this.conEndChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location-name">Location Name</label>
          <input
          type="text"
          className="form-control"
          id="location-name"
          placeholder="Enter Location Name"
          value={locationName}
          onChange={this.locationNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="con-location-info">Enter Address</label>
          <input
          type="text"
          className="form-control"
          id="location-info"
          placeholder="Street, City, State, Zip, Country"
          value={locationInfo}
          onChange={this.locationInfoChange}
          />
        </div>
        { <button className="btn btn-dark" onClick={this.createNewConEvent}>Save Con</button> }
        <Link className="btn btn-primary" to="/con/allcons">Cancel</Link>

        {/* { !conId
       ?  <button className="btn btn-dark" onClick={this.createNewConEvent}>Save Con</button>
       : <button className="btn btn-primary" onClick={this.editConEvent}>Edit Con</button>
        } */}
        
      </form>
        );
    }
}

export default AddConForm;