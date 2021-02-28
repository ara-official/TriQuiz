import React, {useCallback} from 'react';
import {useCreateQuizState} from "../CreateQuizContext";
import "./CreateQuizHeader.css";
import {createQuiz, uploadImage} from "../../../api/triQuizAPI";

function CreateQuizHeader() {
    const quizState = useCreateQuizState();

    const convertFile2Url = async () => {
        const quizData = quizState;
        if (quizData.thumbnailImage) {
            quizData.thumbnailImage = await uploadImage(quizData.thumbnailImage);
        }
        for (let question of quizData.questions) {
            if (question.image) {
                question.image = await uploadImage(question.image);
            }
            for (let item of question.questionItems) {
                if (item.image) {
                    item.image = await uploadImage(item.image);
                }
            }
        }
        return quizData
    };

    const createOnClick = useCallback(e => {
        e.preventDefault();
        convertFile2Url()
            .then(quizData => createQuiz(quizData))
            .then(console.log)
            .catch(e => window.alert(e.response.data.message[0]));
    }, [quizState]);

    const gotoListOnClick = e => {
        e.preventDefault();
        window.location.href = "/quiz-list";
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
