import { render, update, connect } from "ivi";
import { createStore } from "ivi-state";
import { div } from "ivi-html";
import * as css from "./main.css";

interface State {
  text: string;
}

const STORE = createStore<State, any>(
  {
    text: "World",
  },
  (state, action) => state,
  update,
);

const hello = connect<string>(
  (prev) => {
    const text = STORE.getState().text;
    return (prev && prev === text) ? prev :
      text;
  },
  (text) => div(css.Main).c(`Hello ${text}!`),
);

render(hello(), document.getElementById("app")!);
