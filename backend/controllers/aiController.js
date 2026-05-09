import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";
import Course from "../models/courseModel.js";

export const searchWithAi = async (req, res) => {
  let keyword = "";
  let courses = [];

  try {
    const { input } = req.body;
     
    if (!input) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;
    
    // Separate try-catch for Gemini API call
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `You are an intelligent assistant for an LMS platform. A user will type any query about what they want to learn. Your task is to understand the intent and return one **most relevant keyword** from the following list of course categories and levels:
- App Development  
- AI/ML  
- AI Tools  
- Data Science  
- Data Analytics  
- Ethical Hacking  
- UI UX Designing  
- Web Development  
- Others  
- Beginner  
- Intermediate  
- Advanced  
Only reply with one single keyword from the list above that best matches the query. Do not explain anything. No extra text.
Query: ${input}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        keyword = response.text().trim();
        console.log("AI Generated Keyword:", keyword);
      } catch (aiError) {
        console.error("Gemini API Error:", aiError.message);
        // Fallback to empty keyword, function continues
        keyword = "";
      }
    } else {
      console.error("GOOGLE_AI_API_KEY is not set!");
    }

    // Always perform MongoDB regex search
    courses = await Course.find({
      $or: [
        { title: { $regex: input, $options: 'i' } },
        { subTitle: { $regex: input, $options: 'i' } },
        { description: { $regex: input, $options: 'i' } },
        { category: { $regex: input, $options: 'i' } },
        { level: { $regex: input, $options: 'i' } }
      ]
    });

    // If no courses found with direct input, try with AI keyword if available
    if (courses.length === 0 && keyword) {
      courses = await Course.find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { subTitle: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
          { category: { $regex: keyword, $options: 'i' } },
          { level: { $regex: keyword, $options: 'i' } }
        ]
      });
    }

    return res.status(200).json({
      success: true,
      courses,
      aiKeyword: keyword || ""
    });

  } catch (error) {
    console.error("Search with AI error:", error.message);
    // Even in the main catch, we return a success: true with empty results to avoid crashing frontend
    return res.status(200).json({ 
      success: true,
      courses: [],
      aiKeyword: ""
    });
  }
}

export const generateQuiz = async (req, res) => {
  try {
    const { lectureTitle, courseTitle, courseDescription } = req.body;
    
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "AI service not configured" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert educator. Create a 5-question multiple choice quiz based on the following lecture and course details:
    Lecture Title: ${lectureTitle}
    Course Title: ${courseTitle}
    Course Description: ${courseDescription}

    Return ONLY a valid JSON array of objects. Each object must have:
    "question": the question string
    "options": an array of 4 strings
    "answer": the string from the options array that is correct

    Do not include any markdown formatting, just the raw JSON array.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    
    const quiz = JSON.parse(text);
    return res.status(200).json({ success: true, quiz });

  } catch (error) {
    console.error("Quiz generation error:", error);
    return res.status(500).json({ success: false, message: "Failed to generate quiz" });
  }
};