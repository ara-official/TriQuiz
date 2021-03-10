import React from "react";
import {addQuizList, useQuizListDispatch, useQuizListState} from "../QuizListContext";
import QuizCard from "./QuizCard";
import style from "./QuizCardList.module.css";
import cardStyle from "./QuizCard.module.css";
import {MdAddCircleOutline} from "react-icons/all";
import {getQuizListMore} from "../../../api/triQuizAPI";

function QuizCardList() {
    const quizListState = useQuizListState();
    const {search, quizList} = quizListState;
    const quizListDispatch = useQuizListDispatch();

    const moreQuizOnClick = async e => {
        e.preventDefault();
        const lastId = quizList[quizList.length - 1].quizId;
        const {data: moreQuizList} = await getQuizListMore(lastId, 5, search.text, search.order);
        quizListDispatch(addQuizList(moreQuizList));
    };

    return (
        <div className={style.CardListContainer}>
            <div className={style.CardList}>
                {quizList.map(quiz => (
                    <QuizCard quizData={quiz} key={quiz.quizId}/>
                ))}
                <div className={cardStyle.Card}>
                    <div className={style.MoreQuizButton}
                         onClick={moreQuizOnClick}
                    >
                        <MdAddCircleOutline className={style.Button}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizCardList;
