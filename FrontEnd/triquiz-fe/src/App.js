import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import CreateQuizPage from "./pages/create-quiz/CreateQuizPage";
import QuizListPage from "./pages/quiz-list/QuizListPage";

function App() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home}/>
            <Route exact path="/quiz-list" component={QuizListPage}/>
            <Route exact path="/create-quiz" component={CreateQuizPage}/>
        </BrowserRouter>
    )
}

export default App;
