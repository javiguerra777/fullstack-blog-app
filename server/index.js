require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();
const port = 5000 || process.env.PORT;
// used mongo cloud to get this to work
mongoose.connect(process.env.MONGOKEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connected to database successfully');
});

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
