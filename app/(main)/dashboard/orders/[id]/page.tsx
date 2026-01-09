"use client";

import { useGetOrderById } from "@/src/features/order/hooks/userGetOrderById";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import dayjs from "dayjs";
import { formatPriceVN } from "@/src/utils/formatPriceVN";
import FeedbackModal from "@/src/features/feedback/components/FeedbackModal";
import { Package, Truck, CheckCircle, Clock, CreditCard, XCircle } from "lucide-react";
import { ORDER_STATUS, ORDER_STATUS_LIST, PAYMENT_STATUS } from "@/src/constants";
import { useGetOrderInfo } from "@/src/features/order/hooks/useGetOrderInfo";
import { useMemo, useState } from "react";
import { useGetAllProvinces } from "@/src/features/address/hooks/useGetAllProvinces";
import { useGetAllDistrictsByProvince } from "@/src/features/address/hooks/useGetAllDistrictsByProvince";
import { useGetAllWardsByDistrict } from "@/src/features/address/hooks/useGetAllWardsByDistrict";
import cancelOrder from "@/src/features/order/apis/cancelOrder";

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const [orderItemId, setOrderItemId] = useState<number>();
  const { data: order, isLoading } = useGetOrderById(id!);

  const currentStatus = order?.status
    ? ORDER_STATUS_LIST[order.status as ORDER_STATUS]
    : { name: "Không xác định", color: "#9CA3AF" };

  const { data: orderInfo } = useGetOrderInfo(order?.code ?? "");
  const { data: provinces } = useGetAllProvinces();
  const { data: districts } = useGetAllDistrictsByProvince(order?.shipment?.provinceId || 0);
  const { data: wards } = useGetAllWardsByDistrict(order?.shipment?.districtId || 0);

  const province = useMemo(
    () => provinces?.find((p) => p.ProvinceID === order?.shipment?.provinceId),
    [order, provinces]
  );
  const district = useMemo(
    () => districts?.find((d) => d.DistrictID === order?.shipment?.districtId),
    [order, districts]
  );
  const ward = useMemo(() => wards?.find((w) => w.WardCode === order?.shipment?.wardCode), [order, wards]);

  const isPendingPayment = order?.payment?.status === PAYMENT_STATUS.PENDING;
  const isPacking = !isPendingPayment && order?.status === ORDER_STATUS.READY_TO_PICK;
  const isDelivered = !isPendingPayment && order?.status === ORDER_STATUS.DELIVERED;
  const isCancelled = !isPendingPayment && order?.status === ORDER_STATUS.CANCEL;
  const isShipping = !isPendingPayment && !isPacking && !isDelivered && !isCancelled;

  const canCancel = isPendingPayment || isPacking;

  const handleCancelOrder = () => {
    if (confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
      console.log("Hủy đơn hàng:", id);
      cancelOrder({ orderCode: order?.code || "" });
    }
  };

  const handleOpenFeedbackModal = (orderItemId: number) => {
    setIsOpen(true);
    setOrderItemId(orderItemId);
  };

  if (isLoading) return <div className="p-10 text-center">Đang tải dữ liệu đơn hàng...</div>;

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="p-6 bg-orange-50 flex items-center justify-between rounded-t-lg border-b border-orange-100">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-gray-800">Mã đơn: #{order?.code || id}</span>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold uppercase"
              style={{ backgroundColor: `${currentStatus.color}20`, color: currentStatus.color }}
            >
              {isPendingPayment ? "Chờ thanh toán" : currentStatus.name}
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            <span>{order?.orderItems?.length || 0} Sản phẩm</span>
            <span className="mx-2">•</span>
            <span>Đặt lúc: {dayjs(order?.created_at).add(7, "hour").format("DD/MM/YYYY [vào lúc] HH:mm")}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <div className="text-sm text-gray-400">Tổng thanh toán</div>
            <span className="text-2xl font-bold text-orange-600">{formatPriceVN(order?.totalAmount || 0)}</span>
          </div>

          <div className="flex gap-3">
            {canCancel && !isCancelled && (
              <button
                onClick={handleCancelOrder}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 transition-all"
              >
                <XCircle size={16} />
                Hủy đơn
              </button>
            )}

            {isPendingPayment && (
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-orange-600 transition-all flex items-center gap-2"
                onClick={() => redirect(order?.payment?.url || "")}
              >
                <CreditCard size={16} />
                Thanh toán ngay
              </button>
            )}
          </div>
        </div>
      </div>

      {!isCancelled ? (
        <div className="mt-8 px-6">
          <div className="relative flex items-center justify-between w-full max-w-4xl mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>

            {[
              { label: "Chờ thanh toán", icon: Clock, active: isPendingPayment },
              { label: "Đóng gói", icon: Package, active: isPacking },
              { label: "Vận chuyển", icon: Truck, active: isShipping },
              { label: "Đã giao", icon: CheckCircle, active: isDelivered },
            ].map((step, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center group">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    step.active
                      ? "bg-orange-500 border-orange-500 text-white shadow-lg scale-110"
                      : "bg-white border-gray-200 text-gray-300"
                  }`}
                >
                  <step.icon size={20} />
                </div>
                <span
                  className={`text-xs font-medium mt-2 ${step.active ? "text-orange-600 font-bold" : "text-gray-400"}`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium">
            <XCircle size={20} />
            Đơn hàng này đã bị hủy
          </div>
        </div>
      )}

      <div className="px-6 py-5 mt-10 w-full border border-gray-100 rounded-lg shadow-sm">
        <h4 className="text-lg font-bold text-gray-800 mb-4 text-left">
          Danh sách sản phẩm ({order?.orderItems?.length || 0})
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Sản phẩm</th>
                <th className="px-4 py-3 text-center font-semibold">Đơn giá</th>
                <th className="px-4 py-3 text-center font-semibold">Số lượng</th>
                <th className="px-4 py-3 text-right font-semibold">Thành tiền</th>
                <th className="px-4 py-3 text-right font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {order?.orderItems?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 flex items-center gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item?.productVariant?.thumbnail || "/placeholder-img.png"}
                        alt={item?.productVariant?.product?.name || "Product"}
                        fill
                        className="object-cover rounded-md border border-gray-100"
                      />
                    </div>
                    <span className="font-medium text-gray-700 max-w-[250px] line-clamp-2 text-left">
                      {item?.productVariant?.product?.name || "Sản phẩm không tên"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-gray-600">
                    {formatPriceVN(item?.productVariant?.price || 0)}
                  </td>
                  <td className="px-4 py-4 text-center font-medium text-gray-800">x{item?.quantity || 0}</td>
                  <td className="px-4 py-4 text-right font-semibold text-gray-900">
                    {formatPriceVN((item?.quantity || 0) * (item?.productVariant?.price || 0))}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => handleOpenFeedbackModal(item?.id || 0)}
                      className="text-xs px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-100 hover:text-orange-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!isDelivered}
                    >
                      Gửi đánh giá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6 pt-6 border-t border-gray-100">
          <div className="space-y-2 text-right">
            <div className="text-gray-500">
              Giảm giá: <span className="text-gray-900">-{formatPriceVN(order?.discount || 0)}</span>
            </div>
            <div className="text-lg font-bold">
              Thành tiền: <span className="text-orange-600">{formatPriceVN(order?.totalAmount || 0)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-8 rounded-lg overflow-hidden border border-gray-100">
        <div className="p-8 bg-gray-50/30 text-left">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Địa chỉ giao hàng</h3>
          <div className="space-y-3">
            <div className="font-bold text-gray-700 text-base">{order?.shipment?.fullName || "Người nhận"}</div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {order?.shipment?.address +
                ", " +
                ward?.WardName +
                ", " +
                district?.DistrictName +
                ", " +
                province?.ProvinceName}
            </p>
            <div className="text-sm pt-2">
              <span className="text-gray-400">Số điện thoại:</span>{" "}
              <span className="text-gray-700 font-medium">{order?.shipment?.phone || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 bg-white rounded-xl border border-gray-100 shadow-sm text-left">
        <h3 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-2">Lịch sử trạng thái</h3>

        <div className="relative pl-8 border-l-2 border-gray-100 ml-2 space-y-8">
          {orderInfo?.log
            ?.slice()
            .reverse()
            .map((log, index) => {
              const statusConfig = ORDER_STATUS_LIST[log.status as ORDER_STATUS] || {
                name: log.status,
                color: "#9CA3AF",
              };

              return (
                <div key={index} className="relative">
                  <div
                    className="absolute -left-[41px] mt-1.5 w-5 h-5 rounded-full border-4 border-white shadow-sm transition-colors"
                    style={{ backgroundColor: statusConfig.color }}
                  ></div>

                  <div className="flex flex-col">
                    <span className="text-sm font-bold uppercase tracking-tight" style={{ color: statusConfig.color }}>
                      {statusConfig.name}
                    </span>
                    <span className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Clock size={12} />
                      {dayjs(log.updated_date).add(7, "hour").format("DD/MM/YYYY [lúc] HH:mm")}
                    </span>
                  </div>
                </div>
              );
            })}

          {(!orderInfo?.log || orderInfo.log.length === 0) && (
            <p className="text-gray-400 italic text-sm">Chưa có dữ liệu hành trình đơn hàng.</p>
          )}
        </div>
      </div>

      <FeedbackModal isOpen={isOpen} onClose={() => setIsOpen(false)} orderItemId={orderItemId || 0} />
    </div>
  );
}
