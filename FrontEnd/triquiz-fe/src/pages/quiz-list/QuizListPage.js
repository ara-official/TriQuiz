import React from "react";
import QuizListContext from "./QuizListContext";
import QuizCardList from "./components/QuizCardList";
import QuizListHeader from "./components/QuizListHeader";

function QuizListPage() {
    return (
        <QuizListContext>
            <QuizListHeader/>
            <QuizCardList/>
        </QuizListContext>
    );
}

export default QuizListPage;
