import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import session from 'express-session';
import cors from 'cors';
import connectDb from './config/db.js';
import userRoute from './routes/users.js';
import postRoute from './routes/posts.js';
import authRoute from './routes/auth.js';
// import postRoute from"./routes/posts"
// import router = express.Router(
// import path from"path"

// connect to db
connectDb();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Sever running on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});

// app.use("/images", express.static(path.join(__dirname, "public/images")));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });
