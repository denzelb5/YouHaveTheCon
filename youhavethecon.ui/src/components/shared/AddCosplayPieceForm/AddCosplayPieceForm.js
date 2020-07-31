import React from 'react';
import PropTypes from 'prop-types';
import './AddCosplayPieceForm.scss';
import cosplayData from '../../../helpers/data/cosplayData';

class AddCosplayPieceForm extends React.Component {
    state = {
        pieceName: '',
        percentDone: '',
        completionHoursEstimate: '',
        completionMinutesEstimate: '',
        pieceImageUrl: '',
        bodyPartName: '',
        showAddPieceForm: false
    }

    static props = {
        onSave: PropTypes.func
    }

    pieceNameChange = (e) => {
        e.preventDefault();
        this.setState({ pieceName: e.target.value });
    }

    percentDoneChange = (e) => {
        e.preventDefault();
        this.setState({ percentDone: e.target.value });
    }

    compHoursChange = (e) => {
        e.preventDefault();
        this.setState({ completionHoursEstimate: e.target.value });
    }

    compMinuteChange = (e) => {
        e.preventDefault();
        this.setState({ completionMinutesEstimate: e.target.value });
    }

    imageChange = (e) => {
        e.preventDefault();
        this.setState({ pieceImageUrl: e.target.value });
    }

    bodyPartChange = (e) => {
        e.preventDefault();
        this.setState({ bodyPartName: e.target.value });
    }

    addCosplayPieceEvent = (e) => {
        e.preventDefault();
        const {
            pieceName, 
            percentDone, 
            completionHoursEstimate, 
            completionMinutesEstimate, 
            pieceImageUrl, 
            bodyPartName
        } = this.state;
        
        
        const newPiece = {
            cosplayPiecesId: '',
            pieceName: pieceName,
            percentDone: parseInt(percentDone),
            completionHoursEstimate: parseInt(completionHoursEstimate),
            completionMinutesEstimate: parseInt(completionMinutesEstimate),
            pieceImageUrl: pieceImageUrl,
            cosplayId: parseInt(this.props.cosplayId),
            bodyPartName: bodyPartName
        };
        
            cosplayData.addCosplayPiece(newPiece)
            .then((result) => {
                this.setState({ showAddPieceForm: true });
                this.props.onSave();
            })
            .catch((error) => console.error(error));

        
    }



    render() {
        const {
            pieceName, 
            percentDone, 
            completionHoursEstimate, 
            completionMinutesEstimate, 
            pieceImageUrl, 
            bodyPartName,
            showAddPieceForm
        } = this.state;

        return (
             <div>
                 {
                showAddPieceForm ? (<div></div>) :
                <form className="add-event">
                    
                <div className="form-group">
                <label htmlFor="piece-name">Cosplay Piece Name</label>
                <input
                type="text"
                className="form-control"
                placeholder="Enter Piece Name"
                value={pieceName}
                onChange={this.pieceNameChange}
                />
                
                </div>
                <div className="form-group">
                    <label htmlFor="event-date">Percent Currently Done</label>
                    <input
                        type="number" 
                        className="form-control"
                        placeholder="Enter Percent Done"
                        value={percentDone}
                        onChange={this.percentDoneChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="hour-est">Estimated Hours To Complete</label>
                    <input
                        type="number" 
                        className="form-control"
                        placeholder="Enter Hour Estimate"
                        value={completionHoursEstimate}
                        onChange={this.compHoursChange}
                    />
                    </div>
                <div className="form-group">
                    <label htmlFor="minute-est">Estimated Minutes To Complete</label>
                    <input
                        type="number" 
                        className="form-control"
                        placeholder="Enter Minutes Estimate"
                        value={completionMinutesEstimate}
                        onChange={this.compMinuteChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image-add">Piece Image</label>
                    <input
                        type="text" 
                        className="form-control"
                        placeholder="Enter Image Url"
                        value={pieceImageUrl}
                        onChange={this.imageChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="body-part">Enter: Which Body Part?</label>
                    <input
                        type="text" 
                        className="form-control"
                        placeholder="Enter Body Part"
                        value={bodyPartName}
                        onChange={this.bodyPartChange}
                    />
                </div>
                <button className="btn btn-dark" onClick={this.addCosplayPieceEvent}>Add Cosplay Piece</button>
            </form>
            }
            </div>
                 
        );
    }
}

export default AddCosplayPieceForm;