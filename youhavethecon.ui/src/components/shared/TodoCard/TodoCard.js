import React from 'react';
import './TodoCard.scss';

class TodoCard extends React.Component {
    render() {
        const { todo } = this.props;
        return (
           
            <div className="card">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{todo.todoName}</li>
                    <li className="list-group-item">{todo.todoNotes}</li>
                    
                </ul>
            </div>
           
        );
    }
}

export default TodoCard;