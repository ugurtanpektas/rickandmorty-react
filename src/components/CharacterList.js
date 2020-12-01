import React from "react";
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {characterAction} from './../actions/characterAction';

const apiUrl = 'https://rickandmortyapi.com/api/character';

class CharacterList extends React.Component{
    
    componentDidMount(){
        this.getCharacters();
    }

    getCharacters = async () => {
        this.props.characterAction('LOADING');
        const getCharactersCall = await fetch(apiUrl);
        const response = await getCharactersCall.json();
        this.props.characterAction('GET_CHARACTERS',response);
    }

    render(){

        let html;
        if(this.props.characterState.loading){
            html = (
                <div className="loading"> Loading...</div>
            )
        }else{
            html = (
                <div>
                    <h1>Characters</h1>
                    {this.props.characterState.chaaracterList.map((character) => {
                        return(
                            <div className="item" key={character.id}>
                                <Link to={`/character/detail/${character.name}`}>{character.name}</Link>
                            </div>
                        )
                    })}
                </div>
            )
        }
        return(
            <div className="character-list-wrapper">
                {html}
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