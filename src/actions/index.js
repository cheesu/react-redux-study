export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const SET_DIFF = 'SET_DIFF';

//카운터 값 증가
export function increment() {
    return {
        type: INCREMENT
    };
}

// 카운터 값 감소
export function decrement() {
    return {
        type: DECREMENT
    };
}

// 버튼이 눌릴때 더하거나 뺄 값을 정한다.
export function setDiff(value) {
    return {
        type: SET_DIFF,
        diff: value
    };
}