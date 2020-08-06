import React from 'react';
import { Link } from 'react-router-dom';
import './AddCosplayForm.scss';
import cosplayData from '../../../helpers/data/cosplayData';

class AddCosplayForm extends React.Component {
    state = {
        cosplayName: '',
        dateCreated: '',
        dateDue: '',
        totalProgress: '',
        cosplayImageUrl: ''
    }

    nameChange = (e) => {
        e.preventDefault();
        this.setState({ cosplayName: e.target.value });
    }

    dateCreatedChange = (e) => {
        e.preventDefault();
        this.setState({ dateCreated: e.target.value });
    }

    dateDueChange = (e) => {
        e.preventDefault();
        this.setState({ dateDue: e.target.value });
    }

    progressChange = (e) => {
        e.preventDefault();
        this.setState({ totalProgress: e.target.value });
    }

    imageChange = (e) => {
        e.preventDefault();
        this.setState({ cosplayImageUrl: e.target.value });
    }

    addCosplayEvent = (e) => {
        e.preventDefault();
        const userId = parseInt(this.props.match.params.userId);
        const {
            cosplayName,
            dateCreated,
            dateDue,
            totalProgress,
            cosplayImageUrl
        } = this.state;
        const newCosplay = {
           cosplayName: cosplayName,
           userId: userId,
           dateCreated: dateCreated,
           dateDue: dateDue,
           totalProgress: parseInt(totalProgress),
           cosplayImageUrl: cosplayImageUrl
        };
        cosplayData.addCosplay(newCosplay)
        .then(() => {
            this.props.history.push(`/cosplay/allcosplays/${userId}`)
        })
        .catch((error) => console.error(error));
    }


    render() {
        const {
            cosplayName,
            dateCreated,
            dateDue,
            totalProgress,
            cosplayImageUrl
        } = this.state;

        const userId = parseInt(this.props.match.params.userId);

        return (
            <div className="add-cosplay-form">
                <h3 className="add-cosplay-form-header">Add Cosplay Info Here</h3>
                <form className="add-cosplay col-5">
                    
                    <div className="form-group">
                    <label htmlFor="cosplay-name">Cosplay Name</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Cosplay Name"
                    value={cosplayName}
                    onChange={this.nameChange}
                    />
                    
                    </div>
                    <div className="form-group col-8">
                        <label htmlFor="date-created">Date Created</label>
                        <input
                            type="datetime-local" 
                            className="form-control"
                            placeholder="Enter Date Created"
                            value={dateCreated}
                            onChange={this.dateCreatedChange}
                        />
                    </div>
                    <div className="form-group col-8">
                        <label htmlFor="date-due">Due Date</label>
                        <input
                            type="datetime-local" 
                            className="form-control"
                            placeholder="Enter Date Due"
                            value={dateDue}
                            onChange={this.dateDueChange}
                        />
                        </div>
                        <div className="form-group col-8">
                        <label htmlFor="progress">Percent Done</label>
                        <input
                            type="number" 
                            className="form-control"
                            placeholder="Enter Amount Completed"
                            value={totalProgress}
                            onChange={this.progressChange}
                        />
                        </div>
                    <div className="form-group">
                        <label htmlFor="image">Image Url</label>
                        <input
                            type="text" 
                            className="form-control"
                            placeholder="Enter Image Url"
                            value={cosplayImageUrl}
                            onChange={this.imageChange}
                        />
                        </div>
                            <button className="btn btn-primary add-coplay-btns" onClick={this.addCosplayEvent}>Save</button>
                            <Link className="btn btn-dark add-cosplay-btns" to={`/cosplay/allcosplays/${userId}`}>Cancel</Link>
                    </form> 
            </div>

        );
    }
}

export default AddCosplayForm;