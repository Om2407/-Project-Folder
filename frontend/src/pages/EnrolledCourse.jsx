import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { generateCertificate } from '../utils/generateCertificate';

function EnrolledCourse() {
  const navigate = useNavigate()

  const { userData } = useSelector((state) => state.user);

  const handleDownloadCertificate = (e, courseTitle) => {
    e.stopPropagation();
    generateCertificate(userData.name, courseTitle);
  };

  return (
    <div className="min-h-screen w-full px-4 py-9 bg-gray-50">
      
      <FaArrowLeftLong  className='absolute top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>
      <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">
        My Enrolled Courses
      </h1>

      {userData.enrolledCourses.length === 0 ? (
        <p className="text-gray-500 text-center w-full">You haven’t enrolled in any course yet.</p>
      ) : (
        <div className="flex items-center justify-center flex-wrap gap-[30px]">
          {userData.enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border w-full max-w-[350px] hover:shadow-lg transition-shadow"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-800 line-clamp-1">{course.title}</h2>
                <div className="flex items-center justify-between mt-2">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded">{course.category}</span>
                  <span className="text-xs text-gray-500">{course.level}</span>
                </div>
                
                <div className="mt-5 flex flex-col gap-2">
                  <button 
                    className='w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition'
                    onClick={()=>navigate(`/viewlecture/${course._id}`)}
                  >
                    Watch Now
                  </button>
                  <button 
                    className='w-full py-2 border-2 border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition'
                    onClick={(e) => handleDownloadCertificate(e, course.title)}
                  >
                    Get Certificate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EnrolledCourse
