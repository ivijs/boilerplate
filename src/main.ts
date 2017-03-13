import { createStore, render, update, connect, selectorData, $h } from "ivi";

interface State {
    text: string;
}

const store = createStore(
    {
        text: "World",
    },
    function (state: State, action: any) {
        return state;
    },
    update,
);

function Hello(text: string) {
    return $h("div").children(`Hello ${text}!`);
}

interface SelectText {
    in: string;
    out: string;
}

const $Hello = connect(
    function (prev: SelectText) {
        const text = store.getState().text;
        if (prev && prev.in === text) {
            return prev;
        }
        return selectorData(text);
    },
    Hello,
);

render($Hello(), document.getElementById("app")!);
