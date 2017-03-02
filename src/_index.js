
// 리덕스를 사용하지 않고 증가 하는 기능 만들기

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'; // redux를 사용하기 위해 createStore 객체 불러오기

//import App from './components/App';


/*
 * Action
 * 어떤 변화가 일어나야 할 지 알려주는 객체인 action 을 작성하였습니다.

 action을 작성 할 땐, 첫번째 필드는 type 으로서 필수적인 필드이며, action 의 형태를 정의해줍니다.

 그 다음으로는 개발자가 마음대로 추가 할 수 있습니다. 필요없으면 생략해도 되는 부분입니다.

 저희는 한번 클릭 될 때, 값이 얼마나 더해질 지 정할 수 있도록 addBy 를 추가하였습니다.
 */
const INCREMENT = "INCREMENT";

function increase(diff) {
    return {
        type: INCREMENT,
        addBy: diff
    };
}

/*
 * Reducer
 */
const initialState = {
    value: 0
};


/*
 *우리는 state 를 변경시키지 않습니다. 단, Object.assign() 메소드를 통하여 state를 복사 한후,
 * 복사된 객체를 수정하여 반환합니다.
 * 첫번째 argument 는 꼭 비어있는 객체이어야 합니다
 * */
const counterReducer = (state = initialState, action) => {
    switch(action.type) {
        case INCREMENT:
            return Object.assign({}, state, {
                value: state.value + action.addBy
            });
        default:
            return state;
    }
}

/*
 * Store
 * store를 만들때는 createStore() 메소드를 사용하며 reducer가 인수로 사용됩니다.
 */
const store = createStore(counterReducer);


// APP 컴포넌트
class App extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render() {

        let centerStyle = {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            MsUserSelect:'none',
            userSelect: 'none',
            cursor: 'pointer'
        };
        /* store.getState() :  현재 스토어에있는 데이터를 반환합니다. */
        return (
            <div
                onClick={ this.onClick }
                style={ centerStyle }
            >
                <h1> {this.props.store.getState().value} </h1>
            </div>
        )
    }

    onClick() {
        /*
         store.dispatch(ACTION) : 상태값을 수정 할 때 사용되는 메소드입니다. 인수로는 action 이 전달됩니다.
         위 컴포넌트에서는 사전에 만들어둔 increase 함수가 action 객체를 반환합니다.
         * */
        this.props.store.dispatch(increase(1));
    }
}




const render = () => {
    const appElement = document.getElementById('root');
    // store 를 App 컴포넌트의 props 로 전달해주었습니다.
    ReactDOM.render(
        <App store={store}/>,
        appElement
    );
};



/*
 store.subscribe(LISTENER): dispatch 메소드가 실행되면 리스너 함수가 실행됩니다.
  즉, 데이터에 변동이 있을때마다 리렌더링하도록 설정합니다.
* */
store.subscribe(render);
render();

//const rootElement = document.getElementById('root');
//ReactDOM.render(<App />, rootElement);

