
# Project Title

A brief description of what this project does and who it's for

🏋️ FitPlanHub – Trainers & Users Platform (Backend)
FitPlanHub is a Node.js + Express.js backend application where certified trainers can create fitness plans and users can browse, purchase, and follow these plans. The project supports role-based access control, authentication, subscriptions, and trainer–user interactions.

🚀 Features Implemented
✅ Authentication & Authorization
User & Trainer registration

Login with JWT-based authentication

Password hashing using bcrypt

Role-based access (User / Trainer)

✅ Trainer Features
Create fitness plans

Update fitness plans

Delete fitness plans

View plans created by a specific trainer

✅ User Features
View all available fitness plans

Purchase (subscribe to) fitness plans (simulated payment)

View purchased plans

✅ Access Control
Only trainers can create/update/delete plans

Only authenticated users can purchase plans

JWT-protected routes

🧠 Database Design (Schema Overview)
User Schema
js
Copy code
{
  name: String,
    email: String,
      password: String,
        role: "user" | "trainer",
          subscribedPlans: [ObjectId],
            followingTrainers: [ObjectId],
              createdAt,
                updatedAt
                }
                Plan Schema
                js
                Copy code
                {
                  title: String,
                    description: String,
                      price: Number,
                        duration: Number,
                          trainer: ObjectId,
                            createdAt,
                              updatedAt
                              }
                              🛠️ Tech Stack
                              Node.js

                              Express.js

                              MongoDB + Mongoose

                              JWT Authentication

                              bcryptjs

                              dotenv

                              cors

                              Postman (for API testing)

                              📂 Project Structure
                              pgsql
                              Copy code
                              server/
                              │
                              ├── controllers/
                              │   ├── auth/
                              │   ├── trainer/
                              │   └── user/
                              │
                              ├── routes/
                              │   ├── auth/
                              │   ├── trainer/
                              │   └── userRoutes/
                              │
                              ├── middlewares/
                              │   ├── authMiddleware.js
                              │   ├── trainerMiddleware.js
                              │   └── errorHandler.js
                              │
                              ├── models/
                              │   ├── userModel.js
                              │   └── planModel.js
                              │
                              ├── db_config/
                              │   └── db_config.js
                              │
                              ├── server.js
                              └── .env
                              🔗 API Routes
                              🔐 Auth Routes
                              bash
                              Copy code
                              POST   /api/auth/register    → Register user/trainer
                              POST   /api/auth/login       → Login user/trainer
                              🏋️ Trainer Routes
                              pgsql
                              Copy code
                              GET    /api/plans            → Get all plans
                              GET    /api/plans/:tid       → Get plans by trainer
                              POST   /api/plans            → Create plan (Trainer only)
                              PUT    /api/plans/:pid       → Update plan (Trainer only)
                              DELETE /api/plans/:pid       → Delete plan (Trainer only)
                              👤 User Routes
                              sql
                              Copy code
                              GET    /api/user             → Get all plans
                              POST   /api/user/buyPlan/:pid → Buy/Subscribe plan (User only)
                              GET    /api/user/myPlans     → View purchased plans
                              ▶️ How to Run the Project
                              1️⃣ Clone Repository
                              bash
                              Copy code
                              git clone <repository-url>
                              cd FitPlanHub
                              2️⃣ Install Dependencies
                              bash
                              Copy code
                              npm install
                              3️⃣ Setup Environment Variables
                              Create a .env file in root:

                              env
                              Copy code
                              PORT=3000
                              MONGO_URI=your_mongodb_connection_string
                              JWT_SECRET=your_jwt_secret
                              4️⃣ Start Server
                              bash
                              Copy code
                              npm start
                              Server will run on:

                              arduino
                              Copy code
                              http://localhost:3000
                              🧪 Postman Collection (Recommended)
                              Test all endpoints using Postman

                              Include JWT token in Authorization header:

                              makefile
                              Copy code
                              Authorization: Bearer <token>
                              Postman collection can be added to Git repository for evaluation

                              🎯 Notes for Evaluators
                              No real payment gateway is implemented (payment is simulated)

                              Trainer is treated as a user with role = "trainer"

                              Clean separation of routes, controllers, and middleware

                              Easy to integrate frontend (React / Redux)

                              👨‍💻 Author
                              Animesh Thakur
                              MERN Stack Developer
                              Computer Science Student

                              ✅ Deliverables Checklist
                              ✔ Database Design
                              ✔ API Design
                              ✔ Node.js project with working endpoints
                              ✔ JWT authentication
                              ✔ README with setup instructions

                              
