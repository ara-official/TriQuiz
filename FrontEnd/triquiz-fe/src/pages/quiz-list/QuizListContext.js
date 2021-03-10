import React, {createContext, useContext, useReducer} from "react";
import {LIST_ORDER} from "../../api/triQuizAPI";

const initialQuizContents = {
    search: {
        text: "",
        order: LIST_ORDER.CREATE_TIME
    },
    quizList: []
};

export const updateQuizList = quizList => ({
    type: "UPDATE_QUIZ_LIST",
    quizList
});
export const addQuizList = quizList => ({
    type: "ADD_QUIZ_LIST",
    quizList
});
export const sortByDateTime = () => ({
    type: "SORT_BY_DATE_TIME"
});
export const sortByParticipateNum = () => ({
    type: "SORT_BY_PARTICIPATE_NUM"
});
export const sortByLikeNum = () => ({
    type: "SORT_BY_LIKE_NUM"
});
export const sortByQuestionNum = () => ({
    type: "SORT_BY_QUESTION_NUM"
});
export const setSearchText = text => ({
    type: "SET_SEARCH_TEXT",
    text
});
const quizListReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_QUIZ_LIST":
            return {
                ...state,
                quizList: action.quizList
            };
        case "ADD_QUIZ_LIST":
            return {
                ...state,
                quizList: state.quizList.concat(action.quizList)
            };
        case "SORT_BY_DATE_TIME":
            return {
                ...state,
                search: {
                    ...state.search,
                    order: LIST_ORDER.CREATE_TIME
                }
            };
        case "SORT_BY_PARTICIPATE_NUM":
            return {
                ...state,
                search: {
                    ...state.search,
                    order: LIST_ORDER.PARTICIPATION_NUM
                }
            };
        case "SORT_BY_LIKE_NUM":
            return {
                ...state,
                search: {
                    ...state.search,
                    order: LIST_ORDER.LIKE_NUM
                }
            };
        case "SORT_BY_QUESTION_NUM":
            return {
                ...state,
                search: {
                    ...state.search,
                    order: LIST_ORDER.QUESTION_NUM
                }
            };
        case "SET_SEARCH_TEXT":
            return {
                ...state,
                search: {
                    ...state.search,
                    text: action.text
                }
            };
        default:
            return state;
    }
};

const QuizListState = createContext();
const QuizListDispatch = createContext();

function QuizListContext({ children }) {
    const [state, dispatch] = useReducer(quizListReducer, initialQuizContents);

    return (
        <QuizListState.Provider value={state}>
            <QuizListDispatch.Provider value={dispatch}>
                {children}
            </QuizListDispatch.Provider>
        </QuizListState.Provider>
    );
}

export default QuizListContext;

export const useQuizListState = () => {
    const context = useContext(QuizListState);
    if (!context) {
        throw new Error("QuizListHeader is null");
    }
    return context;
}

export const useQuizListDispatch = () => {
    const context = useContext(QuizListDispatch);
    if (!context) {
        throw new Error("QuizListDispatch is null");
    }
    return context;
}
