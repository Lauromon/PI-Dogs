import axios from 'axios'
const {REACT_APP_API} = process.env
const { GET_DOGS, GET_DOG_BY_NAME, GET_DOG_DETAIL, GET_TEMPERAMENTS, FILTER_TEMPERAMENT, FILTER_FROM, ORDER_BY, CREATE_DOG, DELETE_DOG, UPDATE_DOG, ADD_FAVORITE, REMOVE_FAVORITE } = require('./types');

export function getDogs() {
    return async function (dispatch) {
        const res = await axios.get(`${REACT_APP_API}/dogs`)
        dispatch({ type: GET_DOGS, payload: res.data })
    };
}


export function getTemperaments() {
    return async function (dispatch) {
        const res = await axios.get(`${REACT_APP_API}/temperaments`)
        dispatch({ type: GET_TEMPERAMENTS, payload: res.data })
    };
}


export function getByName(name) {
    return async function (dispatch) {
        try {
            const res = await axios.get(`${REACT_APP_API}/dogs?name=${name}`)
            dispatch({ type: GET_DOG_BY_NAME, payload: res.data })
        } catch (err) {
            dispatch({ type: GET_DOG_BY_NAME, payload: err.response.data })
        }
    };
}


export function getById(id) {
    return async function (dispatch) {
        try {
            const res = await axios.get(`${REACT_APP_API}/dogs/${id}`)
            dispatch({ type: GET_DOG_DETAIL, payload: res.data })
        } catch (err) {
            dispatch({ type: GET_DOG_DETAIL, payload: err.response.data })
        }
    };
}


export function createDog(breed) {
    return async function (dispatch) {
        try {
            let res = await axios.post(`${REACT_APP_API}/dogs`, breed);
            return dispatch({ type: CREATE_DOG, payload: res.data });
        } catch (err) {
            return dispatch({ type: CREATE_DOG, payload: err.response.data })
        }
    };
}


export function deleteDog(id) {
    return async function (dispatch) {
        try {
            const res = await axios.delete(`${REACT_APP_API}/dogs/${id}`);
            return dispatch({ type: DELETE_DOG, payload: res.data });
        } catch (err) {
            return dispatch({ type: DELETE_DOG, payload: err.response.data });
        }
    };
}


export function updateDog(id, breed) {
    return async function (dispatch) {
        try {
            const res = await axios.put(`${REACT_APP_API}/dogs/${id}`, breed);
            return dispatch({ type: UPDATE_DOG, payload: res.data });
        } catch (err) {
            return dispatch({ type: UPDATE_DOG, payload: err.response.data })
        }
    };
}


export function orderBy(payload) {
    return { type: ORDER_BY, payload };
}



export function filterByTemperament(payload) {
    return { type: FILTER_TEMPERAMENT, payload };
}


export function filterFrom(payload) {
    return { type: FILTER_FROM, payload };
}

export function addFavorite(payload) {
    return { type: ADD_FAVORITE, payload };
}

export function removeFavorite(id) {
    return { type: REMOVE_FAVORITE, payload: id };
}