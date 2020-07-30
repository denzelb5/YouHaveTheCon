import React from 'react';
import './SingleCosplayCard.scss';


class SingleCosplayCard extends React.Component {
    render() {
        const { piece } = this.props;
        return (
            <div>
                <h3>{piece.bodyPartName}</h3>
                <div className="card col-4">
                    <div className="card-body">
                        <img src={piece.pieceImageUrl} className="card-img-top cosplay-image" alt="..."/>
                        <h5 className="card-title">{piece.pieceName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{piece.percentDone}% Done</h6>
                        <p className="card-text">Completion Estimate: {piece.completionHoursEstimate} hours {piece.completionMinutesEstimate} minutes</p>
                        <a href="#" className="card-link">Add todo list</a>
                        <a href="#" className="card-link">Add shopping list</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleCosplayCard;

