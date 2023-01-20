const express=require('express')

const cors = require('cors')

const dataService=require('./services/dataService')

const app=express()

app.use(express.json())

app.listen(3000,()=>{
    console.log('listening on port 3000');
})

app.use(cors({
    origin:['http://localhost:4200']
}))

app.post('/register',(req,res)=>{
    console.log(req.body);
    dataService.register(req.body.username,req.body.acno,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})

app.post('/login',(req,res)=>{
    dataService.login(req.body.acno,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/addNews',(req,res)=>{
    console.log(req.body);
    dataService.addNews(req.body.title,req.body.description,req.body.account)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/getClips',(req,res)=>{
    dataService.getClips(req.body.account)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.delete('/deleteclip',(req,res)=>{
    console.log(req.params.id)
    dataService.deleteclip(req.params.id).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})

app.delete('/deleteallclip',(req,res)=>{
    dataService.deleteallclip().then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})