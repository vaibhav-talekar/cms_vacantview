const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const dashboardRoute = require('./routes/dashboard');


const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/dashboard', dashboardRoute);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
