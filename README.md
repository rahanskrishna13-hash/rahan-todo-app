# Full Stack Todo Application (AWS + Firebase)

## 🌐 Live Demo

Frontend (S3):
http://rahan-todo-app.s3-website-us-east-1.amazonaws.com

Backend (EC2 API):
http://<your-ec2-public-ip>:5000

---

## Overview

This is a **full-stack Todo application** built and deployed using modern cloud technologies. The project demonstrates end-to-end integration between a frontend hosted on AWS S3, a backend running on AWS EC2, and a Firebase database.

---

## Architecture

```
React (S3 Hosting)
        ↓
   Fetch API Calls
        ↓
Node.js + Express (EC2 + PM2)
        ↓
     Firebase (Firestore)
```

---

##Tech Stack

### Frontend

* React (Vite)
* TypeScript
* Fetch API
* AWS S3 (Static Hosting)

### Backend

* Node.js
* Express.js
* PM2 (Process Manager)
* AWS EC2

### Database

* Firebase Firestore

---

## Features

* ✅ Add new todos
* ✅ Toggle todo completion
* ✅ Delete todos
* ✅ Persistent storage using Firebase
* ✅ Fully deployed cloud-based architecture

---

## ⚙️ How It Works

1. The React frontend is hosted on **AWS S3**.
2. It sends HTTP requests using `fetch()` to the backend API.
3. The backend is deployed on an **EC2 instance** and managed using PM2.
4. The backend interacts with **Firebase Firestore** to store and retrieve todo data.
5. Responses are sent back to the frontend and rendered dynamically.

---

## 🔗 API Endpoints

| Method | Endpoint   | Description        |
| ------ | ---------- | ------------------ |
| GET    | /todos     | Fetch all todos    |
| POST   | /todos     | Create a new todo  |
| PUT    | /todos/:id | Update/toggle todo |
| DELETE | /todos/:id | Delete a todo      |

---

## Deployment Details

### Frontend (AWS S3)

* Built using Vite
* Deployed as a static website on S3
* Publicly accessible via S3 website endpoint

### Backend (AWS EC2)

* Hosted on Ubuntu EC2 instance
* Node.js server running with PM2
* Exposed via public IP and port 5000
* Security Group configured to allow inbound traffic

### Database (Firebase)

* Firestore used for real-time data storage
* Secure connection via Firebase Admin SDK

---

## Notes

* The backend root route (`/`) may show "Cannot GET /" — this is normal if no route is defined.
* All actual functionality is handled via `/todos` endpoints.
* API URL is configured in the frontend using environment variables or constants.

---

## 📈 Future Improvements

* Add authentication (JWT / Firebase Auth)
* Add custom domain + HTTPS (CloudFront)
* Improve UI with Tailwind CSS
* Add testing (Jest / Cypress)
* Dockerize backend

---

## Author

Rahan S Krishna

---

## Summary

This project showcases:

* Full-stack development
* Cloud deployment (AWS S3 + EC2)
* API integration
* Real-world architecture design

---

If you like this project, feel free to star the repo!




# 🚀 AWS Deployment Steps – Full Stack Todo App

## 📌 Overview

This document outlines all the steps followed to deploy a full-stack Todo application using:

* **Frontend:** React (Vite) → AWS S3
* **Backend:** Node.js + Express → AWS EC2
* **Database:** Firebase Firestore

---

# 🌐 PART 1: Frontend Deployment (AWS S3)

## 1. Build React App

* Created React app using Vite
* Developed Todo UI with:

  * Add
  * Toggle
  * Delete

Build the project:

```
npm run build
```

---

## 2. Create S3 Bucket

* Open AWS S3
* Create a new bucket:

  * Name: `rahan-todo-app`
  * Region: `us-east-1`
* Disable “Block all public access”

---

## 3. Upload Build Files

* Open bucket → Upload
* Upload contents of `dist/` folder

---

## 4. Enable Static Hosting

* Go to **Properties → Static website hosting**
* Enable it
* Set:

  * Index: `index.html`

---

## 5. Access Frontend

* Use generated S3 URL:

```
http://rahan-todo-app.s3-website-us-east-1.amazonaws.com
```

---

# 🖥️ PART 2: Backend Deployment (AWS EC2)

## 6. Launch EC2 Instance

* Go to EC2 → Launch instance
* Choose:

  * OS: Ubuntu
  * Instance type: t2.micro (free tier)
* Create/download `.pem` key pair

---

## 7. Configure Security Group

Add inbound rules:

* SSH → Port 22 (your IP)
* Custom TCP → Port 5000 → 0.0.0.0/0

---

## 8. Connect to EC2

Using SSH:

```
ssh -i your-key.pem ubuntu@<public-ip>
```

---

## 9. Install Node.js

```
sudo apt update
sudo apt install nodejs npm -y
```

---

## 10. Upload Backend Code

Used `scp` or GitHub clone:

```
scp -i key.pem -r backend ubuntu@<ip>:~
```

---

## 11. Install Dependencies

```
npm install
```

---

## 12. Setup Firebase

* Added Firebase Admin SDK JSON file
* Connected backend to Firestore database

---

## 13. Start Server

```
node server.js
```

---

## 14. Fix Public Access

Updated server to:

```
app.listen(5000, "0.0.0.0")
```

---

## 15. Run Backend with PM2

Install PM2:

```
npm install -g pm2
```

Start server:

```
pm2 start server.js
```

Check:

```
pm2 list
```

---

## 16. Test Backend

Open in browser:

```
http://<public-ip>:5000/todos
```

---

# 🔗 PART 3: Connect Frontend to Backend

## 17. Update API URL

In React app:

```
const API_URL = "http://<ec2-public-ip>:5000";
```

Use in fetch:

```
fetch(`${API_URL}/todos`)
```

---

## 18. Rebuild & Deploy Again

```
npm run build
```

Upload new `dist/` to S3

---

## 19. Verify Full Flow

* Frontend loads ✅
* Todos fetched ✅
* Add / Toggle / Delete works ✅

---

# 🌍 PART 4: Elastic IP (Optional Stability)

## 20. Allocate Elastic IP

* EC2 → Elastic IPs → Allocate

---

## 21. Associate with Instance

* Attach Elastic IP to EC2

---

## 22. Update Frontend Again

Replace API URL with:

```
http://<elastic-ip>:5000
```

---

# ⚠️ PART 5: Cost Management

## 23. Stop Instance

* Stop EC2 when not in use

## 24. Handle Elastic IP

* Keep (small cost) OR
* Release to avoid charges

---

# 🧠 FINAL ARCHITECTURE

```
React (S3)
   ↓
Fetch API
   ↓
Node.js (EC2 + PM2)
   ↓
Firebase Firestore
```

---



