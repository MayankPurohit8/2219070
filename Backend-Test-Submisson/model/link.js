const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/shortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const linkSchema = mongoose.Schema({
  link: { type: String },
  shortCode: { type: String },
  created_at: { type: Date, default: Date.now() },
  expires_at: {
    type: Date,
    default: new Date(Date.now() + 30 * 60 * 1000),
    index: { expires: 0 },
  },
});

module.exports = mongoose.model("link", linkSchema);
