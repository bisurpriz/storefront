import { Button } from "@/components/ui/button";
import Send from "@/components/Icons/Send";
import TextField from "@/components/TextField";

const Input = ({
  onMessageSend,
  value,
  onChange,
}: {
  onMessageSend: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="write absolute bottom-0 left-0 right-0 ml-4 mr-4 flex rounded-lg bg-white shadow-2xl shadow-zinc-400">
      <div className="flex-1">
        <TextField
          value={value}
          onChange={(e, value) => onChange(e)}
          placeholder="Mesajınızı yazın..."
          onKeyDown={(event) => {
            if (event.key === "Enter" && !!value) {
              onMessageSend();
            }
          }}
        />
      </div>
      <div className="flex content-center items-center">
        <Button
          disabled={!value}
          onClick={onMessageSend}
          type="button"
          size="sm"
          className="w-auto rounded-full"
          icon={<Send className="h-6 w-6 rounded-full" />}
        />
      </div>
    </div>
  );
};

export default Input;
