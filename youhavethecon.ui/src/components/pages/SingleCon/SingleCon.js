import React from 'react';
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
        conId: parseInt(this.props.match.params.conId),
        userId: parseInt(this.props.match.params.userId),
        singleCon: {},
        conBudget: {},
        expenses: {},
        showBudgetForm: false,
        showLineForm: false,
        showExpenseForm: false
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
        const { userId } = this.props.match.params;
        const { conId } = this.props.match.params;
        budgetData.getBudgetForCon(conId, userId)
        .then((response) => {
            const conBudget = response.data;
            this.setState({ conBudget });
        })
        .catch((error) => console.error(error));
    }

    // getBudgetAmountsForExpenses = () => {
    //     const { conBudget } = this.state;
    //     const { budgetId, name } = this.state;
    //     // const { name } = conBudget.budgetLineItems.name;
    //     expenseData.getBudgetedAmountForExpenses(budgetId, name)
    //     .then((response) => {
    //         const { expenses } = response.data;
    //         this.setState({ expenses })
    //     })

    //  }

    componentDidMount() {
        this.getCurrentCon();
        this.getConBudget();
        // this.getBudgetAmountsForExpenses();
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

    

    render() {
        const { 
            singleCon, 
            showBudgetForm, 
            showLineForm, 
            conBudget, 
            conId, 
            userId,
            showExpenseForm } = this.state;
        
        return (
            <div className="single-con">
                <h1>This is the SingleCon Page</h1>
                <SingleConCard key={singleCon.conId} singleCon={singleCon} />
                <button id="create-budget" onClick={this.showFormEvent} className="btn btn-dark">Create A Budget</button> 
                
                {
                    showBudgetForm ? <AddBudgetForm conId={conId} userId={userId} onSave={this.getConBudget}/> : ('')
                }
                
                <div className="budget">
                    <BudgetCard key={conBudget.budgetId} conBudget={conBudget} />
                </div>
                <button id="create-line-item" onClick={this.showLineEvent}>Add Category</button>
                {
                    showLineForm ? <AddBudgetItemForm
                                        budgetId={conBudget.budgetId}
                                        conId={conBudget.conId}
                                        conBudget={conBudget}
                                        userId={userId}
                                        onSave={this.getConBudget}
                                        key={conBudget.budgetLineItems.budgetLineItemId}/> : ('')
                }
                <div>
                    <button className="btn btn-dark" id="show-expense-card" onClick={this.showExpenseEvent}>Add An Expense</button>
                </div>
                {
                    showExpenseForm ? <AddExpenseForm 
                                            key={conBudget.expenses.expenseId} 
                                            conBudget={conBudget} 
                                            budgetId={conBudget.budgetId}
                                            userId={userId}
                                            onSave={this.getConBudget} /> : ('')
                }
                <div><ExpenseCard conBudget={conBudget} budgetedAmount={this.getBudgetAmountsForExpenses}/></div>
                {/* <button className="btn btn-dark" id="create-expense">Add Expense</button> */}
            </div>
        )
    }
}

export default SingleCon;
