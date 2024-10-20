// require("dotenv").config();
// const { Telegraf } = require("telegraf");
// const youtubedl = require("yt-dlp-exec");
// const express = require("express");

// const bot = new Telegraf(process.env.BOT_TOKEN); // Tokenni dotenvdan oling

// const app = express();
// app.get("/", (req, res) => res.send("Bot is running!"));
// app.listen(3000, () => console.log("Server started on port 3000"));

// bot.start((ctx) => {
//     ctx.reply(
//         "Salom! YouTube, Instagram yoki TikTok videosining linkini yuboring va men sizga video chiqaraman."
//     );
// });

// bot.on("text", async (ctx) => {
//     const url = ctx.message.text;
//     if (
//         url.includes("youtube.com") || 
//         url.includes("youtu.be") || 
//         url.includes("instagram.com") || 
//         url.includes("vt.tiktok.com")
//     ) {
//         try {
//             ctx.reply("Video yuklab olayapman, biroz kuting...");
//             const output = await youtubedl(url, {
//                 format: "best", // Video va ovozni birgalikda yuklab olish
//                 dumpSingleJson: true,
//             });
//             console.log(output);

//             const videoUrl = output.url || output.requested_formats[0].url;
//             if (videoUrl) {
//                 ctx.replyWithVideo({ url: videoUrl });
//             } else {
//                 ctx.reply("Videoni yuklashda xatolik yuz berdi.");
//             }
//         } catch (error) {
//             console.error("Videoni yuklashda xatolik:", error);
//             ctx.reply("Videoni yuklashda xatolik yuz berdi. Iltimos, boshqa video linkini yuboring.");
//         }
//     } else {
//         ctx.reply("Menga faqat YouTube, Instagram yoki TikTok video linklarini yuboring.");
//     }
// });

// bot.launch()
//     .then(() => {
//         console.log("Bot ishlayapti...");
//     })
//     .catch((error) => {
//         console.error("Botni ishga tushirishda xatolik:", error);
//     });
