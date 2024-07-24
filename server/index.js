import express from "express";
import userRouter from './routes/user.routes.js';
import blogRouter from './routes/blogs.routes.js';
import cors from 'cors';
import fetchBlogsRouter  from './routes/fetchblogs.routes.js'
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use (express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/blogs", blogRouter)
app.use("/blogs", fetchBlogsRouter)

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
