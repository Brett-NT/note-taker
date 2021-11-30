const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require('./routes/routes.js')(app);
require('./routes/html-routes.js')(app);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});