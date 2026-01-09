import { Line } from "@/src/components/common/Line";
import { memo, useState } from "react";
import RatingDropdown from "./RatingDropdown";
import { TabItem } from "@/src/types";
import { createFeedback } from "../apis/createFeedback";

const ratingOptions: TabItem[] = [
  {
    value: 5,
    label: "Đánh giá 5 sao",
  },
  {
    value: 4,
    label: "Đánh giá 4 sao",
  },
  {
    value: 3,
    label: "Đánh giá 3 sao",
  },
  {
    value: 2,
    label: "Đánh giá 2 sao",
  },
  {
    value: 1,
    label: "Đánh giá 1 sao",
  },
];

const FeedbackModal = ({
  orderItemId,
  isOpen,
  onClose,
}: {
  orderItemId: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [rating, setRating] = useState<TabItem>(ratingOptions[0]);
  const [comment, setComment] = useState<string>("");

  const handlePublishReview = async () => {
    if (rating.value === null) return;

    await createFeedback({ orderItemId: orderItemId, rating: Number(rating.value), comment });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center">
      <div className="absolute w-full h-full bg-black/50" />

      <div className="rounded-sm bg-white m-auto w-[500px] z-50 shadow-lg">
        <div className="px-6 py-4">
          <span className="text-label-3 text-black uppercase font-bold">Đánh giá sản phẩm</span>
        </div>
        <Line />

        <div className="p-6">
          <h3 className="text-body-small-500 mb-2 font-semibold">Mức độ hài lòng</h3>

          <RatingDropdown value={ratingOptions[0]} options={ratingOptions} onChange={setRating} />

          <h3 className="text-body-small-500 mt-4 mb-2 font-semibold">Nội dung phản hồi</h3>

          <textarea
            className="w-full border border-gray-100 rounded p-2 focus:outline-none focus:border-orange-500 transition-all"
            rows={4}
            placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm và dịch vụ của chúng tôi..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            className="w-[204px] mt-6 flex justify-center items-center bg-orange-500 h-12 gap-3 rounded-sm hover:bg-orange-600 transition-colors"
            onClick={handlePublishReview}
          >
            <span className="text-sm font-bold text-white uppercase">Gửi đánh giá</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(FeedbackModal);
