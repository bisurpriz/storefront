import { Avatar } from "@/components/ui/avatar";
import { getImageUrlFromPath } from "@/lib/utils";
import { localeFormat } from "@/utils/format";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Suspense } from "react";
import ReviewRating from "../../../../components/ReviewRating/ReviewRating";

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
    <div className="flex flex-col w-full gap-4 px-4 py-8 rounded-lg bg-slate-100">
      <div className="w-full h-7 animate-pulse bg-slate-200" />
      <ul className="animate-pulse bg-slate-200">
        <li className="flex items-start justify-start w-full p-4 max-sm:flex-col max-sm:gap-2 max-sm:pb-0">
          <div className="flex min-w-[200px] max-w-[200px] items-center justify-start gap-2">
            <div className="w-10 h-10 rounded-full animate-pulse bg-slate-300" />
            <div className="flex flex-col gap-2 max-sm:p-2">
              <div className="w-20 h-4 rounded-lg animate-pulse bg-slate-300" />
              <div className="w-20 h-5 rounded-lg animate-pulse bg-slate-300" />
              <div className="self-center w-20 h-4 font-normal rounded-lg animate-pulse bg-slate-300" />
            </div>
          </div>
          <div className="w-full h-8 rounded-lg bg-slate-300 max-sm:mb-4" />
        </li>
      </ul>
    </div>
  );
};

const ProductComments = ({ comments }: ProductCommentsProps) => {
  return (
    <Suspense fallback={<ProductCommentSkeleton />}>
      <div className="w-full px-4 py-8 mt-4 font-sans rounded-lg">
        <h2 className="mb-2 text-lg font-medium text-slate-700">Yorumlar</h2>
        {comments?.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {comments?.map(
              (comment, index) =>
                comment.comment && (
                  <li
                    key={comment.comment_id}
                    className="flex justify-start w-full pb-4 border-b border-slate-100 max-sm:flex-col max-sm:gap-2 sm:items-start"
                    aria-labelledby={`comment-${index}`}
                    aria-describedby={`comment-${index}`}
                    id={`comment-${index}`}
                    aria-label={`comment-${index}`}
                  >
                    <div className="flex min-w-[200px] max-w-[200px] items-center justify-start gap-2">
                      <Avatar>
                        <AvatarImage
                          alt={`${comment.firstName} ${comment.lastName}`}
                          src={getImageUrlFromPath(comment.user_image_url)}
                          key={comment.comment_id}
                        />
                      </Avatar>
                      <div className="p-4 max-sm:p-2">
                        <p
                          className="text-sm font-medium text-slate-500"
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
                        <span className="self-center text-xs font-normal whitespace-nowrap text-slate-500">
                          {localeFormat(
                            new Date(comment.createdAt),
                            "d MMMM y",
                          )}
                        </span>
                      </div>
                    </div>
                    {comment.comment && (
                      <div className="bg-purple-200 rounded-lg h-fit w-fit font-manrope">
                        <p
                          className="p-4 text-sm whitespace-pre-wrap text-slate-700"
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
                ),
            )}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full">
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
