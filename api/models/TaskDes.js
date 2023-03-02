const mongoose = require("mongoose");



const TaskDesSchema = new mongoose.Schema(
    {
    email: {
        type: String
    },
    text: {
        type: String
    }
    },
    {timestamps:true}
);




const TaskDes = mongoose.model("TaskDesc", TaskDesSchema);
module.exports = TaskDes;