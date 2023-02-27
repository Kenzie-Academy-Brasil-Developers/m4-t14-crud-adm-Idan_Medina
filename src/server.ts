import app from "./app";
import { connectDatabase } from "./database";
import "dotenv/config";

const PORT: number = Number(process.env.DB_PORT) || 3000;

app.listen(3000, async () => {
  await connectDatabase();
  console.log(`Server is running on port '${PORT}'`);
});
