"use client";
import { useRouter } from "next/navigation";
import { FC, FormEvent } from "react";
import { Button } from "../form/Bouton";
import { Input } from "../form/Input";

type PropositionFormProps = {
  boardId: number;
};

const PropositionForm: FC<PropositionFormProps> = ({ boardId }) => {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title"));

    fetch(`/api/boards/${boardId}/propositions`, {
      method: "POST",
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((data) => console.log({ data }));

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <Input label="Title" name="title" />
      <Button type="submit">Create Proposition</Button>
    </form>
  );
};

export default PropositionForm;
