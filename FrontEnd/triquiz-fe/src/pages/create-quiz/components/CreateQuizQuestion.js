import React, {useState, useRef} from 'react';
import {modifyQuestion, removeQuestion, useCreateQuizDispatch} from "../CreateQuizContext";
import {FaTimes, BsImage, GrRadial} from "react-icons/all";
import CreateQuizQuestionItem from "./CreateQuizQuestionItem";
import "./QuizQuestion.css";

function CreateQuizQuestion({ question }) {
    const [questionState, setQuestionState] = useState(question);
    const quizDispatch = useCreateQuizDispatch();
    const sequenceNum = useRef(1);

    const titleOnChange = e => setQuestionState({
        ...questionState,
        title: e.target.value
    });

    const hintOnChange = e => setQuestionState({
        ...questionState,
        hint: e.target.value
    });

    const typeOnChange = e => setQuestionState({
        ...questionState,
        type: e.target.value
    });

    const imageOnChange = e => setQuestionState({
        ...questionState,
        image: e.target.value
    });

    const placeholderOnChange = e => setQuestionState({
        ...questionState,
        placeholder: e.target.value
    });

    const itemTextOnChange = (seq, text) => setQuestionState({
        ...questionState,
        questionItems: questionState.questionItems.map(
            item => (item.sequence !== seq)
                ? item
                : {
                    ...item,
                    text
                }
        )
    });

    const itemImageOnChange = (seq, image) => setQuestionState({
        ...questionState,
        questionItems: questionState.questionItems.map(
            item => (item.sequence !== seq)
                ? item
                : {
                    ...item,
                    image
                }
        )
    });

    const removeItemOnClick = (seq) => setQuestionState({
        ...questionState,
        questionItems: questionState.questionItems.filter(item => item.sequence !== seq)
    });

    const addItemOnClick = () => {
        sequenceNum.current += 1;
        setQuestionState({
            ...questionState,
            questionItems: questionState.questionItems.concat({
                sequence: sequenceNum.current,
                text: "",
                image: null
            })
        });
    };

    const removeQuestionOnClick = () => {
        quizDispatch(removeQuestion(questionState.id));
    }

    return (
        <div className="question"
            onBlur={() => quizDispatch(modifyQuestion(questionState))}>
            <div className="remove-question" onClick={removeQuestionOnClick}>
                <FaTimes/>
            </div>
            <div className="flex">
                <input type="text" className="question-title-input"
                       onChange={titleOnChange}
                       value={questionState.title}
                       placeholder="문제를 입력하세요."
                />
                <div className="question-image-input">
                    <label htmlFor="imageInput">
                        <BsImage/>
                    </label>
                    <input type="file" onChange={imageOnChange} id="imageInput" hidden/>
                </div>
                <select className="question-select-input"
                    onChange={typeOnChange} value={questionState.type}>
                    <option value="객관식">객관식 질문</option>
                    <option value="주관식">주관식 질문</option>
                </select>
            </div>
            <textarea className="question-hint-input"
                      rows="3" onChange={hintOnChange}
                      value={questionState.hint}
                      placeholder="문제의 힌트를 입력하세요.(필수 아님)"
            />
            {
                (questionState.type === "주관식")
                ? (
                    <input type="text" className="question-subjective-answer"
                           onChange={placeholderOnChange}
                           value={questionState.placeholder}
                           placeholder="주관식 문제의 정답을 입력하세요."
                    />
                )
                : (
                    <div>
                        {questionState.questionItems.map(item => (
                            <CreateQuizQuestionItem removeItem={removeItemOnClick}
                                                    textOnChange={itemTextOnChange}
                                                    imageOnChange={itemImageOnChange}
                                                    item={item} key={item.sequence}/>
                        ))}
                        <div className="add-question-item" onClick={addItemOnClick}>
                            <GrRadial/>
                            <span>
                                "보기" 추가
                            </span>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default CreateQuizQuestion;
