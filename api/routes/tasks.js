const TaskDes = require("../models/TaskDes");

const router = require("express").Router();

// create task
router.post("/", async (req, res) => {
  const newTask = new TaskDes({
    email: req.body.email,
    text: req.body.text,
  });
  try {
    const savedTask = await newTask.save();
    res.status(200).json("Task saved successfully");
  } catch (err) {
    res.status(500).json("Error while creating a post");
  }
});

// delete task
router.delete("/", async (req, res) => {
  try {
    if (req.body.taskId) {
      const task = await TaskDes.findByIdAndDelete(req.body.taskId);
      res.status(200).json("Task has been deleetd");
    } else {
      res.status(403).json("In else block of delete");
    }
  } catch (err) {
    res.status(500).json("Error while deleting a task");
  }
});

// Update the task using PUT
router.put("/", async (req, res) => {
  try {
    const task = await TaskDes.findById(req.body.taskId);
    const taskObj = {
        "email": task.email,
        "text": req.body.text,
    }

    const updatedTask = await TaskDes.findByIdAndUpdate(
      req.body.taskId,
      taskObj
    );

    if (!updatedTask) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update the task using PATCH
router.patch("/", async (req, res) => {
  try {
    const task = await TaskDes.findById(req.body.taskId);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    
    task["text"] = req.body["text"];

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await TaskDes.find({ email: req.body.email });
    console.log("Successfully Fetched.............");
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json("Error while fetching timeline posts." + req.body.email);
  }
});

module.exports = router;
