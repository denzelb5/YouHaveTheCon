import React from 'react';
import PropTypes from 'prop-types';
import './TodoCard.scss';

class TodoCard extends React.Component {
    static propTypes = {
        deleteTodo: PropTypes.func
    }

    deleteTodoEvent = (e) => {
        e.preventDefault();
        const { todo, deleteTodo } = this.props;
        deleteTodo(todo.todoId);
    }

    render() {
        const { todo } = this.props;
        return (
           
            <div className="card">
                <ul className="list-group list-group-flush">
                    
                        <li className="list-group-item todo-item">{todo.todoName}
                            <button className="btn btn-light del-todo" onClick={this.deleteTodoEvent}>x</button>
                        </li>
                    {/* <li className="list-group-item">Memo: {todo.todoNotes}</li> */}
                    
                </ul>
            </div>
           
        );
    }
}

export default TodoCard;