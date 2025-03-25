import express from "express";
import cors from "cors";
import routes from "./routes.js";

const app = express();
app.use(express.urlencoded({extended: true}))//libera qualquer URL e passar parametro
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3000, ()=>{
    console.log('Running now!!')
})

