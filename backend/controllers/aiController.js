import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from "dotenv";
import Course from "../models/courseModel.js";
dotenv.config();

export const searchWithAi = async (req, res) => {
  try {
    const { input } = req.body;
     
    if (!input) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // ✅ API key check karo pehle
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      console.error("GOOGLE_AI_API_KEY is not set!");
      return res.status(500).json({ message: "AI service not configured" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
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

   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const keyword = result.response.text().trim();
    console.log("AI Generated Keyword:", keyword);

    // ✅ isPublished filter hata diya — sabhi courses search hoga
    let courses = await Course.find({
      $or: [
        { title: { $regex: input, $options: 'i' } },
        { subTitle: { $regex: input, $options: 'i' } },
        { description: { $regex: input, $options: 'i' } },
        { category: { $regex: input, $options: 'i' } },
        { level: { $regex: input, $options: 'i' } }
      ]
    });

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
      aiKeyword: keyword
    });

  } catch (error) {
    console.error("Search with AI error:", error.message);
    return res.status(500).json({ 
      success: false,
      message: "Error searching courses",
      error: error.message 
    });
  }
}