import React, {createContext, useContext, useEffect, useReducer} from "react";
import {getQuizList} from "../../api/triQuizAPI";

const initialQuizContents = {
    quizList: [
        {
            id: 1,
            title: "방탄 소년단의 모든것 1탄!",
            thumbnailImage: "https://image.chosun.com/sitedata/image/202009/01/2020090100517_0.jpg",
            private: false,
            authorId: "ehdtls901",
            questionNum: 10,
            participationNum: 120,
            likeNum: 29,
            createTime: 14
        },
        {
            id: 2,
            title: "유애나 3기 입학시험 모의고사",
            thumbnailImage: "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F404%2F2017%2F04%2F21%2F0000174180_001_20170421171116480.jpg&type=sc960_832",
            private: false,
            authorId: "throw_exceptions",
            questionNum: 10,
            participationNum: 291,
            likeNum: 182,
            createTime: 12
        },
        {
            id: 3,
            title: "ITZY 테스트 HARD 버전!!",
            thumbnailImage: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F63%2Ff8%2F9d%2F63f89df7bc305a2538f00e19e0e26ce2.jpg&type=sc960_832",
            private: false,
            authorId: "hunihoon91",
            questionNum: 10,
            participationNum: 90,
            likeNum: 21,
            createTime: 11
        },
        {
            id: 4,
            title: "비트코인 테스트(하위 50%는 투자 ㄴㄴ)",
            thumbnailImage: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAyMjJfMjY1%2FMDAxNjEzOTc4OTMwOTI0.9cQRX_eQNOiB5eTZarBh0oLZw1iXnyQnDLb8vCZx6Xkg.kRGU5aZRdBlC7vf1cgClhEzAauY7_CU8CQ1iWEl-YO8g.PNG.huobikorea%2Fbitcoin_PNG27.png&type=sc960_832",
            private: false,
            authorId: "throw_exceptions",
            questionNum: 10,
            participationNum: 121,
            likeNum: 9,
            createTime: 10
        },
        {
            id: 5,
            title: "퀴즈 5번 입니다. 아무나 오셈555",
            thumbnailImage: null,
            private: false,
            authorId: "manager001",
            questionNum: 10,
            participationNum: 531,
            likeNum: 423,
            createTime: 9
        },
        {
            id: 6,
            title: "퀴즈 6번 입니다. 아무나 오셈666",
            thumbnailImage: null,
            private: false,
            authorId: "SMS1989",
            questionNum: 10,
            participationNum: 120,
            likeNum: 10,
            createTime: 8
        },
        {
            id: 7,
            title: "퀴즈 7번 입니다. 아무나 오셈777",
            thumbnailImage: null,
            private: false,
            authorId: "hunihoon91",
            questionNum: 10,
            participationNum: 420,
            likeNum: 210,
            createTime: 7
        },
        {
            id: 8,
            title: "퀴즈 8번 입니다. 아무나 오셈888",
            thumbnailImage: null,
            private: false,
            authorId: "throw_exceptions",
            questionNum: 10,
            participationNum: 1120,
            likeNum: 140,
            createTime: 6
        },
        {
            id: 9,
            title: "퀴즈 9번 입니다. 아무나 오셈999",
            thumbnailImage: null,
            private: false,
            authorId: "SMS1989",
            questionNum: 10,
            participationNum: 928,
            likeNum: 867,
            createTime: 5
        },
        {
            id: 10,
            title: "퀴즈 10번 입니다. 아무나 오셈1010",
            thumbnailImage: null,
            private: false,
            authorId: "manager001",
            questionNum: 10,
            participationNum: 0,
            likeNum: 0,
            createTime: 4
        },
        {
            id: 11,
            title: "퀴즈 11번 입니다. 아무나 오셈1111",
            thumbnailImage: null,
            private: false,
            authorId: "SMS1989",
            questionNum: 10,
            participationNum: 0,
            likeNum: 0,
            createTime: 3
        },
        {
            id: 12,
            title: "퀴즈 12번 입니다. 아무나 오셈1212",
            thumbnailImage: null,
            private: false,
            authorId: "ehdtls901",
            questionNum: 10,
            participationNum: 0,
            likeNum: 0,
            createTime: 2
        },
        {
            id: 13,
            title: "퀴즈 13번 입니다. 아무나 오셈1313",
            thumbnailImage: null,
            private: false,
            authorId: "SMS1989",
            questionNum: 10,
            participationNum: 0,
            likeNum: 0,
            createTime: 1
        },
        {
            id: 14,
            title: "퀴즈 13번 입니다. 아무나 오셈1313",
            thumbnailImage: null,
            private: false,
            authorId: "SMS1989",
            questionNum: 10,
            participationNum: 0,
            likeNum: 0,
            createTime: 0
        }
    ]
};

export const updateQuizList = quizList => ({
    type: "UPDATE_QUIZ_LIST",
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
const quizListReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_QUIZ_LIST":
            return {
                ...state,
                quizList: action.quizList
            };
        case "SORT_BY_DATE_TIME":
            return {
                ...state,
                quizList: state.quizList.sort((a, b) => b.createTime - a.createTime)
            };
        case "SORT_BY_PARTICIPATE_NUM":
            return {
                ...state,
                quizList: state.quizList
                    .sort((a, b) => b.createTime - a.createTime)
                    .sort((a, b) => b.participationNum - a.participationNum)
            };
        case "SORT_BY_LIKE_NUM":
            return {
                ...state,
                quizList: state.quizList
                    .sort((a, b) => b.createTime - a.createTime)
                    .sort((a, b) => b.likeNum - a.likeNum)
            };
        case "SORT_BY_QUESTION_NUM":
            return {
                ...state,
                quizList: state.quizList
                    .sort((a, b) => b.createTime - a.createTime)
                    .sort((a, b) => b.questionNum - a.questionNum)
            };
        default:
            return state;
    }
};

const QuizListState = createContext();
const QuizListDispatch = createContext();

function QuizListContext({ children }) {
    const [state, dispatch] = useReducer(quizListReducer, initialQuizContents);

    useEffect(() => {
        // 처음 리스트 가져와서 세팅하기
        getQuizList()
            .then(response => {
                const quizList = response.data;
                dispatch(updateQuizList(quizList));
            });
    }, []);

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
