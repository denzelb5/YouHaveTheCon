import React from 'react';
import './SingleCon.scss';
import conData from '../../../helpers/data/conData';
import SingleConCard from '../../shared/SingleConCard/SingleConCard';
import BudgetCard from '../../shared/BudgetCard/BudgetCard';
// import userData from '../../../helpers/data/userData';

class SingleCon extends React.Component {
    state = {
        singleCon: {},
        conBudget: {}
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
        conData.getBudgetForCon(conId, userId)
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

    // renderBudgetCards(conBudget)  {
    //     return conBudget.map((budget) => <BudgetCard key={budget.budgetId} conBudget={budget} />)
    // }

    render() {
        const { singleCon, conBudget } = this.state;
        // const singleBudget = conBudget.map((budget) => <BudgetCard key={budget.budgetId} conBudget={budget} />);
        return (
            <div className="single-con">
                <h1>This is the SingleCon Page</h1>
                <SingleConCard key={singleCon.conId} singleCon={singleCon} />
                <div className="budget">
                   {/* {this.renderBudgetCards(conBudget)} */}
                <BudgetCard key={conBudget.budgetId} conBudget={conBudget} />
                </div>
            </div>
        )
    }
}

export default SingleCon;
