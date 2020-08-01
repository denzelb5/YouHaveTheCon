import React from 'react';
import './SingleCosplay.scss';
import cosplayData from '../../../helpers/data/cosplayData';
import SingleCosplayCard from '../../shared/SingleCosplayCard/SingleCosplayCard';
import AddCosplayPieceForm from '../../shared/AddCosplayPieceForm/AddCosplayPieceForm';
import TodoCard from '../../shared/TodoCard/TodoCard';

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

    deleteTodo = (todoId) => {
        cosplayData.deleteTodo(todoId)
          .then(() => this.getCosplayPiecesData())
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



    render() {
        const { pieces, displayAddForm, todos } = this.state;
        const { cosplayId } = this.props.match.params;
        return (
            <div className="container cosplay-planner">
                <button className="btn btn-light" id="create-piece" onClick={this.showPieceFormEvent}>Add A Cosplay Piece</button>
                {pieces.map((piece) => <SingleCosplayCard key={piece.cosplayPiecesId} piece={piece} pieceOnSave={this.getCosplayPiecesData} />)}
               
               {
                   displayAddForm ? <AddCosplayPieceForm cosplayId={cosplayId} onSave={this.getCosplayPiecesData} /> : ('')
               }


    

            </div>
        );
    }
}

export default SingleCosplay;