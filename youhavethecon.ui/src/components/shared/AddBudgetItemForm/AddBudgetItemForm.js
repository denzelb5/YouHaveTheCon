import React from 'react';
import PropTypes from 'prop-types';
import './AddBudgetItemForm.scss';
import budgetData from '../../../helpers/data/budgetData';

class AddBudgetItemForm extends React.Component {
    state = {
        name: '',
        amount: '',
        showLineForm: true,
        showEditForm: false
    }

    static props = {
        budgetId: PropTypes.int,
        conId: PropTypes.int,
        userId: PropTypes.int,
        budgetLineItems: PropTypes.array,
        onSave: PropTypes.func,
        onClose: PropTypes.func
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

    closeAddLineFormEvent = (e) => {
        e.preventDefault();
        this.props.onClose();
    }

    

    render() {
        const { 
            name, 
            amount } = this.state;
        
        return (
        <div>
            <form className="budget-line container">
                <div className=" d-flex">
                <div className="form-group col-3">
                    <label htmlFor="budget-name">Category Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Category name"
                        value={name}
                        onChange={this.itemNameChange}
                    />
                </div>
                <div className="form-group col-3">
                    <label htmlFor="amount-budgeted">Amount</label>
                    <input
                        type="number"  step="0.01" min="0" max="10"
                        className="form-control"
                        placeholder="Enter Budget Amount"
                        value={amount}
                        onChange={this.itemAmountChange}
                    />
                </div>
                
                <div className="btn btn-dark bl-save-btn bl-btns" onClick={this.AddNewLineItemEvent}>Save</div>
                <div className="btn btn-danger bl-cancel-btn bl-btns" onClick={this.closeAddLineFormEvent}>Cancel</div>
                </div>
            </form> 
        </div>
         )
    }
}

export default AddBudgetItemForm;