import { Line } from "@/src/components/common/Line";
import { memo } from "react";
import RatingDropdown from "./RatingDropdown";
import { TabItem } from "@/src/types";

const ratingOptions: TabItem[] = [
  {
    value: 5,
    label: "5 Start Rating",
  },
  {
    value: 4,
    label: "4 Start Rating",
  },
  {
    value: 3,
    label: "3 Start Rating",
  },
  {
    value: 2,
    label: "2 Start Rating",
  },
  {
    value: 1,
    label: "1 Start Rating",
  },
];

const FeedbackModal = ({
  isOpen,
  onPublishReview,
}: {
  isOpen: boolean;
  onPublishReview: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center">
      <div className="absolute w-full h-full bg-black/50" />

      <div className="rounded-sm bg-white m-auto w-[500px] z-50">
        <div className="px-6 py-4">
          <span className="text-label-3 text-black uppercase">Feedback</span>
        </div>
        <Line />

        <div className="p-6">
          <h3 className="text-body-small-500 mb-2">Rating</h3>

          <RatingDropdown
            value={ratingOptions[0]}
            options={ratingOptions}
            onChange={onPublishReview}
          />

          <h3 className="text-body-small-500 mt-4 mb-2">Feedback</h3>

          <textarea
            className="w-full border border-gray-100 rounded p-2"
            rows={4}
            placeholder="Write down your feedback about our product & services"
          />

          <button className="w-[204px] mt-6 flex justify-center items-center bg-primary-500  h-full gap-3 rounded-sm">
            <span className="text-heading-3 text-gray uppercase">
              Publish Review
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(FeedbackModal);
