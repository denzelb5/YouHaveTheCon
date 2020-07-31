import React from 'react';
import './TodoCard.scss';

class TodoCard extends React.Component {
    render() {
        return (
            <div>
                <h6>TodoCard</h6>
                <ul>
                    <li>Do some stuff</li>
                    <li>Do more stuff</li>
                </ul>
            </div>
        );
    }
}

export default TodoCard;