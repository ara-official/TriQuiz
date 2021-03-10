import React, {useState} from 'react';
import {IoMdRemoveCircleOutline, GrRadial, GrRadialSelected, BsImage} from "react-icons/all";
import "./QuizQuestionItem.css";

function CreateQuizQuestionItem({ removeItem, textOnChange, imageOnChange, answerOnClick, item, answer }) {
    const [itemImagePreview, setItemImagePreview] = useState(null);

    const itemImageOnChange = e => {
        imageOnChange(item.sequence, e.target.files[0]);
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = e => {
                setItemImagePreview(reader.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const labelId = Math.round(Math.random() * 100000);
    return (
        <>
        <div className="question-item">
            <div className="item-radial" onClick={() => answerOnClick(item.text)}>
                {
                    (item.text === answer) ? (<GrRadialSelected/>) : (<GrRadial/>)
                }
            </div>
            <input className="item-text" type="text" value={item.text}
                   onChange={e => textOnChange(item.sequence, e.target.value)}/>
            <div className="item-image">
                <label htmlFor={`image-input-${labelId}`}>
                    <BsImage/>
                </label>
                <input type="file" id={`image-input-${labelId}`} hidden
                       onChange={itemImageOnChange}/>
            </div>
            <div className="remove-item" onClick={() => removeItem(item.sequence)}>
                <IoMdRemoveCircleOutline/>
            </div>
        </div>
            {
                (item.image)
                ? (<img className="question-item-preview" src={itemImagePreview} alt="문제 항목 이미지"/>)
                : null
            }
        </>
    );
}

export default CreateQuizQuestionItem;
