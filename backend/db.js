const mongoose=require('mongoose');
require('dotenv').config();
const mongoURL=process.env.mongoUrl;

const mongoDB=async()=>{
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoURL,{useNewUrlParser:true},async(err,result)=>{
        if(err)console.log("---",err)
        else{
            console.log("connected");
            const fetched_data=await mongoose.connection.db.collection("food_items"); //ye data fetch krne ke liye hoga data dalne ke liye nai
            fetched_data.find({}).toArray(async function(err,data){    //agar connected hogya h toh uske baad food_items ka data sb dikhao array me convert krke
                const foodCategory=await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function(err,catData){
                    if(err) console.log(err);     
                else {
                    global.food_items=data;  //globally isko dikha skte hai 
                    global.foodCategory=catData;

                }
                
                   
            })

        })
    
        }});
}
module.exports =mongoDB;