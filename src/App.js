import "./App.css";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import MainPage from "./views/MainPage.js";
import SearchPage from "./views/SearchPage.js";

function  App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          <MainPage/>
        }/>
        <Route exact path="/search" element={
          <SearchPage/>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;