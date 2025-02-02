import { Router } from 'express';
import { FAQ } from '../models/db';
import { cache } from '../middlewares/cache';

export const faqsRouter = Router();

faqsRouter.get('/', cache, async (req, res) => {
    try{
        const lang = req.query.lang?.toString() || 'en';
        const faqs = await FAQ.find();

        if(lang === 'en') {
            const response = faqs.map(faq => ({
                question: faq.question,
                answer: faq.answer
            }));
            res.json(response);
        }

        const response = faqs.map(faq => ({
            question: faq.getTranslatedQuestion(lang),
            answer: faq.getTranslatedAnswer(lang),
        }));

        res.json(response);
    } catch(error) {
        res.status(500);
    }
});