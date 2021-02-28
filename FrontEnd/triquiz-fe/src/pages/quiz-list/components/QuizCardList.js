import React from "react";
import {useQuizListState} from "../QuizListContext";
import QuizCard from "./QuizCard";
import style from "./QuizCardList.module.css"

function QuizCardList() {
    const quizListState = useQuizListState();
    const {quizList} = quizListState;

    return (
        <div className={style.CardListContainer}>
            <div className={style.CardList}>
                {quizList.map(quiz => (
                    <QuizCard quizData={quiz} key={quiz.id}/>
                ))}
            </div>
        </div>
    );
}

export default QuizCardList;
