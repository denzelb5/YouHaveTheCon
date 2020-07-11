import React from 'react';
import conData from '../../../helpers/data/conData';
import ConCard from '../../shared/ConCard/ConCard';
import './AllCons.scss';

class AllCons extends React.Component {
    state = {
        allCons: []
    }

    getConData = () => {
        conData.getAllCons()
        .then((request) => this.setState({ allCons: request }))
        .catch((error) => console.error(error));
    }

    componentDidMount() {
        this.getConData();
    }
  
    render() {
        const { allCons } = this.state;
        return (
            <div className="all-cons">
                {allCons.map((con) => <ConCard key={con.conId} con={con} />)}
            </div>
        )
    }
}

export default AllCons;