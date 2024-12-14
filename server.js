/*const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 3000;

const path = require('path');

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html', 'load.html')); // Change 'index.html' to your main HTML file name
});

app.get('/tweet', async (req, res) => {
  const tweetUrl = req.query.tweetUrl; // Extract tweet URL from query params
  try {
    const tweetData = await fetchTweetData(tweetUrl); // Fetch tweet data (you should implement this)
    res.json(tweetData); // Send the data back as JSON
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tweet data" });
  }
});

app.get("/tweet", async (req, res) => {
    const { tweetUrl } = req.query;
    const tweetId = tweetUrl.split("/").pop();
    const url = `https://api.twitter.com/2/tweets/${tweetId}?expansions=author_id&tweet.fields=text&user.fields=name,username,profile_image_url`;
    const headers = { Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAKIhxgEAAAAABgE0VMoVSBYI3MwDaz8vjR9Pwro%3DYV85YKBYGaANaXyr1SB1PVWR8iJiEc9XS4vXKdQmQy5XZcKSoo` };

    try {
        const response = await fetch(url, { headers });
        const data = await response.json();
        if (response.ok) {
            const tweet = data.data;
            const user = data.includes.users[0];
            res.json({
                name: user.name,
                username: user.username,
                profileImage: user.profile_image_url,
                text: tweet.text,
            });
        } else {
            res.status(500).json({ error: data });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/







const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 3000;
const path = require('path');
const cors = require('cors');
app.use(cors());


// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'load.html'));
});

// Define the /tweet route that fetches tweet data
app.get("/tweet", async (req, res) => {
  const { tweetUrl } = req.query;

  if (!tweetUrl) {
    return res.status(400).json({ error: "Tweet URL is required" });
  }

  const tweetId = tweetUrl.split("/").pop(); // Extract tweet ID from URL
  const url = `https://api.twitter.com/2/tweets/${tweetId}?expansions=author_id&tweet.fields=text&user.fields=name,username,profile_image_url`;

  // Add your actual Bearer token here
  const headers = { Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAKIhxgEAAAAABgE0VMoVSBYI3MwDaz8vjR9Pwro%3DYV85YKBYGaANaXyr1SB1PVWR8iJiEc9XS4vXKdQmQy5XZcKSoo` };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    if (response.ok) {
      const tweet = data.data;
      const user = data.includes.users[0];

      // Send the tweet data to the frontend
      res.json({
        name: user.name,
        username: user.username,
        profileImage: user.profile_image_url,
        text: tweet.text,
      });
    } else {
      console.error('API Response Error: ', data); // Log the error response from the Twitter API
      res.status(500).json({ error: "Failed to fetch tweet data" });
    }
  } catch (error) {
    console.error('Server Fetch Error: ', error); // Log the error that occurred during fetch
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
