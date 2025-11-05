import express from "express";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    res.json({ message: `User details for ID: ${userId}` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
