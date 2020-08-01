import React from 'react';
import './TodoCard.scss';

class TodoCard extends React.Component {
    render() {
        const { todo } = this.props;
        return (
            <div>
                <h6>TodoCard</h6>
                <ul>
                    <li>{todo.todoName}</li>
                    <p>{todo.todoNotes}</p>
                </ul>
            </div>
        );
    }
}

export default TodoCard;