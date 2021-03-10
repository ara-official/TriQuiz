import React, {useCallback} from 'react';
import {useCreateQuizState} from "../CreateQuizContext";
import "./CreateQuizHeader.css";
import {createQuiz, uploadImage} from "../../../api/triQuizAPI";

function CreateQuizHeader() {
    const quizState = useCreateQuizState();

    const convertFile2Url = async () => {
        const quizData = quizState;
        let uploadImageData = null;
        if (quizData.thumbnailImage) {
            uploadImageData = await uploadImage(quizData.thumbnailImage);
            quizData.thumbnailImage = uploadImageData.data.data.filename;
        }
        for (let question of quizData.questions) {
            if (question.image) {
                uploadImageData  = await uploadImage(question.image);
                question.image = uploadImageData.data.data.filename;
            }
            for (let item of question.questionItems) {
                if (item.image) {
                    uploadImageData = await uploadImage(item.image);
                    item.image = uploadImageData.data.data.filename;
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
