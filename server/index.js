require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const publicRoutes = require('./routes/publicRoutes');
const privateRoutes = require('./routes/privateRoutes');

const app = express();
const port = 5000 || process.env.EXPRESS_PORT;

// connection with mongoDB cloud
mongoose.connect(process.env.MONGOKEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log(
    'Connected to database successfully on Express HTTP Port',
  );
});

// cors and json to get the backend server functioning with no issues
app.use(cors());
app.use(express.json({ extended: true, limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// express routes
app.use('/api', publicRoutes);
app.use('/api', privateRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
