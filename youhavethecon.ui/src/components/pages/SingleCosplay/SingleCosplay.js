import React from 'react';
import './SingleCosplay.scss';
import cosplayData from '../../../helpers/data/cosplayData';
import SingleCosplayCard from '../../shared/SingleCosplayCard/SingleCosplayCard';
import AddCosplayPieceForm from '../../shared/AddCosplayPieceForm/AddCosplayPieceForm';


class SingleCosplay extends React.Component {
    state = {
        pieces: [],
        displayAddForm: false
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

    showPieceFormEvent = (e) => {
        if (e.target.id === 'create-piece') {
            this.setState({ displayAddForm: true });
        }
    }

    togglePieceForm = () => {
        this.setState({ displayAddForm: !this.state.displayAddForm });
    }



    render() {
        const { pieces, displayAddForm } = this.state;
        const { cosplayId } = this.props.match.params;
        return (
            <div className="cosplay-planner">
                <div className="container">
                    <h1 className="cos-plan-header">Cosplay Planner</h1>
                    <button className="btn btn-light" id="create-piece" onClick={this.showPieceFormEvent}>Add A Cosplay Piece</button>
                    {
                        displayAddForm ? <AddCosplayPieceForm cosplayId={cosplayId} onSave={this.getCosplayPiecesData} onClose={this.togglePieceForm} /> : ('')
                    }
                    {pieces.map((piece) => <SingleCosplayCard key={piece.cosplayPiecesId} piece={piece} pieceOnSave={this.getCosplayPiecesData} />)}
               
                </div>
    

            </div>
        );
    }
}

export default SingleCosplay;