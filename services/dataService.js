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
      currentAcno=user.acno
      return {
        status: 'true',
        statusCode: '200',
        // message: 'Login Success',
        message: `Welcome ${user.name}`,
        currentUser:currentUser,
        currentAcno:currentAcno
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
const addNews=(title,description,acno)=>{
  // var title=parseInt(Ftitle)
  // var description=parseInt(Fdescription)
  return db.user.findOne({acno})
  .then(user=>{
    if(user){
        user.clipnews.push({
          title:title,
          description:description
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
    
const deleteclip=(clipnews)=>{
    return db.user.clipnews.deleteOne({clipnews}).then(
      (result)=>{
          if(result){
            // return this.db.user.find().then(
              return db.user.find().then(
                  (result)=>{
                      if(result){
                          return{
                              status:true,
                              statusCode:200,
                              clipnews:result,
                              message:'Newsclip removed successfully'
                          }
                      }
                      else{
                          return{
                              status:false,
                              statusCode:404,
                              message:'News not found'
                          }
                      }
                  }
              )
          
          }
          else{
              return{
                  status:false,
                  statusCode:404,
                  message:'Your clipboard is empty'
              }
          }
      }
  )
}

const deleteallclip=()=>{
  return db.user.deleteOne({_clipnews}).then(
    (result)=>{
        if(result){
            return this.db.user.find().then(
                (result)=>{
                    if(result){
                        return{
                            status:true,
                            statusCode:200,
                            wishlist:result,
                            message:'Newsclip removed successfully'
                        }
                    }
                    else{
                        return{
                            status:false,
                            statusCode:404,
                            message:'News not found'
                        }
                    }
                }
            )
        
        }
        else{
            return{
                status:false,
                statusCode:404,
                message:'Your clipboard is empty'
            }
        }
    }
)

}

module.exports={
            register,
            login,
            addNews,
            getClips,
            deleteclip,
            deleteallclip
}      