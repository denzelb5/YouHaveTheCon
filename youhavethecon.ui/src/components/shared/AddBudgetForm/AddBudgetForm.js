import React from 'react';
import PropTypes from 'prop-types';
import budgetData from '../../../helpers/data/budgetData';
import './AddBudgetForm.scss';


class AddBudgetForm extends React.Component {
    state = {
        budgetName: '',
        amountBudgeted: '',
        showBudgetBox: false
    }

    static props = {
        conId: PropTypes.int,
        userId: PropTypes.int,
        onSave: PropTypes.func
        }

    budgetNameChange = (e) => {
        e.preventDefault();
        this.setState({ budgetName: e.target.value});
    }

    amountBudgetedChange = (e) => {
        e.preventDefault();
        this.setState({ amountBudgeted: parseFloat(e.target.value)});
    }

    AddNewBudgetEvent = (e) => {
        e.preventDefault();
        const newBudget = {
            budgetId: '',
            budgetName: this.state.budgetName,
            amountBudgeted: this.state.amountBudgeted,
            conId: this.props.conId,
            userId: this.props.userId
        };
        budgetData.addBudget(newBudget)
        .then((result) => {
            this.setState({ showBudgetBox: true });
            this.props.onSave();
        })
        .catch((error) => console.error(error));
    }

    closeAddBudgetForm = (e) => {
        e.preventDefault();
        this.props.onClose();
    }

    render() {
        const { budgetName, amountBudgeted, showBudgetBox } = this.state;
       
        return (
            <div>
                {
                    showBudgetBox ? (<div></div>) 
                    : (
                        <div className="container">
                            
                        <form className="add-budget-form">
                            
                        <div className="form-group budg-inputs col-4">
                        <label htmlFor="budget-name">Budget Name</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Enter budget name"
                        value={budgetName}
                        onChange={this.budgetNameChange}
                        />
                        </div>
                        <div className="form-group budg-inputs col-4">
                        <label htmlFor="amount-budgeted">Amount To Budget</label>
                        <input
                        type="number"  step="0.01" min="0" max="10"
                        className="form-control"
                        placeholder="Enter Budget Amount"
                        value={amountBudgeted}
                        onChange={this.amountBudgetedChange}
                        />
                            </div>
                            <div className="add-budg-form-btns">
                                <div className="btn btn-dark save-add-budg-btn budget-btns" onClick={this.AddNewBudgetEvent}>Save</div>
                                <div className="btn btn-danger cancel-budg-btn budget-btns" onClick={this.closeAddBudgetForm}>Cancel</div>
                            </div>
                        </form>
                        </div>
                        
                    )
                }
            
        
            </div>
        );
    }
}

export default AddBudgetForm;