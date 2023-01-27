const db=require('./db')

const register=(name,acno,password)=>{
      return db.user.findOne({acno})
      .then(user=>{
        if(user){
          return {
            status: 'false',
            statusCode: '400',
            message: 'User already registered'
          }
        }
        else{
            const newUser=new db.user({
              name:name,
              acno:acno,
              password:password,
              propic:[],
              newsclip:[]
            })
            newUser.save();     // save data in MongoDB
            return {
              status: 'true',
              statusCode: '200',
              message: 'Register Success'
            }
          }
        })}

const login = (acno,password)=>{
  return db.user.findOne({acno,password})
  .then(user=>{
    if(user){
      currentUser=user.name
      currentAcno=user.acno
      clipcount=user.clipnews.length
      return {
        status: 'true',
        statusCode: '200',
        // message: 'Login Success',
        message: `Welcome ${user.name}`,
        currentUser:currentUser,
        currentAcno:currentAcno,
        clipcount:clipcount
      }
    }
    else{
      return{
        status:false,
        statusCode:400,
        message:'Invalid userdetails'
      }
    }
})
}        

// addnews
const addNews=(title,description,image,acno)=>{
  // var title=parseInt(Ftitle)
  // var description=parseInt(Fdescription)
  return db.user.findOne({acno})
  .then(user=>{
    if(user){
        user.clipnews.push({
          title:title,
          description:description,
          image:image
        })     
      user.save()     // save data in MongoDB
      return {
        status: 'true',
        statusCode: '200',
        message: 'News Clipped Successfully'
      }
    }
    else{
        return {
        status: 'false',
        statusCode: '404',
        message: 'User Not Found'
      }
      }
    })}

    const getClips=(acno)=>{
      return db.user.findOne({acno}).then(
        (user)=>{
            if(user){
              console.log(acno);
                return{
                    status:true,
                    statusCode:200,
                    clipnews: user.clipnews
                }
            }
            else{
                return{
                    status:false,
                    statusCode:400,
                    message:'User not Found'
                }
            }
        }
    )
    }
    
const deleteclip=(id,acno)=>{
  var del=1
  return db.user.findOne({acno})
  .then(user=>{
    if(user){
        user.clipnews.splice(id,1) 
        // user.clipnews[id].push(null)   
      user.save()     // save data in MongoDB
      return {
        status: 'true',
        statusCode: '200',
        message: 'News Clip deleted Successfully'
      }
    }
    else{
        return {
        status: 'false',
        statusCode: '404',
        message: 'User Not Found'
      }
      }
    })}


const deleteallclip=(id,acno)=>{
  return db.user.findOne({acno})
  .then(user=>{
    if(user){
        user.clipnews.splice({
          id
        }) 
      user.save()     
      return {
        status: 'true',
        statusCode: '200',
        message: 'News Clip Cleared Successfully'
      }
    }
    else{
        return {
        status: 'false',
        statusCode: '404',
        message: 'User Not Found'
      }
      }
    })}

    const addpro=(dp,acno)=>{
      return db.user.findOne({acno})
      .then(user=>{
        if(user){
          user.propic.push({
            dp})
          console.log(user.propic);
          user.save()     
          return {
            status: 'true',
            statusCode: '200',
            message: 'Profile Picture added Successfully'
          }
        }
        else{
            return {
            status: 'false',
            statusCode: '404',
            message: 'User Not Found'
          }
          }
        })}
    

module.exports={
            register,
            login,
            addNews,
            getClips,
            deleteclip,
            deleteallclip,
            addpro
}      