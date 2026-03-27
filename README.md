# 🎓 ScholarSpend
**AI-Powered Financial Literacy for the Modern Student**

ScholarSpend is a financial assistant designed to help university students navigate the transition to financial independence. By combining clean data visualization with gamified "Savings Quests," ScholarSpend turns the chore of budgeting into an engaging academic journey.

## 🚀 Key Features
* **Intelligent Dashboard:** Real-time visibility into "Available to Spend" vs. "Safe-to-Save" balances.
* **AI ScholarTips:** Dynamic spending insights, such as analyzing savings from digital textbooks.
* **Gamified XP System:** Users earn "Budget Master" levels by hitting weekly savings milestones.
* **Study Group Goals:** Social saving features allowing groups to track collective progress for shared goals like Spring Break.
* **Integrated Settings:** Comprehensive management of Linked Accounts, Budget Categories, and Privacy/Security.

## 🛠️ Technical Implementation
This project demonstrates a **Component-Driven Development** approach using modern frontend architecture.

### Tech Stack
* **Frontend:** React (TypeScript)
* **State Management:** React Hooks (`useState`)
* **Styling:** Tailwind CSS for a responsive, mobile-first UI

### Architecture Highlights
The application uses a centralized state machine in `App.tsx` to handle navigation and data persistence.
* **Conditional Rendering:** Managed via `currentPage` state to switch between views (Home, Social, Settings) without page reloads.
* **Data Persistence Logic:** Implemented a functional loop where new Study Groups are added to a local state array and immediately rendered on the dashboard.
* **Modal Management:** Robust handling of stacked modals for transaction history, manual entry, and receipt scanning.

## 🛡️ Security & CTI Reflection
As an aspiring **Cyber Threat Intelligence (CTI)** professional, I designed this MVP with security-first principles:
* **Data Privacy:** Designed for minimal data exposure by only requesting essential financial inputs.
* **Roadmap:** Future iterations will explore **AES-256 encryption** for local storage and **OAuth 2.0** for secure third-party bank integrations.

---
*Created as part of a professional transition from Business to Technology.*
