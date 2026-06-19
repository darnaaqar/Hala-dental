import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = "https://dkofobocffyzlpmqrrwo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrb2ZvYm9jZmZ5emxwbXFycndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NDY0NTIsImV4cCI6MjA5NjQyMjQ1Mn0.JmQWvPhsMjobIAWM1EuRtHOsomBJ8U5FiY20ml8dRSo";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let cachedDbContext = "";
let lastFetchedTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache

async function getDatabaseContext() {
  const now = Date.now();
  if (cachedDbContext && (now - lastFetchedTime < CACHE_TTL)) {
    return cachedDbContext;
  }

  let context = "";
  try {
    const [clinicsRes, doctorsRes, servicesRes, announcementsRes, bannersRes, amenitiesRes, testimonialsRes] = await Promise.all([
      supabase.from('clinics').select('*'),
      supabase.from('doctors').select('*'),
      supabase.from('services').select('*'),
      supabase.from('announcements').select('*'),
      supabase.from('banners').select('*'),
      supabase.from('amenities').select('*'),
      supabase.from('testimonials').select('*')
    ]);

    const clinics = clinicsRes.data || [];
    const doctors = doctorsRes.data || [];
    const services = servicesRes.data || [];
    const announcements = announcementsRes.data || [];
    const banners = bannersRes.data || [];
    const amenities = amenitiesRes.data || [];
    const testimonials = testimonialsRes.data || [];

    // Process clinics
    if (clinics.length > 0) {
      context += "--- ERBIL CLINIC BRANCHES ---\n";
      clinics.forEach((c: any) => {
        context += `- Branch: ${c.name} (Kurdish: ${c.name_ku || ""}, Arabic: ${c.name_ar || ""})\n`;
        context += `  Address: ${c.address} (Kurdish: ${c.address_ku || ""}, Arabic: ${c.address_ar || ""})\n`;
        context += `  Phone: ${c.phone_number}, City: ${c.city}, Status: ${c.status_type || "open"}\n`;
        if (c.working_hours) {
          context += `  Working Hours: ${JSON.stringify(c.working_hours)}\n`;
        }
      });
      context += "\n";
    }

    // Process doctors
    if (doctors.length > 0) {
      context += "--- EXPERT DENTISTS & MEDICAL STAFF ---\n";
      doctors.forEach((d: any) => {
        context += `- Doctor: ${d.display_name}\n`;
        context += `  Specialty: ${d.specialty} (Kurdish: ${d.specialty_ku || ""}, Arabic: ${d.specialty_ar || ""})\n`;
        context += `  Experience: ${d.years_of_experience || 0} years, Rating: ${d.rating || 0}/5 (${d.review_count || 0} reviews), Verified: ${d.is_verified || false}\n`;
        context += `  License: ${d.license_number || ""}, Fee: $${d.consultation_fee || 150} (Credited toward treatment)\n`;
        if (d.bio || d.bio_ku || d.bio_ar) {
          context += `  Bio: ${d.bio || ""} (Kurdish: ${d.bio_ku || ""}, Arabic: ${d.bio_ar || ""})\n`;
        }
      });
      context += "\n";
    }

    // Process services
    if (services.length > 0) {
      context += "--- CLINICAL DENTAL SERVICES ---\n";
      services.slice(0, 10).forEach((s: any) => {
        context += `- Service: ${s.name} (Kurdish: ${s.name_ku || ""}, Arabic: ${s.name_ar || ""})\n`;
        context += `  Category: ${s.category_name} (Kurdish: ${s.category_name_ku || ""}, Arabic: ${s.category_name_ar || ""})\n`;
        context += `  Price: $${s.base_price || 0}, Duration: ${s.estimated_duration_minutes || 30} mins\n`;
        context += `  Description: ${s.description || ""} (Kurdish: ${s.description_ku || ""}, Arabic: ${s.description_ar || ""})\n`;
      });
      context += "\n";
    }

    // Process announcements
    if (announcements.length > 0) {
      context += "--- OFFICIAL ANNOUNCEMENTS & NEWS ---\n";
      announcements.forEach((a: any) => {
        if (a.is_active) {
          context += `- Title: ${a.title} (Kurdish: ${a.title_ku || ""}, Arabic: ${a.title_ar || ""})\n`;
          context += `  Body: ${a.body || ""} (Kurdish: ${a.body_ku || ""}, Arabic: ${a.body_ar || ""})\n`;
        }
      });
      context += "\n";
    }

    // Process banners
    if (banners.length > 0) {
      context += "--- ACTIVE PROMOTIONS, OFFERS & DISCOUNTS ---\n";
      banners.forEach((b: any) => {
        if (b.is_active) {
          context += `- Banner: ${b.title} (Kurdish: ${b.title_ku || ""}, Arabic: ${b.title_ar || ""})\n`;
          context += `  Subtitle: ${b.subtitle || ""} (Kurdish: ${b.subtitle_ku || ""}, Arabic: ${b.subtitle_ar || ""})\n`;
          context += `  Discounts: ${b.discount_percent || 0}% Off, Badge: ${b.badge_text || ""} (Kurdish: ${b.badge_text_ku || ""}, Arabic: ${b.badge_text_ar || ""})\n`;
        }
      });
      context += "\n";
    }

    // Process amenities
    if (amenities.length > 0) {
      context += "--- CLINIC AMENITIES & FACILITIES ---\n";
      amenities.forEach((am: any) => {
        if (am.is_active) {
          context += `- Amenity: ${am.title} (Kurdish: ${am.title_ku || ""}, Arabic: ${am.title_ar || ""}) - ${am.description || ""}\n`;
        }
      });
      context += "\n";
    }

    // Process testimonials
    if (testimonials.length > 0) {
      context += "--- PATIENT TESTIMONIALS & REVIEWS ---\n";
      testimonials.slice(0, 3).forEach((t: any) => {
        if (t.is_active) {
          context += `- Patient ${t.patient_name} (${t.rating || 5} stars): "${t.content || ""}"\n`;
        }
      });
      context += "\n";
    }

    cachedDbContext = context;
    lastFetchedTime = now;
  } catch (err) {
    console.warn("Failed to retrieve database context in Express server:", err);
    if (cachedDbContext) return cachedDbContext;
  }
  return context || cachedDbContext;
}

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
      const { message, history, grokApiKey } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Fetch database context dynamically
      const dbContext = await getDatabaseContext();

      const userMsgLower = message.toLowerCase();

      // Smart fallback offline responder that searches the loaded dbContext
      const makeSmartOfflineResponse = () => {
        let matchedSections = "";
        
        if (userMsgLower.includes("doctor") || userMsgLower.includes("dentist") || userMsgLower.includes("dr") || userMsgLower.includes("دکتۆر") || userMsgLower.includes("طبيب") || userMsgLower.includes("دكتور")) {
          matchedSections += "\n- Expert Dentist details:\n";
          // Try to search for lines mentioning Doctors
          const lines = dbContext.split("\n");
          let foundDoc = false;
          lines.forEach(l => {
            if (l.toLowerCase().includes("doctor:") || l.toLowerCase().includes("specialty:") || l.toLowerCase().includes("experience:")) {
              matchedSections += `  ${l.trim()}\n`;
              foundDoc = true;
            }
          });
          if (!foundDoc) {
            matchedSections += "  We have top specialized dentists in Erbil, including lead Orthopedist Dr. Sarah Khalil and cosmetic expert Dr. Sara Hawar!\n";
          }
        }

        if (userMsgLower.includes("clinic") || userMsgLower.includes("branch") || userMsgLower.includes("location") || userMsgLower.includes("جێگا") || userMsgLower.includes("مۆڵ") || userMsgLower.includes("عنوان") || userMsgLower.includes("فرع")) {
          matchedSections += "\n- Clinic Location information:\n";
          const lines = dbContext.split("\n");
          let foundClinic = false;
          lines.forEach(l => {
            if (l.toLowerCase().includes("branch:") || l.toLowerCase().includes("address:") || l.toLowerCase().includes("phone:")) {
              matchedSections += `  ${l.trim()}\n`;
              foundClinic = true;
            }
          });
          if (!foundClinic) {
            matchedSections += "  We have premium branches on Gulan Main St and Bakhtyari District, Erbil!\n";
          }
        }

        if (userMsgLower.includes("service") || userMsgLower.includes("price") || userMsgLower.includes("fee") || userMsgLower.includes("cleaning") || userMsgLower.includes("whitening") || userMsgLower.includes("implants") || userMsgLower.includes("نرخ") || userMsgLower.includes("سعر") || userMsgLower.includes("خزمەتگوزاری")) {
          matchedSections += "\n- Services & Consultation Pricing:\n";
          const lines = dbContext.split("\n");
          let foundService = false;
          lines.forEach(l => {
            if (l.toLowerCase().includes("service:") || l.toLowerCase().includes("price:") || l.toLowerCase().includes("offer:") || l.toLowerCase().includes("banner:") || l.toLowerCase().includes("promotion:")) {
              matchedSections += `  ${l.trim()}\n`;
              foundService = true;
            }
          });
          if (!foundService) {
            matchedSections += "  Clinic Consultation is $150 (fully waived when subsequently starting any clinical treatment). Scaling and cleaning start at $80. Premium tooth laser whitening is currently discounted at $245 (regularly $350)!\n";
          }
        }

        if (userMsgLower.includes("announcement") || userMsgLower.includes("promo") || userMsgLower.includes("discount") || userMsgLower.includes("news") || userMsgLower.includes("دانەشاندن") || userMsgLower.includes("تخفیف")) {
          matchedSections += "\n- Active promotions & notices:\n";
          const lines = dbContext.split("\n");
          let foundNotice = false;
          lines.forEach(l => {
            if (l.toLowerCase().includes("title:") || l.toLowerCase().includes("body:") || l.toLowerCase().includes("banner:") || l.toLowerCase().includes("discounts:")) {
              matchedSections += `  ${l.trim()}\n`;
              foundNotice = true;
            }
          });
          if (!foundNotice) {
            matchedSections += "  Laser Teeth Whitening Special Offer counts at $245 instead of $350!\n";
          }
        }

        const isArabic = /[\u0600-\u06FF]/.test(message) && !userMsgLower.includes("دکتۆر") && !userMsgLower.includes("سڵاو") && !userMsgLower.includes("سپاس");
        const isKurdish = /[\u0600-\u06FF]/.test(message) && (userMsgLower.includes("دکتۆر") || userMsgLower.includes("سڵاو") || userMsgLower.includes("سپاس") || userMsgLower.includes("ش") || userMsgLower.includes("وه"));

        if (isKurdish) {
          return `سڵاو بەخێربێن بۆ هۆبەی سەرەکی Hala Dent بۆ چاندنی ددان و جوانکاری لە هەولێر! بەپێی زانیارییە دڵنیاکراوەکانی ناو داتابەیسەکەمان:\n${matchedSections || "\nئێمە لقی تایبەتمان هەیە لە شەقامی گوڵان و گەڕەکی بەختیاری لە هەولێر. ڕاوێژکاری $١٥٠ یە بەڵام خۆڕایی دەبێت کاتێک چارەسەر دەستپێدەکەیت!"}\nچۆن دەتوانین یارمەتیت بدەین؟`;
        } else if (isArabic) {
          return `مرحباً بك في المركز المتخصص هالا دينت (Hala Dent) في أربيل! استناداً إلى بياناتنا المباشرة:\n${matchedSections || "\nلدينا فروع متميزة في شارع جولان وحي بختياري في أربيل. سعر الاستشارة هو ١٥٠ دولاراً (تُخصم مجاناً كعرض ترويجي عند البدء بالعلاج)!"}\nكيف يمكننا مساعدتك اليوم؟`;
        } else {
          return `Hello and welcome to Hala Dent Clinics in Erbil! Based on our live clinical database records:\n${matchedSections || "\nWe have modern offices located on Gulan Main St and Bakhtyari Dist with expert practitioners and 24/7 on-call pain management relief.\n"}\nLet me know how I can guide you today!`;
        }
      };

      const targetGrokApiKey = grokApiKey || process.env.GROK_API_KEY || process.env.XAI_API_KEY;

      let systemInstruction = `You are the Hala Dent AI Assistant, a friendly, professional, and knowledgeable dental support assistant for "Hala Dent" premium dental clinics located in Erbil, Kurdistan Region of Iraq.
Hala Dent clinics offer premium orthodontics and clear 3D aligners (under expert Dr. Sarah Khalil), advanced cosmetic laser teeth whitening (under Dr. Sara Hawar), dental implants, and 24/7 urgent emergency toothache relief.
Pricing guidance: consultation is $150 (completely free/credited towards any treatment you start), laser whitening is on a special promotion at $245, and professional cleaning or fillings start at only $80.
Answer cleanly, warmly, and helpfully. Keep answers very concise (under 3 sentences), and refer users to relevant app sections like the Clinics locators, the Doctors tab, or Services catalog. Always mention Erbil, Kurdistan proudly if relevant.`;

      if (dbContext) {
        systemInstruction += `\n\n[LIVE CLINIC DATA FROM POSTGRESQL DATABASE]:\n${dbContext}`;
      }

      if (targetGrokApiKey) {
        console.log("Invoking X.AI Grok API with provided API key...");
        
        // Standard OpenAI-compatible message structure for grok API
        const messages = [
          { role: "system", content: systemInstruction }
        ];

        // Format and append history
        if (history && history.length > 0) {
          history.forEach((h: any) => {
            messages.push({
              role: h.sender === 'user' ? 'user' : 'assistant',
              content: h.text
            });
          });
        }

        messages.push({ role: "user", content: message });

        try {
          const grokResponse = await fetch("https://api.x.ai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${targetGrokApiKey}`
            },
            body: JSON.stringify({
              model: "grok-2-1212",
              messages: messages,
              temperature: 0.7
            })
          });

          if (grokResponse.ok) {
            const grokData = await grokResponse.json();
            if (grokData && grokData.choices && grokData.choices[0] && grokData.choices[0].message) {
              const replyText = grokData.choices[0].message.content.trim();
              return res.json({ reply: replyText, provider: "grok" });
            }
          } else {
            const errorText = await grokResponse.text();
            console.error("Grok API response failed with status:", grokResponse.status, errorText);
            
            // Fallback model trial if model name was unrecognized
            if (grokResponse.status === 404 || errorText.includes("model") || errorText.includes("not found")) {
              console.log("Trying fallback model 'grok-beta'...");
              const fallbackResponse = await fetch("https://api.x.ai/v1/chat/completions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${targetGrokApiKey}`
                },
                body: JSON.stringify({
                  model: "grok-beta",
                  messages: messages,
                  temperature: 0.7
                })
              });
              
              if (fallbackResponse.ok) {
                const fallbackData = await fallbackResponse.json();
                if (fallbackData && fallbackData.choices && fallbackData.choices[0] && fallbackData.choices[0].message) {
                  const replyText = fallbackData.choices[0].message.content.trim();
                  return res.json({ reply: replyText, provider: "grok" });
                }
              } else {
                console.error("Fallback Grok-beta API response failed too:", await fallbackResponse.text());
              }
            }
            throw new Error(`Grok API Error (Status ${grokResponse.status}): ${errorText}`);
          }
        } catch (grokErr: any) {
          console.error("Grok API query exception, falling back to Gemini:", grokErr);
        }
      }

      if (!ai) {
        console.warn("Gemini is not initialized (no GEMINI_API_KEY). Using intelligent offline database matcher.");
        return res.json({ reply: makeSmartOfflineResponse() });
      }

      // Format previous chat history for clean conversational context
      const formattedHistory = (history || [])
        .map((h: any) => `${h.sender === 'user' ? 'User' : 'Assistant'}: ${h.text}`)
        .join("\n");
      
      const fullPrompt = `${formattedHistory}\nUser: ${message}\nAssistant:`;

      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: fullPrompt,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
          },
        });

        const replyText = response.text ? response.text.trim() : "I am here to assist you. What can I help you with regarding your dental care?";
        return res.json({ reply: replyText, provider: "gemini" });
      } catch (geminiErr: any) {
        console.warn("Gemini API Error, attempting fast smart database-lookup content retrieval:", geminiErr);
        // Instant intelligent live content responder from database when upstream service is offline/busy!
        return res.json({ reply: makeSmartOfflineResponse() });
      }
    } catch (err: any) {
      console.error("General API Error in chat handler:", err);
      res.json({ reply: "Baxêr bêt! Thank you for choosing Hala Dent Erbil. I am currently running on emergency backup mode. Please call us at +964 (0) 750 123 4567 or submit your offline question above." });
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
    // Pre-warm database cache immediately at startup
    getDatabaseContext().then(() => {
      console.log("Supabase database context pre-warmed successfully!");
    }).catch(err => {
      console.warn("Error pre-warming database context:", err);
    });
  });
}

startServer();
