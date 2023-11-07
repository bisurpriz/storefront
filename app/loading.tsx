import Image from "next/image";
import gif from "@/public/loading.gif";

export default function Loading() {
  return (
    <div className="absolute left-0 top-0 inset-0 flex items-center justify-center z-50 w-full h-full bg-white overflow-hidden">
      <Image src={gif} alt="bisurpriz" width={50} height={50} />
    </div>
  );
}
