# 🍳 Meal Architect

### Turn Your Leftovers into Culinary Masterpieces with AI-Powered Chefs

 


## 🚀 The Problem

How often do you stare into your fridge, see a random assortment of ingredients, and have no idea what to cook? Meal Architect solves this by transforming your available ingredients into unique, delicious recipes, all guided by the distinct personalities of world-class AI chefs.

## ✨ The Solution

Meal Architect is a full-stack web application that allows users to:
1.  **Enter** the ingredients they have on hand.
2.  **Choose** a culinary style from one of three AI-powered chefs.
3.  **Receive** a unique, step-by-step recipe complete with a title, cooking time, and personalized chef's notes.

The magic is in the personalities. The same ingredients will produce wildly different dishes depending on which chef you choose!

---

## 👨‍🍳 Meet the Chefs

Our AI chefs are the heart and soul of Meal Architect, each with a unique cooking philosophy and style.

| Chef | Illustration | Philosophy |
| :--- | :--- | :--- |
| **Gordon Ramsay** | ![Gordon Ramsay](frontend/public/chef-gordon.png) | **Fiery Precision.** Expect restaurant-quality techniques, a focus on perfection, and no-nonsense instructions. |
| **Nonna Nina** | ![Nonna Nina](frontend/public/chef-nina.png) | **Traditional Comfort.** Get ready for warm, hearty, family-style meals made with love and time-honored traditions. |
| **Sanjyot Keer** | ![Sanjyot Keer](frontend/public/chef-sanjyot.png) | **Modern Fusion.** Explore creative, innovative dishes that blend modern techniques with the vibrant flavors of Indian cuisine. |

---

## 🛠️ Tech Stack

This project was built with a modern, robust, and scalable tech stack:

*   **Frontend:** **React** with **Vite** for a blazing-fast development experience.
*   **Styling:** **Tailwind CSS** for a utility-first, responsive, and beautiful design.
*   **Backend:** **Python** with **FastAPI** for a high-performance, asynchronous API.
*   **AI Integration:** **OpenRouter** to access and orchestrate multiple large language models.
*   **Deployment:**
    *   Frontend deployed on **Vercel**.
    *   Backend deployed on **Render**.

---

## 🚀 Live Demo

You can try Meal Architect live right now!

*   **Frontend (Vercel):** [https://meal-architect.vercel.app](https://meal-architect.vercel.app)
*  


## ⚙️ Running Locally

Want to run the project on your own machine? Here’s how:

### Prerequisites
*   Node.js & npm
*   Python 3.8+ & pip

### 1. Clone the Repository
```
git clone https://github.com/SohamPadalkar/meal-architect
cd meal-architect
```

### 2. Backend Setup
```
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Create a .env file and add your OpenRouter API key
echo "OPENROUTER_API_KEY='your_api_key_here'" > .env

# Run the backend server
uvicorn app.main:app --reload
```
The backend will be running at `http://localhost:8000`.

### 3. Frontend Setup
```
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install

# Run the frontend development server
npm run dev
```
The frontend will be running at `http://localhost:5173`.

---

## 🏆 Hackathon Submission

This project was built for the [Name of Hackathon]. We aimed to create a solution that is not only technically impressive but also genuinely useful, fun, and delightful for the end-user.
```

### **Final Step:**

1.  Create the `README.md` file in the root of your project.
2.  Copy and paste the text above into it.
3.  **Crucially, go through and replace the placeholder URLs and username.**
4.  Commit and push it to GitHub:
    ```bash
    git add README.md
    git commit -m "docs: Add comprehensive project README"
    git push origin main
    ```

