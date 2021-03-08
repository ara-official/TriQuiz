import React from "react";
import style from "./QuizCard.module.css";
import {BsPencil, HiOutlineDocumentReport, AiOutlineLike} from "react-icons/all";
import {apiServerAddr} from "../../../api/triQuizAPI";

function QuizCard({ quizData }) {
    return (
        <div className={style.Card}>
            <div className={style.Image}>
                <img src={`${apiServerAddr}/image/` + quizData.thumbnailImage} className={style.ImageSrc}/>
            </div>
            <div className={style.Title}>{quizData.title}</div>
            <div className={style.Footer}>
                <div className={style.Buttons}>
                    <button className={style.ParticipateButton}>
                        <BsPencil/>
                        참여하기
                    </button>
                    <button className={style.StatisticsButton}>
                        <HiOutlineDocumentReport/>
                        통계보기
                    </button>
                </div>
                <div className={style.QuestionNum}>{quizData.questionNum}문제</div>
                <div className={style.ParticipationNum}>
                    <BsPencil/>
                    {quizData.participationNum}
                </div>
                <div className={style.LikeNum}>
                    <AiOutlineLike/>
                    {quizData.likeNum}
                </div>
            </div>
        </div>
    );
}

export default QuizCard;
