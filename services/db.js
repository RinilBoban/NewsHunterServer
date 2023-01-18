const mongoose=require('mongoose')

mongoose.connect('mongodb://0.0.0.0:27017/news',()=>{
    console.log('Connected to MongoDB');
});

const user=mongoose.model('user',{
    name:String,
    acno:Number,
    password:String,
    clipnews:[]
})
module.exports={
    user
}