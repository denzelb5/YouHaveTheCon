import React from 'react';
import { Link } from 'react-router-dom';
import AddTodoForm from '../AddTodoForm/AddTodoForm';
import TodoCard from '../TodoCard/TodoCard';
import './SingleCosplayCard.scss';


class SingleCosplayCard extends React.Component {
    state = {
        showTodoAddForm: false
    }

    showAddForm = (e) => {
        // e.preventDefault();
        this.setState({ showTodoAddForm: true })
    }

    render() {
        const { showTodoAddForm } = this.state;
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
                        <a href="" onClick={this.showAddForm} className="card-link">Add todo list</a>
                        <a href="#" className="card-link">Add shopping list</a>
                        <div>
                            {
                                showTodoAddForm ? <div><AddTodoForm /></div> : <div><TodoCard /></div>
                            }

                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleCosplayCard;

