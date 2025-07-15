const express = require("express");
const cors = require("cors");
const app = express();
const link = require("./model/link");
const { log, authenticate } = require("../Logging Middleware/log");

app.use(cors());
app.use(express.json());
authenticate();

app.post("/shorturls", async (req, res) => {
  try {
    const { urlencoded, validity, shortCode } = req.body;

    const existing_link = await link.findOne({
      link: urlencoded,
      shortCode: shortCode,
    });

    if (existing_link) {
      let updatedlink = await link.findByIdAndUpdate(
        existing_link._id,
        {
          expires_at: new Date(Date.now() + validity * 60 * 1000),
        },
        { new: true }
      );
      return res.status(201).json({
        message: "created successfully",
        shortcode: shortCode,
        expiry: new Date(Date.now() + validity * 60 * 1000),
      });
    } else {
      const { nanoid } = await import("nanoid");
      let code = shortCode || nanoid(10);
      while (await link.findOne({ shortCode: code })) {
        code = nanoid(10);
      }
      const newLink = await link.create({
        link: urlencoded,
        shortCode: code,
        expires_at: new Date(Date.now() + validity * 60 * 1000),
      });
      return res.status(201).json({
        message: "created successfully",
        shortcode: code,
        expiry: new Date(Date.now() + validity * 60 * 1000),
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("something went wrong");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
