import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import CreateQuizPage from "./pages/create-quiz/CreateQuizPage";

function App() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home}/>
            <Route exact path="/create-quiz" component={CreateQuizPage}/>
        </BrowserRouter>
    )
}

export default App;
