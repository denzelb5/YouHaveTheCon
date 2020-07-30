import React from 'react';
import CosplayCard from '../../shared/CosplayCard/CosplayCard';
import './AllCosplays.scss';
import cosplayData from '../../../helpers/data/cosplayData';

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
        return (
            <div>
                <h1>AllCosplay Page</h1>
                <div className="container d-flex flex-wrap">
                    {allCosplays.map((cosplay) => <CosplayCard key={cosplay.cosplayId} cosplay={cosplay} />)}
                </div>
            </div>
        );
    }
}

export default AllCosplays;