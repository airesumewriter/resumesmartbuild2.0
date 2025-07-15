import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import pdfParse from "pdf-parse";
import dotenv from "dotenv";
dotenv.config();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

/**
 * Analyze resume file and return ATS insights
 * @param {string} filePath - Path to uploaded resume
 * @param {string} mimeType - File type (e.g., application/pdf)
 */
export async function analyzeResumeATS(filePath, mimeType) {
  try {
    let resumeText = "";

    if (mimeType === "application/pdf") {
      const pdfBuffer = fs.readFileSync(filePath);
      const parsed = await pdfParse(pdfBuffer);
      resumeText = parsed.text;
    } else if (
      mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimeType === "application/msword"
    ) {
      resumeText = "Support for Word files will be added soon.";
    } else {
      throw new Error("Unsupported file type");
    }

    const jobDescription = `Sample job description for a software engineer: 
      Proficiency in JavaScript, React, Node.js, Git. Strong communication and teamwork skills.`;

    const prompt = `You are an ATS resume evaluator. Compare the following resume text to the job description below. 
Return:
1. ATS compatibility percentage (0-100%)
2. Matching keywords found in both
3. Suggestions to improve ATS compatibility

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an ATS resume evaluator that compares resumes to job descriptions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error("Error analyzing resume:", err);
    return "An error occurred while analyzing the resume.";
  }
}
