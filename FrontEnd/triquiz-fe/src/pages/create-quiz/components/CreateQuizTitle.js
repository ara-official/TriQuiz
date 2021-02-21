import React, {useState} from 'react';
import {GrLock, GrUnlock} from "react-icons/all";
import {useCreateQuizDispatch, setTitleContents} from "../CreateQuizContext";
import {BsImage} from "react-icons/all";
import "./QuizTitle.css";

function CreateQuizTitle() {
    const quizDispatch = useCreateQuizDispatch();
    const [state, setState] = useState({
        title: "",
        description: "",
        thumbnailImage: "",
        private: false,
        authorId: "",
        password: "",
    });
    return (
        <div className="quiz-title"
             onBlur={() => quizDispatch(setTitleContents(state))}>
            <input type="text" className="text-input" placeholder="제목 없는 퀴즈"
                   onChange={e => setState({...state, title: e.target.value})}
                   value={state.title}
            />
            <textarea rows="4" className="description-input" placeholder="퀴즈 설명"
                   onChange={e => setState({...state, description: e.target.value})}
                   value={state.description}
            />
            <div className="image-input">
                <label htmlFor="imageInput">
                    <BsImage/>
                    <span>
                        썸네일 이미지를 등록하세요.(필수 아님)
                    </span>
                </label>
                <input type="file" hidden id="imageInput"
                       onChange={e => setState({...state, thumbnailImage: e.target.value})}
                />
            </div>
            <div className="password-div">
                { (state.private) ? (<GrLock/>) : (<GrUnlock/>) }
                <input type="password" className="password-input"
                       onChange={e => (e.target.value.length > 0)
                           ? setState({...state, private: true, password: e.target.value})
                           : setState({...state, private: false, password: e.target.value})}
                       value={state.password}
                />
            </div>
        </div>
    );
}

export default CreateQuizTitle;
