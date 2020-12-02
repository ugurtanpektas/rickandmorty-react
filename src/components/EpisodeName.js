import React from "react";

class EpisodeDetail extends React.Component{

    constructor() {
        super();
        this.state = {episodeName: ""};
    }

    componentDidMount(){
        this.getEpisodeDetail();
    }
    
    getEpisodeDetail = async () => {
        const getEpisodeDetailCall = await fetch(this.props.episodeLink)
        const response = await getEpisodeDetailCall.json();
        this.setState({episodeName:response.name});
    }

    render(){
        return(
            <p>{this.state.episodeName}</p> 
        )    
    }
}

export default (EpisodeDetail);