import React from 'react';
import PropTypes from 'prop-types';
import './AddBudgetItemForm.scss';
import budgetData from '../../../helpers/data/budgetData';

class AddBudgetItemForm extends React.Component {
    state = {
        name: '',
        amount: '',
        showLineForm: false,
        showEditForm: false
    }

    static props = {
        budgetId: PropTypes.int,
        conId: PropTypes.int,
        userId: PropTypes.int,
        budgetLineItems: PropTypes.array,
        onSave: PropTypes.func
    }

    itemNameChange = (e) => {
        e.preventDefault();
        this.setState({ name: e.target.value });
    }

    itemAmountChange = (e) => {
        e.preventDefault();
        this.setState({ amount: parseFloat(e.target.value)});
    }

    AddNewLineItemEvent = (e) => {
        e.preventDefault();
        const newLine = {
            budgetLineItemId: '',
            budgetId: this.props.budgetId,
            name: this.state.name,
            amount: this.state.amount
        };
        budgetData.addBudgetLineItems(newLine)
        .then((result) => {
            this.setState({ showLineForm: true  })
            this.props.onSave();
        })
        .catch((error) => console.error(error));
    }

    

    render() {
        const { 
            name, 
            amount, 
            showLineForm,
            showEditForm } = this.state;
        
        return (
        <div>
            {
                showLineForm ? (<div></div> )
                : (
                    <form className="budget-line">
                    
                <div className="form-group">
                <label htmlFor="budget-name">Category Name</label>
                <input
                type="text"
                className="form-control"
                placeholder="Enter category name"
                value={name}
                onChange={this.itemNameChange}
                />
                
                </div>
                <div className="form-group">
                <label htmlFor="amount-budgeted">Amount</label>
                <input
                type="number"  step="0.01" min="0" max="10"
                className="form-control"
                placeholder="Enter Budget Amount"
                value={amount}
                onChange={this.itemAmountChange}
                />
                    </div>
                    <div className="btn btn-dark" onClick={this.AddNewLineItemEvent}>Save</div>
                </form> 
                )
            },
            {
                showEditForm ? (<div></div>) 
                : (
                    <form className="budget-line">
                    
                    <div className="form-group">
                    <label htmlFor="budget-name">Category Name</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Enter category name"
                    value={name}
                    onChange={this.itemNameChange}
                    />
                    
                    </div>
                    <div className="form-group">
                    <label htmlFor="amount-budgeted">Amount</label>
                    <input
                    type="number"  step="0.01" min="0" max="10"
                    className="form-control"
                    placeholder="Enter Budget Amount"
                    value={amount}
                    onChange={this.itemAmountChange}
                    />
                        </div>
                        <div className="btn btn-dark" onClick={this.updateLineItemEvent}>Save</div>
                    </form> 
                )
            } 
        </div>
         )
    }
}

export default AddBudgetItemForm;