import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import { analyzeResumeATS } from "./atsScanner.js";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// File upload setup
const upload = multer({ dest: "server/uploads/" });

// ATS scan route
app.post("/api/ats-scan", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const mimeType = req.file.mimetype;

    const result = await analyzeResumeATS(filePath, mimeType);

    fs.unlinkSync(filePath); // Cleanup uploaded file

    res.json({ success: true, result });
  } catch (err) {
    console.error("ATS Scan Error:", err);
    res.status(500).json({ success: false, error: "Failed to scan resume." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
