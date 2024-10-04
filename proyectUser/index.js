const express = require('express');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api', userRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{ //Flecha gorda
    console.log('Server is running on port ' + PORT);
});
