import React, {useEffect, useState} from 'react';
import {GrLock, GrUnlock} from "react-icons/all";
import {useCreateQuizDispatch, setTitleContents} from "../CreateQuizContext";
import {BsImage} from "react-icons/all";
import "./QuizTitle.css";

function CreateQuizTitle() {
    const quizDispatch = useCreateQuizDispatch();
    const [titleState, setTitleState] = useState({
        title: "",
        description: "",
        thumbnailImage: "",
        private: false,
        authorId: "test_ID",
        password: "",
    });
    const [titleImagePreview, setTitleImagePreview] = useState("");

    useEffect(() => {
        quizDispatch(setTitleContents(titleState));
    }, [titleState, quizDispatch]);

    const titleImageOnChange = e => {
        setTitleState({...titleState, thumbnailImage: e.target.files[0] || ""});
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTitleImagePreview(reader.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    return (
        <div className="quiz-title">
            <input type="text" className="text-input" placeholder="제목 없는 퀴즈"
                   onChange={e => setTitleState({...titleState, title: e.target.value})}
                   value={titleState.title}
            />
            <textarea rows="4" className="description-input" placeholder="퀴즈 설명"
                   onChange={e => setTitleState({...titleState, description: e.target.value})}
                   value={titleState.description}
            />
            <div className="image-input">
                <label htmlFor="titleImageInput">
                    <BsImage/>
                    {
                        (titleState.thumbnailImage)
                        ? (<img src={titleImagePreview} className="title-image-preview" alt="썸네일 이미지"/>)
                        : (<span>썸네일 이미지를 등록하세요.(필수 아님)</span>)
                    }
                </label>
                <input type="file" hidden id="titleImageInput"
                       onChange={titleImageOnChange}
                />
            </div>
            <div className="password-div">
                { (titleState.private) ? (<GrLock/>) : (<GrUnlock/>) }
                <input type="password" className="password-input"
                       onChange={e => (e.target.value.length > 0)
                           ? setTitleState({...titleState, private: true, password: e.target.value})
                           : setTitleState({...titleState, private: false, password: e.target.value})}
                       value={titleState.password}
                />
            </div>
        </div>
    );
}

export default CreateQuizTitle;
