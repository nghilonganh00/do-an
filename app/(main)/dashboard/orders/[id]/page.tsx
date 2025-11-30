"use client";
import { X } from "@/src/components/icons/X";
import { useGetOrderById } from "@/src/features/order/hooks/userGetOrderById";
import Image from "next/image";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { formatPriceVN } from "@/src/utils/formatPriceVN";

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: order } = useGetOrderById(id!);

  return (
    <div className="">
      <div className="p-6 bg-warning-50 flex items-center justify-between">
        <div>
          <span className="text-body-xl-400">#96459761</span>
          <div className="text-body-small-400 text-gray-400">
            <span>{order?.orderItems?.length || 0} Products</span>
            <span> • </span>
            <span>
              Order Placed in{" "}
              {dayjs(order?.createdAt).format("DD MMM, YYYY [at] hh:mm A")}
            </span>
          </div>
        </div>

        <span className="text-heading-2 text-secondary-500">
          {formatPriceVN(order?.totalAmount || 0)}
        </span>
      </div>
      <div className="px-6 py-5 w-full border border-gray-100">
        <h4 className="text-body-large-500">
          Product ({order?.orderItems?.length || 0})
        </h4>

        <table className="w-full border border-gray-200 rounded-md overflow-hidden mt-5">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-center">Price</th>
              <th className="px-4 py-2 text-center">Quantity</th>
              <th className="px-4 py-2 text-right">Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {order?.orderItems?.map((item) => {
              return (
                <tr key={item.id} className="border-t border-gray-200">
                  <td className="px-4 py-2 flex items-center gap-3">
                    <Image
                      src={item?.productVariant?.thumbnail || ""}
                      alt="Smart tv"
                      width={72}
                      height={72}
                      style={{ borderRadius: "8px" }}
                    />
                    <span>{item?.productVariant?.product?.name || ""}</span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {formatPriceVN(item?.productVariant?.price || 0)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span>{item?.quantity || 0}</span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatPriceVN(
                      (item?.quantity || 0) * (item?.productVariant?.price || 0)
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="text-body-large-500 mt-6">
          Discount: {formatPriceVN(order?.discount || 0)}
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex-1 px-6 py-8 border border-gray-100">
          <h3 className="text-body-large-500">Billing Address</h3>
          <div className="mt-6">
            <span className="text-body-small-500">Kevin Gilbert</span>
            <p className="text-body-small-400 text-gray-600">
              East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C,
              Flat No. 5D, Dhaka - 1200, Bangladesh
            </p>
            <div>
              Phone Number:<span> +1-202-555-0118</span>
            </div>
            <div>
              Email:<span> kevin.gilbert@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="flex-1 px-6 py-8 border border-gray-100">
          <h3 className="text-body-large-500">Address</h3>
          <div className="mt-6">
            <span className="text-body-small-500">
              {order?.shipment?.fullName || ""}
            </span>
            <p className="text-body-small-400 text-gray-600">
              {order?.shipment?.address || ""}
            </p>
            <div>
              Phone Number:<span> {order?.shipment?.phone || ""}</span>
            </div>
            <div>
              Email:<span> {order?.shipment?.email || ""}</span>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}
