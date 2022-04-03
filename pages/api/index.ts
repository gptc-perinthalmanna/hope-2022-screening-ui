import { NextApiRequest, NextApiResponse } from "next";

export default async function api(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    message: "Hello World",
  });
}
