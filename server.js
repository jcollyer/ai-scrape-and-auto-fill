const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all origins
app.use(cors());

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // Some legacy browsers (IE11) choke on 204
};

app.use(cors(corsOptions));

app.get("/screenshot", async (req, res) => {
  console.log("----server--->", req.query.url);
  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({
    args: ["--disable-web-security"],
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(req.query.url); // URL is given by the "user" (your client-side application)
  const screenshotBuffer = await page.screenshot();

  // Respond with the image
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": screenshotBuffer.length,
  });
  res.end(screenshotBuffer);

  await browser.close();
});

app.listen(4000);
