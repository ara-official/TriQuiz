import axios from "axios";

export const apiServerAddr = "http://localhost:8000";
export const imageServerAddr = apiServerAddr;

export const createQuiz = (quizData) => new Promise((resolve, reject) => {
    axios({
        method: "POST",
        url: `${apiServerAddr}/quiz`,
        contentType: "json/application",
        dataType: "json",
        data: quizData
    })
        .then(resolve)
        .catch(reject);
});

export const LIST_ORDER = {
    CREATE_TIME: "create_time",
    LIKE_NUM: "like_num",
    QUESTION_NUM: "question_num",
    PARTICIPATION_NUM: "participation_num"
};
export const getQuizList = async (num, keyword, order) => {
    const queryString = `?num=${num}&keyword=${keyword}&order=${order}`;
    try {
        return await axios({
            method: "GET",
            url: `${apiServerAddr}/quiz/list${queryString}`,
            contentType: "json/application",
            dataType: "json"
        });
    } catch (e) {
        throw new Error(e);
    }
}

export const getQuizListMore = async (startId, num, keyword, order) => {
    const queryString = `?id=${startId}&num=${num}&keyword=${keyword}&order=${order}`;
    try {
        return await axios({
            method: "GET",
            url: `${apiServerAddr}/quiz/list/more${queryString}`,
            contentType: "json/application",
            dataType: "json"
        });
    } catch (e) {
        throw new Error(e);
    }
}

export const uploadImage = (imageFile) => new Promise((resolve, reject) => {
    if (!imageFile) throw new Error("imageFile cannot be null");
    const formData = new FormData();
    formData.append("image", imageFile);
    axios({
        method: "POST",
        url: `${imageServerAddr}/image`,
        contentType: "multipart/form-data",
        data: formData
    })
        .then(resolve)
        .catch(reject);
});
