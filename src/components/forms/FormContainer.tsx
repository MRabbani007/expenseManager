import { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";
import { Button } from "../ui/button";
import { BiX } from "react-icons/bi";

type Props = {
  children: ReactNode;
  title: string;
  onSubmit: () => void;
  closeForm: Dispatch<SetStateAction<boolean>>;
};

export default function FormContainer({
  children,
  title,
  onSubmit,
  closeForm,
}: Props) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  const handleReset = () => {
    closeForm(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-zinc-600/50">
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="bg-zinc-200 w-full max-w-[1024px]"
      >
        <div className="bg-zinc-100 text-center flex items-center">
          <p className="flex-1">{title}</p>
          <Button type="reset" variant="ghost">
            <BiX size={20} />
          </Button>
        </div>
        <div className="p-4 space-y-4">{children}</div>
        <div className="p-4 flex items-center justify-center gap-4">
          <Button type="submit">Save</Button>
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
