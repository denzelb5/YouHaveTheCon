import React from 'react';
import PropTypes from 'prop-types';
import './BudgetLineItem.scss';

class BudgetLineItem extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        amount: PropTypes.number
    }
    
    render() {
        
        const { conBudget } = this.props;

      
        if (conBudget.budgetLineItems !== undefined) {
            return (
                
                <div className="container">
                    <h1>These are my line items</h1>
                    
                    <div className="row ">
                    <div className="col-sm">
                        <div className="row">
                            <h5>Category</h5>
                            <button id="create-line" onClick={this.showLineEvent}>+</button>
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

export default BudgetLineItem;