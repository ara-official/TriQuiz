import React from 'react';
import CreateQuizHeader from "./components/CreateQuizHeader";
import CreateQuizTitle from "./components/CreateQuizTitle";
import CreateQuizQuestionList from "./components/CreateQuizQuestionList";
import CreateQuizToolBox from "./components/CreateQuizToolBox";
import CreateQuizContext from "./CreateQuizContext";
import "./QuizPage.css";

function CreateQuizPage() {
    return (
        <CreateQuizContext>
            <div className="container">
                <CreateQuizHeader/>
                <CreateQuizTitle/>
                <CreateQuizQuestionList/>
                <CreateQuizToolBox/>
            </div>
        </CreateQuizContext>
    );
}

export default CreateQuizPage;
