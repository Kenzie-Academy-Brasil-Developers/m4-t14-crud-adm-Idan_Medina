import client from "./config";
import "dotenv/config";

const DB: string | undefined = process.env.DB;

const connectDatabase = async (): Promise<void> => {
    await client.connect();
    console.log(`Database ${DB} connected`)
}

export default connectDatabase
