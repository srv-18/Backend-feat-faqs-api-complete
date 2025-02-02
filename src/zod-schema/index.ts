import { z } from 'zod';

export const faqSchema = z.object({
    question: z.string().min(2),
    answer: z.string().min(2),
})