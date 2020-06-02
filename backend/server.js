const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const app = express();

const userroutes = require("./routes/User.routes")

const dbUrl = 'mongodb+srv://dileep:dileep@blogfeed-smartcow-1jqqp.mongodb.net/test?retryWrites=true&w=majority'
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000','https://smart-cow-blog-feed.herokuapp.com/'
    ],
    credentials: true
  })
);
app.use(cookieParser());

app.use('/user',userroutes);

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
});

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

app.listen(PORT, () => { 
	console.log(`Server is up and running on port ${PORT}!`);
});
