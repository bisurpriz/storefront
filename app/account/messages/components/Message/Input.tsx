import Button from "@/components/Button";
import { IoSend } from "react-icons/io5";

const Input = ({
  onMessageSend,
  value,
  onChange,
}: {
  onMessageSend: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div className="write bg-white shadow-2xl shadow-zinc-400 flex rounded-lg absolute bottom-0 right-0 left-0 ml-4 mr-4">
      <div className="flex-1">
        <textarea
          name="message"
          className="w-full block outline-none py-4 px-4 bg-transparent"
          rows={1}
          placeholder={"Mesajınızı yazın..."}
          value={value}
          onChange={onChange}
        ></textarea>
      </div>
      <div className="flex content-center items-center">
        <Button
          onClick={onMessageSend}
          type="button"
          size="small"
          rounded
          className="w-auto rounded-full"
          icon={<IoSend />}
          iconSize={24}
        />
      </div>
    </div>
  );
};

export default Input;
