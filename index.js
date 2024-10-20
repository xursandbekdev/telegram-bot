require("dotenv").config();
const { Telegraf } = require("telegraf");
const youtubedl = require("yt-dlp-exec");
const express = require("express");

const bot = new Telegraf(process.env.BOT_TOKEN);

// Express serverni yaratish
const app = express();
app.use(express.json());

// Webhookni sozlash
app.post("/webhook", (req, res) => {
    bot.handleUpdate(req.body, res);
});

// YouTube, Instagram yoki TikTok videolarini yuklab olish funktsiyasi
bot.start((ctx) => {
    ctx.reply("Salom! YouTube, Instagram yoki TikTok videosining linkini yuboring va men sizga video chiqaraman.");
});

// Tekshirilgan linklar va video yuklash
bot.on("text", async (ctx) => {
    const url = ctx.message.text;

    // Mavjud platformalarni tekshirish
    const supportedPlatforms = ["youtube.com", "youtu.be", "instagram.com", "vt.tiktok.com"];
    if (supportedPlatforms.some(platform => url.includes(platform))) {
        try {
            ctx.reply("Video yuklab olayapman, biroz kuting...");
            
            // YouTube-DLP orqali video ma'lumotlarini olish
            const output = await youtubedl(url, {
                format: "best",
                dumpSingleJson: true,
            });

            console.log("Video yuklandi:", output);

            // Video linkini olish
            const videoUrl = output.url || (output.requested_formats && output.requested_formats[0].url);

            // Agar video URL mavjud bo'lsa
            if (videoUrl) {
                await ctx.replyWithVideo({ url: videoUrl });
            } else {
                ctx.reply("Videoni yuklashda xatolik yuz berdi.");
            }
        } catch (error) {
            console.error("Videoni yuklashda xatolik:", error);
            ctx.reply("Videoni yuklashda xatolik yuz berdi. Iltimos, boshqa video linkini yuboring.");
        }
    } else {
        ctx.reply("Menga faqat YouTube, Instagram yoki TikTok video linklarini yuboring.");
    }
});

// Webhookni o'rnatish
const URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/setWebhook`;
await fetch(`${URL}?url=${process.env.VERCEL_URL}/webhook`);

app.listen(3000, () => {
    console.log("Server 3000-portda ishlayapti...");
});
