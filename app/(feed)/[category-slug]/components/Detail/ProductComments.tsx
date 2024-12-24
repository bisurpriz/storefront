import Avatar from "@/components/Avatar";
import { localeFormat } from "@/utils/format";
import { Suspense } from "react";
import ReviewRating from "../../../../../components/ReviewRating/ReviewRating";

type Comment = {
  comment_id: number;
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
    <div className="flex w-full flex-col gap-4 rounded-lg bg-slate-100 px-4 py-8">
      <div className="h-7 w-full animate-pulse bg-slate-200" />
      <ul className="animate-pulse bg-slate-200">
        <li className="flex w-full items-start justify-start p-4 max-sm:flex-col max-sm:gap-2 max-sm:pb-0">
          <div className="flex min-w-[200px] max-w-[200px] items-center justify-start gap-2">
            <div className="h-10 w-10 animate-pulse rounded-full bg-slate-300" />
            <div className="flex flex-col gap-2 max-sm:p-2">
              <div className="h-4 w-20 animate-pulse rounded-lg bg-slate-300" />
              <div className="h-5 w-20 animate-pulse rounded-lg bg-slate-300" />
              <div className="h-4 w-20 animate-pulse self-center rounded-lg bg-slate-300 font-normal" />
            </div>
          </div>
          <div className="h-8 w-full rounded-lg bg-slate-300 max-sm:mb-4" />
        </li>
      </ul>
    </div>
  );
};

const ProductComments = ({ comments }: ProductCommentsProps) => {
  return (
    <Suspense fallback={<ProductCommentSkeleton />}>
      <div className="mt-4 w-full rounded-lg px-4 py-8 font-sans">
        <h2 className="mb-2 font-mono text-lg font-medium text-slate-700">
          Yorumlar
        </h2>
        {comments.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {comments?.map((comment, index) => (
              <li
                key={comment.comment_id}
                className="flex w-full justify-start border-b border-slate-100 pb-4 max-sm:flex-col max-sm:gap-2 sm:items-start"
                aria-labelledby={`comment-${index}`}
                aria-describedby={`comment-${index}`}
                id={`comment-${index}`}
                aria-label={`comment-${index}`}
              >
                <div className="flex min-w-[200px] max-w-[200px] items-center justify-start gap-2">
                  <Avatar
                    alt={`${comment.firstName} ${comment.lastName}`}
                    imageUrl={comment.user_image_url}
                    key={comment.comment_id}
                    size="small"
                  />
                  <div className="p-4 max-sm:p-2">
                    <p
                      className="font-mono text-sm font-medium text-slate-500"
                      aria-label={`comment-${index}-name`}
                      id={`comment-${index}-name`}
                      aria-describedby={`comment-${index}-name`}
                      key={`comment-${index}-name`}
                    >
                      {comment.firstName} {comment.lastName}
                    </p>
                    <ReviewRating
                      value={comment.rate}
                      readOnly
                      showReviewCount={false}
                    />
                    <span className="self-center whitespace-nowrap text-xs font-normal text-slate-500">
                      {localeFormat(new Date(comment.createdAt), "d MMMM y")}
                    </span>
                  </div>
                </div>
                {comment.comment && (
                  <div className="h-fit w-fit rounded-lg bg-purple-200 font-manrope">
                    <p
                      className="whitespace-pre-wrap p-4 text-sm text-slate-700"
                      aria-label={`comment-${index}-comment`}
                      id={`comment-${index}-comment`}
                      aria-describedby={`comment-${index}-comment`}
                      key={`comment-${index}-comment`}
                    >
                      {comment.comment}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="font-sans text-lg text-slate-500">
              Henüz yorum yapılmamış.
            </p>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default ProductComments;
