import React, {useEffect} from "react";
import style from "./QuizListHeader.module.css";
import {AiOutlineMenu} from "react-icons/all";
import {setSearchText, sortByDateTime, sortByLikeNum, sortByParticipateNum, sortByQuestionNum, updateQuizList, useQuizListDispatch, useQuizListState} from "../QuizListContext";
import {getQuizList} from "../../../api/triQuizAPI";

function QuizListHeader() {
    const {search} = useQuizListState();
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

    const createOnClick = e => {
        e.preventDefault();
        window.location.href = "/create-quiz";
    };

    const searchTextOnChange = e => {
        const text = e.target.value;
        quizListDispatch(setSearchText(text));
    };

    const searchOnClick = async e => {
        e.preventDefault();
        const {data: quizList} = await getQuizList(5, search.text, search.order);
        quizListDispatch(updateQuizList(quizList));
    };

    useEffect(() => {
        getQuizList(5, search.text, search.order)
            .then(response => {
                const {data: quizList} = response;
                quizListDispatch(updateQuizList(quizList));
            });
    }, [search.order]);

    return (
        <header className={style.Header}>
            <div className={style.HeaderLeft}>
                <div className={style.MyQuizButton}>
                    <AiOutlineMenu/>
                </div>
                <input type="text" className={style.SearchInput}
                       onChange={searchTextOnChange} value={search.text}
                />
                <button className={style.SearchButton}
                        onClick={searchOnClick}
                >
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
                        onClick={createOnClick}
                >
                    만들기
                </button>
            </div>
        </header>
    );
}

export default QuizListHeader;
