import React, {useState} from 'react';
import {IoMdRemoveCircleOutline, GrRadial, GrRadialSelected, BsImage} from "react-icons/all";
import "./QuizQuestionItem.css";

function CreateQuizQuestionItem({ removeItem, textOnChange, imageOnChange, item }) {
    return (
        <div className="question-item">
            <div className="item-radial">
                <GrRadial/>
            </div>
            <input className="item-text" type="text" value={item.text}
                   onChange={e => textOnChange(item.sequence, e.target.value)}/>
            <div className="item-image">
                <label htmlFor="item-image-input">
                    <BsImage/>
                </label>
                <input type="file" id="item-image-input" hidden
                       onChange={e => imageOnChange(item.sequence, e.target.value)}/>
            </div>
            <div className="remove-item" onClick={() => removeItem(item.sequence)}>
                <IoMdRemoveCircleOutline/>
            </div>
        </div>
    );
}

export default CreateQuizQuestionItem;
