console.log("🚀 SEED STARTED");

import "dotenv/config"
import { db } from "./index";
import { categories } from "./schema";

export async function seedCategories() {
    await db.delete(categories);

    await db.insert(categories).values([
        // ✍️ Writing & Translation
        {
            name: "Translation",
            slug: "translation",
            description: "Translate texts, documents, and books accurately",
            icon: "languages",
            color: "#6366f1",
        },
        {
            name: "Proofreading",
            slug: "proofreading",
            description: "Fix grammar, spelling, and clarity issues",
            icon: "spell-check",
            color: "#6366f1",
        },
        {
            name: "Content Writing",
            slug: "content-writing",
            description: "Write articles, posts, and written content",
            icon: "file-text",
            color: "#6366f1",
        },
        {
            name: "Resume & CV",
            slug: "resume-cv",
            description: "Create or improve resumes and CVs",
            icon: "file-user",
            color: "#6366f1",
        },
        {
            name: "Transcription",
            slug: "transcription",
            description: "Convert audio or video into text",
            icon: "audio-lines",
            color: "#6366f1",
        },

        // 🎨 Design
        {
            name: "Logo Design",
            slug: "logo-design",
            description: "Design professional and modern logos",
            icon: "pen-tool",
            color: "#ec4899",
        },
        {
            name: "Brand Identity",
            slug: "brand-identity",
            description: "Visual identity and branding assets",
            icon: "palette",
            color: "#ec4899",
        },
        {
            name: "Social Media Design",
            slug: "social-media-design",
            description: "Design posts and creatives for social networks",
            icon: "instagram",
            color: "#ec4899",
        },
        {
            name: "Presentation Design",
            slug: "presentation-design",
            description: "Design clean and professional presentations",
            icon: "presentation",
            color: "#ec4899",
        },
        {
            name: "Thumbnail Design",
            slug: "thumbnail-design",
            description: "Create eye-catching thumbnails",
            icon: "image",
            color: "#ec4899",
        },

        // 🖥️ Tech (micro)
        {
            name: "Bug Fixing",
            slug: "bug-fixing",
            description: "Fix bugs and small issues in your code",
            icon: "bug",
            color: "#22c55e",
        },
        {
            name: "Small Features",
            slug: "small-features",
            description: "Add small features to existing projects",
            icon: "plus-circle",
            color: "#22c55e",
        },
        {
            name: "API Integration",
            slug: "api-integration",
            description: "Integrate third-party APIs",
            icon: "plug",
            color: "#22c55e",
        },
        {
            name: "Automation Scripts",
            slug: "automation-scripts",
            description: "Automate repetitive tasks",
            icon: "bot",
            color: "#22c55e",
        },
        {
            name: "Website Setup",
            slug: "website-setup",
            description: "Set up small websites or landing pages",
            icon: "globe",
            color: "#22c55e",
        },

        // 🎥 Multimedia
        {
            name: "Video Editing",
            slug: "video-editing",
            description: "Edit short videos and clips",
            icon: "video",
            color: "#f59e0b",
        },
        {
            name: "Short Form Videos",
            slug: "short-form-videos",
            description: "Create Reels, TikToks, and Shorts",
            icon: "clapperboard",
            color: "#f59e0b",
        },
        {
            name: "Audio Editing",
            slug: "audio-editing",
            description: "Edit podcasts and audio files",
            icon: "mic",
            color: "#f59e0b",
        },
        {
            name: "Voice Over",
            slug: "voice-over",
            description: "Record voice overs for videos or ads",
            icon: "volume-2",
            color: "#f59e0b",
        },

        // 🤖 AI
        {
            name: "AI Content",
            slug: "ai-content",
            description: "Generate AI-powered content",
            icon: "sparkles",
            color: "#8b5cf6",
        },
        {
            name: "Chatbot Setup",
            slug: "chatbot-setup",
            description: "Set up simple AI chatbots",
            icon: "message-circle",
            color: "#8b5cf6",
        },
        {
            name: "Prompt Engineering",
            slug: "prompt-engineering",
            description: "Optimize prompts for AI tools",
            icon: "terminal",
            color: "#8b5cf6",
        },

        // 📊 Data & Office
        {
            name: "Data Entry",
            slug: "data-entry",
            description: "Enter and organize data accurately",
            icon: "table",
            color: "#0ea5e9",
        },
        {
            name: "Excel & Sheets",
            slug: "excel-sheets",
            description: "Create spreadsheets and formulas",
            icon: "sheet",
            color: "#0ea5e9",
        },
        {
            name: "Web Research",
            slug: "web-research",
            description: "Research information online",
            icon: "search",
            color: "#0ea5e9",
        },

        // 🧑‍🏫 Assistance
        {
            name: "Virtual Assistant",
            slug: "virtual-assistant",
            description: "Administrative and online assistance",
            icon: "user-check",
            color: "#14b8a6",
        },
        {
            name: "Online Tutoring",
            slug: "online-tutoring",
            description: "Teach or tutor online",
            icon: "graduation-cap",
            color: "#14b8a6",
        },
        {
            name: "Homework Help",
            slug: "homework-help",
            description: "Help with assignments and exercises",
            icon: "book-open",
            color: "#14b8a6",
        },
    ]);

    console.log("✅ Categories seeded");
}

seedCategories()