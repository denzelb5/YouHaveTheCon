import React from 'react';
import PropTypes from 'prop-types';
import './ExpenseCard.scss';

class ExpenseCard extends React.Component {
    

    renderCategoryAmounts(conBudget) {
        return conBudget.budgetLineItems.map((lineItem) => {
            // using JS array split to get a new array of all the items BEFORE this one
            const itemsBeforeThisOne = [];
            //use reduce to sum up itemsBeforeThisOne total
            const sumOfItemsBeforeThisOne = 5000
        return <div key={lineItem.budgetLineItemId} className="col-sm ">${lineItem.amount}</div>
        });
    }

    renderBudgetedAmountsForCategories() {
        const { conBudget } = this.props;
        const matchingValues = [];
        const expenseName = conBudget.expenses.map((expense) => expense);
        const budgetItemName = conBudget.budgetLineItems.map((line) => line);
        expenseName.forEach((expense) => {
            budgetItemName.forEach((item) => {
                if (expense.expenseName === item.name) {
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
                if (exp.expenseName === cat.name) {
                    matchingCats.push(<div className="col-sm">{cat.name}</div>)
                }
            });
        });
        return matchingCats;
    }

    renderRemainingFunds() {
        const { conBudget } = this.props;
        let expAmount = conBudget.expenses.map((exp) => exp);
        let cost = expAmount[expAmount.expenseName].reduce((a, b) => a += b);
        console.log(cost);
    }


    render() {
        const { conBudget } = this.props;

        if (conBudget.budgetLineItems !== undefined) {

        return (
            <div className="container">
                <h1>Expense Card</h1>
                
                <div className="row ">
                    <div className="col-sm">
                        <h5>Expense Name</h5>
                        {conBudget.expenses.map((expense) => <div className="col-sm"> {expense.expenseName}</div>)}
                    </div>
                    <div className="col-sm">
                        <h5>Category</h5>
                        {this.renderMatchingCategories()}
                    </div>
                    
                    <div className="col-sm">
                        <h5>Amount Spent</h5>
                        {conBudget.expenses.map((exp) => <div className="col-sm"> {exp.cost}</div>)}  
                        <p>insert into expense -- expense.cost</p>
                    </div>
                    <div className="col-sm">
                        {/* <h5>{`Available Funds $${remainder.toFixed(2)}`}</h5> */}
                        <h5>Amount Budgeted</h5>
                        <div> {this.renderBudgetedAmountsForCategories()}</div>
                    </div>
                    <div className="col-sm">
                        <h5>Remaining funds</h5>
                        <div>{this.renderRemainingFunds()}</div>
                        <p>calculate on front end</p>
                    </div>
                    
                </div>
            </div>
        )
        }
        return <></>;
    }
}

export default ExpenseCard;