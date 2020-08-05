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
        pieceonSave: PropTypes.func
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

    deleteTodo = (todoId) => {
        cosplayData.deleteTodo(todoId)
          .then(() => this.getTodoData())
          .catch((error) => console.error(error));
    }

    

    render() {
        const { showTodoAddForm, todoItems } = this.state;
        const { piece } = this.props;
        if (todoItems !== undefined && piece !== undefined) {

            return (
                <div className="single-cosplay-card">                  
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col md-4 image-background">
                                <img src={piece.pieceImageUrl} className="card-img-top cosplay-image" alt="..."/>
                            </div>
                                <div className="col-md-8">
                                    <div>
                                        <h3 className="body-part">{piece.bodyPartName}</h3>
                                    </div>
                                <div  className="d-flex no-wrap">
                                    <div className="card-body info-card col-6">
                                        <div className="text-left piece-info">
                                            <div>
                                                <h5 className="card-title piece-name">Name: {piece.pieceName}</h5>
                                            </div>
                                            <div>
                                                <h6 className="card-text">Total Progress: {piece.percentDone}% Done</h6>
                                                <p className="card-text">Completion Estimate: {piece.completionHoursEstimate} hours {piece.completionMinutesEstimate} minutes</p>
                                            </div>
                                        </div> 
                                          
                                    </div>
                                    <div className="col-6 text-center">  
                                        <div>
                                            <button onClick={ this.showAddForm} className="card-link">Add Todo Item</button>
                                        </div>                                           
                                    {
                                        showTodoAddForm ? 
                                        <div>
                                            <AddTodoForm cosplayPiecesId={piece.cosplayPiecesId} onSave={this.getTodoData} hideForm={this.hideForm}/>
                                            
                                        </div>
                                        :
                                        <div className="text-center">
                                            {todoItems.map((todo) => <TodoCard key={todo.todoId} todo={todo} deleteTodo={this.deleteTodo} />)} 
                                        </div>                                  
                                    }  
                                    </div>                             
                                </div>                       
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

