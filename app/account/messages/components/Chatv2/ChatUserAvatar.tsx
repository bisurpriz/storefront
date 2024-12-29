import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrlFromPath } from "@/lib/utils";
import { User } from "./types";

export function ChatUserAvatar({ user }: { user: User }) {
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage src={getImageUrlFromPath(user.picture)} alt={user.name} />
      <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
