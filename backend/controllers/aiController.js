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

    // Initialize Google AI with API key
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    
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

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const keyword = response.text().trim();

    console.log("AI Generated Keyword:", keyword);

    // First search with original input
    let courses = await Course.find({
      isPublished: true,
      $or: [
        { title: { $regex: input, $options: 'i' } },
        { subTitle: { $regex: input, $options: 'i' } },
        { description: { $regex: input, $options: 'i' } },
        { category: { $regex: input, $options: 'i' } },
        { level: { $regex: input, $options: 'i' } }
      ]
    });

    // If no results, search with AI-generated keyword
    if (courses.length === 0 && keyword) {
      courses = await Course.find({
        isPublished: true,
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
      searchedWith: courses.length > 0 ? (courses.length === 0 ? keyword : input) : input,
      aiKeyword: keyword
    });

  } catch (error) {
    console.error("Search with AI error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Error searching courses",
      error: error.message 
    });
  }
}
