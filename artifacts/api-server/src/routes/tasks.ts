import { Router } from "express";
import { z } from "zod";
import { Task } from "../models/task";
import { requireAuth } from "../middlewares/auth";

const router = Router();

const AddTaskBody = z.object({
  title: z.string().min(1, "Title is required"),
});

router.get("/tasks", requireAuth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user!.id }).sort({ createdAt: -1 });
    const result = tasks.map((t) => ({
      id: t._id.toString(),
      title: t.title,
      createdAt: t.createdAt.toISOString(),
    }));
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to get tasks");
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
});

router.post("/tasks", requireAuth, async (req, res) => {
  try {
    const parsed = AddTaskBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Title is required" });
      return;
    }
    const task = await Task.create({ title: parsed.data.title, userId: req.user!.id });
    res.status(201).json({
      id: task._id.toString(),
      title: task.title,
      createdAt: task.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to add task");
    res.status(500).json({ error: "Failed to add task" });
  }
});

router.delete("/tasks/:id", requireAuth, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params["id"], userId: req.user!.id });
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete task");
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
