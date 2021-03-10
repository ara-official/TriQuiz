import axios from "axios";

export const createQuiz = (quizData) => new Promise((resolve, reject) => {
    axios({
        method: "POST",
        url: "http://192.168.25.4:8000/quiz",
        contentType: "json/application",
        dataType: "json",
        data: quizData
    })
        .then(resolve)
        .catch(reject);
});

export const uploadImage = (imageFile) => new Promise((resolve, reject) => {
    if (!imageFile) throw new Error("imageFile cannot be null");
    const formData = new FormData();
    formData.append("file", imageFile);
    axios({
        method: "POST",
        url: "localhost:8000/image",
        contentType: "multipart/form-data",
        data: formData
    })
        .then(resolve)
        .catch(reject);
});
// export const createQuiz = (quizData) => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log(quizData);
//         resolve();
//     }, 3000);
// });
// export const uploadImage = (imageFile) => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log(imageFile);
//         resolve(`${imageFile.name}`);
//     }, 1500);
// });
