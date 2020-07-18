import React from 'react';
import './SingleCon.scss';
import conData from '../../../helpers/data/conData';
import SingleConCard from '../../shared/SingleConCard/SingleConCard';
import BudgetCard from '../../shared/BudgetCard/BudgetCard';

class SingleCon extends React.Component {
    state = {
        singleCon: {},
        conBudgets: []
    }

    getCurrentCon = () => {
        const { conId } = this.props.match.params;
        conData.getSingleCon(conId)
            .then((response) => {
                const singleCon = response.data;
                this.setState({ singleCon });
            })
            .catch((error) => console.error(error));
    }

    getConBudget = () => {
        const { conId } = this.props.match.params;
        conData.getBudgetForCon(conId)
        .then((response) => {
            const conBudgets = response.data;
            this.setState({ conBudgets });
        })
        .catch((error) => console.error(error));
    }

    componentDidMount() {
        this.getCurrentCon();
        this.getConBudget();
    }

    renderBudgetCards(conBudgets) {
        return conBudgets.map((budget) => <BudgetCard key={budget.budgetId} conBudget={budget} />)
    }

    render() {
        const { singleCon, conBudgets } = this.state;
        // const singleBudget = conBudget.map((budget) => <BudgetCard key={budget.conId} budget={budget} />)
        return (
            <div className="single-con">
                <h1>This is the SingleCon Page</h1>
                <SingleConCard key={singleCon.conId} singleCon={singleCon} />
                <div className="budget">
                   {this.renderBudgetCards(conBudgets)}
                </div>
            </div>
        )
    }
}

export default SingleCon;
