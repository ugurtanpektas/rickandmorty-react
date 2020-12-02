import React from "react";
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {characterAction} from './../actions/characterAction';
import InfiniteLoader from 'react-infinite-loader';

const apiUrl = 'https://rickandmortyapi.com/api/character';

class CharacterList extends React.Component{
    
    constructor() {
        super();
        this.state = {hideInfiniteScroll: false};
    }

    componentDidMount(){
        this.getCharacters();
    }

    getCharacters = async () => {
        this.props.characterAction('LOADING');
        const getCharactersCall = await fetch(apiUrl);
        const response = await getCharactersCall.json();
        this.props.characterAction('GET_CHARACTERS',response);
    }

    infiniteLoad = async () =>{
        if(this.props.characterState.characterListInfo.next){
            const getCharactersCall = await fetch(this.props.characterState.characterListInfo.next);
            const response = await getCharactersCall.json();
            this.props.characterAction('GET_CHARACTERS',response);
        }
        else{
            this.setState({hideInfiniteScroll:true});
        }
    }

    render(){

        let html;
        if(this.props.characterState.loading){
            html = (
                <div className="loading"> Loading...</div>
            )
        }else{
            html = (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <h1 className="list-header">Rick and Morty Characters</h1>
                        </div>
                    </div>
                    <div className="row">
                    {this.props.characterState.characterList.map((character) => {
                        return(
                            <div className="col-md-4 col-sm-6 col-xs-12" key={character.id}>
                                <div className="character-item">
                                    <Link to={`/character/${character.id}`}>
                                        <div className="character-image">
                                            <img src={character.image} alt={character.name}/>
                                        </div>
                                        <div className="character-info">
                                            {character.name}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            )
        }
        return(
            <div className="character-list-wrapper">
                {html}
                {!this.state.hideInfiniteScroll && <InfiniteLoader onVisited={ () => this.infiniteLoad() } />}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        characterState: state.characters
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        characterAction : characterAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (CharacterList);