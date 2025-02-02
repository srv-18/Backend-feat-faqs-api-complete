import { Router } from 'express';
import { FAQ } from '../models/db';
import { translateText } from '../services/translation';
import { faqSchema } from '../zod-schema';
import { createClient } from 'redis';

export const adminRouter = Router();

adminRouter.post('/faqs', async (req, res) => {
    try{
        const faqData = faqSchema.safeParse(req.body);
        if(!faqData.success) {
            res.status(400).json({
                "error": "Invalid input"
            })
            return;
        }
        const { question, answer } = faqData.data;
        const faq = new FAQ({ question, answer });

        const client = await  createClient()
            .on('error', err => console.log('Redis Client Error', err))
            .connect();

        const languages = ['hi', 'bn'];
            for (const lang of languages) {
                const questionTranslation = await translateText(question, lang);
                const answerTranslation = await translateText(answer, lang);
                faq.questionTranslations.set(lang, questionTranslation);
                faq.answerTranslations.set(lang, answerTranslation);

                //redis
                const key = `faqs:${lang}`;
                await client.set(key, JSON.stringify(questionTranslation), {
                EX: 5*3600, // Cache for 5 hour
            });
        }

        await faq.save();

        res.status(201).json(faq);
    } catch(error) {
        console.error('Server error:', error);
        res.status(500);
    }
});