# 🧠 TravelGPT – Fullstack AI Travel Assistant Chatbot

A fullstack AI-powered travel assistant chatbot built with **React**, **FastAPI**, **Firebase**, **SQL**, **LangChain**, and **OpenAI**, supporting streaming responses, contextual memory, and intelligent trip recommendations.

---

## 📌 Assignment Overview

> **Homework Assignment – Fullstack AI Chatbot Engineer**  
This project demonstrates fullstack engineering skills by combining modern frontend frameworks, cloud databases, prompt orchestration, and GenAI tools to build a smart travel assistant chatbot.

---

## 🧭 Use Case: Travel Assistant

The chatbot helps users:
- Explore destinations
- Find hotels and flight options
- Generate personalized trip summaries
- Ask open-ended questions with contextual memory

---

## 🚀 Features

### ✅ Core Features
- ⚡ Real-time chat UI built in **React + TypeScript + Tailwind**
- 🧠 AI responses with streaming support from **FastAPI**
- 💾 Chat history stored in **Firebase Firestore**
- 🗃️ Structured travel data stored in **PostgreSQL/SQLite**
- 🕵️‍♂️ **LangChain agents** translate prompts into SQL queries
- 🧑‍🏫 Responses enhanced with **OpenAI** to be natural and user-friendly
- 🧠 Conversational memory context preserved

### 🧪 Bonus Features (Optional)
- 🧳 Switch between "Normal AI" and "Travel Planner" modes
- 🏨 Book a hotel or generate full trip itinerary
- 🧍 Store user preferences in Firebase
- ✅ Unit & integration tests (SQL, OpenAI, endpoint)
- ⚙️ GitHub Actions CI for test automation

---


---

## 🧰 Tech Stack

| Layer        | Tech                     |
|--------------|--------------------------|
| Frontend     | React, Vite, TypeScript, Tailwind CSS |
| Backend      | FastAPI (Python), REST API |
| Chat Memory  | Firebase Firestore       |
| Travel Data  | PostgreSQL or SQLite     |
| Agent Layer  | LangChain / CrewAI / MCP |
| Language AI  | OpenAI API (GPT-4)       |
| Auth         | Token (localStorage)     |
| DevOps       | Docker, GitHub Actions CI|

---

## 📁 Data Schema

### SQL Tables

```sql
CREATE TABLE destinations (
  id INTEGER PRIMARY KEY,
  name TEXT,
  country TEXT,
  description TEXT,
  climate TEXT,
  average_cost REAL
);

CREATE TABLE hotels (
  id INTEGER PRIMARY KEY,
  destination_id INTEGER,
  name TEXT,
  price_per_night REAL,
  stars INTEGER,
  availability BOOLEAN
);

CREATE TABLE flights (
  id INTEGER PRIMARY KEY,
  origin TEXT,
  destination TEXT,
  departure_date DATE,
  price REAL
);
```

🙋‍♂️ Author
Amjad Khaliliah
🚀 Backend Engineer & Solution Architect
