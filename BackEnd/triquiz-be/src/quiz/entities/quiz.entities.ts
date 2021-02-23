// database

// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class Quiz{
//     @PrimaryGeneratedColumn({name: "quiz_id"})
//     id: number;

//     @Column({length:100})
//     title: string;

//     @Column({length:3000})
//     description: string;

//     @Column({length:1000})
//     thumbnail_image: string;

//     @Column({default: false})
//     private: boolean;

//     @Column({length:100})
//     author_id: string;

//     @Column({length:100})
//     password: string;

//     @Column({default: 0})
//     participation: number;
// }

export class Quiz{
    id: number;
    title: string;
    description: string;
    thumbnailImage: string;
    private: boolean;
    authorId: string;
    password: string;
    questions: [Question];
}

class Question{
    title: string;
    hint: string;
    type: string;
    image: string;
    answer: string;
    questionItems: [QuestionItem];
}
class QuestionItem{
    sequence: number;
    text: string;
    image: string;
}