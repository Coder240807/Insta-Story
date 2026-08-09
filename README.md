# 📸 Insta-Story Component

A responsive, interactive Instagram-style stories component built using **React.js**, **Vite**, and **Tailwind CSS**. This project replicates the core user interface and interactions of Instagram Stories, including dynamic story viewing, progress bar tracking, and fluid responsiveness across devices.

---

## ✨ Features

- **Dynamic Story Viewer**: Tap or click through multiple user stories seamlessly.
- **Progress Bar Indicator**: Animated top progress bars that track story duration and auto-advance to the next story.
- **Responsive Layout**: Designed for optimal display across mobile, tablet, and desktop screens without unwanted element shrinking.
- **User Avatars & Status Ring**: Interactive profile avatars with active story rings.
- **Fast Build & Hot Reload**: Powered by Vite for lightning-fast modern web development.

---

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons / UI Utilities**: Lucide React / Tailwind Utilities

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/Coder240807/Insta-Story.git](https://github.com/Coder240807/Insta-Story.git)
   cd Insta-Story
2. **Install dependencies**
   ```bash
   npm install
3. **Start the Development Server**
   ```bash
   npm run dev
   
   Open http://localhost:5173 in your browser to view the application.

### Structure

   Insta-Story/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, or mock story assets
│   ├── components/      # Reusable UI components (StoryCircle, StoryModal, etc.)
│   ├── data/            # Mock dataset (user objects, story images, status)
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React DOM entry point
│   └── index.css        # Tailwind directive imports and global styles
├── index.html           # HTML template
├── package.json         # Project metadata and dependencies
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration

### ⚙️ Available Scripts

In the project directory, you can run:

1. npm run dev: Starts the local development server with HMR.
2. npm run build: Builds the app for production to the dist folder.
3. npm run preview: Bootstraps a local web server to preview the production build.
