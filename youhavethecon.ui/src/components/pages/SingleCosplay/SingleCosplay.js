import React from 'react';
import './SingleCosplay.scss';
import cosplayData from '../../../helpers/data/cosplayData';
import SingleCosplayCard from '../../shared/SingleCosplayCard/SingleCosplayCard';

class SingleCosplay extends React.Component {
    state = {
        pieces: []
    }

    getCosplayPiecesData = () => {
        const { cosplayId } = this.props.match.params;
        cosplayData.getAllCosplayPiecesByCosplayId(cosplayId)
        .then((request) => this.setState({ pieces: request }))
        .catch((error) => console.error(error));
    }

    componentDidMount() {
        this.getCosplayPiecesData();
    }


    render() {
        const { pieces } = this.state;
        return (
            <div className="container cosplay-planner">
                
                {pieces.map((piece) => <SingleCosplayCard key={piece.cosplayPiecesId} piece={piece} />)}
               

            </div>
        );
    }
}

export default SingleCosplay;