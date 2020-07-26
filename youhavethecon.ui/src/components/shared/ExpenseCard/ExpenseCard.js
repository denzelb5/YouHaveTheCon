import React from 'react';
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

    render() {
        const { conBudget } = this.props;
        return (
            <div className="container">
                <h1>Expense Card</h1>
                
                <div className="row ">
                    <div className="col-sm">
                        <h5>Expense Name</h5>
                        <p>Add into expense table-- expense.expenseName</p>
                    </div>
                    <div className="col-sm">
                            <h5>Category</h5>
                            <p>Dropdown from budgetLineItem table?</p>
                    </div>
                    <div className="col-sm">
                        <h5>Amount Spent</h5>
                        {/* {this.renderCategoryAmounts(conBudget)}   */}
                        <p>insert into expense -- expense.cost</p>
                    </div>
                    <div className="col-sm">
                        {/* <h5>{`Available Funds $${remainder.toFixed(2)}`}</h5> */}
                        <h5>Amount Budgeted</h5>
                        <p>pull from budgetLineItem bli.amount</p>
                    </div>
                    <div className="col-sm">
                        <h5>Remaining funds</h5>
                        <p>calculate on front end</p>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default ExpenseCard;