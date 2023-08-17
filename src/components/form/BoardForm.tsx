"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Button } from "./Bouton";
import { Input } from "./Input";

const BoardForm = () => {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title"));

    fetch("/api/boards", {
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
      <Button type="submit">Create Board</Button>
    </form>
  );
};

export default BoardForm;
