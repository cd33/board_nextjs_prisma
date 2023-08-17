import { prisma } from "~/src/db/prisma";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

type Data = {
  params: {
    propositionId: string;
  };
};

const QuerySchema = z.object({
  propositionId: z.string().transform((id) => Number(id)),
});

export const POST = async (request: NextRequest, { params }: Data) => {
  const query = QuerySchema.parse(params);

  const vote = await prisma.vote.create({
    data: {
      propositionId: query.propositionId,
      ip: String(Math.random()),
    },
  });

  return NextResponse.json(vote, {status: 201})
};
