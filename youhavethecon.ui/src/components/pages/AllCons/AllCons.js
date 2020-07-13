import React from 'react';
import conData from '../../../helpers/data/conData';
import ConCard from '../../shared/ConCard/ConCard';
import { Link } from 'react-router-dom';
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
                <div className="all-my-cons d-flex flex-wrap">
                    {allCons.map((con) => <ConCard key={con.conId} con={con} />)}
                </div>
                <Link className="btn btn-primary" to="/con/addcon">Add a con</Link>
            </div>
        )
    }
}

export default AllCons;