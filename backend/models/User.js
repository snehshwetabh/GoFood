const mongoose=require('mongoose')
const {Schema} =mongoose;

const UserSchema =new Schema({   //creating our own schema UserSchema
    name:{
    type: String,
    required:true      //filling all the required dtetails
},
location:{
    type: String,
    required:true
},
email:{
    type: String,
    required:true
},
password:{
    type: String,
    required:true
},
date:{
 type :Date,
default:Date.now
}

})
module.exports =mongoose.model('user',UserSchema) //model used to craete collection 'user' in database