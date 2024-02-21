const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();

app.use(express.json());

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "Input value is wrong",
    });
    return;
  }
  //put it in mongodb ans async await is there so that i get the data before going on next line of todo created
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });

  res.json({
    msg: "Todo Created",
  });
});
app.get("/todos", async (req, res) => {
  // get data from the mongodb
  const todos = await todo.find({});

  res.json({
    todos,
  });
});
app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "Input value is wrong",
    });
    return;
  }
  //whichever is having the below id update this as true
  await todo.update(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  res.json({
    msg: "Todo marked as completed",
  });
});
app.listen(3000);
