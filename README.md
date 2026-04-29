# 🎓 AI-Powered Learning Management System

A full-stack, SaaS-level Learning Management System built with the **MERN Stack**, featuring AI-powered smart search, Google Authentication, and Razorpay payment integration.

🌐 **Live Demo:** [ai-lms-website-omfr.onrender.com](https://ai-lms-website-omfr.onrender.com)
📁 **GitHub:** [github.com/Om2407/-Project-Folder](https://github.com/Om2407/-Project-Folder)

---

## 🚀 Features

- 🧠 **AI-Powered Smart Search** — Gemini API for intelligent course recommendations
- 🔐 **Google OAuth 2.0** — Secure authentication via Google
- 💳 **Razorpay Payment Gateway** — Seamless course purchase flow
- ⚛️ **Redux Toolkit** — Efficient global state management
- 📚 **Student & Instructor Dashboards** — Role-based access and views
- 🖥️ **Fully Responsive UI** — Works on all screen sizes
- 📈 **30% Faster Load Times** — Optimized performance

---

## 🔧 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI Library |
| Redux Toolkit | State Management |
| Tailwind CSS | Styling |
| Axios | API Requests |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |

### Integrations
| Service | Purpose |
|---|---|
| Gemini API | AI Smart Search |
| Google OAuth 2.0 | Authentication |
| Razorpay | Payment Processing |

---

## 📁 Project Structure

```
-Project-Folder/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Razorpay account
- Google Cloud Console project
- Gemini API key

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Om2407/-Project-Folder.git
cd -Project-Folder
```

**2. Install dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

**3. Setup environment variables**

Create `.env` in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

Create `.env` in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

**4. Run the application**
```bash
# Backend (from /backend)
npm run dev

# Frontend (from /frontend)
npm run dev
```

App will run at `http://localhost:5173`

---

## 🔐 Environment Variables Summary

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |
| `RAZORPAY_KEY_ID` | Razorpay API Key |
| `RAZORPAY_KEY_SECRET` | Razorpay Secret Key |
| `GEMINI_API_KEY` | Google Gemini API Key |

---

## 📸 Screenshots

> Add screenshots of your app here

---

## 🚀 Deployment

- **Frontend:** Deployed on [Render](https://render.com)
- **Backend:** Deployed on [Render](https://render.com)
- **Database:** MongoDB Atlas

---

## 👨‍💻 Author

**Om Gupta**
- GitHub: [@Om2407](https://github.com/Om2407)
- LinkedIn: [linkedin.com/in/om-gupta-4a3549294](https://linkedin.com/in/om-gupta-4a3549294)
- Live: [ai-lms-website-omfr.onrender.com](https://ai-lms-website-omfr.onrender.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).