import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "~/src/db/prisma";

const BodySchema = z.object({
  title: z.string().min(1).max(255),
});

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  const body = BodySchema.parse(req);

  const board = await prisma.board.create({
    data: {
      title: body.title,
    },
  });

  return NextResponse.json(board, {status: 201})
};
