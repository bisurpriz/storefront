import Avatar from "@/components/Avatar";
import React from "react";
import Rating from "./Rating";
import { localeFormat } from "@/utils/format";

type Comment = {
  comment_id: number;
  email: string;
  comment: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  user_id: number;
  rate: number;
  user_image_url: string;
};

type ProductCommentsProps = {
  comments: Comment[];
};

const ProductCommentSkeleton = () => {
  return (
    <div className="w-full rounded-lg px-4 py-8 bg-slate-100 flex flex-col gap-4">
      <div className="h-7 w-full bg-slate-200 animate-pulse" />
      <ul className="bg-slate-200 animate-pulse">
        <li className="flex items-start justify-start p-4 max-sm:flex-col max-sm:pb-0 max-sm:gap-2 w-full">
          <div className="flex gap-2 items-center justify-start max-w-[200px] min-w-[200px]">
            <div className="h-10 w-10 rounded-full bg-slate-300 animate-pulse" />
            <div className="flex flex-col gap-2 max-sm:p-2">
              <div className=" bg-slate-300 h-4 w-20  animate-pulse rounded-lg" />
              <div className="h-5 w-20 bg-slate-300 animate-pulse rounded-lg" />
              <div className="font-normal bg-slate-300 self-center h-4 w-20 animate-pulse rounded-lg" />
            </div>
          </div>
          <div className="bg-slate-300 h-8 w-full rounded-lg max-sm:mb-4" />
        </li>
      </ul>
    </div>
  );
};

const ProductComments = ({ comments }: ProductCommentsProps) => {
  return comments && comments.length > 0 ? (
    <div className="mt-4 w-full rounded-lg px-4 py-8 font-sans">
      <h2 className="text-lg font-medium font-mono mb-2 text-slate-700">
        Yorumlar
      </h2>
      <ul className="flex flex-col gap-2">
        {comments?.map((comment, index) => (
          <li
            key={comment.comment_id}
            className="flex items-start justify-start border-b border-slate-100 pb-4 max-sm:flex-col max-sm:pb-0 max-sm:gap-2 w-full"
          >
            <div className="flex gap-2 items-center justify-start max-w-[200px] min-w-[200px]">
              <Avatar
                alt={`${comment.firstName} ${comment.lastName}`}
                imageUrl={comment.user_image_url}
                key={comment.comment_id}
                size="small"
              />
              <div className="p-4 max-sm:p-2">
                <p className="text-sm font-medium font-mono text-slate-500">
                  {comment.firstName} {comment.lastName}
                </p>
                <Rating
                  value={comment.rate}
                  className="max-w-[80px] min-w-[80px] self-center"
                  readOnly
                  showReviewCount={false}
                />
                <span className="text-xs font-normal text-slate-500 whitespace-nowrap self-center">
                  {localeFormat(new Date(comment.createdAt), "d MMMM Y")}
                </span>
              </div>
            </div>
            <div className="rounded-lg bg-4 ml-4 max-sm:ml-0 mb-2">
              <p className="text-sm font-normal text-slate-600 whitespace-pre-wrap font-sans p-4">
                {comment.comment}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <ProductCommentSkeleton />
  );
};

export default ProductComments;
