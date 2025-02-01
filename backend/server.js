import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/mongodb.js";
import cors from "cors";
import propertyrouter from "./routes/ProductRouter.js";
import userrouter from "./routes/UserRoute.js";
import formrouter from "./routes/formrouter.js";
import newsrouter from "./routes/newsRoute.js";
import appointmentRouter from "./routes/appointmentRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded());



// CORS Configuration with error handling
app.use((req, res, next) => {
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:4000",
        "http://localhost:5174",
        "http://localhost:5173",
        "https://real-estate-website-sepia-two.vercel.app",
        "https://real-estate-website-admin.onrender.com",
        "https://real-estate-backend-gamma-nine.vercel.app",
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })(req, res, (err) => {
    if (err) {
      console.error("CORS Error:", err);
      return res.status(403).json({
        success: false,
        message: "CORS not allowed",
      });
    }
    next();
  });
});

// Database connection with retry logic
const connectWithRetry = async () => {
  try {
    await connectdb();
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    console.log("Retrying in 5 seconds...");
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

// Basic health check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes with error handling
app.use("/api/products", propertyrouter);
app.use("/api/users", userrouter);
app.use("/api/forms", formrouter);
app.use("/news", newsrouter);
app.use("/api/appointments", appointmentRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Handle 404
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource not found",
  });
});

const port = process.env.PORT || 4000;

// Start server only if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
}

app.get("/", (req, res) => {
  res.send(
    ` <html> <head> <title>API Status</title> </head> <body> <h1>API is working</h1> <p>Welcome to the Food delivery website. Everything is running smoothly.</p> </body> </html> `
  );
});

export default app;
