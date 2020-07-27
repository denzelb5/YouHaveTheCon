import React from 'react';
import './AddExpenseForm.scss';
import PropTypes from 'prop-types';
import expenseData from '../../../helpers/data/expenseData';

class AddExpenseForm extends React.Component {
    state = {
        expenseName: '',
        cost: '',
        name: ''
        
    }

    static props = {
        budgetId: PropTypes.int,
        onSave: PropTypes.func
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
        this.setState({ name: e.target.value })
    }

    addExpenseEvent = (e) => {
        e.preventDefault();
        const newExpense = {
            expenseId: '',
            expenseName: this.state.expenseName,
            userId: this.props.userId,
            budgetLineItemId: this.props.budgetLineItems.budgetLineItemId,
            cost: this.state.cost
        };
        expenseData.addExpense(newExpense)
        .then((result) => {
            this.setState({ showExpenseForm: true })
            this.props.onSave();
        })
        .catch((error) => console.error(error));
    }

    render() {
        const { expenseName, cost, category, showExpenseForm } = this.state;
        const { conBudget } = this.props;
        return (
            <form className="expense">   
                <div className="form-group">
                    <label htmlFor="budget-name">Expense Name</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Enter expense name"
                    value={expenseName}
                    onChange={this.expenseNameChange}
                    />
                </div>

                <div className="col-sm">
                    <div className="dropdownSection">
                        <div className="form-group">
                         <label htmlFor="category" className="col-form-label categoryDropdown"><strong>Choose Category</strong></label>
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


                <div className="form-group">
                    <label htmlFor="cost">Amount</label>
                    <input
                        type="number"  step="0.01" min="0" max="10"
                        className="form-control"
                        placeholder="Enter Cost"
                        value={cost}
                        onChange={this.costChange}
                    />
                </div>
                <div className="btn btn-dark" onClick={this.AddExpenseEvent}>Save</div>
            </form>
            
        )
    }
}

export default AddExpenseForm;