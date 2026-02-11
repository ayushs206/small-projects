require('dotenv').config()

const express = require('express')
const app = express()

const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const QRCode = require("qrcode");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/generate", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const qr = await QRCode.toDataURL(url);
        res.json({ qr });
    } catch (err) {
        res.status(500).json({ error: "Failed to generate QR" });
    }
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
})