const mongoose=require('mongoose');
mongoose.connect(`mongodb://127.0.0.1:27017/mini_project`);
const Schema=mongoose.Schema({
 username:String,
 email: { type: String, unique: true },
 password:String,
})
module.exports=mongoose.model("user",Schema);
