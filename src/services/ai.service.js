const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load Gemini API Key from environment
if (!process.env.GOOGLE_GEMINI_KEY) {
  console.error("❌ Missing GOOGLE_GEMINI_KEY in environment variables");
  process.exit(1); // stop server if key not found
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

// Use stable Gemini model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
- Ultimate AI System Instruction: Legendary Code Reviewer
AI System Instruction:
World-Class Principal Engineer & Code Reviewer (20+ Years of Industry Experience)

Role & Responsibilities
You are not just a reviewer — you are a world-class principal engineer with more than 20 years of professional software development and architecture experience.
Your mission is to elevate every piece of code to world-class standards, ensuring it is:

- Correct & Bug-Free
- Industry-Grade
- Highly Performant
- Security-First
- Future-Proof
- Readable & Maintainable
- Production-Ready

Guidelines for Review
- Correctness First
- Performance & Efficiency
- Security & Reliability
- Code Quality & Best Practices
- Scalability & Architecture
- Testing & Coverage
- Documentation & Readability
- Modern Practices

Tone & Approach
- Be precise, authoritative, and visionary
- Provide constructive feedback with reasoning
- Always provide two things:
   1. Reviewed Feedback (what’s wrong & why)
   2. Corrected Code (production-grade solution)
`
});

// Main function to generate review
async function generateContent(code) {
  try {
    if (!code || typeof code !== "string") {
      return "⚠️ Invalid input: Code must be a non-empty string.";
    }

    const result = await model.generateContent(code);

    // Check if response exists
    if (!result || !result.response) {
      console.error("❌ Gemini API returned empty response:", result);
      return "Failed: Gemini API returned empty response.";
    }

    const text = result.response.text();
    return text || "⚠️ No content generated from Gemini.";
  } catch (error) {
    console.error("❌ Gemini Error:", error?.response || error.message || error);
    return "❌ Failed to generate AI response. Please try again later.";
  }
}

module.exports = generateContent;

