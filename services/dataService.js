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
      return {
        status: 'true',
        statusCode: '200',
        // message: 'Login Success',
        message: `Welcome ${user.name}`,
        currentUser:currentUser
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

module.exports={
            register,
            login
}      