import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/src/db/prisma";
import { z } from "zod";
import { Vote } from "@prisma/client";
import requestIp from 'request-ip'

type Data = {
  vote: Vote;
};

const QuerySchema = z.object({
  propositionId: z.string().transform((id) => Number(id)),
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const detectedIp = requestIp.getClientIp(req)
  console.log('detectedIp :>> ', detectedIp);
  const query = QuerySchema.parse(req.query);

  const vote = await prisma.vote.create({
    data: {
      propositionId: query.propositionId,
      ip: detectedIp || String(Math.random()),
    },
  });

  return res.status(201).json({ vote });
};
export default handler;
