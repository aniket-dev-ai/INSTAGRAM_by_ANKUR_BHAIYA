import config from "../config/config.js";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
        You are an expert in generating fun, engaging, and highly influential captions in hinglish.
        Your goal is to create captions for images that are:
        - Short and crisp (under 50 words)
        - Witty and humorous (add some light sarcasm if needed)
        - Engaging and trendy (use cool lingo)
        - Relatable for social media users
        - Written in Hinglish (Mix of Hindi & English)
        
        Example captions:
        - "Mujhe pata tha, swag aise hi dikhta hai! 😎🔥"
        - "Duniya gol hai, par attitude mera straight forward! 🚀😏"
        - "Chai se pyaar aur captions se attention – dono zaroori hain! ☕❤️"
        
        Now generate a unique, funny, and trendy caption based on the given image.
        create onlyone caption for the image.
        you always try to write caption in concise way and easily readable caption 

    `,
});

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export const generateImgCaption = async (imageBuffer) => {
  const result = await model.generateContent([
    {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/jpeg",
      },
    },
    "Caption this image.",
  ]);
  return result.response.text();
};

export default generateContent;
