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

        if (conBudget.budgetLineItems !== undefined) {

        return (
            <div className="container">
                <h1>Expense Card</h1>
                
                <div className="row ">
                    <div className="col-sm">
                        <h5>Expense Name</h5>
                        <p>Add into expense table-- expense.expenseName</p>
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
                    <div className="col-sm">
                        <h5>Amount Spent</h5>
                        {/* {this.renderCategoryAmounts(conBudget)}   */}
                        <p>insert into expense -- expense.cost</p>
                    </div>
                    <div className="col-sm">
                        {/* <h5>{`Available Funds $${remainder.toFixed(2)}`}</h5> */}
                        <h5>Amount Budgeted</h5>
                        {conBudget.budgetLineItems.map((line) => <div className="col-sm" key={line.budgetLineItemId}>{line.amount}</div> )}
                    </div>
                    <div className="col-sm">
                        <h5>Remaining funds</h5>
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