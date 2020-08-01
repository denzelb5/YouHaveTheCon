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
        const { userId } = this.props.match.params;
        conData.getAllConsByUserId(userId)
        .then((request) => this.setState({ allCons: request }))
        .catch((error) => console.error(error));
    }

    componentDidMount() {
        this.getConData();
    }

    deleteCon = (conId) => {
        conData.deleteCon(conId)
          .then(() => this.getConData())
          .catch((error) => console.error(error));
    }
  
    render() {
        const { allCons } = this.state;
        
        return (
            <div className="all-cons">
                <div className="all-my-cons d-flex flex-wrap">
                    {allCons.map((con) => <ConCard key={con.conId} con={con} deleteCon={this.deleteCon} />)}
                </div>
                <Link className="btn btn-primary" to="/addcon">Add a con</Link>
            </div>
        )
    }
}

export default AllCons;