export const initialStore = () => {
    return {
        people: [],
        planets: [],
        vehicles: [],
        favorites: []
    };
};

export default function storeReducer(state, action) {
    switch (action.type) {
        case 'SET_PEOPLE':
            return { ...state, people: action.payload };
        case 'SET_PLANETS':
            return { ...state, planets: action.payload };
        case 'SET_VEHICLES':
            return { ...state, vehicles: action.payload };
        case 'ADD_FAVORITE':
            if (state.favorites.some(fav => fav.uid === action.payload.uid && fav.type === action.payload.type)) {
                return state;
            }
            return { ...state, favorites: [...state.favorites, action.payload] };
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter(
                    fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
                )
            };
        default:
            return state;
    }
}