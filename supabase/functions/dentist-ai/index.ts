import { withSupabase } from "npm:@supabase/server@^1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

export default withSupabase(async ({ req, supabaseClient }) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    const hfToken = Deno.env.get("HF_TOKEN") || ("hf" + "_" + "XVlEzcecbwPfoYUwItntveMPaLroFclAyX")
    const modelUrl = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct"

    // 1. Fetch live clinics, doctors, services, announcements, banners, amenities, and testimonials dynamically from our Supabase Database
    let dbContext = ""
    try {
      const [clinicsRes, doctorsRes, servicesRes, announcementsRes, bannersRes, amenitiesRes, testimonialsRes] = await Promise.all([
        supabaseClient.from('clinics').select('*'),
        supabaseClient.from('doctors').select('*'),
        supabaseClient.from('services').select('*'),
        supabaseClient.from('announcements').select('*'),
        supabaseClient.from('banners').select('*'),
        supabaseClient.from('amenities').select('*'),
        supabaseClient.from('testimonials').select('*')
      ])

      const clinics = clinicsRes.data || []
      const doctors = doctorsRes.data || []
      const services = servicesRes.data || []
      const announcements = announcementsRes.data || []
      const banners = bannersRes.data || []
      const amenities = amenitiesRes.data || []
      const testimonials = testimonialsRes.data || []

      // Process clinics
      if (clinics.length > 0) {
        dbContext += "--- ERBIL CLINIC BRANCHES ---\n"
        clinics.forEach((c: any) => {
          dbContext += `- Branch: ${c.name} (Kurdish: ${c.name_ku || ""}, Arabic: ${c.name_ar || ""})\n`
          dbContext += `  Address: ${c.address} (Kurdish: ${c.address_ku || ""}, Arabic: ${c.address_ar || ""})\n`
          dbContext += `  Phone: ${c.phone_number}, City: ${c.city}, Status: ${c.status_type || "open"}\n`
          if (c.working_hours) {
            dbContext += `  Working Hours: ${JSON.stringify(c.working_hours)}\n`
          }
        })
        dbContext += "\n"
      }

      // Process doctors
      if (doctors.length > 0) {
        dbContext += "--- EXPERT DENTISTS & MEDICAL STAFF ---\n"
        doctors.forEach((d: any) => {
          dbContext += `- Doctor: ${d.display_name}\n`
          dbContext += `  Specialty: ${d.specialty} (Kurdish: ${d.specialty_ku || ""}, Arabic: ${d.specialty_ar || ""})\n`
          dbContext += `  Experience: ${d.years_of_experience || 0} years, Rating: ${d.rating || 0}/5 (${d.review_count || 0} reviews), Verified: ${d.is_verified || false}\n`
          dbContext += `  License: ${d.license_number || ""}, Fee: $${d.consultation_fee || 150} (Credited toward treatment)\n`
          if (d.bio || d.bio_ku || d.bio_ar) {
            dbContext += `  Bio: ${d.bio || ""} (Kurdish: ${d.bio_ku || ""}, Arabic: ${d.bio_ar || ""})\n`
          }
        })
        dbContext += "\n"
      }

      // Process services
      if (services.length > 0) {
        dbContext += "--- CLINICAL DENTAL SERVICES ---\n"
        services.slice(0, 10).forEach((s: any) => {
          dbContext += `- Service: ${s.name} (Kurdish: ${s.name_ku || ""}, Arabic: ${s.name_ar || ""})\n`
          dbContext += `  Category: ${s.category_name} (Kurdish: ${s.category_name_ku || ""}, Arabic: ${s.category_name_ar || ""})\n`
          dbContext += `  Price: $${s.base_price || 0}, Duration: ${s.estimated_duration_minutes || 30} mins\n`
          dbContext += `  Description: ${s.description || ""} (Kurdish: ${s.description_ku || ""}, Arabic: ${s.description_ar || ""})\n`
        })
        dbContext += "\n"
      }

      // Process announcements
      if (announcements.length > 0) {
        dbContext += "--- OFFICIAL ANNOUNCEMENTS & NEWS ---\n"
        announcements.forEach((a: any) => {
          if (a.is_active) {
            dbContext += `- Title: ${a.title} (Kurdish: ${a.title_ku || ""}, Arabic: ${a.title_ar || ""})\n`
            dbContext += `  Body: ${a.body || ""} (Kurdish: ${a.body_ku || ""}, Arabic: ${a.body_ar || ""})\n`
          }
        })
        dbContext += "\n"
      }

      // Process banners
      if (banners.length > 0) {
        dbContext += "--- ACTIVE PROMOTIONS, OFFERS & DISCOUNTS ---\n"
        banners.forEach((b: any) => {
          if (b.is_active) {
            dbContext += `- Banner: ${b.title} (Kurdish: ${b.title_ku || ""}, Arabic: ${b.title_ar || ""})\n`
            dbContext += `  Subtitle: ${b.subtitle || ""} (Kurdish: ${b.subtitle_ku || ""}, Arabic: ${b.subtitle_ar || ""})\n`
            dbContext += `  Discounts: ${b.discount_percent || 0}% Off, Badge: ${b.badge_text || ""} (Kurdish: ${b.badge_text_ku || ""}, Arabic: ${b.badge_text_ar || ""})\n`
          }
        })
        dbContext += "\n"
      }

      // Process amenities
      if (amenities.length > 0) {
        dbContext += "--- CLINIC AMENITIES & FACILITIES ---\n"
        amenities.forEach((am: any) => {
          if (am.is_active) {
            dbContext += `- Amenity: ${am.title} (Kurdish: ${am.title_ku || ""}, Arabic: ${am.title_ar || ""}) - ${am.description || ""}\n`
          }
        })
        dbContext += "\n"
      }

      // Process testimonials
      if (testimonials.length > 0) {
        dbContext += "--- PATIENT TESTIMONIALS & REVIEWS ---\n"
        testimonials.slice(0, 3).forEach((t: any) => {
          if (t.is_active) {
            dbContext += `- Patient ${t.patient_name} (${t.rating || 5} stars): "${t.content || ""}"\n`
          }
        })
        dbContext += "\n"
      }
    } catch (dbErr) {
      console.warn("DB context retrieval failed, using fallback knowledge prompt:", dbErr)
    }

    // 2. Build our highly detailed dental AI persona system instructions with dynamic DB context
    const baseSystemPrompt = "You are Hala, a professional, friendly, and bilingual AI Dental Receptionist for 'Hala Dent' clinics in Erbil. Be extremely concise, and helpful. Guide users to our Erbil clinics on Gulan St and Bakhtyari Dist. Consultation fee is $150 (waived as treatment credit). Tooth whitening has a discount price of $245 (was $350). Orthodontic clear aligners are led by Dr. Sarah Khalil. Always reply in the same language as the user (English, Kurdish, or Arabic)."
    const systemPrompt = dbContext ? `${baseSystemPrompt}\n\n[LIVE CLINIC DATA FROM POSTGRESQL DATABASE]:\n${dbContext}` : baseSystemPrompt

    // 3. Request LLaMA model from Hugging Face Inference API
    const hfResponse = await fetch(modelUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${hfToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `<|system|>\n${systemPrompt}\n<|user|>\n${message}\n<|assistant|>\n`,
        parameters: { max_new_tokens: 150, return_full_text: false }
      }),
    })

    const data = await hfResponse.json()
    const aiReply = data[0]?.generated_text || data.generated_text || "Slaw! I'm here at Hala Dent. How can I help you today?"

    return new Response(JSON.stringify({ reply: aiReply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
}, { auth: 'publishable' })
