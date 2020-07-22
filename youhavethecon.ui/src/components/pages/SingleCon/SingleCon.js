import React from 'react';
import { Link } from 'react-router-dom';
import './SingleCon.scss';
import conData from '../../../helpers/data/conData';
import SingleConCard from '../../shared/SingleConCard/SingleConCard';
import BudgetCard from '../../shared/BudgetCard/BudgetCard';
import AddBudgetForm from '../../pages/AddBudgetForm/AddBudgetForm';
import budgetData from '../../../helpers/data/budgetData';
// import userData from '../../../helpers/data/userData';

class SingleCon extends React.Component {
    state = {
        conId: parseInt(this.props.match.params.conId),
        userId: parseInt(this.props.match.params.userId),
        singleCon: {},
        showBudgetForm: false
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
        // this.getConBudget();
    }

    showFormEvent = (e) => {
        if (e.target.id === 'create-budget') {
            this.setState({ showBudgetForm: true });
        }
    }

    // renderBudgetCards(conBudget)  {
    //     return conBudget.map((budget) => <BudgetCard key={budget.budgetId} conBudget={budget} />)
    // }

    render() {
        const { singleCon, showBudgetForm, conId, userId } = this.state;
        
        return (
            <div className="single-con">
                <h1>This is the SingleCon Page</h1>
                <SingleConCard key={singleCon.conId} singleCon={singleCon} />
                {/* <Link to={`/con/budget/${singleCon.conId}/${singleCon.userId}/addbudget`} id="create=budget" className="btn btn-dark">Create A Budget</Link>  */}
                <button id="create-budget" onClick={this.showFormEvent} className="btn btn-dark">Create A Budget</button> 
                {
                    showBudgetForm ? <AddBudgetForm conId={conId} userId={userId}/> : ('')
                }
                <div className="budget">
                   {/* {this.renderBudgetCards(conBudget)} */}
                {/* <BudgetCard key={conBudget.budgetId} conBudget={conBudget} /> */}
                </div>
            </div>
        )
    }
}

export default SingleCon;
