import { notFound } from "next/navigation";
import PropositionForm from "~/src/components/proposition/PropositionForm";
import { Proposition } from "~/src/components/proposition/PropositionLine";
import { prisma } from "~/src/db/prisma";

interface BoardPageProps {
  params: {
    boardId: string;
  };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const boardId = Number(params.boardId);

  if (isNaN(boardId)) {
    return notFound();
  }

  const propositions = await prisma.proposition.findMany({
    where: { boardId },
    orderBy: {
      vote: {
        _count: "desc",
      },
    },
    select: {
      title: true,
      id: true,
      _count: {
        select: {
          vote: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <PropositionForm boardId={boardId} />
      <ul className="flex flex-col gap-4">
        {propositions.map((proposition) => (
          <Proposition
            key={proposition.id}
            voteCount={proposition._count.vote}
            boardId={boardId}
            {...proposition}
          />
        ))}
      </ul>
    </div>
  );
}
