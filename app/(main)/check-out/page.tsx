"use client";

import { ArrowRight } from "@/src/components/icons/ArrowRight";
import { Check } from "@/src/components/icons/Check";
import { Stack } from "@/src/components/icons/Stack";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Coupon } from "@/src/types/coupon";
import { ShoppingCartItem } from "@/src/types/shoppingCart";
import { useGetMe } from "@/src/features/user/hooks/useGetMe";
import { useCreateOrder } from "@/src/features/order/hooks/useCreateOrder";
import Image from "next/image";
import { formatPriceVN } from "@/src/utils/formatPriceVN";
import { useGetAllProvinces } from "@/src/features/address/hooks/useGetAllProvinces";
import { useGetAllDistrictsByProvince } from "@/src/features/address/hooks/useGetAllDistrictsByProvince";
import { useGetAllWardsByDistrict } from "@/src/features/address/hooks/useGetAllWardsByDistrict";
import Dropdown, { DropdownItem } from "@/src/components/common/input/Dropdown";
import { useCaculateFee } from "@/src/features/shipment/hooks/useCaculateFee";
import { Shipment } from "@/src/types/order";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: user } = useGetMe();

  const [isPlacedOrder, setPlacedOrder] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const [billing, setBilling] = useState<{
    name: string;
    address: string;
    email: string;
    phone: string;
    provinceId: number | null;
    districtId: number | null;
    wardCode: string | null;
  }>({
    name: "",
    address: "",
    email: "",
    phone: "",
    provinceId: null,
    districtId: null,
    wardCode: null,
  });

  const [order, setOrder] = useState<{
    items: ShoppingCartItem[];
    coupon: Coupon | null;
    subTotal: number;
    discount: number;
    shipping: number;
    total: number;
  } | null>(null);

  const { data: provinces } = useGetAllProvinces();
  const { data: districts } = useGetAllDistrictsByProvince(billing?.provinceId ?? null);
  const { data: wards } = useGetAllWardsByDistrict(billing?.districtId ?? null);

  const provinceOptions = useMemo(
    () => provinces?.map((p) => ({ label: p.ProvinceName, value: p.ProvinceID.toString() })) ?? [],
    [provinces]
  );
  const districtOptions = useMemo(
    () => districts?.map((d) => ({ label: d.DistrictName, value: d.DistrictID.toString() })) ?? [],
    [districts]
  );
  const wardOptions = useMemo(
    () => wards?.map((w) => ({ label: w.WardName, value: w.WardCode.toString() })) ?? [],
    [wards]
  );

  const provinceValue = provinceOptions.find((option) => option.value === billing.provinceId?.toString());
  const districtValue = districtOptions.find((option) => option.value === billing.districtId?.toString());
  const wardValue = wardOptions.find((option) => option.value === billing.wardCode?.toString());

  const { data: createOrderData, mutateAsync: createOrder, error: createOrderError } = useCreateOrder();
  const { data: shipmentFee } = useCaculateFee({
    wardCode: billing.wardCode!,
    districtId: billing.districtId!,
  } as Shipment);

  const handlePlaceOrder = async () => {
    if (isSubmitting || !order || !billing?.provinceId || !billing?.districtId) return;
    setSubmitting(true);
    try {
      const response = await createOrder({
        items: order.items,
        name: billing.name,
        address: billing.address,
        email: billing.email,
        phone: billing.phone,
        couponCode: order.coupon?.code ?? "",
        discount: order.discount,
        total: order.total,
        provinceId: billing.provinceId,
        districtId: billing.districtId,
        wardCode: billing.wardCode,
      });

      console.log("response: ", response);

      window.location.href = response.payURL;

      // setPlacedOrder(true);
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order: ", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const storedOrder = localStorage.getItem("order");
    if (storedOrder) setOrder(JSON.parse(storedOrder));
  }, []);

  useEffect(() => {
    if (user) {
      setBilling((prev) => ({
        ...prev,
        name: user.name || "",
        address: user.address || "",
        email: user.email || "",
        phone: user.phone || "",
        provinceId: user.provinceId || null,
        districtId: user.districtId || null,
        wardCode: user.wardCode || null,
      }));
    }
  }, [user]);

  if (!order) {
    return <div className="text-center mt-40">Không tìm thấy đơn hàng. Vui lòng thêm sản phẩm vào giỏ trước.</div>;
  }

  return (
    <>
      {!isPlacedOrder ? (
        <div className="max-w-[1320px] mx-auto py-[72px] grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <h3 className="text-body-large-500">Thông tin đặt hàng</h3>
            <div className="grid grid-cols-12 gap-4 mt-6">
              <div className="col-span-6 flex flex-col justify-end">
                <label>Họ và tên</label>
                <input
                  value={billing.name}
                  onChange={(e) => setBilling({ ...billing, name: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="px-4 py-3 border border-gray-100 mt-1.5"
                />
              </div>

              <div className="col-span-12 flex flex-col justify-end">
                <label>Địa chỉ</label>
                <input
                  value={billing.address}
                  onChange={(e) => setBilling({ ...billing, address: e.target.value })}
                  className="px-4 py-3 border border-gray-100 mt-1.5"
                />
              </div>

              <div className="col-span-3 flex flex-col justify-end">
                <label>Tỉnh / Thành phố</label>
                <Dropdown
                  options={provinceOptions.slice(4).reverse()}
                  value={provinceValue}
                  onChange={(province: DropdownItem) => {
                    setBilling((prev) => ({ ...prev, provinceId: parseInt(province.value) }));
                  }}
                />
              </div>

              <div className="col-span-3 flex flex-col justify-end">
                <label>Quận / Huyện</label>
                <Dropdown
                  options={districtOptions}
                  value={districtValue}
                  onChange={(district: DropdownItem) => {
                    setBilling((prev) => ({ ...prev, districtId: parseInt(district.value) }));
                  }}
                />
              </div>

              <div className="col-span-3 flex flex-col justify-end">
                <label>Xã / Phường / Thị trấn</label>
                <Dropdown
                  options={wardOptions}
                  value={wardValue}
                  onChange={(ward: DropdownItem) => {
                    setBilling((prev) => ({ ...prev, wardCode: ward.value }));
                  }}
                />
              </div>

              <div className="col-span-6 flex flex-col justify-end">
                <label>Email</label>
                <input
                  value={billing.email}
                  onChange={(e) => setBilling({ ...billing, email: e.target.value })}
                  className="px-4 py-3 border border-gray-100 mt-1.5"
                />
              </div>

              <div className="col-span-6 flex flex-col justify-end">
                <label>Số điện thoại</label>
                <input
                  value={billing.phone}
                  onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
                  placeholder="Số điện thoại"
                  className="px-4 py-3 border border-gray-100 mt-1.5"
                />
              </div>
            </div>
          </div>

          <div className="col-span-4 px-6 py-5 rounded-sm border border-gray-100">
            <h3 className="text-body-large-500">Tóm tắt đơn hàng</h3>

            <div className="mt-5 space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-6">
                  <Image
                    src={item.variant?.thumbnail || ""}
                    alt={item.variant?.product?.name || ""}
                    width={64}
                    height={64}
                  />
                  <div>
                    <h4 className="text-body-small-400">{item?.variant?.product?.name}</h4>

                    <div className="mt-2">
                      <span className="text-body-small-400 text-gray-600">{item.quantity} x</span>
                      <span className="text-body-small-600 text-secondary-500 ml-1">
                        {formatPriceVN(item.variant?.price || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-body-small-400 text-gray-600">Tạm tính</span>
                <span className="text-body-small-500">{formatPriceVN(Number(order.subTotal.toFixed(2)))}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-body-small-400 text-gray-600">Phí vận chuyển</span>
                <span className="text-body-small-500">{formatPriceVN(shipmentFee?.total ?? 0)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-body-small-400 text-gray-600">Giảm giá</span>
                <span className="text-body-small-500">-{formatPriceVN(Number(order.discount.toFixed(2)))}</span>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-body-medium-400 text-gray-900">Tổng cộng</span>
                <span className="text-body-small-600">
                  {formatPriceVN(Number((order.total + (shipmentFee?.total || 0)).toFixed(2)))}
                </span>
              </div>

              <button
                className="w-full h-14 flex items-center justify-center gap-2 mt-6 bg-primary-500 rounded-xs"
                onClick={handlePlaceOrder}
              >
                <span className="text-heading-7 text-gray uppercase">Đặt hàng</span>
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[1320px] mx-auto h-full">
          <div className="max-w-[424px] mt-40 mx-auto flex flex-col items-center">
            <div className="w-[66px] h-[66px] flex items-center justify-center border-4 border-success-500 rounded-full">
              <Check size={30} color="#2DB224" />
            </div>

            <span className="text-heading-3 leading-0">Đơn hàng của bạn đã được đặt thành công</span>

            <span className="text-body-small-400 text-[#5F6C72] text-center mt-2">
              Cảm ơn bạn đã mua hàng! Đơn hàng đang được xử lý, vui lòng chờ trong giây lát.
            </span>

            <div className="w-full flex items-center justify-between gap-3">
              <button
                className="w-full h-12 flex-1 flex items-center justify-center gap-2 mt-6 border-2 border-primary-100 rounded-xs"
                onClick={() => router.push("/")}
              >
                <Stack color="#FA8232" />
                <span className="text-heading-7 text-primary-500">Về trang chủ</span>
              </button>

              <button
                className="w-full h-12 flex-1 flex items-center justify-center gap-2 mt-6 bg-primary-500 rounded-xs"
                onClick={() => router.push(`/dashboard/orders/${createOrderData?.id}`)}
              >
                <span className="text-heading-7 text-gray">Xem đơn hàng</span>
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
