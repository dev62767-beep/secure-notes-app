const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const notesRoutes = require('./routes/notes.routes');
const adminRouter = require('./routes/admin.route');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: "http://localhost:5173", // React
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/admin", adminRouter);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notes', notesRoutes);

module.exports = app;