import translate from "translate";

export const translateText = async (text: string, targetLang: string) => {
    try {
        const [translation] = await translate(text, targetLang);
        return translation;
    } catch (error) {
        console.error('Translation error:', error);
        return text;
    }
};
