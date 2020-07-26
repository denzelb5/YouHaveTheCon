import React from 'react';
import './SingleCon.scss';
import conData from '../../../helpers/data/conData';
import SingleConCard from '../../shared/SingleConCard/SingleConCard';
import BudgetCard from '../../shared/BudgetCard/BudgetCard';
import AddBudgetForm from '../../shared/AddBudgetForm/AddBudgetForm';
import budgetData from '../../../helpers/data/budgetData';
import AddBudgetItemForm from '../../shared/AddBudgetItemForm/AddBudgetItemForm';
import ExpenseCard from '../../shared/ExpenseCard/ExpenseCard';


class SingleCon extends React.Component {
    state = {
        conId: parseInt(this.props.match.params.conId),
        userId: parseInt(this.props.match.params.userId),
        singleCon: {},
        conBudget: {},
        showBudgetForm: false,
        showLineForm: false
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

    componentDidMount() {
        this.getCurrentCon();
        this.getConBudget();
    }

    componentDidUpdate(prevState) {
        if (prevState !== this.state.conBudget.budgetLineItems) {
            // this.getConBudget()
        }
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

    

    render() {
        const { singleCon, showBudgetForm, showLineForm, conBudget, conId, userId } = this.state;
        
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

                <div><ExpenseCard conBudget={conBudget} /></div>
            </div>
        )
    }
}

export default SingleCon;
