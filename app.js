const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');
const authMiddleware = require('./middleware/authMiddleware');
const requestHandler = require('./services/requestHandler');
const rateLimit = require('./config/rateLimit');

const app = express();

require('dotenv').config();

const corsOptions = {
    origin: ["*"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true  
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(requestLogger);  
app.use(rateLimit);     

app.use('/api', authMiddleware);

app.use('/api', requestHandler);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
