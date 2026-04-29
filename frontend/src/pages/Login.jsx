// import React, { useState, useEffect, useRef } from 'react'
// import logo from '../assets/logo.jpg'
// import google from '../assets/google.jpg'
// import axios from 'axios'
// import { serverUrl } from '../App'
// import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
// import { useNavigate } from 'react-router-dom'
// import { signInWithPopup } from 'firebase/auth'
// import { auth, provider } from '../../utils/Firebase'
// import { toast } from 'react-toastify'
// import { ClipLoader } from 'react-spinners'
// import { useDispatch } from 'react-redux'
// import { setUserData } from '../redux/userSlice'

// /* ── Floating particle canvas ── */
// function ParticleCanvas() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let animId;

//     const resize = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//     };
//     resize();
//     window.addEventListener('resize', resize);

//     const particles = Array.from({ length: 55 }, () => ({
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       r: Math.random() * 1.8 + 0.4,
//       dx: (Math.random() - 0.5) * 0.35,
//       dy: (Math.random() - 0.5) * 0.35,
//       opacity: Math.random() * 0.5 + 0.1,
//     }));

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       particles.forEach(p => {
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(100,210,255,${p.opacity})`;
//         ctx.fill();
//         p.x += p.dx;
//         p.y += p.dy;
//         if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
//         if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
//       });
//       // draw subtle connecting lines
//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
//           if (dist < 90) {
//             ctx.beginPath();
//             ctx.moveTo(particles[i].x, particles[i].y);
//             ctx.lineTo(particles[j].x, particles[j].y);
//             ctx.strokeStyle = `rgba(100,210,255,${0.07 * (1 - dist / 90)})`;
//             ctx.lineWidth = 0.6;
//             ctx.stroke();
//           }
//         }
//       }
//       animId = requestAnimationFrame(draw);
//     };
//     draw();
//     return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
//   }, []);

//   return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
// }

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [show, setShow] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showRoleModal, setShowRoleModal] = useState(false);
//   const [focused, setFocused] = useState(null);
//   const [mounted, setMounted] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const result = await axios.post(serverUrl + "/api/auth/login", { email, password }, { withCredentials: true });
//       dispatch(setUserData(result.data));
//       navigate("/");
//       toast.success("Login Successfully");
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.response.data.message);
//     }
//   };

//   const googleLogin = async (selectedRole) => {
//     try {
//       const response = await signInWithPopup(auth, provider);
//       const { displayName: name, email } = response.user;
//       const result = await axios.post(serverUrl + "/api/auth/googlesignup", { name, email, role: selectedRole }, { withCredentials: true });
//       dispatch(setUserData(result.data));
//       navigate("/");
//       toast.success("Login Successfully");
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Google login failed");
//     }
//   };

//   const handleRoleSelection = async (role) => { setShowRoleModal(false); await googleLogin(role); };

//   const slideIn = mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

//         .login-root * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
//         .login-root { min-height: 100vh; background: #050d18; display: flex; align-items: center; justify-content: center; padding: 1.5rem; position: relative; overflow: hidden; }

//         .bg-grid {
//           position: absolute; inset: 0;
//           background-image: linear-gradient(rgba(33,158,188,0.06) 1px, transparent 1px),
//                             linear-gradient(90deg, rgba(33,158,188,0.06) 1px, transparent 1px);
//           background-size: 48px 48px;
//         }
//         .bg-glow-1 { position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(33,158,188,0.12) 0%, transparent 70%); top: -200px; right: -150px; pointer-events: none; }
//         .bg-glow-2 { position: absolute; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(2,48,71,0.6) 0%, transparent 70%); bottom: -100px; left: -100px; pointer-events: none; }

//         .card {
//           position: relative; z-index: 10;
//           width: 100%; max-width: 1000px;
//           display: flex; flex-direction: column;
//           background: rgba(255,255,255,0.03);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 28px;
//           backdrop-filter: blur(24px);
//           overflow: hidden;
//           box-shadow: 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);
//           transition: opacity 0.7s ease, transform 0.7s ease;
//         }
//         @media(min-width: 768px) { .card { flex-direction: row; } }

//         /* ── FORM SIDE ── */
//         .form-side {
//           flex: 1; padding: 3rem 2.5rem;
//           display: flex; flex-direction: column; justify-content: center;
//           position: relative; z-index: 2;
//         }

//         .badge {
//           display: inline-flex; align-items: center; gap: 6px;
//           background: rgba(33,158,188,0.12); border: 1px solid rgba(33,158,188,0.25);
//           border-radius: 100px; padding: 4px 14px; width: fit-content; margin-bottom: 1.5rem;
//         }
//         .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #64d2ff; animation: pulse 2s infinite; }
//         @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
//         .badge span { font-size: 0.7rem; color: #64d2ff; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; }

//         .heading { font-family: 'Syne', sans-serif; font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 800; color: #fff; line-height: 1.15; margin: 0 0 0.4rem; }
//         .sub { font-size: 0.92rem; color: rgba(255,255,255,0.4); margin: 0 0 2rem; }

//         .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
//         .field label { font-size: 0.78rem; font-weight: 500; color: rgba(255,255,255,0.5); letter-spacing: 0.06em; text-transform: uppercase; }
//         .field-wrap { position: relative; }
//         .field input {
//           width: 100%; height: 48px; border-radius: 12px; padding: 0 3rem 0 1rem;
//           background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
//           color: #fff; font-size: 0.93rem; outline: none;
//           transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
//         }
//         .field input::placeholder { color: rgba(255,255,255,0.2); }
//         .field input:focus {
//           border-color: rgba(33,158,188,0.7);
//           background: rgba(33,158,188,0.06);
//           box-shadow: 0 0 0 3px rgba(33,158,188,0.12);
//         }
//         .eye-btn { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.3); display: flex; align-items: center; transition: color 0.2s; padding: 0; }
//         .eye-btn:hover { color: rgba(255,255,255,0.7); }

//         .forgot { font-size: 0.8rem; color: rgba(33,158,188,0.8); background: none; border: none; cursor: pointer; padding: 0; margin-top: 2px; text-align: right; display: block; width: 100%; transition: color 0.2s; }
//         .forgot:hover { color: #64d2ff; }

//         .btn-primary {
//           width: 100%; height: 48px; border-radius: 12px; border: none; cursor: pointer;
//           background: linear-gradient(135deg, #219ebc, #0077a8);
//           color: #fff; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.95rem;
//           letter-spacing: 0.02em; margin-top: 1.4rem;
//           display: flex; align-items: center; justify-content: center;
//           transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
//           box-shadow: 0 8px 24px rgba(33,158,188,0.25);
//           position: relative; overflow: hidden;
//         }
//         .btn-primary::after {
//           content: ''; position: absolute; inset: 0;
//           background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
//           opacity: 0; transition: opacity 0.2s;
//         }
//         .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(33,158,188,0.4); }
//         .btn-primary:hover::after { opacity: 1; }
//         .btn-primary:active:not(:disabled) { transform: translateY(0); }
//         .btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }

//         .divider { display: flex; align-items: center; gap: 12px; margin: 1.4rem 0; }
//         .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
//         .divider span { font-size: 0.73rem; color: rgba(255,255,255,0.25); white-space: nowrap; }

//         .btn-google {
//           width: 100%; height: 48px; border-radius: 12px; cursor: pointer;
//           background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
//           color: rgba(255,255,255,0.75); font-size: 0.9rem; font-weight: 500;
//           display: flex; align-items: center; justify-content: center; gap: 10px;
//           transition: background 0.2s, border-color 0.2s, transform 0.2s;
//         }
//         .btn-google:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); transform: translateY(-1px); }
//         .btn-google img { width: 20px; height: 20px; border-radius: 4px; }

//         .signup-row { text-align: center; margin-top: 1.5rem; font-size: 0.85rem; color: rgba(255,255,255,0.35); }
//         .signup-row button { background: none; border: none; cursor: pointer; color: #219ebc; font-weight: 600; margin-left: 4px; transition: color 0.2s; }
//         .signup-row button:hover { color: #64d2ff; }

//         /* ── BRAND SIDE ── */
//         .brand-side {
//           width: 100%; position: relative; overflow: hidden;
//           background: linear-gradient(145deg, #021d2e 0%, #023047 50%, #031f30 100%);
//           display: flex; align-items: center; justify-content: center; padding: 3rem 2rem;
//           min-height: 260px;
//         }
//         @media(min-width: 768px) { .brand-side { width: 42%; min-height: auto; } }

//         .brand-content { position: relative; z-index: 2; text-align: center; }
//         .logo-ring {
//           width: 110px; height: 110px; border-radius: 50%; margin: 0 auto 1.5rem;
//           border: 2px solid rgba(33,158,188,0.4);
//           padding: 6px; position: relative;
//           animation: spinRing 12s linear infinite;
//         }
//         @keyframes spinRing {
//           0% { box-shadow: 0 0 0 0 rgba(33,158,188,0.3), 0 0 30px rgba(33,158,188,0.15); }
//           50% { box-shadow: 0 0 0 8px rgba(33,158,188,0.05), 0 0 50px rgba(33,158,188,0.25); }
//           100% { box-shadow: 0 0 0 0 rgba(33,158,188,0.3), 0 0 30px rgba(33,158,188,0.15); }
//         }
//         .logo-ring img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
//         .brand-name { font-family: 'Syne', sans-serif; font-size: 1.6rem; font-weight: 800; color: #fff; line-height: 1.1; letter-spacing: -0.01em; }
//         .brand-tag { font-size: 0.78rem; color: rgba(33,158,188,0.7); margin-top: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase; }

//         .deco-circle-1 { position: absolute; width: 200px; height: 200px; border-radius: 50%; border: 1px solid rgba(33,158,188,0.1); top: -60px; right: -60px; }
//         .deco-circle-2 { position: absolute; width: 120px; height: 120px; border-radius: 50%; border: 1px solid rgba(33,158,188,0.08); bottom: -30px; left: -20px; }
//         .deco-cross { position: absolute; top: 24px; left: 24px; color: rgba(33,158,188,0.2); font-size: 1.4rem; font-weight: 300; }

//         /* ── MODAL ── */
//         .modal-overlay {
//           position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px);
//           display: flex; align-items: center; justify-content: center; z-index: 100; padding: 1.5rem;
//         }
//         .modal-box {
//           background: #0b1929; border: 1px solid rgba(255,255,255,0.1);
//           border-radius: 24px; padding: 2.5rem; width: 100%; max-width: 400px;
//           box-shadow: 0 40px 80px rgba(0,0,0,0.6);
//           animation: modalPop 0.3s cubic-bezier(0.34,1.56,0.64,1);
//         }
//         @keyframes modalPop { from { opacity:0; transform:scale(0.88); } to { opacity:1; transform:scale(1); } }
//         .modal-title { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; color: #fff; text-align: center; margin: 0 0 0.4rem; }
//         .modal-sub { font-size: 0.85rem; color: rgba(255,255,255,0.35); text-align: center; margin: 0 0 2rem; }

//         .role-btn {
//           width: 100%; border-radius: 14px; height: 72px; cursor: pointer; border: 1px solid;
//           display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
//           font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; margin-bottom: 0.9rem;
//           background: transparent; transition: all 0.2s;
//         }
//         .role-btn span.sub { font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 400; opacity: 0.6; }
//         .role-student { border-color: rgba(33,158,188,0.5); color: #64d2ff; }
//         .role-student:hover { background: rgba(33,158,188,0.12); border-color: #219ebc; transform: translateY(-2px); }
//         .role-educator { border-color: rgba(251,133,0,0.5); color: #ffb347; }
//         .role-educator:hover { background: rgba(251,133,0,0.1); border-color: #fb8500; transform: translateY(-2px); }
//         .modal-cancel { width: 100%; background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.25); font-size: 0.82rem; margin-top: 0.5rem; transition: color 0.2s; }
//         .modal-cancel:hover { color: rgba(255,255,255,0.5); }
//       `}</style>

//       <div className="login-root">
//         <div className="bg-grid" />
//         <div className="bg-glow-1" />
//         <div className="bg-glow-2" />

//         <div className={`card transition-all duration-700 ${slideIn}`}>

//           {/* ── FORM SIDE ── */}
//           <div className="form-side">
//             <div className="badge">
//               <div className="badge-dot" />
//               <span>Secure Login</span>
//             </div>

//             <h1 className="heading">Welcome back,<br />learner.</h1>
//             <p className="sub">Sign in to continue your journey</p>

//             <div className="field">
//               <label>Email address</label>
//               <div className="field-wrap">
//                 <input
//                   type="email"
//                   placeholder="you@example.com"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                   onFocus={() => setFocused('email')}
//                   onBlur={() => setFocused(null)}
//                 />
//               </div>
//             </div>

//             <div className="field">
//               <label>Password</label>
//               <div className="field-wrap">
//                 <input
//                   type={show ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                   onFocus={() => setFocused('password')}
//                   onBlur={() => setFocused(null)}
//                 />
//                 <button className="eye-btn" onClick={() => setShow(!show)}>
//                   {show ? <MdRemoveRedEye size={20} /> : <MdOutlineRemoveRedEye size={20} />}
//                 </button>
//               </div>
//             </div>

//             <button className="forgot" onClick={() => navigate("/forgotpassword")}>
//               Forgot password?
//             </button>

//             <button className="btn-primary" onClick={handleLogin} disabled={loading}>
//               {loading ? <ClipLoader size={22} color="#fff" /> : "Sign In →"}
//             </button>

//             <div className="divider"><span>or continue with</span></div>

//             <button className="btn-google" onClick={() => setShowRoleModal(true)}>
//               <img src={google} alt="Google" />
//               Continue with Google
//             </button>

//             <p className="signup-row">
//               New here?
//               <button onClick={() => navigate("/signup")}>Create an account</button>
//             </p>
//           </div>

//           {/* ── BRAND SIDE ── */}
//           <div className="brand-side">
//             <ParticleCanvas />
//             <div className="deco-circle-1" />
//             <div className="deco-circle-2" />
//             <div className="deco-cross">✦</div>

//             <div className="brand-content">
//               <div className="logo-ring">
//                 <img src={logo} alt="Decode Verse" />
//               </div>
//               <div className="brand-name">DECODE VERSE<br />COURSES</div>
//               <div className="brand-tag">Start Learning Today</div>
//             </div>
//           </div>
//         </div>

//         {/* ── ROLE MODAL ── */}
//         {showRoleModal && (
//           <div className="modal-overlay" onClick={() => setShowRoleModal(false)}>
//             <div className="modal-box" onClick={e => e.stopPropagation()}>
//               <div className="modal-title">Who are you?</div>
//               <div className="modal-sub">Select your role to get started</div>

//               <button className="role-btn role-student" onClick={() => handleRoleSelection('student')}>
//                 👨‍🎓 Student
//                 <span className="sub">Learn from expert-led courses</span>
//               </button>

//               <button className="role-btn role-educator" onClick={() => handleRoleSelection('educator')}>
//                 👨‍🏫 Instructor
//                 <span className="sub">Create and teach your courses</span>
//               </button>

//               <button className="modal-cancel" onClick={() => setShowRoleModal(false)}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
import React, { useState, useEffect, useRef } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

/* ── Floating particle canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,210,255,${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      // draw subtle connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100,210,255,${0.07 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [focused, setFocused] = useState(null);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await axios.post(serverUrl + "/api/auth/login", { email, password }, { withCredentials: true });
      dispatch(setUserData(result.data));
      navigate("/");
      toast.success("Login Successfully");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const googleLogin = async (selectedRole) => {
    try {
      const response = await signInWithPopup(auth, provider);
      const { displayName: name, email } = response.user;
      const result = await axios.post(serverUrl + "/api/auth/googlesignup", { name, email, role: selectedRole }, { withCredentials: true });
      dispatch(setUserData(result.data));
      navigate("/");
      toast.success("Login Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Google login failed");
    }
  };

  const handleRoleSelection = async (role) => { setShowRoleModal(false); await googleLogin(role); };

  const slideIn = mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .login-root * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .login-root { min-height: 100vh; background: #050d18; display: flex; align-items: center; justify-content: center; padding: 1.5rem; position: relative; overflow: hidden; }

        .bg-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(33,158,188,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(33,158,188,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .bg-glow-1 { position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(33,158,188,0.12) 0%, transparent 70%); top: -200px; right: -150px; pointer-events: none; }
        .bg-glow-2 { position: absolute; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(2,48,71,0.6) 0%, transparent 70%); bottom: -100px; left: -100px; pointer-events: none; }

        .card {
          position: relative; z-index: 10;
          width: 100%; max-width: 1000px;
          display: flex; flex-direction: column;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 28px;
          backdrop-filter: blur(24px);
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        @media(min-width: 768px) { .card { flex-direction: row; } }

        /* ── FORM SIDE ── */
        .form-side {
          flex: 1; padding: 3rem 2.5rem;
          display: flex; flex-direction: column; justify-content: center;
          position: relative; z-index: 2;
        }

        .badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(33,158,188,0.12); border: 1px solid rgba(33,158,188,0.25);
          border-radius: 100px; padding: 4px 14px; width: fit-content; margin-bottom: 1.5rem;
        }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #64d2ff; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        .badge span { font-size: 0.7rem; color: #64d2ff; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; }

        .heading { font-family: 'Syne', sans-serif; font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 800; color: #fff; line-height: 1.15; margin: 0 0 0.4rem; }
        .sub { font-size: 0.92rem; color: rgba(255,255,255,0.4); margin: 0 0 2rem; }

        .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
        .field label { font-size: 0.78rem; font-weight: 500; color: rgba(255,255,255,0.5); letter-spacing: 0.06em; text-transform: uppercase; }
        .field-wrap { position: relative; }
        .field input {
          width: 100%; height: 48px; border-radius: 12px; padding: 0 3rem 0 1rem;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
          color: #fff; font-size: 0.93rem; outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }
        .field input::placeholder { color: rgba(255,255,255,0.2); }
        .field input:focus {
          border-color: rgba(33,158,188,0.7);
          background: rgba(33,158,188,0.06);
          box-shadow: 0 0 0 3px rgba(33,158,188,0.12);
        }
        .eye-btn { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.3); display: flex; align-items: center; transition: color 0.2s; padding: 0; }
        .eye-btn:hover { color: rgba(255,255,255,0.7); }

        .forgot { font-size: 0.8rem; color: rgba(33,158,188,0.8); background: none; border: none; cursor: pointer; padding: 0; margin-top: 2px; text-align: right; display: block; width: 100%; transition: color 0.2s; }
        .forgot:hover { color: #64d2ff; }

        .btn-primary {
          width: 100%; height: 48px; border-radius: 12px; border: none; cursor: pointer;
          background: linear-gradient(135deg, #219ebc, #0077a8);
          color: #fff; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.95rem;
          letter-spacing: 0.02em; margin-top: 1.4rem;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 8px 24px rgba(33,158,188,0.25);
          position: relative; overflow: hidden;
        }
        .btn-primary::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0; transition: opacity 0.2s;
        }
        .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(33,158,188,0.4); }
        .btn-primary:hover::after { opacity: 1; }
        .btn-primary:active:not(:disabled) { transform: translateY(0); }
        .btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }

        .divider { display: flex; align-items: center; gap: 12px; margin: 1.4rem 0; }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
        .divider span { font-size: 0.73rem; color: rgba(255,255,255,0.25); white-space: nowrap; }

        .btn-google {
          width: 100%; height: 48px; border-radius: 12px; cursor: pointer;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.75); font-size: 0.9rem; font-weight: 500;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .btn-google:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); transform: translateY(-1px); }
        .btn-google img { width: 20px; height: 20px; border-radius: 4px; }

        .signup-row { text-align: center; margin-top: 1.5rem; font-size: 0.85rem; color: rgba(255,255,255,0.35); }
        .signup-row button { background: none; border: none; cursor: pointer; color: #219ebc; font-weight: 600; margin-left: 4px; transition: color 0.2s; }
        .signup-row button:hover { color: #64d2ff; }

        /* ── BRAND SIDE ── */
        .brand-side {
          width: 100%; position: relative; overflow: hidden;
          background: linear-gradient(145deg, #021d2e 0%, #023047 50%, #031f30 100%);
          display: flex; align-items: center; justify-content: center; padding: 3rem 2rem;
          min-height: 260px;
        }
        @media(min-width: 768px) { .brand-side { width: 42%; min-height: auto; } }

        .brand-content { position: relative; z-index: 2; text-align: center; }
        .logo-ring {
          width: 110px; height: 110px; border-radius: 50%; margin: 0 auto 1.5rem;
          border: 2px solid rgba(33,158,188,0.4);
          padding: 6px; position: relative;
          animation: spinRing 12s linear infinite;
        }
        @keyframes spinRing {
          0% { box-shadow: 0 0 0 0 rgba(33,158,188,0.3), 0 0 30px rgba(33,158,188,0.15); }
          50% { box-shadow: 0 0 0 8px rgba(33,158,188,0.05), 0 0 50px rgba(33,158,188,0.25); }
          100% { box-shadow: 0 0 0 0 rgba(33,158,188,0.3), 0 0 30px rgba(33,158,188,0.15); }
        }
        .logo-ring img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
        .brand-name { font-family: 'Syne', sans-serif; font-size: 1.6rem; font-weight: 800; color: #fff; line-height: 1.1; letter-spacing: -0.01em; }
        .brand-tag { font-size: 0.78rem; color: rgba(33,158,188,0.7); margin-top: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase; }

        .deco-circle-1 { position: absolute; width: 200px; height: 200px; border-radius: 50%; border: 1px solid rgba(33,158,188,0.1); top: -60px; right: -60px; }
        .deco-circle-2 { position: absolute; width: 120px; height: 120px; border-radius: 50%; border: 1px solid rgba(33,158,188,0.08); bottom: -30px; left: -20px; }
        .deco-cross { position: absolute; top: 24px; left: 24px; color: rgba(33,158,188,0.2); font-size: 1.4rem; font-weight: 300; }

        /* ── MODAL ── */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; z-index: 100; padding: 1.5rem;
        }
        .modal-box {
          background: #0b1929; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px; padding: 2.5rem; width: 100%; max-width: 400px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
          animation: modalPop 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes modalPop { from { opacity:0; transform:scale(0.88); } to { opacity:1; transform:scale(1); } }
        .modal-title { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; color: #fff; text-align: center; margin: 0 0 0.4rem; }
        .modal-sub { font-size: 0.85rem; color: rgba(255,255,255,0.35); text-align: center; margin: 0 0 2rem; }

        .role-btn {
          width: 100%; border-radius: 14px; height: 72px; cursor: pointer; border: 1px solid;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
          font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; margin-bottom: 0.9rem;
          background: transparent; transition: all 0.2s;
        }
        .role-btn span.sub { font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 400; opacity: 0.6; }
        .role-student { border-color: rgba(33,158,188,0.5); color: #64d2ff; }
        .role-student:hover { background: rgba(33,158,188,0.12); border-color: #219ebc; transform: translateY(-2px); }
        .role-educator { border-color: rgba(251,133,0,0.5); color: #ffb347; }
        .role-educator:hover { background: rgba(251,133,0,0.1); border-color: #fb8500; transform: translateY(-2px); }
        .modal-cancel { width: 100%; background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.25); font-size: 0.82rem; margin-top: 0.5rem; transition: color 0.2s; }
        .modal-cancel:hover { color: rgba(255,255,255,0.5); }
      `}</style>

      <div className="login-root">
        <div className="bg-grid" />
        <div className="bg-glow-1" />
        <div className="bg-glow-2" />

        <div className={`card transition-all duration-700 ${slideIn}`}>

          {/* ── FORM SIDE ── */}
          <div className="form-side">
            <div className="badge">
              <div className="badge-dot" />
              <span>Secure Login</span>
            </div>

            <h1 className="heading">Welcome back,<br />learner.</h1>
            <p className="sub">Sign in to continue your journey</p>

            <div className="field">
              <label>Email address</label>
              <div className="field-wrap">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                />
              </div>
            </div>

            <div className="field">
              <label>Password</label>
              <div className="field-wrap">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                />
                <button className="eye-btn" onClick={() => setShow(!show)}>
                  {show ? <MdRemoveRedEye size={20} /> : <MdOutlineRemoveRedEye size={20} />}
                </button>
              </div>
            </div>

            <button className="forgot" onClick={() => navigate("/forgotpassword")}>
              Forgot password?
            </button>

            <button className="btn-primary" onClick={handleLogin} disabled={loading}>
              {loading ? <ClipLoader size={22} color="#fff" /> : "Sign In →"}
            </button>

            <div className="divider"><span>or continue with</span></div>

            <button className="btn-google" onClick={() => setShowRoleModal(true)}>
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Continue with Google
            </button>

            <p className="signup-row">
              New here?
              <button onClick={() => navigate("/signup")}>Create an account</button>
            </p>
          </div>

          {/* ── BRAND SIDE ── */}
          <div className="brand-side">
            <ParticleCanvas />
            <div className="deco-circle-1" />
            <div className="deco-circle-2" />
            <div className="deco-cross">✦</div>

            <div className="brand-content">
              <div className="logo-ring">
                <img src={logo} alt="Decode Verse" />
              </div>
              <div className="brand-name">DECODE VERSE<br />COURSES</div>
              <div className="brand-tag">Start Learning Today</div>
            </div>
          </div>
        </div>

        {/* ── ROLE MODAL ── */}
        {showRoleModal && (
          <div className="modal-overlay" onClick={() => setShowRoleModal(false)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <div className="modal-title">Who are you?</div>
              <div className="modal-sub">Select your role to get started</div>

              <button className="role-btn role-student" onClick={() => handleRoleSelection('student')}>
                👨‍🎓 Student
                <span className="sub">Learn from expert-led courses</span>
              </button>

              <button className="role-btn role-educator" onClick={() => handleRoleSelection('educator')}>
                👨‍🏫 Instructor
                <span className="sub">Create and teach your courses</span>
              </button>

              <button className="modal-cancel" onClick={() => setShowRoleModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}