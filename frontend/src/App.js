import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Counter from "./components/Counter";
import Homepage from "./components/Homepage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Homepage />
            </>
          }
        />
        <Route
          path="/counter"
          element={
            <>
              <Counter />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
