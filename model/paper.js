

const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const paperSchema=new Schema({
    title:{type:String,
    required:true},
    desc:{type:String,
        required:true},
        link:{type:String,
            required:true}
},{timestamps:true});

const Paper=mongoose.model('Paper',paperSchema);
module.exports=Paper;
