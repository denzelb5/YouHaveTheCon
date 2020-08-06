import React from 'react';
import PropTypes from 'prop-types';
import expenseData from '../../../helpers/data/expenseData';
import './ExpenseCard.scss';

class ExpenseCard extends React.Component {
    state = {
        showEditExpenseForm: false,
        expName: '',
        expCost: '',
        expLineId: ''
        
    }

    static props = {
        onSave: PropTypes.func,
        deleteExpense: PropTypes.func,
        
    }

    expNameChange = (e) => {
        e.preventDefault();
        this.setState({ expName: e.target.value });
    }

    expCostChange = (e) => {
        e.preventDefault();
        this.setState({ expCost: e.target.value});
    }

    editExpenseEvent = (e) => {
        const { conBudget } = this.props;
        
        const expenseNames = conBudget.expenses.map((expense) => expense);
        expenseNames.forEach((exp) => {
            if (parseInt(e.target.value) === exp.expenseId) {
                this.setState({showEditExpenseForm: true})
                this.setState({showLineForm: false})
                this.setState({expLineId: parseInt(e.target.value)})
            }
        });
        
    }

    
    updateExpenseItemEvent = (e) => {
        e.preventDefault();
        const { expName, expCost, expLineId } = this.state;
        const expenseToUpdate = {
            expenseName: expName,
            cost: parseFloat(expCost)
        };
        if (expLineId !== undefined) {

            expenseData.updateExpense(expLineId, expenseToUpdate)
            .then(() => {
                this.setState({ showEditExpenseForm: false })
                this.props.onSave();
            })
            .catch((error) => console.error(error));
        }
    }

    deleteExpenseEvent = (e) => {
        e.preventDefault();
        const { deleteExpense } = this.props;
        const expenseId = parseInt(e.target.value);
        deleteExpense(expenseId);
    }

    renderBudgetedAmountsForCategories() {
        const { conBudget } = this.props;
        const matchingValues = [];
        const expenseName = conBudget.expenses.map((expense) => expense);
        const budgetItemName = conBudget.budgetLineItems.map((line) => line);
        expenseName.forEach((expense) => {
            budgetItemName.forEach((item) => {
                if (expense.budgetLineItemId === item.budgetLineItemId) {
                    matchingValues.push(<div  className="col-sm expense-col">{item.amount}</div>);
                }
            });
        });
        
        return matchingValues;    
    }

    renderMatchingCategories() {
        const { conBudget } = this.props;
        const matchingCats = [];
        const expenses = conBudget.expenses.map((expense) => expense);
        const budgetCats = conBudget.budgetLineItems.map((line) => line);
        expenses.forEach((exp) => {
            budgetCats.forEach((cat) => {
                if (exp.budgetLineItemId === cat.budgetLineItemId) {
                    matchingCats.push(<div className="col-sm expense-col">{cat.name}</div>)
                }
            });
        });
        return matchingCats;
    }

    cancelEditForm = (e) => {
        e.preventDefault();
        this.setState({ showEditExpenseForm: false });
    }
         

    render() {
        const { conBudget } = this.props;
        const { showEditExpenseForm, expName, expCost } = this.state;

        if (conBudget.budgetLineItems !== undefined) {

            function addAllExpenses(prev, current) {
                return prev + current.cost;
            }

            const spentMoney = conBudget.expenses.reduce(addAllExpenses, 0);
            let availableMoney = conBudget.amountBudgeted;
            let remainder = availableMoney - spentMoney;

        return (
            <div className="container expense-card">
                <h1 className="expense-header">My Expenses</h1>               
                <div className="row exp-box">
                    <div className="col-sm">
                        <h5>Expense Name</h5>
                        {conBudget.expenses.map((expense) => 
                        <div className="col-sm expense-buttons-div"> 
                            {expense.expenseName}
                            <button className="btn btn-link expense-buttons" id={expense.expenseId} value={expense.expenseId} onClick={this.editExpenseEvent}>edit</button>
                            <button className="btn btn-link expense-buttons" id={expense.expenseId} value={expense.expenseId} onClick={this.deleteExpenseEvent}>x</button>
                        </div>)}
                        
                    </div>
                    <div className="col-sm expense-col">
                        <h5>Category</h5>
                        {this.renderMatchingCategories()}
                    </div>                  
                    <div className="col-sm">
                        <h5>Amount Spent</h5>
                        {conBudget.expenses.map((exp) => <div className="col-sm expense-col"> {exp.cost}</div>)}                         
                    </div>
                    <div className="col-sm">                        
                        <h5>Amount Budgeted</h5>
                        <div className="expense-col"> {this.renderBudgetedAmountsForCategories()}</div>
                    </div>
                    <div className="col-sm">
                        <h5>Remaining funds</h5>
                        <div>{remainder}</div>
                        
                    </div>
                    </div>
                    {showEditExpenseForm ? 
                                  (
                                      
                                      <form className="expense-form">
                                    <div className="form-row">
                    
                                    <div className="col-3 exp-form">
                                    <label htmlFor="expense-name">Expense Name</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter new expense name"
                                    value={expName}
                                    onChange={this.expNameChange}
                                    />
                                    
                                    </div>
                                    <div className="col-3 exp-form">
                                    <label htmlFor="amount-budgeted">Amount</label>
                                    <input
                                    type="number"  step="0.01" min="0" max="10"
                                    className="form-control"
                                    placeholder="Enter Expense Amount"
                                    value={expCost}
                                    onChange={this.expCostChange}
                                    />
                                        </div>
                                        <div className="btn btn-dark edit-save-btn" onClick={this.updateExpenseItemEvent}>Save</div>
                                        <div className="btn btn-light cancel-edit" onClick={this.cancelEditForm}>Cancel</div>
                                    </div>
                                    </form> 
                                  ) : <div></div>}
                    
                
            </div>
        )
        }
        return <></>;
    }
}

export default ExpenseCard;