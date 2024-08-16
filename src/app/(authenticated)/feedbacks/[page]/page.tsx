import FeedbackCard from "@/components/ui/feedback-card";
import { getAllFeedbacksAction } from "@/server/actions/get-all-feedbacks";
import { redirect } from "next/navigation";
import { movesDict, subMoveDict } from "@/common/moves";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getNextPage, getPrevPage } from "@/common/getPage";

const Page = async ({ params, searchParams: { search } }) => {
  try {
    const feedbacks = (
      await getAllFeedbacksAction({ page: params.page[0], search })
    )?.data;

    return (
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Feedbacks
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
              feedback description here
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 md:p-8 space-y-6">
            <p className="text-muted-foreground">
              This section provides a high-level summary of the introduction,
              including the key points and overall strategy. As a premium user,
              you have access to this exclusive content.
            </p>
          </div>
          <div className="flex flex-col w-full gap-6">
            {feedbacks.data.map((f) => (
              <FeedbackCard
                introductionId={f.introductionId}
                sentenceId={f.sentenceId}
                sentenceText={f.sentenceText}
                predictedMove={movesDict[f.move]}
                correctMove={movesDict[f.feedback.correctMove]}
                username={f.feedback.username}
                image={f.feedback.image}
                reason={f.feedback.reason}
                userHandle={f.feedback.username}
                correctSubMove={
                  subMoveDict[f.feedback.correctMove][f.feedback.correctSubMove]
                }
                predictedSubMove={subMoveDict[f.move][f.subMove]}
              />
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`/feedbacks/${getPrevPage({ page: feedbacks.page })}`}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href={`/feedbacks/${getNextPage({ page: feedbacks.page, total_pages: feedbacks.total_pages })}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export default Page;
