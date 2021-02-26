import React from 'react';
import {useCreateQuizState} from "../CreateQuizContext";
import axios from "axios";
import "./CreateQuizHeader.css";

function CreateQuizHeader() {
    const quizState = useCreateQuizState();

    const createOnClick = e => {
        e.preventDefault();
        axios({
            method: "POST",
            url: "http://172.30.1.46:8000/quiz",
            contentType: "json/application",
            dataType: "json",
            data: quizState
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    };

    const gotoListOnClick = e => {
        e.preventDefault();
        window.location.href = "/";
    };

    return (
        <header>
            <div className="header-left">
                <button onClick={gotoListOnClick} className="list-button">
                    목록으로
                </button>
            </div>
            <div className="header-right">
                <button onClick={createOnClick} className="create-button">
                    만들기
                </button>
            </div>
        </header>
    );
}

export default CreateQuizHeader;
