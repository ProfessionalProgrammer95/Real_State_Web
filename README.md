# 🏠 PropBot – Real Estate Web Application

A modern, responsive Real Estate web application built with **React.js**, **TailwindCSS**, and **Firebase Authentication**.  
This project was developed as part of the frontend assignment based on the provided Figma design.

---

## 🚀 Features

- **Pixel-perfect UI** based on Figma
- **Responsive Design** (desktop & mobile)
- **Dynamic Property Data** from API:
  - Featured Properties
  - Properties for Sale
  - Properties for Rent

- **Advanced Filters** (purpose, type, country, search with suggestions)
- **Custom Dropdowns & Autocomplete**
- **Property Details Modal** with Google Maps embed
- **Firebase Authentication**
  - Signup with email & password
  - Login with session persistence
  - Context API for user state

- **Reusable Components** (Navbar, Footer, Cards, Filters etc)
- **Routing with React Router**

---

## 🛠️ Tech Stack

- **React.js** – Functional Components + Hooks  
- **React Router** – Navigation & Protected Routes  
- **Firebase** – Authentication (Email/Password)  
- **TailwindCSS** – Styling  
- **MockAPI** – Property listings data  
- **Netlify/Vercel** – Deployment  

---

## 📂 Project Structure

src/
├── components/ # Reusable UI components (Navbar, Footer, Card, Filter, etc.)
├── pages/ # Page-level components (Home, Listings, Login, Signup)
├── services/ # Firebase config, Auth context, API helpers
├── App.jsx # Main app with routes
└── main.jsx # Entry point


## 🔗 API Used

MockAPI for properties: https://68b826bcb715405043274639.mockapi.io/api/properties/PropertyListing




Sample record:

```json
{
  "createdAt": "2025-09-02T19:04:31.145Z",
  "name": "Lester Hackett",
  "buildingNumber": "764",
  "cardinalDirection": "South",
  "city": "Andersonfurt",
  "country": "Tajikistan",
  "countryCode": "HM",
  "latitude": -68.6896,
  "longitude": -9.4525,
  "state": "New Jersey",
  "timeZone": "America/Belize",
  "image": "https://picsum.photos/seed/rko0Qcmc/1736/389",
  "ownerName": "Christy Hane",
  "contactNumber": "1-839-606-5135 x9492",
  "id": "1"
}


⚙️ Setup Instructions
1️⃣ Clone repo
git clone <your-repo-url>
cd propbot

2️⃣ Install dependencies
npm install

3️⃣ Setup Firebase
Create a project in Firebase Console
Enable Email/Password Authentication

Copy your Firebase config into .env file at root:

VITE_FB_API_KEY=your_api_key
VITE_FB_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FB_PROJECT_ID=your_project_id
VITE_FB_STORAGE_BUCKET=your_project.appspot.com
VITE_FB_MESSAGING_SENDER_ID=your_sender_id
VITE_FB_APP_ID=your_app_id

4️⃣ Run locally
npm run dev

5️⃣ Build for production
npm run build



🎥 Demo Video
👉 

🌐 Deployment

👨‍💻 Author
Developed by Rakshitha V
📧 Email: Rakshithav1358@gmail.com

