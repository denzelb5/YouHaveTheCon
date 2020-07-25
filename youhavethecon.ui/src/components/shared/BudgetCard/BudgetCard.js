import React from 'react';
import './BudgetCard.scss';





class BudgetCard extends React.Component {

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

            function addAllBudgetLineItems(prev, current) {
                return prev + current.amount;
            }

            const spentMoney = conBudget.budgetLineItems.reduce(addAllBudgetLineItems, 0);
            let availableMoney = conBudget.amountBudgeted;
            let remainder = availableMoney - spentMoney;
            return (
                
                <div className="container">
                    <h1>This is the budget Card</h1>
                    <div>
                        <h4>Name:  {conBudget.budgetName}</h4>
                        <h4> Amount Available:  ${conBudget.amountBudgeted}</h4>
                    </div>
                    <div className="row ">
                        <div className="col-sm">
                            
                                <h5>Category</h5>
                                
                           
                            {conBudget.budgetLineItems.map((lineItem) => <div key={lineItem.budgetLineItemId} className="col-sm ">{lineItem.name}</div>)}
                        </div>
                    <div className="col-sm">
                        <h5>Amount Needed</h5>
                        {this.renderCategoryAmounts(conBudget)}
                            
                        
                    </div>
                    <div className="col-sm">
                        <h5>{`Available Funds $${remainder.toFixed(2)}`}</h5>
                    </div>
                        
                    </div>
                </div>
            );
            
        }

        return <></>;
    }
}

export default BudgetCard;