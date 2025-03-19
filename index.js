import express from "express";
import morgan from 'morgan'

import { favoriteRouter } from "./routes/favorites";
import { userRouter } from "./routes/users";
import { resourceRouter } from "./routes/resources";

const PORT = process.env.PORT || 4000;
const app = express();

//! view engine 
app.set('views', "./views") //setting up views
app.set("view engine", "pug") 



//! middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));



app.get('/', (req, res) => {
    res.render("index")
})

//API ROUTES because of pug 
app.use('/api/favorites', favoriteRouter)

app.use('/api/users', userRouter)

app.use('/api/resources', resourceRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})