import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {characterAction} from './../actions/characterAction';
import EpisodeName from "./EpisodeName";

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
            if(this.props.characterState.characterDetail){
                html = (
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                            <img src={this.props.characterState.characterDetail.image} alt={this.props.characterState.characterDetail.name}/>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-12">
                            <h1>{this.props.characterState.characterDetail.name}</h1>
                            <p>{this.props.characterState.characterDetail.status}</p>
                            <h2>Last 5 Episodes</h2>
                            {this.props.characterState.characterDetail.episode.reverse().slice(0, 5).map((episode) => {
                                return(
                                    <EpisodeName key={episode} episodeLink = {episode}></EpisodeName>
                                )
                            })}
                        </div>    
                    </div>   
                )
            }
        }
        return(
            <div className="character-detail-wrapper">
                <div className="container">
                    {html}
                    <div className="return-home" onClick={() => this.props.history.goBack()}>Return homepage</div>
                </div>
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