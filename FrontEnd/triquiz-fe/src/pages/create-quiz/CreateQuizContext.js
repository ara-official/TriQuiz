import React, {createContext, useReducer, useContext, useRef} from 'react';

let questionId;
const initialQuizContents = {
    title: "",
    description: "",
    thumbnailImage: null,
    private: false,
    authorId: "",
    password: "",
    questions: [
        {
            id: 0,
            title: "",
            hint: "",
            type: "객관식",
            image: null,
            answer: "",
            questionItems: []
        }
    ]
};

export const setTitleContents = (titleContents) => ({
    type: 'SET_TITLE_CONTENTS',
    contents: titleContents
});
export const addEmptyQuestion = () => ({
    type: 'ADD_EMPTY_QUESTION'
});
export const modifyQuestion = (question) => ({
    type: 'MODIFY_QUESTION',
    question
});
export const removeQuestion = (id) => ({
    type: 'REMOVE_QUESTION',
    id
});
const quizContentsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TITLE_CONTENTS':
            const contents = action.contents;
            return {
                ...state,
                title: contents.title,
                description: contents.description,
                thumbnailImage: contents.thumbnailImage,
                private: contents.private,
                authorId: contents.authorId,
                password: contents.password
            };
        case 'ADD_EMPTY_QUESTION':
            questionId.current += 1;
            return {
                ...state,
                questions: state.questions.concat({
                    id: questionId.current,
                    title: "",
                    hint: "",
                    type: "",
                    image: null,
                    placeholder: "",
                    questionItems: [],
                    answer: null
                })
            };
        case 'MODIFY_QUESTION':
            const modifiedQuestion = action.question;
            return {
                ...state,
                questions: state.questions.map(question =>
                    (question.id === modifiedQuestion.id) ? modifiedQuestion : question)
            };
        case 'REMOVE_QUESTION':
            return {
                ...state,
                questions: state.questions.filter(question => question.id !== action.id)
            };
        default:
            return state;
    }
};

const CreateQuizState = createContext();
const CreateQuizDispatch = createContext();

function CreateQuizContext({ children }) {
    questionId = useRef(1);
    const [state, dispatch] = useReducer(quizContentsReducer, initialQuizContents);
    return (
        <CreateQuizState.Provider value={state}>
            <CreateQuizDispatch.Provider value={dispatch}>
                {children}
            </CreateQuizDispatch.Provider>
        </CreateQuizState.Provider>
    );
}

export default CreateQuizContext;

export const useCreateQuizState = () => {
    const context = useContext(CreateQuizState);
    if (!context) {
        throw new Error("[useCreateQuizState] CreateQuizState context didn't created");
    }
    return context;
};

export const useCreateQuizDispatch = () => {
    const context = useContext(CreateQuizDispatch);
    if (!context) {
        throw new Error("[useCreateQuizState] CreateQuizDispatch context didn't created");
    }
    return context;
};
