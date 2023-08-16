const express =require ('express');
const port =8000;
const app =express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.json('backend connected')
}).listen(port,()=>{console.log("connected");})