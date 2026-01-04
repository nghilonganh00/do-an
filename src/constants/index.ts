export enum DISCOUNT_TYPE {
  PERCENT = "percent",
  FIXED = "fixed",
}

export enum ORDER_STATUS {
  READY_TO_PICK = "ready_to_pick",
  PICKING = "picking",
  MONEY_COLLECT_PICKING = "money_collect_picking",
  PICKED = "picked",

  STORING = "storing",
  TRANSPORTING = "transporting",
  SORTING = "sorting",

  DELIVERING = "delivering",
  MONEY_COLLECT_DELIVERING = "money_collect_delivering",
  DELIVERY_FAIL = "delivery_fail",
  DELIVERED = "delivered",

  WAITING_TO_RETURN = "waiting_to_return",
  RETURN_TO_PICK = "return_to_pick",
  RETURN_TRANSPORTING = "return_transporting",
  RETURN_SORTING = "return_sorting",
  RETURNING = "returning",
  RETURN_FAIL = "return_fail",
  RETURNED = "returned",

  CANCEL = "cancel",
  EXCEPTION = "exception",
  DAMAGE = "damage",
  LOST = "lost",
}

export enum PAYMENT_STATUS {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  REFUNDED = "refunded",
  CANCELLED = "cancelled",
}

export const ORDER_STATUS_LIST: Record<ORDER_STATUS, { name: string; color: string }> = {
  [ORDER_STATUS.READY_TO_PICK]: {
    name: "Đang chuẩn bị",
    color: "#64748B",
  },
  [ORDER_STATUS.PICKING]: {
    name: "Đang lấy hàng",
    color: "#3B82F6",
  },
  [ORDER_STATUS.MONEY_COLLECT_PICKING]: {
    name: "Thu tiền khi lấy hàng",
    color: "#0284C7",
  },
  [ORDER_STATUS.PICKED]: {
    name: "Đã lấy hàng",
    color: "#06B6D4",
  },

  [ORDER_STATUS.STORING]: {
    name: "Đang lưu kho",
    color: "#6366F1",
  },
  [ORDER_STATUS.SORTING]: {
    name: "Đang phân loại",
    color: "#A855F7",
  },
  [ORDER_STATUS.TRANSPORTING]: {
    name: "Đang vận chuyển",
    color: "#8B5CF6",
  },

  [ORDER_STATUS.DELIVERING]: {
    name: "Đang giao hàng",
    color: "#0EA5E9",
  },
  [ORDER_STATUS.MONEY_COLLECT_DELIVERING]: {
    name: "Thu tiền khi giao hàng",
    color: "#F59E0B",
  },
  [ORDER_STATUS.DELIVERED]: {
    name: "Đã giao hàng",
    color: "#22C55E",
  },
  [ORDER_STATUS.DELIVERY_FAIL]: {
    name: "Giao hàng thất bại",
    color: "#EF4444",
  },

  [ORDER_STATUS.WAITING_TO_RETURN]: {
    name: "Chờ hoàn hàng",
    color: "#F97316",
  },
  [ORDER_STATUS.RETURN_TO_PICK]: {
    name: "Hoàn về lấy hàng",
    color: "#EA580C",
  },
  [ORDER_STATUS.RETURN_SORTING]: {
    name: "Phân loại hàng hoàn",
    color: "#D946EF",
  },
  [ORDER_STATUS.RETURN_TRANSPORTING]: {
    name: "Đang hoàn hàng",
    color: "#E11D48",
  },
  [ORDER_STATUS.RETURNING]: {
    name: "Đang trả hàng",
    color: "#BE123C",
  },
  [ORDER_STATUS.RETURN_FAIL]: {
    name: "Hoàn hàng thất bại",
    color: "#991B1B",
  },
  [ORDER_STATUS.RETURNED]: {
    name: "Đã hoàn hàng",
    color: "#475569",
  },

  [ORDER_STATUS.CANCEL]: {
    name: "Đã huỷ",
    color: "#9CA3AF",
  },
  [ORDER_STATUS.EXCEPTION]: {
    name: "Đơn bất thường",
    color: "#DC2626",
  },
  [ORDER_STATUS.DAMAGE]: {
    name: "Hàng bị hư hỏng",
    color: "#B91C1C",
  },
  [ORDER_STATUS.LOST]: {
    name: "Thất lạc",
    color: "#000000",
  },
};

export const PAYMENT_STATUS_LIST: Record<PAYMENT_STATUS, { name: string; color: string }> = {
  [PAYMENT_STATUS.PENDING]: {
    name: "Chờ thanh toán",
    color: "#FBBF24",
  },
  [PAYMENT_STATUS.PAID]: {
    name: "Đã thanh toán",
    color: "#22C55E",
  },
  [PAYMENT_STATUS.FAILED]: {
    name: "Thanh toán thất bại",
    color: "#EF4444",
  },
  [PAYMENT_STATUS.CANCELLED]: {
    name: "Huỷ",
    color: "#9CA3AF",
  },
  [PAYMENT_STATUS.REFUNDED]: {
    name: "Hoàn trả",
    color: "#3B82F6",
  },
};
