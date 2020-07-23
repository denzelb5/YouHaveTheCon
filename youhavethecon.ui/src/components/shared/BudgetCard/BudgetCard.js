import React from 'react';
import PropTypes from 'prop-types';
import './BudgetCard.scss';
import budgetData from '../../../helpers/data/budgetData';




class BudgetCard extends React.Component {
   
    render() {
        const { conBudget } = this.props;

        if (conBudget.budgetLineItems !== undefined) {
            return (
                
                <div className="container">
                    <h1>This is the budget Card</h1>
                    <div>
                        <h4>Name:  {conBudget.budgetName}</h4>
                        <h4> Amount Available:  ${conBudget.amountBudgeted}</h4>
                     </div>
                    <div className="row ">
                    <div className="col-sm">
                        <div className="row">
                            <h5>Category</h5>
                            <button>+</button>
                        </div>
                        {conBudget.budgetLineItems.map((lineItem) => <div key={lineItem.budgetLineItemId} className="col-sm ">{lineItem.name}</div>)}
                    </div>
                    <div className="col-sm">
                        <h5>Amount Needed</h5>
                        {conBudget.budgetLineItems.map((lineItem) => <div key={lineItem.budgetLineItemId} className="col-sm ">{lineItem.amount}</div>)}
                            
                        
                        </div>
                        <div className="col-sm">
                            <h5>Available Funds</h5>
                        </div>
                        
                    </div>
                </div>
            );
            
        }

        return <></>;
    }
}

export default BudgetCard;