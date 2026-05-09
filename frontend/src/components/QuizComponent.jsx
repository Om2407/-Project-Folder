import React, { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";

const QuizComponent = ({ lectureTitle, courseTitle, courseDescription, onClose }) => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const generateQuiz = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${serverUrl}/api/ai/generate-quiz`, {
        lectureTitle,
        courseTitle,
        courseDescription
      }, { withCredentials: true });
      
      if (res.data.success) {
        setQuiz(res.data.quiz);
      }
    } catch (error) {
      toast.error("Failed to generate quiz. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === quiz[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <IoMdClose size={24} />
        </button>

        {!quiz.length && !loading && (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">AI Quiz Generator</h2>
            <p className="text-gray-600 mb-6">Test your knowledge of this lecture with an AI-generated quiz!</p>
            <button 
              onClick={generateQuiz}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Start AI Quiz
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">AI is crafting your quiz...</p>
          </div>
        )}

        {quiz.length > 0 && !showResult && (
          <div>
            <div className="mb-4">
              <span className="text-sm text-blue-600 font-bold uppercase tracking-wider">
                Question {currentQuestionIndex + 1} of {quiz.length}
              </span>
              <h3 className="text-xl font-semibold mt-2">{quiz[currentQuestionIndex].question}</h3>
            </div>

            <div className="space-y-3">
              {quiz[currentQuestionIndex].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left p-3 rounded-lg border transition ${
                    selectedOption === option 
                      ? 'bg-blue-50 border-blue-600' 
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`w-full mt-6 py-3 rounded-lg font-bold text-white transition ${
                selectedOption ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {currentQuestionIndex === quiz.length - 1 ? 'Finish' : 'Next Question'}
            </button>
          </div>
        )}

        {showResult && (
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-lg text-gray-600 mb-6">You scored {score} out of {quiz.length}</p>
            <div className="text-6xl mb-6">
              {score === quiz.length ? '🏆' : score >= quiz.length / 2 ? '👏' : '📚'}
            </div>
            <button 
              onClick={onClose}
              className="bg-blue-600 text-white px-8 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
