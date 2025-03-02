import {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";
import { Button } from "../ui/button";
import { BiX } from "react-icons/bi";

type Props = {
  children: ReactNode;
  title: string;
  onSubmit: (event: FormEvent) => void | Promise<void>;
  closeForm: Dispatch<SetStateAction<boolean>>;
  deleteButton?: boolean;
  onDelete?: () => void;
};

export default function FormContainer({
  children,
  title,
  onSubmit,
  closeForm,
  deleteButton,
  onDelete,
}: Props) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(event);
  };

  const handleReset = () => {
    closeForm(false);
  };

  useEffect(() => {
    const handleEscape = (ev: globalThis.KeyboardEvent) => {
      if (ev.key === "Escape") {
        closeForm(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-zinc-900/70">
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="bg-zinc-200 w-full max-w-[1024px] rounded-lg overflow-clip m-4"
      >
        {/* Form Header */}
        <div className="bg-stone-900 text-white text-center flex items-center py-2 px-4">
          <p className="flex-1 text-sm font-medium">{title}</p>
          <button type="reset">
            <BiX size={20} />
          </button>
        </div>
        {/* Form Content */}
        <div className="max-h-[70vh] min-h-[30vh] h-full overflow-y-auto">
          <div className="flex flex-col justify-start items-stretch gap-4 p-4">
            {children}
          </div>
        </div>
        {/* Form Buttons */}
        <div className="p-4 flex items-center justify-center gap-4">
          <Button type="submit">Save</Button>
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
          {deleteButton === true && (
            <Button type="button" variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
