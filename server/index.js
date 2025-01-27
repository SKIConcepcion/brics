const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const roomsRouter = require("./routes/roomsRouter");
const reservationsRouter = require("./routes/reservationsRouter");
const authRouter = require('./routes/authRouter');
const scheduleRouter = require('./routes/scheduleRouter');
const userRouter = require('./routes/userRouter');
const connectDb = require('./config/brics-db');
const cors = require('cors');
const passport = require ('passport');
const sessionMiddleware = require('./config/session-config');
const app = express();
const rootRouter = express.Router()

/* Import from file controller */
const {
  uploadFile,
  uploadMultipleFiles,
  deleteFileByUrl,
  deleteFiles
} = require('./controllers/fileController');

/* Import from utility controller */
const { sendOtp, sendAccountRejection } = require('./controllers/utilityController');


// Set up the middlewares
app.use(logger("dev"));
app.use(express.json({limit: '25mb'}));         // 25 mb to accommodate the file upload sizes
app.use(express.urlencoded({limit: '25mb'}));
app.use(cookieParser());
app.use(bodyParser.json()); // Using bodyParser middleware to parse req body as JSON

app.use(cors({
  origin: '*', // Allow requests from all origins, this should be the url of the client when deployed
  credentials: true // Allow credentials (cookies) to be sent with requests
}));


app.use(sessionMiddleware); // Use the session middleware (session config.js)

app.use (passport.initialize ());
app.use (passport.session ());


app.get('/', (req,res) => res.json({message:"Root"}));

// Set up routes
app.use("/api/rooms", roomsRouter); // To access the rooms API, start with localhost:3001/api/rooms (more examples within rooms.js )
app.use("/api/reservations", reservationsRouter); // To access the reservations API, start with localhost:3001/api/reservations (more examples within reservations.js )

app.use("/api/sign-in", authRouter)
app.use("/api/users", userRouter);

app.use("/api/schedule", scheduleRouter);

/* Route to upload a file or an image */
app.post("/api/upload", (req, res) => {
  uploadFile(req.body.file)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

/* Route to upload multiple files or images */  
app.post("/api/upload-multiple", (req, res) => {
  uploadMultipleFiles(req.body.files)
    .then((urls) => res.send(urls))
    .catch((err) => res.status(500).send(err));
});

/* Route to create and send otp */
app.post('/api/send-otp', sendOtp);
app.post('/api/send-account-rejection', sendAccountRejection);

app.post('/api/delete-file', (req, res) => {
  deleteFileByUrl(req.body.file)
    .then((success) => res.send(success))
    .catch((err) => res.status(500).send(err));
});


app.post("/api/delete-multiple-files", (req, res) => {
  deleteFiles(req.body.files)
    .then((successes) => res.send(successes))
    .catch((err) => res.status(500).send(err));
});

connectDb()
  .then(() => {
    console.log('Successfully connected to the database');
    app.listen(process.env.PORT, () =>
      console.log(`Server started listening at port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log("Connection Error: ", err);
  });


