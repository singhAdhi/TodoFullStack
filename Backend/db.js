const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://adhirajsingh7303:8DBepJspCw0UXJjH@cluster0.m7wute1.mongodb.net/?retryWrites=true&w=majority"
);
const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo,
};
