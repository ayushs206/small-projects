require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const QRCode = require("qrcode");

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