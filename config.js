const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || "!",
    ownerName: process.env.OWNER_NAME || "✶✧  🎀  𝑀𝒾𝓀𝒶𝓈𝒶  🎀 ",
    ownerNumber: process.env.OWNER_NUMBER || "918297841545",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "✶✧  🎀  𝑀𝒾𝓀𝒶𝓈𝒶  🎀 ",
    exifPack: process.env.EXIF_PACK || "<<<<",
    exifAuthor: process.env.EXIF_AUTHOR ||"ＰＳＹＤＵＣＫ",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUZ6MFhtVHFaYUlZUWdaMmp1Ymh0OFpEbTJETDFBSHZuQU5pQk4ySVkwWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMlcxYUpSV1JpM0hHZW01SHN5SzZmbEpLdy9UTEIvQWZITi92N2NjbERVMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtTXZTTDdYS1o5czM2cldTRG5WQXVLdXBBTlkvdHVINlpYeG56blVIeEdRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLUmRsVC9HRHdUd0E0ZnVrdGh0dmpINmhraGxGT0xKL0ZTLzNCVHd2MG1ZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBKYTI4aStUTng3bmlVaVhYNlBJcEhSUmw3eEE1WndPNWplZHZRQ2xablE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikc5WFYzNHFKdkIrd2REZ1VJWVZWZlE4K0twSjVkb0tUZys5Y09pQS95aUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNktGNXU0UUhDVVhqSm9hU2Vac2d3U2Z6SVo0R1k4RkZFR1MycElRSjgwND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaG1GRlNBbnFRN09HM0NrUlhhU2Z1QkN2ME5SdFlMYU9SUnV3UmdFM0prbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5JYlpxTzVLV1grcG9mQXpqZk1XN2p4OVg4eWlEd2dGVjdWZW9zcFRoVGJoTUhxSUVoRzZPcm5EUHV5WU5kQXc3SHZSTFdWOVJRamw0SHE3UjZhN2hnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI1LCJhZHZTZWNyZXRLZXkiOiJHd2J4bk1RZUlsRkZHUEtUWUQ1b1YxZlJLRWRXYjFlUmVycE5tQ2JlWCtvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxODI5Nzg0MTU0NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyNDIxQzI4MjcxM0Y2RTNGODU1QURENDU1QjU3NTA2MCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ2NjM0NDk0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTgyOTc4NDE1NDVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjI4RkQzNzI5OEQzNzRBQkEzMkQ2NEZGMTMyMDI3NTEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NjYzNDQ5NH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiRjFDN1hINVciLCJtZSI6eyJpZCI6IjkxODI5Nzg0MTU0NToxOEBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjUxNTMxNjIxNjA1NDYzOjE4QGxpZCIsIm5hbWUiOiLinLbinKcgIPCfjoAgIPCdkYDwnZK+8J2TgPCdkrbwnZOI8J2StiAg8J+OgCAg4pyn4py2In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMK2NpcVFERU8yTjdzQUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ6b1lRNElhdk9aUHNMMks0V2lNWUdBcDhBczB6cW1RTlJoYm5yTjVQQmw0PSIsImFjY291bnRTaWduYXR1cmUiOiJSUnNwVkVOZTAwMmtrakpsR0hlNzhlUUcyRUx6M3FsYXdxN053a1lWTE9TY2VHRFB2cE5EeVJ2b3U5VE5oaXhQSncvUFlLVHR2b0VDL0ZzNTU1enRDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZXlYMlhaM2I3cmxnQWVkdEh2MjNld1hhK0VGWEVVZ0VlMW5vTFNHTHZFTzVDeUlOdklMSGpsQXdSalVUQU40NjdyMG5pOXJBamhGa0N2SlJDREFraGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MTgyOTc4NDE1NDU6MThAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYzZHRU9DR3J6bVQ3QzlpdUZvakdCZ0tmQUxOTTZwa0RVWVc1NnplVHdaZSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ2NjM0NDkwLCJsYXN0UHJvcEhhc2giOiIyTUZLUFEiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFadyJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id',    
    menuType: process.env.MENU_TYPE || 2  // 1 = Image, 2 = Video
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;