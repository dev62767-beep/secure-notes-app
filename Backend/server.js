const app = require('./src/app');
.require('dotenv').config();
const connectDB = require('./src/db/db');

connectDB();
const port = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
const PORT = process.env.PORT || 5000;