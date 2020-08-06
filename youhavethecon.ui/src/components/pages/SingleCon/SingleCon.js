import React from 'react';
import { Link } from 'react-router-dom';
import './SingleCon.scss';
import conData from '../../../helpers/data/conData';
import SingleConCard from '../../shared/SingleConCard/SingleConCard';
import BudgetCard from '../../shared/BudgetCard/BudgetCard';
import AddBudgetForm from '../../shared/AddBudgetForm/AddBudgetForm';
import budgetData from '../../../helpers/data/budgetData';
import AddBudgetItemForm from '../../shared/AddBudgetItemForm/AddBudgetItemForm';
import AddExpenseForm from '../../shared/AddExpenseForm/AddExpenseForm';
import ExpenseCard from '../../shared/ExpenseCard/ExpenseCard';
import expenseData from '../../../helpers/data/expenseData';


class SingleCon extends React.Component {
    state = {
        singleCon: {},
        conBudget: {},
        expenses: {},
        showBudgetForm: false,
        showLineForm: false,
        showExpenseForm: false,
        showAddCategoryForm: false
        
    }

    getCurrentCon = () => {
        const { conId, userId } = this.props.match.params;
       
        conData.getSingleCon(conId, userId)
            .then((response) => {
                const singleCon = response.data;
                this.setState({ singleCon });
            })
            .catch((error) => console.error(error));
    }

    getConBudget = () => {
        const  userId  = parseInt(this.props.match.params.userId);
        const  conId  = parseInt(this.props.match.params.conId);
        budgetData.getBudgetForCon(conId, userId)
        .then((response) => {
            const conBudget = response.data;
            this.setState({ conBudget });
            this.setState({ showAddCategoryForm: false });
        })
        .catch((error) => console.error(error));
    }

    deleteExpense = (expenseId) => {
        expenseData.deleteExpense(expenseId)
          .then(() => this.getConBudget())
          .catch((error) => console.error(error));
      }

    deleteBudgetLine = (budgetLineItemId) => {
        budgetData.deleteBudgetLineItem(budgetLineItemId)
        .then(() => this.getConBudget())
        .catch((error) => console.error(error));
    }
    

    componentDidMount() {
        this.getCurrentCon();
        this.getConBudget();
    }

    showFormEvent = (e) => {
        if (e.target.id === 'create-budget') {
            this.setState({ showBudgetForm: true });
        }
    }

    showLineEvent = (e) => {
        if (e.target.id === 'create-line-item') {
            this.setState({ showLineForm: true });
        }
    }

    showExpenseEvent = (e) => {
        if (e.target.id === 'show-expense-card') {
            this.setState({ showExpenseForm: true });
        }
    }

    toggleAddCategory = () => {
        this.setState({ showAddCategoryForm: !this.state.showAddCategoryForm });
    }

    toggleExpenseForm = () => {
        this.setState({ showExpenseForm: !this.state.showExpenseForm });
    }

    toggleAddBudgetForm = () => {
        this.setState({ showBudgetForm: !this.state.showBudgetForm });
    }

    

    render() {
        const { 
            singleCon, 
            showBudgetForm, 
            showAddCategoryForm, 
            conBudget,
            showExpenseForm } = this.state;
            const  userId  = parseInt(this.props.match.params.userId);
            const  conId  = parseInt(this.props.match.params.conId);
        
        return (
            <div className="single-con">
                <div className="buffer col-12"></div>
                <SingleConCard key={singleCon.conId} singleCon={singleCon} />

            {
                !conBudget.budgetId ?
            (<button id="create-budget" onClick={this.showFormEvent} className="btn btn-dark">Create A Budget</button>)
            : <h4 className="my-budget">My Budget</h4> 
            }
                
                {
                    showBudgetForm ? <AddBudgetForm conId={conId} userId={userId} onSave={this.getConBudget} onClose={this.toggleAddBudgetForm} /> : ('')
                }
                
                <div className="budget">
                    <BudgetCard key={conBudget.budgetId} onSave={this.getConBudget} conBudget={conBudget} deleteBudgetLine={this.deleteBudgetLine} />
                </div>
                <button className="btn btn-link add-cat" id="create-line-item" onClick={this.toggleAddCategory}>Add Category</button>
                {showAddCategoryForm && <AddBudgetItemForm
                                        budgetId={conBudget.budgetId}
                                        conId={conBudget.conId}
                                        conBudget={conBudget}
                                        userId={userId}
                                        onSave={this.getConBudget}
                                        onClose={this.toggleAddCategory}
                                        key={conBudget.budgetLineItems.budgetLineItemId}/>
                }
                
                <div className="expense-buffer"></div>
                <div><ExpenseCard key={conBudget.budgetId} conBudget={conBudget} budgetedAmount={this.getBudgetAmountsForExpenses} deleteExpense={this.deleteExpense} onSave={this.getConBudget}/></div>
                <div>
                    <button className="btn btn-link add-expense" id="show-expense-card" onClick={this.showExpenseEvent}>Add An Expense</button>
                </div>
                {
                    showExpenseForm && <AddExpenseForm 
                                            key={conBudget.expenses.expenseId} 
                                            conBudget={conBudget} 
                                            budgetId={parseInt(conBudget.budgetId)}
                                            userId={userId}
                                            showExpenseForm={showExpenseForm}
                                            onSave={this.getConBudget}
                                            onClose={this.toggleExpenseForm} />
                }
                <Link className="btn btn-link view-events" to={`/event/allevents/${conBudget.conId}/${conBudget.userId}`}>View My Events</Link>
            </div>
        )
    }
}

export default SingleCon;
