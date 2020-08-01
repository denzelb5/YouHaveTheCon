import React from 'react';
import CosplayCard from '../../shared/CosplayCard/CosplayCard';
import './AllCosplays.scss';
import cosplayData from '../../../helpers/data/cosplayData';
import { Link } from 'react-router-dom';

class AllCosplays extends React.Component {
    state = {
        allCosplays: []
    }

    getCosplayData() {
        const { userId } = this.props.match.params;
        cosplayData.getAllCosplaysByUserId(userId)
        .then((request) => this.setState({ allCosplays: request }))
        .catch((error) => console.error(error));
    }

    componentDidMount() {
        this.getCosplayData();
    }

    
    render() {
        const { allCosplays } = this.state;
        const userId = parseInt(this.props.match.params.userId)
        return (
            <div>
                <h1>AllCosplay Page</h1>
                <Link className="btn btn-dark" to={`/addcosplay/${userId}`}>Add Cosplay</Link>
                <div className="container d-flex flex-wrap">
                    {allCosplays.map((cosplay) => <CosplayCard key={cosplay.cosplayId} cosplay={cosplay} />)}
                </div>
            </div>
        );
    }
}

export default AllCosplays;