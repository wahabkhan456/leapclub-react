import {call, put, takeEvery} from 'redux-saga/effects'





function getApi(){
    return fetch(`https://jsonplaceholder.typicode.com/photos`, {
        method:"GET",
        headers: {
            "Content-Type" : 'applicaion/json', 
        }
    }).then(response => response.json())
    .catch((error)=> {throw error})
}

function* fetchusers(action) {
    try {
        const users = yield call(getApi());
        yield put({type: "GET_USERS_SUCCESS", users: users});
    } catch (e) {
        yield put({type: "GET_USERS_FAILED", message: e.message})
    }
}

function* userSaga() {
    yield takeEvery('GET_USERS_REQUESTED', fetchusers)
}

export default userSaga;