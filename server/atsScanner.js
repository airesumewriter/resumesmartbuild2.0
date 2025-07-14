import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

export async function analyzeResumeATS(filePath, mimeType) {
  let resumeText = "";

  // Extract text from file
  if (mimeType === "application/pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    resumeText = pdfData.text;
  } else if (
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const docBuffer = fs.readFileSync(filePath);
    const result = await mammoth.extractRawText({ buffer: docBuffer });
    resumeText = result.value;
  } else {
    throw new Error("Unsupported file type");
  }

  const prompt = `
You are an ATS (Applicant Tracking System) resume evaluator. Analyze the following resume and provide:
1. ATS Compatibility Score (0-100%)
2. List of matched and missing keywords
3. Formatting suggestions
4. Overall improvement tips

Resume Text:
${resumeText}
`;

  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are an ATS evaluator assistant." },
      { role: "user", content: prompt }
    ],
    temperature: 0.5,
    max_tokens: 600
  });

  return response.data.choices[0].message.content;
}
