import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/api/medicine", async (req, res) => {
  try {

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.1-8B-Instruct",
          messages: req.body.messages,
          max_tokens: 200,
          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    console.log("HF RESPONSE:", data);

    res.json(data);

  } catch (error) {

    console.error("SERVER ERROR:", error);

    res.status(500).json({
      error: "AI request failed"
    });

  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});