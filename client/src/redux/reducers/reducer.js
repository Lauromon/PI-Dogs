const { GET_DOGS, GET_DOG_BY_NAME, GET_DOG_DETAIL, GET_TEMPERAMENTS, FILTER_TEMPERAMENT, FILTER_FROM, ORDER_BY, CREATE_DOG, DELETE_DOG, UPDATE_DOG, ADD_FAVORITE, REMOVE_FAVORITE } = require('../actions/types');

const initialState = {
    dogs: [],
    details: [],
    auxDogs: [],
    temperaments: [],
    dogFavorites: []
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_FAVORITE) {
        return {
            ...state,
            dogFavorites: state.dogFavorites.concat(action.payload)
        }
    }
    if (action.type === GET_DOGS) {
        return {
            ...state,
            dogs: action.payload,
            auxDogs: action.payload
        };
    }
    if (action.type === GET_DOG_BY_NAME) {
        return {
            ...state,
            dogs: action.payload
        };
    }
    if (action.type === GET_TEMPERAMENTS) {
        return {
            ...state,
            temperaments: action.payload
        };
    }
    if (action.type === REMOVE_FAVORITE) {
        return {
            ...state,
            dogFavorites: state.dogFavorites.filter(dog => dog.id !== action.payload)
        }
    }
    if (action.type === GET_DOG_DETAIL) {
        return {
            ...state,
            details: action.payload
        };
    }
    if (action.type === FILTER_TEMPERAMENT) {
        const allDogs = state.auxDogs
        if (action.payload === 'all') {
            return {
                ...state,
                dogs: allDogs
            };
        } else {
            const filterApi = allDogs.filter(e => e.temperaments?.includes(action.payload));

            const filterDb = [];
            allDogs.forEach(e => {
                if (typeof e.id === 'string') {
                    e.temperaments.forEach(t => {
                        if (t.name === action.payload) filterDb.push(e);
                    })
                }
            });

            return {
                ...state,
                dogs: filterApi.concat(filterDb)
            };
        }

    }
    if (action.type === FILTER_FROM) {
        const allDogs = state.auxDogs
        var filterFrom;
        if (action.payload === 'API') {
            filterFrom = allDogs.filter(e => !isNaN(e.id));
        }
        if (action.payload === 'Created') {
            filterFrom = allDogs.filter(e => isNaN(e.id));
        } else {
            filterFrom = allDogs
        }
        return {
            ...state,
            dogs: filterFrom
        };
    }
    if (action.type === ORDER_BY) {
        var sorted;
        if (action.payload === 'asc') {
            sorted = state.dogs.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            })
        }
        if (action.payload === 'desc') {
            sorted = state.dogs.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            })
        }
        if (action.payload === "lower") {
            sorted = state.dogs.sort((a, b) => {
                if (parseInt(a.weight.split(' - ')[0]) > parseInt(b.weight.split(' - ')[0])) return 1;
                if (parseInt(a.weight.split(' - ')[0]) < parseInt(b.weight.split(' - ')[0])) return -1;
                return 0;

            })
        }
        if (action.payload === "higher") {
            sorted = state.dogs.sort((a, b) => {
                if (parseInt(a.weight.split(' - ')[0]) > parseInt(b.weight.split(' - ')[0])) return -1;
                if (parseInt(a.weight.split(' - ')[0]) < parseInt(b.weight.split(' - ')[0])) return 1;
                return 0;

            })
        }
        return {
            ...state,
            dogs: sorted
        };
    }
    if (action.type === CREATE_DOG) {
        return {
            ...state
        };
    }
    if (action.type === DELETE_DOG) {
        return {
            ...state
        };
    }
    if (action.type === UPDATE_DOG) {
        return {
            ...state
        };
    }

    return state;
}

export default rootReducer;
