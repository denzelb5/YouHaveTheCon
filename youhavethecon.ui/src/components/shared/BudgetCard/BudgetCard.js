import React from 'react';
import './BudgetCard.scss';
import conData from '../../../helpers/data/conData';
import PropTypes from 'prop-types';



// function BudgetCard(props) {
class BudgetCard extends React.Component {
    state = {
        amount: ''
    }

    static props = {
        conId: PropTypes.int
    }

    amountChange = (e) => {
        e.preventDefault();
        this.setState({ amount: e.target.value });
      }

      editAmountEvent = (e) => {
          e.preventDefault();
          const { budgetCategoryId } = e.target.value;
          const editAmount = {
              amount: this.state.catAmount
          };
          conData.updateAmount(budgetCategoryId, editAmount)
          .then().catch((error) => console.error(error));

      }

    render() {
        const { conBudget } = this.props;

        

        if (conBudget.budgetCategories !== undefined) {

            return (
                <div className="container">
                    <div className="row ">
                    <div className="col-sm">
                        <h5>Category</h5>
                        {conBudget.budgetCategories.map((budgetCategory) => <div key={budgetCategory} className="col-sm ">{budgetCategory}</div>)}
                    </div>
                    <div className="col-sm">
                        <h5>Amount Needed</h5>
                        
                            
                        {conBudget.budgetCategories.map((amount) => <div key={amount.budgetCategoryId} className="col-sm "><form>
                        <div className="form-group">
                            <input
                            type="text"
                            className="form-control"
                            
                            placeholder="Enter con name"
                            value={amount.budgetCategoryName}
                            onChange={this.amountChange}
                            /> </div> </form> </div>)}
                          
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