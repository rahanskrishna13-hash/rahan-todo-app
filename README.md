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

