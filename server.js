const express = require('express');
const path = require('path');

const app = express();
app.set('trust proxy', 1); // Coolify / reverse proxy setter x-forwarded-for
const port = Number(process.env.PORT) || 3000;
const logDataHandler = require('./api/log_data');

// Middleware to parse JSON data
app.use(express.json());

// Telegram / logging API (brukes av alle HTML-sider som kaller fetch('/api/log_data'))
app.post('/api/log_data', logDataHandler);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Default route to public/index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    console.log(`Serving static files from the 'public' directory.`);
    console.log(`To test, open your browser to (e.g.):`);
    console.log(`  http://localhost:${port}/`);
    console.log(`  http://localhost:${port}/otp.html`);
});
