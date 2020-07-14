import React from 'react';
import './SingleCon.scss';
import AddConForm from '../AddConForm/AddConForm';

class SingleCon extends React.Component {
    render() {
        return (
            <div className="single-con">
                <h1>This is the SingleCon Page</h1>
                <div className="add-con"> 
                    <AddConForm />
                </div>
            </div>
        )
    }
}

export default SingleCon;
