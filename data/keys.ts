import dotenv from "dotenv";

dotenv.config();

export const credentials = {
  username: process.env.DEVCMS_USERNAME ?? "",
  password: process.env.DEVCMS_PASSWORD ?? "",
};
