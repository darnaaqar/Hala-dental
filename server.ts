import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Setup Gemini SDK if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not defined.");
  }

  // API Route for chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!ai) {
        // Fallback response if GEMINI_API_KEY is not available
        return res.json({
          reply: "Baxêr bêt! I am the Hala Dent AI assistant. My live Gemini engine is pending API key initialization in settings, but I can tell you we have branches in Gulan Street and Bakhtyari in Erbil with 24/7 emergency services! How can we help you today?"
        });
      }

      const systemInstruction = `You are the Hala Dent AI Assistant, a friendly, professional, and knowledgeable dental support assistant for "Hala Dent" premium dental clinics located in Erbil, Kurdistan Region of Iraq.
Hala Dent clinics offer premium orthodontics and clear 3D aligners (under expert Dr. Sarah Khalil), advanced cosmetic laser teeth whitening (under Dr. Sara Hawar), dental implants, and 24/7 urgent emergency toothache relief.
Pricing guidance: consultation is $150 (completely free/credited towards any treatment you start), laser whitening is on a special promotion at $245, and professional cleaning or fillings start at only $80.
Answer cleanly, warmly, and helpfully. Keep answers very concise (under 3 sentences), and refer users to relevant app sections like the Clinics locators, the Doctors tab, or Services catalog. Always mention Erbil, Kurdistan proudly if relevant.`;

      // Format previous chat history for clean conversational context
      const formattedHistory = (history || [])
        .map((h: any) => `${h.sender === 'user' ? 'User' : 'Assistant'}: ${h.text}`)
        .join("\n");
      
      const fullPrompt = `${formattedHistory}\nUser: ${message}\nAssistant:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: fullPrompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text ? response.text.trim() : "I am here to assist you. What can I help you with regarding your dental care?";
      res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({ error: err.message || "Something went wrong" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
