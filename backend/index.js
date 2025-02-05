const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");
PORT=5000;



const menuRoutes=require("./Route/menuRoute")
const menuitemRoutes=require("./Route/menuItemRoute")

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:"*"}));




app.use('/api/menus',menuRoutes)
app.use('/api/menuitem',menuitemRoutes)


app.use(notFound)
app.use(errorHandler)

mongoose.connect("mongodb+srv://farsukoothradan:farsu123@cluster0.2vbfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
).catch((err)=>{
    console.log(err);
})