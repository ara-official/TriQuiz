export class CreateQuizDto {
    title: string;
    description: string;
    thumbnail_image: string;
    private: boolean;
    author_id: string;
    password: string;
    questions: [
        {
            title: string;
            hint: string;
            type: number;
            image: string;
            answer: string;
            question_items: [
                {
                    sequence: number;
                    text: string;
                    image: string;
                }
            ]
        }
    ]

}