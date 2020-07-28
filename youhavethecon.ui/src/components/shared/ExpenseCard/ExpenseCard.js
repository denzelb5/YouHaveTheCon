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
                        {conBudget.expenses.map((expense) => <div className="col-sm"> {expense.expenseName}</div>)}
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