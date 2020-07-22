import React from 'react';
import PropTypes from 'prop-types';
import './BudgetBox.scss';

class BudgetBox extends React.Component {
    static propTypes = {
        budgetName: PropTypes.string,
        amountBudgeted: PropTypes.number
    }
    render() {
        const {budgetName, amountBudgeted } = this.props;
        return (
            <div>{budgetName} {amountBudgeted}</div>
        )
    }


}

export default BudgetBox;