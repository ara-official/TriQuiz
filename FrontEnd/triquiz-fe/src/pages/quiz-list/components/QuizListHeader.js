import React from "react";
import style from "./QuizListHeader.module.css";
import {AiOutlineMenu} from "react-icons/all";

function QuizListHeader() {
    const CreateOnClick = e => {
        e.preventDefault();
        window.location.href = "/create-quiz";
    };

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
                <select>
                    <option>최신 순</option>
                    <option>참여자 순</option>
                    <option>좋아요 순</option>
                    <option>문제수 순</option>
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
