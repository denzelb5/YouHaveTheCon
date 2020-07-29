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
        onSave: PropTypes.func
    }

    // renderCategoryAmounts(conBudget) {
    //     return conBudget.budgetLineItems.map((lineItem) => {
    //         // using JS array split to get a new array of all the items BEFORE this one
    //         const itemsBeforeThisOne = [];
    //         //use reduce to sum up itemsBeforeThisOne total
    //         const sumOfItemsBeforeThisOne = 5000
    //     return <div key={lineItem.budgetLineItemId} className="col-sm ">${lineItem.amount}</div>
    //     });
    // }

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
        console.log('expLineid', this.state.expLineId)
    }

    
    updateExpenseItemEvent = (e) => {
        e.preventDefault();
        const { expName, expCost, expLineId } = this.state;
        const expenseToUpdate = {
            expenseName: expName,
            cost: parseFloat(expCost)
        };
        console.log(this.state);
        console.log('expenseToUpdate', expenseToUpdate);
        if (expLineId !== undefined) {

            expenseData.updateExpense(expLineId, expenseToUpdate)
            .then(() => {
                this.setState({ showEditExpenseForm: false })
                this.props.onSave();
            })
            .catch((error) => console.error(error));
        }
    }

    renderBudgetedAmountsForCategories() {
        const { conBudget } = this.props;
        const matchingValues = [];
        const expenseName = conBudget.expenses.map((expense) => expense);
        const budgetItemName = conBudget.budgetLineItems.map((line) => line);
        expenseName.forEach((expense) => {
            budgetItemName.forEach((item) => {
                if (expense.budgetLineItemId === item.budgetLineItemId) {
                    matchingValues.push(<div  className="col-sm">{item.amount}</div>);
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
                    matchingCats.push(<div className="col-sm">{cat.name}</div>)
                }
            });
        });
        return matchingCats;
    }

    

    renderRemainingFunds() {
        const { conBudget } = this.props;
        
        // const totalCosts = [];
        // let expAmounts = conBudget.expenses.map((exp) => exp);
        // let test = expAmounts.filter((x) => x.expenseName);
        // console.log('test', test);
        // let budgetCats = conBudget.budgetLineItems.map((item) => item);
        // expAmounts.forEach((exp) => {
        //             let total = exp.name.sort((a,b) => b.exp);
        //             totalCosts.push(total);
        //            console.log(totalCosts);
        // });
        // return totalCosts;
        // const costs = expAmounts.map(c => c.cost);
        // const keys = expAmounts.map((x) => x.expenseName);
        // console.log('costs', costs);
        // let test = expAmounts.reduce((r, o) => {
        //     keys.forEach((k) => r[k] + o[k]);
        //     return r;
        // }, Object.assign(...keys.map((k) => ({ [k]: costs }))));

        // const test2 = expAmounts.reduce((a, b) => {
        //     costs.forEach((j) => a[j] + b[j]);
        //     return a;
        // }, Object.assign(...costs.map((f) => ({ 0 : [f]}))));
        
        // console.log('test', test, 'test2', test2);
        // let total = expAmounts.expenseName.reduce((a, b) => b.cost + b.cost);
        
        // let results = expAmount.reduce((c, v) => (v.cost) + ' ' + c); 
        // results.forEach((result) => {
        //     let total = (result += result)
            //  console.log('total', total);
        //     return total;
        // })
        // console.log('results', results);
    } 

    render() {
        const { conBudget } = this.props;
        const { showEditExpenseForm, expName, expCost } = this.state;

        if (conBudget.budgetLineItems !== undefined) {

            function addAllExpenses(prev, current) {
                return prev + current.cost;
            }

            const spentMoney = conBudget.expenses.reduce(addAllExpenses, 0);
            console.log('spentMoney', spentMoney);
            let availableMoney = conBudget.amountBudgeted;
            console.log('availMoney', availableMoney);
            let remainder = availableMoney - spentMoney;

        return (
            <div className="container">
                <h1>Expense Card</h1>
                
                <div className="row ">
                    <div className="col-sm">
                        <h5>Expense Name</h5>
                        {conBudget.expenses.map((expense) => 
                        <div className="col-sm"> 
                        {expense.expenseName}
                        <button className="btn btn-light" id={expense.expenseId} value={expense.expenseId} onClick={this.editExpenseEvent}>edit</button>
                        </div>)}
                        {showEditExpenseForm ? 
                                  (
                                    <form className="expense-form">
                    
                                    <div className="form-group">
                                    <label htmlFor="expense-name">Expense Name</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter new expense name"
                                    value={expName}
                                    onChange={this.expNameChange}
                                    />
                                    
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="amount-budgeted">Amount</label>
                                    <input
                                    type="number"  step="0.01" min="0" max="10"
                                    className="form-control"
                                    placeholder="Enter Expense Amount"
                                    value={expCost}
                                    onChange={this.expCostChange}
                                    />
                                        </div>
                                        <div className="btn btn-dark" onClick={this.updateExpenseItemEvent}>Save</div>
                                    </form> 
                                  ) : <div></div>}
                    </div>
                    <div className="col-sm">
                        <h5>Category</h5>
                        {this.renderMatchingCategories()}
                    </div>
                    
                    <div className="col-sm">
                        <h5>Amount Spent</h5>
                        {conBudget.expenses.map((exp) => <div className="col-sm"> {exp.cost}</div>)}  
                        
                    </div>
                    <div className="col-sm">
                        {/* <h5>{`Available Funds $${remainder.toFixed(2)}`}</h5> */}
                        <h5>Amount Budgeted</h5>
                        <div> {this.renderBudgetedAmountsForCategories()}</div>
                    </div>
                    <div className="col-sm">
                        <h5>Remaining funds</h5>
                        <div>{remainder}</div>
                        
                    </div>
                    
                </div>
            </div>
        )
        }
        return <></>;
    }
}

export default ExpenseCard;