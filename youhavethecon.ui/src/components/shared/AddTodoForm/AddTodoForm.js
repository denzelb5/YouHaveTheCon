import React from 'react';
import PropTypes from 'prop-types';
import './AddTodoForm.scss';
import cosplayData from '../../../helpers/data/cosplayData';


class AddTodoForm extends React.Component {
    state = {
        todoName: '',
        todoNotes: '',
        showForm: false
        
    }

    static props = {
        onSave: PropTypes.func,
        hideForm: PropTypes.func,
        pieceOnSave: PropTypes.fun
    }

    nameChange = (e) => {
        e.preventDefault();
        this.setState({ todoName: e.target.value })
    }

    noteChange = (e) => {
        e.preventDefault();
        this.setState({ todoNotes: e.target.value })
    }



    AddTodoEvent = (e) => {
        e.preventDefault();
        const cosplayPiecesId = this.props.cosplayPiecesId;
        console.log('cppid', cosplayPiecesId)
        const newTodo = {
            todoId: '',
            todoName: this.state.todoName,
            todoNotes: this.state.todoNotes,
            cosplayPiecesId: this.props.cosplayPiecesId
        };
        if (cosplayPiecesId !== undefined) {

            cosplayData.addTodoItems(newTodo)
            .then(() => {
                this.props.onSave();
            })
            .catch((error) => console.error(error));
        }
    }

    render() {
        const { todoName } = this.state;
        
        return (
            <div>
                <form>
                    <div className="row">
                        <div className="col">
                            <input type="text"
                             className="form-control" 
                             placeholder="ToDo Name"
                             value={todoName}
                             onChange={this.nameChange}
                             />
                        </div>
                        
                    </div>
                    <button className="btn btn-light" onClick={this.AddTodoEvent}>Save</button>
                    
                </form>
            </div>
        );
    }
}

export default AddTodoForm;