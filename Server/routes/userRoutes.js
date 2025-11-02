router.get("/users", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT id, name, email FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
