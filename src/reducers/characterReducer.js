const initialState = {
    characterList : [],
    characterDetail : [],
    loading:true
};

export default function characterReducer(state = initialState, action){
    switch(action.type){
        case 'LOADING':
            return {...state, loading:true};
        case 'GET_CHARACTERS':
            return {...state, loading:false, characterList:action.payload.results};
        case 'GET_CHARACTER_DETAIL':
            return {...state, loading:false, characterDetail:action.payload};
        default:
            return state;
    }
}