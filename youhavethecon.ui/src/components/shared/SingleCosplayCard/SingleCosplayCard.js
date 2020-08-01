import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddTodoForm from '../AddTodoForm/AddTodoForm';
import TodoCard from '../TodoCard/TodoCard';
import cosplayData from  '../../../helpers/data/cosplayData';
import './SingleCosplayCard.scss';


class SingleCosplayCard extends React.Component {
    state = {
        showTodoAddForm: false, 
        todoItems: [],
        pieceId: ''
    }

    static props = {
        onSave: PropTypes.func
    }


    getPieceId = (e) => {
        e.preventDefault();
        this.setState({pieceId: parseInt(e.target.id)})
    }

    getTodoData = () => {
        const  cosplayPiecesId  = this.props.piece.cosplayPiecesId;
        console.log('cpid', cosplayPiecesId)
        cosplayData.getTodoItemsForCosplayPiece(cosplayPiecesId)
        .then((response) => {
            const todos = response.data;
            this.setState({ todoItems: todos });
            this.setState({showTodoAddForm: false});
        })
        .catch((error) => console.error(error));
    }

    componentDidMount() {
        this.getTodoData();
    }

    showAddForm = (e) => {
         e.preventDefault();
        this.setState({ showTodoAddForm: true })
    }

    hideForm = (e) => {
        e.preventDefault();
        this.setState({ showTodoAddForm: false })
    }

    

    render() {
        const { showTodoAddForm, todoItems } = this.state;
        const { piece } = this.props;
        if (todoItems !== undefined && piece !== undefined) {

            return (
                <div>
                    
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col md-4">
                                <img src={piece.pieceImageUrl} className="card-img-top cosplay-image" alt="..."/>
                            </div>
                            <div className="col-md-8">
                        <div className="card-body">
                            <h3>{piece.bodyPartName}</h3>
                            <h5 className="card-title">{piece.pieceName}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{piece.percentDone}% Done</h6>
                            <p className="card-text">Completion Estimate: {piece.completionHoursEstimate} hours {piece.completionMinutesEstimate} minutes</p>
                            <button onClick={ this.showAddForm} className="card-link">Add todo list</button>
                            <a href="#" className="card-link">Add shopping list</a>
                            <div>
                            <div>
                                         {/* {todoItems.map((todo) => <TodoCard key={todo.todoId} todo={todo}/>)}  */}
                                     </div>
                                {
                                    showTodoAddForm ? 
                                    <div>
                                        <AddTodoForm cosplayPiecesId={piece.cosplayPiecesId} onSave={this.getTodoData} hideForm={this.hideForm}/>
                                        
                                    </div>
                                    :
                                     <div>
                                         {todoItems.map((todo) => <TodoCard key={todo.todoId} todo={todo}/>)} 
                                     </div>
                                     
                                     
                                }
    
                            </div>
                            <div></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return <></>
    }
}

export default SingleCosplayCard;

