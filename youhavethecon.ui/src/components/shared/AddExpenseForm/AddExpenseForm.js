import React from 'react';
import './AddExpenseForm.scss';
import PropTypes from 'prop-types';
import expenseData from '../../../helpers/data/expenseData';

class AddExpenseForm extends React.Component {
    state = {
        expenseName: '',
        cost: '',
        budgetLineItemId: ''
        
    }

    static props = {
        budgetId: PropTypes.int,
        onSave: PropTypes.func,
        onClose: PropTypes.func
    }

    expenseNameChange = (e) => {
        e.preventDefault();
        this.setState({ expenseName: e.target.value });
    }

    costChange = (e) => {
        e.preventDefault();
        this.setState({ cost: e.target.value });
    }

    categoryChange = (e) => {
        e.preventDefault();
        this.setState({ budgetLineItemId: e.target.value })
    }

    addExpenseEvent = (e) => {
        e.preventDefault();
        const newExpense = {
            expenseId: '',
            expenseName: this.state.expenseName,
            userId: this.props.userId,
            budgetLineItemId: parseInt(this.state.budgetLineItemId),
            cost: parseFloat(this.state.cost)
        };
        expenseData.addExpense(newExpense)
        .then((result) => {
            this.props.onClose();
            this.props.onSave();
        })
        .catch((error) => {
            console.error(error)
        });
            
    }

    closeExpenseForm = (e) => {
        e.preventDefault();
        this.props.onClose();
    }

    render() {
        const { expenseName, cost } = this.state;
        const { conBudget } = this.props;
        return (
            <div>
                <form className="expense container"> 
                    <div className="form-row">  
                    <div className="col-3">
                        <label htmlFor="budget-name">Expense Name</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Enter expense name"
                        value={expenseName}
                        onChange={this.expenseNameChange}
                        />
                    </div>

                    <div className="col-3">
                        <div className="dropdownSection">
                            <div className="form-group">
                            <label htmlFor="category" className="cat-label categoryDropdown">Choose Category</label>
                            <select
                                type="select"
                                className="form-control"
                                onChange={this.categoryChange}
                            >
                                <option>Category</option>
                                {conBudget.budgetLineItems.map((line) => <option key={line.budgetLineItemId} value={line.budgetLineItemId} >{line.name}</option>)}
                            </select>
                        </div>
                    </div>
                    
                </div>


                    <div className="col-3">
                        <label htmlFor="cost">Amount</label>
                        <input
                            type="number"  step="0.01" min="0" max="10"
                            className="form-control"
                            placeholder="Enter Cost"
                            value={cost}
                            onChange={this.costChange}
                        />
                    </div>
                    
                    </div>
                    <div className="btn btn-dark add-exp-btn" onClick={this.addExpenseEvent}>Save</div>
                    <div className="btn btn-danger add-exp-btn" onClick={this.closeExpenseForm}>Cancel</div>
                </form>
            </div> 
        )
    }
}

export default AddExpenseForm;