import { VercelRequest, VercelResponse } from "@vercel/node";

export default (req: VercelRequest, res: VercelResponse) => {
  return res.json({ message: "Refer to /api/docs for full documentation of the API and how to use it." });
};