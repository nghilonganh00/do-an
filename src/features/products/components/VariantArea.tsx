import { memo, useCallback, useState } from "react";
import Image from "next/image";
import VariantForm, { VariantFormData } from "./VariantForm";
import { getImageSrc } from "@/src/utils/getImageSrc";

const VariantArea = ({
  variants,
  onDelete,
  onSubmit,
}: {
  variants: VariantFormData[];
  onDelete: (index: number) => void;
  onSubmit: (editingIndex: number | null, variant: VariantFormData) => void; //Add and Edit
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handlePressEdit = useCallback((index: number) => {
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleDelete = useCallback(
    (index: number) => {
      onDelete(index);
      setEditingIndex(null);
      if (editingIndex === index) setEditingIndex(null);
    },
    [editingIndex, onDelete]
  );

  const handleSubmit = useCallback(
    (variant: VariantFormData) => {
      onSubmit(editingIndex, variant);
      console.log("editingIndex: ", editingIndex, variant);

      if (editingIndex !== null) {
        setEditingIndex(null);
      }
    },
    [onSubmit, editingIndex]
  );

  return (
    <div className="bg-white rounded-xl shadow-sm  mt-8 overflow-hidden">
      <div className="p-6 flex items-center justify-between border-b border-gray-100">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Phiên bản sản phẩm</h3>
          <p className="text-sm text-gray-500 mt-1">Quản lý các biến thể như màu sắc, kích thước...</p>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-6 mb-8">
          <div
            className={`p-4 border rounded-lg animate-fade-in transition-colors ${editingIndex !== null ? "border-orange-100 bg-orange-50/30" : "border-blue-100 bg-blue-50/50"}`}
          >
            <div className="flex justify-between items-center mb-3">
              {editingIndex !== null ? (
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wide flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                  Chế độ chỉnh sửa
                </span>
              ) : (
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Mới</span>
              )}
            </div>

            <VariantForm
              onSubmitVariant={handleSubmit}
              editingVariant={editingIndex !== null ? variants[editingIndex] : null}
              onCancelEdit={() => setEditingIndex(null)}
            />
          </div>
        </div>
        <>
          {variants.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên phiên bản
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá bán
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá gốc
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tồn kho
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {variants.map((v, i) => (
                    <tr
                      key={i}
                      className={`transition-colors ${editingIndex === i ? "bg-orange-50" : "hover:bg-gray-50"}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {v.thumbnail && (
                            <Image
                              src={getImageSrc(v?.thumbnail || "")}
                              className="w-8 h-8 rounded border object-cover"
                              width={32}
                              height={32}
                              alt=""
                            />
                          )}
                          <div className="font-medium text-gray-900">{v.variantName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">${v.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${v.originalPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${Number(v.stock) > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {v.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {/* Nút Sửa */}
                        <button
                          onClick={() => handlePressEdit(i)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          disabled={editingIndex === i} // Disable nếu đang sửa chính dòng này
                        >
                          {editingIndex === i ? "Đang sửa" : "Sửa"}
                        </button>

                        <button onClick={() => handleDelete(i)} className="text-red-600 hover:text-red-900">
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">Chưa có phiên bản nào được thêm.</p>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default memo(VariantArea);
