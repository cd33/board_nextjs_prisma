import { z } from "zod";
import { prisma } from "~/src/db/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Data = {
  params: {
    boardId: string;
  };
};

const QuerySchema = z.object({
  boardId: z.string().transform((id) => Number(id)),
});

const BodySchema = z.object({
  title: z.string().min(1).max(255),
});

export const POST = async (request: NextRequest, { params }: Data) => {
  const req = await request.json();

  const query = QuerySchema.parse(params);
  const body = BodySchema.parse(req);

  const proposition = await prisma.proposition.create({
    data: {
      title: body.title,
      boardId: query.boardId,
      ip: String(Math.random()),
    },
  });

  return NextResponse.json(proposition, { status: 201 });
};
