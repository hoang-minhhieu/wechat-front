const iniatialState = {
    userData: {}
};

const reducer = (state = iniatialState, action) => {
    switch (action.type) {
        case "USER":
            // faut copier userData et ajouter les attributs pas le changer ocmme ça
            return {
                ...state,
                userData: action.userData
            };

        default:
            return state;
        }
}

export default reducer;