import { PropsWithChildren } from "react";
import { prisma } from "~/src/db/prisma";
import { notFound } from "next/navigation";

interface LayoutBoardsProps {
  params: {
    boardId: string;
  };
}

export default async function LayoutBoards({
  params,
  children,
}: PropsWithChildren<LayoutBoardsProps>) {
  const boardId = Number(params.boardId);

  if (isNaN(boardId)) {
    return notFound();
  }

  const board = await prisma.board.findUniqueOrThrow({
    where: { id: boardId },
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold">{board.title}</h1>
      {children}
    </div>
  );
}
