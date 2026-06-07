const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

async function analyzeResume(text) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const prompt = `
Analyze this resume and provide:

1. Strengths
2. Missing Skills
3. Resume Improvement Suggestions

Resume:
${text}
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}

module.exports = analyzeResume;