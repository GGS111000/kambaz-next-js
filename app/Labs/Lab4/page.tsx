"use client"
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import EventObject from "./EventObject";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import Link from "next/link";
import StringStateVariables from "./StringStateVariables";
//import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples/page";
//import store from "../store";
import store from "../store/page"; // ✅ 明确指定路径

import { Provider } from "react-redux";
import HelloRedux from "./ReduxExamples/HelloRedux/page";
import CounterRedux from "./ReduxExamples/CounterRedux/page";
import dynamic from "next/dynamic";
import TodoList from "./ReduxExamples/todos/TodoList";

const DateStateVariable = dynamic(
  () => import("./DateStateVariable"),
  { ssr: false }
);

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
  return (
    <Provider store={store}>
    <div id="wd-passing-functions">
      <h2>Lab 4</h2>


      <PassingFunctions theFunction={sayHello} />
      <ClickEvent/>
      <EventObject/>
      <PassingDataOnEvent/>
      <PassingFunctions theFunction={sayHello}/>
      <Counter/>
      <BooleanStateVariables/>
      <StringStateVariables/>
      <DateStateVariable/>
      <ObjectStateVariable/>
      <ArrayStateVariable/>
      <ParentStateComponent/>
      <ReduxExamples/>
      <HelloRedux />
      <CounterRedux/>
      <TodoList/>
    </div>
    </Provider>
);}
