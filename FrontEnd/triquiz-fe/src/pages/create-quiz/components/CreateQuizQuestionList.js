import React, {useRef, useEffect} from 'react';
import {addEmptyQuestion, useCreateQuizDispatch, useCreateQuizState} from "../CreateQuizContext";
import CreateQuizQuestion from "./CreateQuizQuestion";
import {IoAddCircleOutline} from 'react-icons/all'
import "./QuizQuestionList.css";

function CreateQuizQuestionList() {
    const quizState = useCreateQuizState();
    const quizDispatch = useCreateQuizDispatch();
    const questionListEnd = useRef();

    useEffect(() => {
        questionListEnd.current.scrollIntoView({behavior: "smooth"});
    }, [quizState.questions]);

    const addQuestionOnClick = () => quizDispatch(addEmptyQuestion());

    return (
        <div className="question-list">
            {quizState.questions.map(question => (
                <CreateQuizQuestion question={question} key={question.id}/>
            ))}
            <div onClick={addQuestionOnClick} ref={questionListEnd}>
                <IoAddCircleOutline className="question-add-icon"/>
            </div>
        </div>
    );
}

export default CreateQuizQuestionList;
