import React, {useEffect} from "react";
import style from "./QuizListHeader.module.css";
import {AiOutlineMenu} from "react-icons/all";
import {sortByDateTime, sortByLikeNum, sortByParticipateNum, sortByQuestionNum, useQuizListDispatch} from "../QuizListContext";

function QuizListHeader() {
    const quizListDispatch = useQuizListDispatch();

    const sortingOnChange = e => {
        switch (e.target.value) {
            case "dateTime":
                quizListDispatch(sortByDateTime());
                break;
            case "participateNum":
                quizListDispatch(sortByParticipateNum());
                break;
            case "likeNum":
                quizListDispatch(sortByLikeNum());
                break;
            case "questionNum":
                quizListDispatch(sortByQuestionNum());
                break;
            default:
                quizListDispatch(sortByDateTime());
                break;
        }
    }

    const CreateOnClick = e => {
        e.preventDefault();
        window.location.href = "/create-quiz";
    };

    useEffect(() => {
        quizListDispatch(sortByDateTime());
    }, []);

    return (
        <header className={style.Header}>
            <div className={style.HeaderLeft}>
                <div className={style.MyQuizButton}>
                    <AiOutlineMenu/>
                </div>
                <input type="text" className={style.SearchInput}/>
                <button className={style.SearchButton}>
                    검색
                </button>
                <select onChange={sortingOnChange}>
                    <option value="dateTime">최신 순</option>
                    <option value="participateNum">참여자 순</option>
                    <option value="likeNum">좋아요 순</option>
                    <option value="questionNum">문제수 순</option>
                </select>
            </div>
            <div className={style.HeaderRight}>
                <button className={style.CreateButton}
                        onClick={CreateOnClick}
                >
                    만들기
                </button>
            </div>
        </header>
    );
}

export default QuizListHeader;
