const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const PORT = 5000;
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.get("/api/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

app.post("/api/todos", async (req, res) => {
  const { title, color } = req.body;
  if(!title){
    return res.json({error: 'Todo title required'})
  }
  const newTodo = await prisma.todo.create({
    data: { title, color },
  });
  res.json(newTodo);
});

app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  if (id === undefined || completed === undefined) {
    return res.status(400).json({ error: 'ID and completed status are required' })
  }
  const changedTodo = await prisma.todo.update({
    where: { id: parseInt(id) },
    data: { completed },
  });
  res.json(changedTodo);
});

app.delete("/api/todos", async (req, res) => {
  const { id } = req.body;
  if (id === undefined) {
    return res.status(400).json({ error: "ID is required" });
  }
  await prisma.todo.delete({
    where: { id: parseInt(id) },
  });
  res.json("Item deleted");
});

app.listen(PORT, () => {
  console.log(`Express server running... http://localhost:${PORT}`);
});
