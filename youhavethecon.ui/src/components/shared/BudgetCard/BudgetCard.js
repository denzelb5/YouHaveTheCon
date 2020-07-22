import React from 'react';
import './BudgetCard.scss';
// import conData from '../../../helpers/data/conData';
// import PropTypes from 'prop-types';



// function BudgetCard(props) {
class BudgetCard extends React.Component {
    
    render() {
        const { conBudget } = this.props;

        

        if (conBudget.budgetLineItems !== undefined) {

            return (
                
                <div className="container">
                    <h1>This is the budget Card</h1>
                    <div className="row ">
                    <div className="col-sm">
                        <h5>Category</h5>
                        {conBudget.budgetLineItems.map((lineItem) => <div key={lineItem.budgetLineItemId} className="col-sm ">{lineItem.name}</div>)}
                    </div>
                    <div className="col-sm">
                        <h5>Amount Needed</h5>
                        {conBudget.budgetLineItems.map((lineItem) => <div key={lineItem.budgetLineItemId} className="col-sm ">{lineItem.amount}</div>)}
                            
                        
                        </div>
                        <div className="col-sm">
                            Available Funds
                        </div>
                        
                    </div>
                </div>
            );
            
        }

        return <></>;
    }
}

export default BudgetCard;