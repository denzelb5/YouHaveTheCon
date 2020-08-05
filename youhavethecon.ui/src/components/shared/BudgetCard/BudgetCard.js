import React from 'react';
import './BudgetCard.scss';
import budgetData from '../../../helpers/data/budgetData';
import PropTypes from 'prop-types';





class BudgetCard extends React.Component {
    state = {
        showEditForm: false,
        lineName: '',
        lineAmount: '',
        lineId: ''
        
    }

    static props = {
        onSave: PropTypes.func,
        deleteBudgetLine: PropTypes.func
    }

    lineNameChange = (e) => {
        e.preventDefault();
        this.setState({ lineName: e.target.value });
    }

    lineAmountChange = (e) => {
        e.preventDefault();
        this.setState({ lineAmount: e.target.value});
    }

    editLineEvent = (e) => {
        const { conBudget } = this.props;
        
        const categories = conBudget.budgetLineItems.map((line) => line);
        categories.forEach((cat) => {
            if (parseInt(e.target.value) === cat.budgetLineItemId) {
                this.setState({showEditForm: true})
                this.setState({showLineForm: false})
                this.setState({lineId: parseInt(e.target.value)})
            }
        });
        console.log('lineid', this.state.lineId)
    }

    
    updateLineItemEvent = (e) => {
        e.preventDefault();
        const { lineName, lineAmount, lineId } = this.state;
        const editedLine = {
            name: lineName,
            amount: parseFloat(lineAmount)
        };
        if (lineId !== undefined) {
            budgetData.updateBudgetLineItem(lineId, editedLine)
            .then(() => {
                this.setState({ showEditForm: false })
                this.props.onSave();
            })
            .catch((error) => console.error(error));
        }
    }

    deleteBudgetLineItemEvent = (e) => {
        e.preventDefault();
        const budgetLineItemId = parseInt(e.target.value);
        const { deleteBudgetLine } = this.props;
        deleteBudgetLine(budgetLineItemId);
    }

    
   
    render() {
        const { conBudget } = this.props;
        const { showEditForm, lineName, lineAmount } = this.state;
        
        
        if (conBudget.budgetLineItems !== undefined) {

            function addAllBudgetLineItems(prev, current) {
                return prev + current.amount;
            }

            
            
            const spentMoney = conBudget.budgetLineItems.reduce(addAllBudgetLineItems, 0);
            let availableMoney = conBudget.amountBudgeted;
            let remainder = availableMoney - spentMoney;
            return (
                
                <div className="container budget-card">
                   
                    <div className="d-flex justify-content-around">
                        <h4 className="budget-header">Name:  {conBudget.budgetName}</h4>
                        <h4 className="budget-header"> Amount Available:  ${conBudget.amountBudgeted}</h4>
                    </div>
                    <div className="row ">
                        <div className="col-sm">
                            
                                <h5>Category</h5>
                            
                       
                            {conBudget.budgetLineItems.map((lineItem) => <div key={lineItem.budgetLineItemId}
                                    className="col-sm hover-btn">{lineItem.name}
                                    <button className="btn btn-link sc-edit-btn" id={lineItem.budgetLineItemId} value={lineItem.budgetLineItemId} onClick={this.editLineEvent}>edit</button>
                                    <button className="btn btn-link sc-delete-btn" id={lineItem.budgetLineItemId} value={lineItem.budgetLineItemId} onClick={this.deleteBudgetLineItemEvent}>x</button>  
                                  </div>)}
                                  {showEditForm ? 
                                  (
                                    <form className="budget-line">
                    
                                    <div className="form-group">
                                    <label htmlFor="budget-name">Category Name</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder={conBudget.budgetLineItems.name}
                                    value={lineName}
                                    onChange={this.lineNameChange}
                                    />
                                    
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="amount-budgeted">Amount</label>
                                    <input
                                    type="number"  step="0.01" min="0" max="10"
                                    className="form-control"
                                    placeholder="Enter Budget Amount"
                                    value={lineAmount}
                                    onChange={this.lineAmountChange}
                                    />
                                        </div>
                                        <div className="btn btn-dark" onClick={this.updateLineItemEvent}>Save</div>
                                    </form> 
                                  ) : <div></div>}
                        </div>
                    <div className="col-sm">
                        <h5>Amount Needed</h5>
                        {/* {this.renderCategoryAmounts(conBudget)} */}
                           {conBudget.budgetLineItems.map((line) => <div className="col-sm">{line.amount}</div>)} 
                        
                    </div>
                    
                        
                    </div>
                    <div className="col-sm remainder">
                        <h5>{`Available Funds $${remainder.toFixed(2)}`}</h5>
                    </div>
                   
                    </div>

            );
            
        }

        return <></>;
    }
}

export default BudgetCard;