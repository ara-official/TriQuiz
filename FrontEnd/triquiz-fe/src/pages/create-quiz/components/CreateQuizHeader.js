import React from 'react';
import {useCreateQuizDispatch, useCreateQuizState} from "../CreateQuizContext";

function CreateQuizHeader() {
    const quizState = useCreateQuizState();
    return (
        <div>
            <button onClick={e => console.log(quizState)}>
                만들기
            </button>
        </div>
    );
}

export default CreateQuizHeader;
