import { Board } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "~/src/db/prisma";

type Data = {
  board: Board;
};

const BodySchema = z.object({
  title: z.string().min(1).max(255),
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const body = BodySchema.parse(JSON.parse(req.body));

  const board = await prisma.board.create({
    data: {
      title: body.title,
    },
  });

  res.status(201).json({ board });
};

export default handler;
