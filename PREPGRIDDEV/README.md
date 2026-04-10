# PrepGrid - AI Interview Platform

PrepGrid is an advanced, AI-driven application designed to streamline candidate assessment and interview preparation. By leveraging modern web technologies, PrepGrid delivers realistic mock interviews, intelligent resume and document analysis, and comprehensive performance tracking. 

## 🚀 Features

- **Automated Document Analysis**: AI algorithms extract key skills and evaluate resumes seamlessly.
- **Interactive Mock Interviews**: Engage in simulated interview scenarios tailored to your target role.
- **Comprehensive Dashboards**: Track your progress over time with advanced statistical breakdowns.
- **Automated Scheduling**: Streamlined booking logic for upcoming mock sessions or real interviews.
- **Premium Subscription Tier**: Secure and seamless "Pro" plan upgrades via **Razorpay** integration.

## 🛠 Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, PostCSS
- **Routing**: React Router DOM
- **UI Components**: Radix UI, Lucide React (Icons), Custom Shadcn-like components
- **Payments Flow**: Razorpay Checkout integration

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/en/) installed (v18+ recommended).

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/prepgriddev.git
   cd prepgriddev
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The application will be running at `http://localhost:5173`.

## 💳 Razorpay Configuration (Testing)
To test the payment upgrade flow on the `/billing` page:
1. Obtain your **Test Key ID** from the [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Navigate to `src/pages/BillingPage.tsx`.
3. Locate the `options` object inside the `handleUpgrade` function.
4. Replace `'rzp_test_YOUR_KEY_HERE'` with your actual Key ID.

## 📜 Build for Production
To bundle the app for production deployment (e.g., Vercel, Netlify):
```bash
npm run build
```
This will compile the application into the `dist/` directory.

## 📝 License
This project is licensed under the MIT License. Feel free to use and adapt these components for your own platforms!
