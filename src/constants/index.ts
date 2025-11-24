export enum DISCOUNT_TYPE {
  PERCENT = "percent",
  FIXED = "fixed",
}

export enum ORDER_STATUS {
  PENDING = "pending",
  PROCESSING = "processing",
  CONFIRMED = "confirmed",
  PACKAGING = "packaging",
  SHIPPED = "shipped",
  IN_TRANSIT = "in_transit",
  DELIVERED = "delivered",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
}

export enum PAYMENT_STATUS {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  REFUNDED = "refunded",
  CANCELLED = "cancelled",
}
