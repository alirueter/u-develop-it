const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require('./utils/inputCheck');
const db = require('./db/database');
const apiRoutes = require('./routes/apiRoutes');

//express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//use apiRoutes
app.use('/api', apiRoutes);

//MUST GO LAST // default response for any other request (Not Found) -- catch all
app.use((req, res) => {
    res.status(404).end();
});

//start server after db connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
