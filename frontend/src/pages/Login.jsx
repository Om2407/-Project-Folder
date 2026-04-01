import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const result = await axios.post(serverUrl + "/api/auth/login", { email, password }, { withCredentials: true });
            dispatch(setUserData(result.data));
            navigate("/");
            setLoading(false);
            toast.success("Login Successfully");
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error.response.data.message);
        }
    };

    const googleLogin = async (selectedRole) => {
        try {
            const response = await signInWithPopup(auth, provider);
            
            let user = response.user;
            let name = user.displayName;
            let email = user.email;
            
            const result = await axios.post(
                serverUrl + "/api/auth/googlesignup",
                { name, email, role: selectedRole },
                { withCredentials: true }
            );
            dispatch(setUserData(result.data));
            navigate("/");
            toast.success("Login Successfully");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Google login failed");
        }
    };

    const handleGoogleClick = () => {
        setShowRoleModal(true);
    };

    const handleRoleSelection = async (selectedRole) => {
        setShowRoleModal(false);
        await googleLogin(selectedRole);
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#219ebc] to-[#023047] flex items-center justify-center p-4'>
            <div className='w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row'>
                {/* Left Side - Form */}
                <div className='w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center'>
                    <div className='mb-8'>
                        <h1 className='font-bold text-gray-800 text-3xl mb-2'>Welcome back</h1>
                        <p className='text-gray-500 text-lg'>Login to your account</p>
                    </div>
                    
                    <div className='space-y-5'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className='font-semibold text-gray-700'>Email</label>
                            <input 
                                id='email' 
                                type="email" 
                                className='border-2 border-gray-200 w-full h-12 rounded-lg text-base px-4 focus:border-[#219ebc] focus:outline-none transition-colors' 
                                placeholder='your.email@example.com' 
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email}
                            />
                        </div>
                        
                        <div className='flex flex-col gap-2 relative'>
                            <label htmlFor="password" className='font-semibold text-gray-700'>Password</label>
                            <div className='relative'>
                                <input 
                                    id='password' 
                                    type={show ? "text" : "password"} 
                                    className='border-2 border-gray-200 w-full h-12 rounded-lg text-base px-4 focus:border-[#219ebc] focus:outline-none transition-colors pr-12' 
                                    placeholder='Enter your password' 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    value={password}
                                />
                                {!show ? (
                                    <MdOutlineRemoveRedEye 
                                        className='absolute w-6 h-6 cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600' 
                                        onClick={() => setShow(true)} 
                                    />
                                ) : (
                                    <MdRemoveRedEye 
                                        className='absolute w-6 h-6 cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-600' 
                                        onClick={() => setShow(false)} 
                                    />
                                )}
                            </div>
                        </div>

                        <button 
                            className='w-full h-12 bg-[#219ebc] text-white font-semibold cursor-pointer flex items-center justify-center rounded-lg hover:bg-[#1a7a94] transition-colors disabled:opacity-50 disabled:cursor-not-allowed' 
                            disabled={loading}
                            onClick={handleLogin}
                        >
                            {loading ? <ClipLoader size={24} color='white' /> : "Login"}
                        </button>
                    </div>
                    
                    <button 
                        className='text-sm text-[#219ebc] hover:text-[#1a7a94] font-medium mt-4 text-center w-full'
                        onClick={() => navigate("/forgotpassword")}
                    >
                        Forgot your password?
                    </button>

                    <div className='flex items-center gap-3 my-6'>
                        <div className='flex-1 h-px bg-gray-300'></div>
                        <span className='text-sm text-gray-500'>Or continue with</span>
                        <div className='flex-1 h-px bg-gray-300'></div>
                    </div>

                    <button 
                        className='w-full h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-all font-medium text-gray-700' 
                        onClick={handleGoogleClick}
                    >
                        <img src={google} alt="Google" className='w-6 h-6' />
                        <span>Continue with Google</span>
                    </button>
                    
                    <p className='text-gray-600 text-center mt-6'>
                        Don't have an account? 
                        <button 
                            className='text-[#219ebc] font-semibold hover:text-[#1a7a94] ml-1'
                            onClick={() => navigate("/signup")}
                        >
                            Sign up
                        </button>
                    </p>
                </div>
                
                {/* Right Side - Branding */}
                <div className='w-full md:w-1/2 bg-gradient-to-br from-[#219ebc] to-[#023047] flex items-center justify-center p-12'>
                    <div className='text-center'>
                        <div className='w-40 h-40 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl'>
                            <img src={logo} className='w-32 h-32 rounded-full object-cover' alt="Virtual Courses Logo" />
                        </div>
                        <h2 className='text-white text-4xl font-bold mb-3'>DECODE VERSE</h2>
                        <h2 className='text-white text-4xl font-bold mb-3'>COURSES</h2>
                        <p className='text-[#8ecae6] text-lg'>Start your learning journey today</p>
                    </div>
                </div>
            </div>

            {/* Role Selection Modal */}
            {showRoleModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl'>
                        <h2 className='text-2xl font-bold mb-3 text-center text-gray-800'>Select Your Role</h2>
                        <p className='text-gray-600 mb-8 text-center'>How would you like to use Virtual Courses?</p>
                        
                        <div className='flex flex-col gap-4'>
                            <button
                                className='w-full h-16 border-2 border-[#219ebc] text-[#219ebc] hover:bg-[#219ebc] hover:text-white rounded-xl font-semibold transition-all transform hover:scale-105'
                                onClick={() => handleRoleSelection('student')}
                            >
                                <div className='flex flex-col items-center justify-center'>
                                    <span className='text-lg'>👨‍🎓 Student</span>
                                    <span className='text-sm opacity-75'>Learn from courses</span>
                                </div>
                            </button>
                            
                            <button
                                className='w-full h-16 border-2 border-[#fb8500] text-[#fb8500] hover:bg-[#fb8500] hover:text-white rounded-xl font-semibold transition-all transform hover:scale-105'
                                onClick={() => handleRoleSelection('educator')}
                            >
                                <div className='flex flex-col items-center justify-center'>
                                    <span className='text-lg'>👨‍🏫 Instructor</span>
                                    <span className='text-sm opacity-75'>Create and teach courses</span>
                                </div>
                            </button>
                        </div>
                        
                        <button
                            className='mt-6 w-full text-gray-500 hover:text-gray-700 font-medium'
                            onClick={() => setShowRoleModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;


// import React, { useState } from 'react'
// import logo from '../assets/logo.jpg'
// import google from '../assets/google.jpg'
// import axios from 'axios'
// import { serverUrl } from '../App'
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { MdRemoveRedEye } from "react-icons/md";
// import { useNavigate } from 'react-router-dom'
// import { signInWithPopup } from 'firebase/auth'
// import { auth, provider } from '../../utils/Firebase'
// import { toast } from 'react-toastify'
// import { ClipLoader } from 'react-spinners'
// import { useDispatch } from 'react-redux'
// import { setUserData } from '../redux/userSlice'

// function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [show, setShow] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [showRoleModal, setShowRoleModal] = useState(false);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleLogin = async () => {
//         setLoading(true);
//         try {
//             const result = await axios.post(serverUrl + "/api/auth/login", { email, password }, { withCredentials: true });
//             dispatch(setUserData(result.data));
//             navigate("/");
//             setLoading(false);
//             toast.success("Login Successfully");
//         } catch (error) {
//             console.log(error);
//             setLoading(false);
//             toast.error(error.response.data.message);
//         }
//     };

//     const googleLogin = async (selectedRole) => {
//         try {
//             const response = await signInWithPopup(auth, provider);
            
//             let user = response.user;
//             let name = user.displayName;
//             let email = user.email;
            
//             const result = await axios.post(
//                 serverUrl + "/api/auth/googlesignup",
//                 { name, email, role: selectedRole },
//                 { withCredentials: true }
//             );
//             dispatch(setUserData(result.data));
//             navigate("/");
//             toast.success("Login Successfully");
//         } catch (error) {
//             console.log(error);
//             toast.error(error?.response?.data?.message || "Google login failed");
//         }
//     };

//     const handleGoogleClick = () => {
//         setShowRoleModal(true);
//     };

//     const handleRoleSelection = async (selectedRole) => {
//         setShowRoleModal(false);
//         await googleLogin(selectedRole);
//     };

//     return (
//         <div className='min-h-screen bg-gradient-to-br from-[#219ebc] to-[#023047] flex items-center justify-center p-4'>
//             <div className='w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row'>
//                 {/* Left Side - Form */}
//                 <div className='w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center'>
//                     <div className='mb-8'>
//                         <h1 className='font-bold text-gray-800 text-3xl mb-2'>Welcome back</h1>
//                         <p className='text-gray-500 text-lg'>Login to your account</p>
//                     </div>
                    
//                     <div className='space-y-5'>
//                         <div className='flex flex-col gap-2'>
//                             <label htmlFor="email" className='font-semibold text-gray-700'>Email</label>
//                             <input 
//                                 id='email' 
//                                 type="email" 
//                                 className='border-2 border-gray-200 w-full h-12 rounded-lg text-base px-4 focus:border-[#219ebc] focus:outline-none transition-colors' 
//                                 placeholder='your.email@example.com' 
//                                 onChange={(e) => setEmail(e.target.value)} 
//                                 value={email}
//                             />
//                         </div>
                        
//                         <div className='flex flex-col gap-2 relative'>
//                             <label htmlFor="password" className='font-semibold text-gray-700'>Password</label>
//                             <div className='relative'>
//                                 <input 
//                                     id='password' 
//                                     type={show ? "text" : "password"} 
//                                     className='border-2 border-gray-200 w-full h-12 rounded-lg text-base px-4 focus:border-[#219ebc] focus:outline-none transition-colors pr-12' 
//                                     placeholder='Enter your password' 
//                                     onChange={(e) => setPassword(e.target.value)} 
//                                     value={password}
//                                 />
//                                 {!show ? (
//                                     <MdOutlineRemoveRedEye 
//                                         className='absolute w-6 h-6 cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600' 
//                                         onClick={() => setShow(true)} 
//                                     />
//                                 ) : (
//                                     <MdRemoveRedEye 
//                                         className='absolute w-6 h-6 cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-600' 
//                                         onClick={() => setShow(false)} 
//                                     />
//                                 )}
//                             </div>
//                         </div>

//                         <button 
//                             className='w-full h-12 bg-[#219ebc] text-white font-semibold cursor-pointer flex items-center justify-center rounded-lg hover:bg-[#1a7a94] transition-colors disabled:opacity-50 disabled:cursor-not-allowed' 
//                             disabled={loading}
//                             onClick={handleLogin}
//                         >
//                             {loading ? <ClipLoader size={24} color='white' /> : "Login"}
//                         </button>
//                     </div>
                    
//                     <button 
//                         className='text-sm text-[#219ebc] hover:text-[#1a7a94] font-medium mt-4 text-center w-full'
//                         onClick={() => navigate("/forgotpassword")}
//                     >
//                         Forgot your password?
//                     </button>

//                     <div className='flex items-center gap-3 my-6'>
//                         <div className='flex-1 h-px bg-gray-300'></div>
//                         <span className='text-sm text-gray-500'>Or continue with</span>
//                         <div className='flex-1 h-px bg-gray-300'></div>
//                     </div>

//                     <button 
//                         className='w-full h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-all font-medium text-gray-700' 
//                         onClick={handleGoogleClick}
//                     >
//                         <img src={google} alt="Google" className='w-6 h-6' />
//                         <span>Continue with Google</span>
//                     </button>
                    
//                     <p className='text-gray-600 text-center mt-6'>
//                         Don't have an account? 
//                         <button 
//                             className='text-[#219ebc] font-semibold hover:text-[#1a7a94] ml-1'
//                             onClick={() => navigate("/signup")}
//                         >
//                             Sign up
//                         </button>
//                     </p>
//                 </div>
                
//                 {/* Right Side - Branding */}
//                 <div className='w-full md:w-1/2 bg-gradient-to-br from-[#219ebc] to-[#023047] flex items-center justify-center p-12'>
//                     <div className='text-center'>
//                         <div className='w-40 h-40 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl'>
//                             <img src={logo} className='w-32 h-32 rounded-full object-cover' alt="Virtual Courses Logo" />
//                         </div>
//                         <h2 className='text-white text-4xl font-bold mb-3'>DECODE VERSE</h2>
//                         <h2 className='text-white text-4xl font-bold mb-3'>COURSES</h2>
//                         <p className='text-[#8ecae6] text-lg'>Start your learning journey today</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Role Selection Modal */}
//             {showRoleModal && (
//                 <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
//                     <div className='bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl'>
//                         <h2 className='text-2xl font-bold mb-3 text-center text-gray-800'>Select Your Role</h2>
//                         <p className='text-gray-600 mb-8 text-center'>How would you like to use Virtual Courses?</p>
                        
//                         <div className='flex flex-col gap-4'>
//                             <button
//                                 className='w-full h-16 border-2 border-[#219ebc] text-[#219ebc] hover:bg-[#219ebc] hover:text-white rounded-xl font-semibold transition-all transform hover:scale-105'
//                                 onClick={() => handleRoleSelection('student')}
//                             >
//                                 <div className='flex flex-col items-center justify-center'>
//                                     <span className='text-lg'>👨‍🎓 Student</span>
//                                     <span className='text-sm opacity-75'>Learn from courses</span>
//                                 </div>
//                             </button>
                            
//                             <button
//                                 className='w-full h-16 border-2 border-[#fb8500] text-[#fb8500] hover:bg-[#fb8500] hover:text-white rounded-xl font-semibold transition-all transform hover:scale-105'
//                                 onClick={() => handleRoleSelection('instructor')}
//                             >
//                                 <div className='flex flex-col items-center justify-center'>
//                                     <span className='text-lg'>👨‍🏫 Instructor</span>
//                                     <span className='text-sm opacity-75'>Create and teach courses</span>
//                                 </div>
//                             </button>
//                         </div>
                        
//                         <button
//                             className='mt-6 w-full text-gray-500 hover:text-gray-700 font-medium'
//                             onClick={() => setShowRoleModal(false)}
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Login;
