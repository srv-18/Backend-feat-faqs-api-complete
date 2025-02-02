import mongoose, { Document } from 'mongoose';

interface IFAQ extends Document {
    question: string;
    answer: string;
    questionTranslations: Map<string, string>;
    answerTranslations: Map<string, string>;
    getTranslatedQuestion: (lang: string) => string;
    getTranslatedAnswer: (lang: string) => string;
}

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    questionTranslations: { type: Map, of: String, default: new Map() },
    answerTranslations: { type: Map, of: String, default: new Map() },
});

faqSchema.methods.getTranslatedQuestion = function(lang: string): string {
    return this.questionTranslations.get(lang) || this.question;
};

faqSchema.methods.getTranslatedAnswer = function(lang: string): string {
    return this.answerTranslations.get(lang) || this.answer;
};

export const FAQ = mongoose.model<IFAQ>('FAQ', faqSchema);