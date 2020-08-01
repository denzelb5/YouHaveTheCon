import React from 'react';
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

        return (
            <div>
                <h1>add cosplay form</h1>
                <form className="add-cosplay">
                    
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
                    <div className="form-group">
                        <label htmlFor="date-created">Date Created</label>
                        <input
                            type="datetime-local" 
                            className="form-control"
                            placeholder="Enter Date Created"
                            value={dateCreated}
                            onChange={this.dateCreatedChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date-due">Due Date</label>
                        <input
                            type="datetime-local" 
                            className="form-control"
                            placeholder="Enter Date Due"
                            value={dateDue}
                            onChange={this.dateDueChange}
                        />
                        </div>
                        <div className="form-group">
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
    
                       
                            <button className="btn btn-dark" onClick={this.addCosplayEvent}>Save</button>
                           
    
                        {/* <Link className="btn btn-danger" to={`/event/allevents/${conId}/${userId}`}>Cancel</Link> */}
                    </form> 
            </div>

        );
    }
}

export default AddCosplayForm;