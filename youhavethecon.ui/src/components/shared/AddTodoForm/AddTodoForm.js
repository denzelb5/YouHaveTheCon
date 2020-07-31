import React from 'react';
import './AddTodoForm.scss';


class AddTodoForm extends React.Component {
    render() {
        return (
            <div>
                <form>
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="First name"/>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Last name"/>
                        </div>
                    </div>
                </form>

            </div>
        );
    }
}

export default AddTodoForm;