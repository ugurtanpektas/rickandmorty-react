import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {characterAction} from './../actions/characterAction';
import { Link } from 'react-router-dom';

const apiUrl = 'https://rickandmortyapi.com/api/character/';

class CharacterDetail extends React.Component{

    componentDidMount(){
        this.getCharacterDetail();
    }
    
    getCharacterDetail = async () => {
        this.props.characterAction('LOADING');
        const getCharacterDetailCall = await fetch(apiUrl+this.props.match.params.id)
        const response = await getCharacterDetailCall.json();
        this.props.characterAction('GET_CHARACTER_DETAIL',response);
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
                    <h1>Character Detail</h1>
                    {this.props.characterState.characterDetail.name}
                </div>   
            )
        }
        return(
            <div className="character-detail-wrapper">
                {html}
                <div className="return-home" onClick={() => this.props.history.goBack()}>Return homepage</div>
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

export default connect(mapStateToProps, mapDispatchToProps) (CharacterDetail);