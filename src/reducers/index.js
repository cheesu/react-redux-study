// reducer 작성하기

import { INCREMENT, DECREMENT, SET_DIFF } from '../actions'; // action/index.js 에 만들어 놓은 export들을 가져온다
import { combineReducers } from 'redux'; //combineReducers 는 여러개의 reducer를 한개로 합칠 때 사용 되는 redux 내장 메소드 입니다.

const counterInitialState = {
    value: 0,
    diff: 1
};


/*
* reducer를 여러개로 분리하여 작성 할 땐, 서로 직접적인 관계가 없어야 합니다.
 예를 들어,INCREMENT 와 DECREMENT 부분에서, diff 값을 사용해야 하므로, SET_DIFF를 다른 reducer에 작성하지 않았죠.
* */
const counter = (state = counterInitialState, action) => {
    switch(action.type) {
        case INCREMENT:
            return Object.assign({}, state, {
                value: state.value + state.diff
            });
        case DECREMENT:
            return Object.assign({}, state, {
                value: state.value - state.diff
            });
        case SET_DIFF:
            return Object.assign({}, state, {
                diff: action.diff
            });
        default:
            return state;
    }
};


const extra = (state = { value: 'this_is_extra_reducer' }, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

/*
*
* {
 counter: { value: 0, diff: 1 }
 extra: { value: 'this_is_extra_reducer' }
 }
 reducer를 여러개로 분리하여 작성 할 땐, 서로 직접적인 관계가 없어야 합니다.
 예를 들어,INCREMENT 와 DECREMENT 부분에서, diff 값을 사용해야 하므로, SET_DIFF를 다른 reducer에 작성하지 않았죠.
* */

//combineReducers 를 사용 할 땐 이렇게 사용합니다.
const counterApp = combineReducers({
    counter,
    extra
});
/*
위 코드는 아래와 동일 함
const counterApp = ( state = { }, action ) => {
    return {
        counter: counter(state.counter, action),
        extra: extra(state.extra, action)
    }
}

 const counterApp = combineReducers({
    a: counter,
    b: extra
 });
 
 각 리듀서에 다른 key를 주고 싶을떈 위처럼 작성

*/

export default counterApp;