import { render, update, connect, selectorData } from "ivi";
import * as h from "ivi-html";
import { createStore } from "ivi-state";

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
  return h.div().children(`Hello ${text}!`);
}

interface SelectText {
  in: string;
  out: string;
}

const hello = connect(
  function (prev: SelectText) {
    const text = store.getState().text;
    if (prev && prev.in === text) {
      return prev;
    }
    return selectorData(text);
  },
  Hello,
);

render(hello(), document.getElementById("app")!);
