import axios from "axios";

export const apiServerAddr = "http://localhost:8000";

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

export const getQuizList = () => new Promise((resolve, reject) => {
    axios({
        method: "GET",
        url: `${apiServerAddr}/quiz`,
        contentType: "json/application",
        dataType: "json"
    })
        .then(resolve)
        .catch(reject);
});

export const uploadImage = (imageFile) => new Promise((resolve, reject) => {
    if (!imageFile) throw new Error("imageFile cannot be null");
    const formData = new FormData();
    formData.append("image", imageFile);
    axios({
        method: "POST",
        url: `${apiServerAddr}/image`,
        contentType: "multipart/form-data",
        data: formData
    })
        .then(resolve)
        .catch(reject);
});
