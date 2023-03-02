const TaskDes = require("../models/TaskDes");

const router = require("express").Router();


// create task
router.post("/", async (req,res)=>{
    const newTask = new TaskDes({
        email : req.body.email,
        text : req.body.text,
    });
    try{
        const savedTask = await newTask.save();
        res.status(200).json("Task saved successfully");
    }catch(err){
        res.status(500).json("Error while creating a post");
    }
});


// delete task
router.delete("/:taskId", async (req,res)=>{
    try{
        if(req.body.taskId === req.params.taskId){
            const task =  await TaskDes.findByIdAndDelete(req.params.taskId);
            res.status(200).json("Task has been deleetd");
        }else{
            res.status(403).json("In else block of delete");
        }
    }catch(err){
        res.status(500).json("Error while deleting a task");
    }
});


//get all tasks

router.get("/", async (req, res) => {
    try{
        // const user = await User.findOne({username:req.params.username})
        const tasks = await TaskDes.find({'email': req.body.email});
        console.log("Successfully Fetched.............");
        res.status(200).json(tasks);

    }catch(err){
        console.log(err);
        res.status(500).json("Error while fetching timeline posts." + req.body.email)
    }
});


module.exports = router





