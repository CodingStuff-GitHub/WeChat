import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../other/rootSlice";

function Counter() {
  const { count } = useSelector((state) => state.rootStore);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment({ number: 2 }))}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

export default Counter;
