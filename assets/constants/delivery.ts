export enum DELIVERY_STATUS_AGGREGATED {
  ORDER_CREATED = 0, // Yellow
  PICKUP_PENDING = 30, // Yellow
  PICKUP_TO_WAREHOUSE = 50, // Green
  AT_WAREHOUSE = 100, // Green
  ON_DELIVERY = 145, // Green
  FAILED = 180, // Red
  DELIVERED = 200, // Blue
  ON_RETURN = 445, // Red
  RETURNED = 500, // Red
  MISSING = 800, // Red
  DROPPED = 1000, // Red
}

export const ALL_DELIVERY_STATUS_AGGREGATED = [
  DELIVERY_STATUS_AGGREGATED.ORDER_CREATED,
  DELIVERY_STATUS_AGGREGATED.PICKUP_PENDING,
  DELIVERY_STATUS_AGGREGATED.PICKUP_TO_WAREHOUSE,
  DELIVERY_STATUS_AGGREGATED.AT_WAREHOUSE,
  DELIVERY_STATUS_AGGREGATED.ON_DELIVERY,
  DELIVERY_STATUS_AGGREGATED.FAILED,
  DELIVERY_STATUS_AGGREGATED.DELIVERED,
  DELIVERY_STATUS_AGGREGATED.ON_RETURN,
  DELIVERY_STATUS_AGGREGATED.RETURNED,
  DELIVERY_STATUS_AGGREGATED.MISSING,
  DELIVERY_STATUS_AGGREGATED.DROPPED,
];

export const ALL_DELIVERY_STATUS_AGGREGATED_STRINGS = {
  [DELIVERY_STATUS_AGGREGATED.ORDER_CREATED]: 'Order Created',
  [DELIVERY_STATUS_AGGREGATED.PICKUP_PENDING]: 'Pickup Pending',
  [DELIVERY_STATUS_AGGREGATED.PICKUP_TO_WAREHOUSE]: 'Pickup to Warehouse',
  [DELIVERY_STATUS_AGGREGATED.AT_WAREHOUSE]: 'At Warehouse',
  [DELIVERY_STATUS_AGGREGATED.ON_DELIVERY]: 'On Delivery',
  [DELIVERY_STATUS_AGGREGATED.FAILED]: 'Failed',
  [DELIVERY_STATUS_AGGREGATED.DELIVERED]: 'Delivered',
  [DELIVERY_STATUS_AGGREGATED.ON_RETURN]: 'On Return',
  [DELIVERY_STATUS_AGGREGATED.RETURNED]: 'Returned',
  [DELIVERY_STATUS_AGGREGATED.MISSING]: 'Missing',
  [DELIVERY_STATUS_AGGREGATED.DROPPED]: 'Dropped',
};

export const ALL_DELIVERY_STATUS_AGGREGATED_FILTER_TYPES = ALL_DELIVERY_STATUS_AGGREGATED.map((status) => ({
  value: status,
  label: ALL_DELIVERY_STATUS_AGGREGATED_STRINGS[status],
}));

export enum DeliverySize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  EXTRA = 'EXTRA',
}

export const ALL_DELIVERY_SIZE = [DeliverySize.SMALL, DeliverySize.MEDIUM, DeliverySize.LARGE, DeliverySize.EXTRA];

export const DELIVERY_SIZE_STRINGS = {
  [DeliverySize.SMALL]: 'Small',
  [DeliverySize.MEDIUM]: 'Medium',
  [DeliverySize.LARGE]: 'Large',
  [DeliverySize.EXTRA]: 'Extra',
};

export const ALL_DELIVERY_SIZE_FILTER_TYPES = ALL_DELIVERY_SIZE.map((size) => ({
  value: size,
  label: DELIVERY_SIZE_STRINGS[size],
}));

export enum DeliveryPriority {
  REGULAR = 0, // false
  EXPRESS = 10, // true
  ONDEMAND = 100,
}

export const ALL_DELIVERY_PRIORITY = [DeliveryPriority.REGULAR, DeliveryPriority.EXPRESS, DeliveryPriority.ONDEMAND];

export const DELIVERY_PRIORITY_STRINGS: Record<DeliveryPriority, string> = {
  [DeliveryPriority.REGULAR]: 'Regular',
  [DeliveryPriority.EXPRESS]: 'Express',
  [DeliveryPriority.ONDEMAND]: 'Ondemand',
};

export const ALL_DELIVERY_PRIORITY_FILTER_TYPES = ALL_DELIVERY_PRIORITY.map((priority) => ({
  value: priority,
  label: DELIVERY_PRIORITY_STRINGS[priority],
}));

export enum DELIVERY_PHASE {
  PICK_UP = 1,
  TRANSFER = 5,
  DROP_OFF = 10,
  RETURN = 100,
}

export const ALL_DELIVERY_PHASE = [
  DELIVERY_PHASE.PICK_UP,
  DELIVERY_PHASE.TRANSFER,
  DELIVERY_PHASE.DROP_OFF,
  DELIVERY_PHASE.RETURN,
];

export const DELIVERY_PHASE_STRINGS: Record<DELIVERY_PHASE, string> = {
  [DELIVERY_PHASE.PICK_UP]: 'Pick up',
  [DELIVERY_PHASE.TRANSFER]: 'Transfer',
  [DELIVERY_PHASE.DROP_OFF]: 'Drop off',
  [DELIVERY_PHASE.RETURN]: 'Return',
};

export enum DeliveryStatus {
  // Order PRE-PHASE
  ORDER_CREATED = -10, // DELIVERY ORDER is created, but not confirmed by ADMIN (OPERATION: STATUS_UPDATE)

  // DONE: Impossible To Progress
  ORDER_REQUEST_DROPPED = -5, // DELIVERY PARCEL is not progressable at all, so totally fail it and refund if needed.

  // Pickup PRE-PHASE
  WAITING_AT_SENDER = 0, // DELIVERY ORDER is ready to be delivered

  // Pickup PHASE
  PICKUP_GENERATED = 10, // PICKUP RIDE is generated, DRIVER not assigned
  PICKUP_ASSIGNED = 20, // PICKUP RIDE is assigned to DRIVER
  PICKUP_PENDING = 30, // DRIVER is on the way to PICKUP LOCATION

  CONFIRMING_SENDER_PICKUP = 40, // DRIVER arrived at PICKUP LOCATION, waiting for SENDER to pickup DELIVERY PARCEL
  PICKUP_TO_WAREHOUSE = 50, // DRIVER picked up DELIVER PARCEL from PICKUP LOCATION, on the way to WAREHOUSE

  CONFIRMING_WAREHOUSE_ARRIVAL = 60, // DRIVER arrived at WAREHOUSE with DELIVER PARCEL, waiting for ADMIN confirmation (OPERATION: CONFIRM_ARRIVAL)

  PICKUP_FAILED = 80, // DRIVER pickup failed (PARCEL not found, SENDER missing) (OPERATION: CONFIRM_ARRIVAL)
  PICKUP_CANCELED = 90, // DRIVER canceled ride (OPERATION: CONFIRM_ARRIVAL)

  // Transfer PRE-PHASE
  WAITING_TO_TRANSFER = 91, // TRANSFER RIDE is generated, DRIVER not assigned

  // Transfer PHASE
  TRANSFER_GENERATED = 92, // TRANSFER RIDE is generated, DRIVER not assigned
  TRANSFER_ASSIGNED = 93, // TRANSFER RIDE is assigned to DRIVER
  TRANSFER_PENDING = 94, // DRIVER is on the way to TRANSFER LOCATION

  CONFIRMING_TRANSFER_PICKUP = 95, // DRIVER arrived at TRANSFER LOCATION, waiting to pickup DELIVERY PARCEL

  TRANSFER_STARTED = 97, // DRIVER picked up DELIVERY PARCEL from WAREHOUSE (SAME AS TRANSFER TO WAREHOUSE! Since there will be no selection)
  TRANSFER_TO_WAREHOUSE = 97, // DRIVER picked up DELIVER PARCEL from TRANSFER LOCATION, on the way to WAREHOUSE

  CONFIRMING_TRANSFER_ARRIVAL = 98, // DRIVER arrived at WAREHOUSE with DELIVER PARCEL, waiting for ADMIN confirmation (OPERATION: CONFIRM_ARRIVAL)

  TRANSFER_CANCELED = 99, // DRIVER canceled ride (OPERATION: CONFIRM_ARRIVAL)

  // Dropoff PRE-PHASE
  WAITING_AT_WAREHOUSE = 100, // DELIVERY PARCEL arrival confirmed and ready to be delivered

  // Dropoff PHASE
  DROPOFF_GENERATED = 110, // DROPOFF RIDE is generated, DRIVER not assigned
  DROPOFF_ASSIGNED = 120, // DROPOFF RIDE is assigned to DRIVER
  DROPOFF_PENDING = 130, // DRIVER is on the way to WAREHOUSE

  CONFIRMING_WAREHOUSE_PICKUP = 140, // DRIVER arrived at WAREHOUSE, waiting for ADMIN confirmation (OPERATION: CONFIRM_DEPARTURE)
  DROPOFF_STARTED = 145, // DRIVER picked up DELIVERY PARCEL from WAREHOUSE
  WAREHOUSE_TO_RECEIVER = 150, // DRIVER is on the way to DROPOFF LOCATION

  CONFIRMING_RECEIVER_ARRIVAL = 160, // DRIVER arrived at DROPOFF LOCATION, waiting for RECEIVER to dropoff DELIVERY PARCEL and get PAYMENT

  DROPOFF_FAILED = 180, // DRIVER dropoff failed (RECEIVER missing, RECEIVER payment failed) (OPERATION: CONFIRM_ARRIVAL)
  DROPOFF_CANCELED = 190, // DRIVER canceled ride (OPERATION: CONFIRM_ARRIVAL)

  // DONE: Success
  FINISHED = 200, // DELIVERY PARCEL dropoff finished with valid PAYMENT by RECEIVER

  // Return PRE-PHASE
  WAITING_TO_RETURN = 400, // DELIVERY ORDER will not dropoff to receiver. waiting to be returned to SENDER

  // Return PHASE
  RETURN_GENERATED = 410, // RETURN RIDE is generated, DRIVER not assigned
  RETURN_ASSIGNED = 420, // RETURN RIDE is assigned to DRIVER
  RETURN_PENDING = 430, // DRIVER is on the way to WAREHOUSE

  CONFIRMING_WAREHOUSE_RETURN_PICKUP = 440, // DRIVER arrived at WAREHOUSE, waiting for ADMIN confirmation (OPERATION: CONFIRM_DEPARTURE)
  RETURN_STARTED = 445, // DRIVER picked up DELIVERY PARCEL from WAREHOUSE
  RETURN_TO_SENDER = 450, // DRIVER is on the way to RETURN LOCATION

  CONFIRMING_SENDER_ARRIVAL = 460, // DRIVER arrived at RETURN LOCATION, waiting for SENDER to return DELIVERY PARCEL

  RETURN_FAILED = 480, // RETURN dropoff failed (RECEIVER missing, RECEIVER payment failed) (OPERATION: CONFIRM_ARRIVAL)
  RETURN_CANCELED = 490, // RETURN canceled ride (OPERATION: CONFIRM_ARRIVAL)

  // DONE: Failed
  RETURNED = 500, // DELIVERY PARCEL returned to SENDER

  // DONE: Impossible To Progress
  ORDER_RETURN_DROPPED = 1000, // DELIVERY PARCEL is picked up but cannot RETURN. Formerly known as RETURN_EXPIRED.

  // Deprecated
  // @Deprecated("Use ORDER_REQUEST_DROPPED(999)")
  DEPRECATED_PICKUP_EXPIRED = 300, // DEPRECATED: Use ORDER_REQUEST_DROPPED. Formerly known as PICKUP_EXPIRED.
  // @Deprecated("Use ORDER_RETURN_DROPPED(1000)")
  DEPRECATED_RETURN_EXPIRED = 600, // DEPRECATED: Use ORDER_RETURN_DROPPED. Formerly known as RETURN_EXPIRED.
  // @Deprecated("Use ORDER_REQUEST_DROPPED(-5)")
  MISSING_IN_TRANSFER = 800,
  DEPRECATED_ORDER_REQUEST_DROPPED = 999, // DEPRECATED: Use ORDER_REQUEST_DROPPED.
}

export const ALL_DELIVERY_STATUS = [
  DeliveryStatus.ORDER_CREATED,
  DeliveryStatus.WAITING_AT_SENDER,
  DeliveryStatus.PICKUP_GENERATED,
  DeliveryStatus.PICKUP_ASSIGNED,
  DeliveryStatus.PICKUP_PENDING,
  DeliveryStatus.CONFIRMING_SENDER_PICKUP,
  DeliveryStatus.PICKUP_TO_WAREHOUSE,
  DeliveryStatus.CONFIRMING_WAREHOUSE_ARRIVAL,
  DeliveryStatus.PICKUP_FAILED,
  DeliveryStatus.PICKUP_CANCELED,
  DeliveryStatus.WAITING_TO_TRANSFER,
  DeliveryStatus.TRANSFER_GENERATED,
  DeliveryStatus.TRANSFER_ASSIGNED,
  DeliveryStatus.TRANSFER_PENDING,
  DeliveryStatus.CONFIRMING_TRANSFER_PICKUP,
  DeliveryStatus.TRANSFER_STARTED,
  DeliveryStatus.TRANSFER_TO_WAREHOUSE,
  DeliveryStatus.CONFIRMING_TRANSFER_ARRIVAL,
  DeliveryStatus.TRANSFER_CANCELED,
  DeliveryStatus.WAITING_AT_WAREHOUSE,
  DeliveryStatus.DROPOFF_GENERATED,
  DeliveryStatus.DROPOFF_ASSIGNED,
  DeliveryStatus.DROPOFF_PENDING,
  DeliveryStatus.CONFIRMING_WAREHOUSE_PICKUP,
  DeliveryStatus.DROPOFF_STARTED,
  DeliveryStatus.WAREHOUSE_TO_RECEIVER,
  DeliveryStatus.CONFIRMING_RECEIVER_ARRIVAL,
  DeliveryStatus.DROPOFF_FAILED,
  DeliveryStatus.DROPOFF_CANCELED,
  DeliveryStatus.FINISHED,
  DeliveryStatus.WAITING_TO_RETURN,
  DeliveryStatus.RETURN_GENERATED,
  DeliveryStatus.RETURN_ASSIGNED,
  DeliveryStatus.RETURN_PENDING,
  DeliveryStatus.CONFIRMING_WAREHOUSE_RETURN_PICKUP,
  DeliveryStatus.RETURN_STARTED,
  DeliveryStatus.RETURN_TO_SENDER,
  DeliveryStatus.CONFIRMING_SENDER_ARRIVAL,
  DeliveryStatus.RETURN_FAILED,
  DeliveryStatus.RETURN_CANCELED,
  DeliveryStatus.RETURNED,
  DeliveryStatus.ORDER_REQUEST_DROPPED,
  DeliveryStatus.ORDER_RETURN_DROPPED,
  DeliveryStatus.DEPRECATED_PICKUP_EXPIRED,
  DeliveryStatus.DEPRECATED_RETURN_EXPIRED,
  DeliveryStatus.MISSING_IN_TRANSFER,
  DeliveryStatus.DEPRECATED_ORDER_REQUEST_DROPPED,
];

export const DELIVERY_STATUS_STRINGS: Record<DeliveryStatus, string> = {
  [DeliveryStatus.ORDER_CREATED]: 'Order Created',
  [DeliveryStatus.WAITING_AT_SENDER]: 'Waiting at Sender',
  [DeliveryStatus.PICKUP_GENERATED]: 'Pickup Generated',
  [DeliveryStatus.PICKUP_ASSIGNED]: 'Pickup Assigned',
  [DeliveryStatus.PICKUP_PENDING]: 'Pickup Pending',
  [DeliveryStatus.CONFIRMING_SENDER_PICKUP]: 'Confirming Sender Pickup',
  [DeliveryStatus.PICKUP_TO_WAREHOUSE]: 'Pickup to Warehouse',
  [DeliveryStatus.CONFIRMING_WAREHOUSE_ARRIVAL]: 'Confirming Warehouse Arrival',
  [DeliveryStatus.PICKUP_FAILED]: 'Pickup Failed',
  [DeliveryStatus.PICKUP_CANCELED]: 'Pickup Canceled',
  [DeliveryStatus.WAITING_TO_TRANSFER]: 'Waiting to Transfer',
  [DeliveryStatus.TRANSFER_GENERATED]: 'Transfer Generated',
  [DeliveryStatus.TRANSFER_ASSIGNED]: 'Transfer Asssigned',
  [DeliveryStatus.TRANSFER_PENDING]: 'Transfer Pending',
  [DeliveryStatus.CONFIRMING_TRANSFER_PICKUP]: 'Confirming Transfer Pickup',
  [DeliveryStatus.TRANSFER_STARTED]: 'Transfer Started',
  [DeliveryStatus.TRANSFER_TO_WAREHOUSE]: 'Transfer to Warehouse',
  [DeliveryStatus.CONFIRMING_TRANSFER_ARRIVAL]: 'Confirming Transfer Arrival',
  [DeliveryStatus.TRANSFER_CANCELED]: 'Transfer Canceled',
  [DeliveryStatus.WAITING_AT_WAREHOUSE]: 'Waiting at Warehouse',
  [DeliveryStatus.DROPOFF_GENERATED]: 'Dropoff Generated',
  [DeliveryStatus.DROPOFF_ASSIGNED]: 'Dropoff Assigned',
  [DeliveryStatus.DROPOFF_PENDING]: 'Dropoff Pending',
  [DeliveryStatus.CONFIRMING_WAREHOUSE_PICKUP]: 'Confirming Warehouse Pickup',
  [DeliveryStatus.DROPOFF_STARTED]: 'Dropoff Started',
  [DeliveryStatus.WAREHOUSE_TO_RECEIVER]: 'Warehouse to Receiver',
  [DeliveryStatus.CONFIRMING_RECEIVER_ARRIVAL]: 'Confirming Receiver Arrival',
  [DeliveryStatus.DROPOFF_FAILED]: 'Dropoff Failed',
  [DeliveryStatus.DROPOFF_CANCELED]: 'Dropoff Canceled',
  [DeliveryStatus.FINISHED]: 'Finished',
  [DeliveryStatus.WAITING_TO_RETURN]: 'Waiting to Return',
  [DeliveryStatus.RETURN_GENERATED]: 'Return Generated',
  [DeliveryStatus.RETURN_ASSIGNED]: 'Return Assigned',
  [DeliveryStatus.RETURN_PENDING]: 'Return Pending',
  [DeliveryStatus.CONFIRMING_WAREHOUSE_RETURN_PICKUP]: 'Confirming Warehouse Return Pickup',
  [DeliveryStatus.RETURN_STARTED]: 'Return Started',
  [DeliveryStatus.RETURN_TO_SENDER]: 'Return to Sender',
  [DeliveryStatus.CONFIRMING_SENDER_ARRIVAL]: 'Confirming Sender Arrival',
  [DeliveryStatus.RETURN_FAILED]: 'Return Failed',
  [DeliveryStatus.RETURN_CANCELED]: 'Return Canceled',
  [DeliveryStatus.RETURNED]: 'Returned',
  [DeliveryStatus.ORDER_REQUEST_DROPPED]: 'Order Request Dropped',
  [DeliveryStatus.ORDER_RETURN_DROPPED]: 'Order Return Dropped',
  [DeliveryStatus.DEPRECATED_PICKUP_EXPIRED]: '(Deprecated) Pickup Expired',
  [DeliveryStatus.DEPRECATED_RETURN_EXPIRED]: '(Deprecated) Return Expired',
  [DeliveryStatus.MISSING_IN_TRANSFER]: 'Missing In Transfer',
  [DeliveryStatus.DEPRECATED_ORDER_REQUEST_DROPPED]: '(Deprecated) Order Request Dropped',
};

export const ALL_DELIVERY_STATUS_FILTER_TYPES = ALL_DELIVERY_STATUS.map((status) => ({
  value: status,
  label: DELIVERY_STATUS_STRINGS[status],
}));

export enum DeliveryPriceType {
  NOT_DEFINED = 0,
  SENDER_PAYING = 1, // sender가 지불할 예정
  RECEIVER_PAYING = 2, // receiver가 지불할 예정
  SENDER_PREPAID = 11, // sender가 이미 지불
  RECEIVER_PREPAID = 12, // receiver가 이미 지불
  TADA_PREPAID = 13, // TADA에서 지불 (프로모션)
  SENDER_PAY_ON_PICKUP = 21,
}

export const ALL_DELIVERY_PRICE_TYPE = [
  DeliveryPriceType.NOT_DEFINED,
  DeliveryPriceType.SENDER_PAYING,
  DeliveryPriceType.RECEIVER_PAYING,
  DeliveryPriceType.SENDER_PREPAID,
  DeliveryPriceType.RECEIVER_PREPAID,
  DeliveryPriceType.TADA_PREPAID,
  DeliveryPriceType.SENDER_PAY_ON_PICKUP,
];

export const DELIVERY_PRICE_TYPE_STRINGS: Record<DeliveryPriceType, string> = {
  [DeliveryPriceType.NOT_DEFINED]: 'Not Defined',
  [DeliveryPriceType.SENDER_PAYING]: 'Sender Paying',
  [DeliveryPriceType.RECEIVER_PAYING]: 'Receiver Paying',
  [DeliveryPriceType.SENDER_PREPAID]: 'Sender Prepaid',
  [DeliveryPriceType.RECEIVER_PREPAID]: 'Receiver Prepaid',
  [DeliveryPriceType.TADA_PREPAID]: 'Tada Prepaid',
  [DeliveryPriceType.SENDER_PAY_ON_PICKUP]: 'Sender Pay on Pickup',
};

export enum DELIVERY_PAY_STATUS {
  PENDING = 0,
  HOLDING = 5,
  PAYING = 10,
  PAID = 20,
  REFUNDED = 90,
  CANCELED = 100,
  ERROR_PAYMENT = 900,
  ERROR_UNPAID = 910,
}

export const DELIVERY_PAY_STATUS_STRINGS = {
  [DELIVERY_PAY_STATUS.PENDING]: 'Pending',
  [DELIVERY_PAY_STATUS.HOLDING]: 'Holding',
  [DELIVERY_PAY_STATUS.PAYING]: 'Paying',
  [DELIVERY_PAY_STATUS.PAID]: 'Paid',
  [DELIVERY_PAY_STATUS.REFUNDED]: 'Refunded',
  [DELIVERY_PAY_STATUS.CANCELED]: 'Canceled',
  [DELIVERY_PAY_STATUS.ERROR_PAYMENT]: 'Error Payment',
  [DELIVERY_PAY_STATUS.ERROR_UNPAID]: 'Error Unpaid',
};

export enum DELIVERY_PAYMENT_METHOD {
  CASH = 'CASH',
  PAO = 'PAO',
  ALIPAY_P = 'ALIPAY_P',
  PIPAY_P = 'PIPAY_P',
  MOMOPAY_P = 'MOMO_P',
  CREDITCARD = 'CREDITCARD',
  TADAPAY = 'TADAPAY',
  CORPORATE = 'CORPORATE',
  CMCB = 'CMCB',
  DELIVERY = 'DELIVERY',
  NETSQR = 'NETSQR',
  OCBC_PAO = 'OCBC_PAO',
}

export const ALL_DELIVERY_PAYMENT_METHOD = [
  DELIVERY_PAYMENT_METHOD.CASH,
  DELIVERY_PAYMENT_METHOD.PAO,
  DELIVERY_PAYMENT_METHOD.ALIPAY_P,
  DELIVERY_PAYMENT_METHOD.PIPAY_P,
  DELIVERY_PAYMENT_METHOD.MOMOPAY_P,
  DELIVERY_PAYMENT_METHOD.CREDITCARD,
  DELIVERY_PAYMENT_METHOD.TADAPAY,
  DELIVERY_PAYMENT_METHOD.CORPORATE,
  DELIVERY_PAYMENT_METHOD.CMCB,
  DELIVERY_PAYMENT_METHOD.DELIVERY,
  DELIVERY_PAYMENT_METHOD.NETSQR,
  DELIVERY_PAYMENT_METHOD.OCBC_PAO,
];

export const DELIVERY_PAYMENT_METHOD_STRINGS = {
  [DELIVERY_PAYMENT_METHOD.CASH]: 'Cash',
  [DELIVERY_PAYMENT_METHOD.PAO]: 'Pao',
  [DELIVERY_PAYMENT_METHOD.ALIPAY_P]: 'Alipay Post',
  [DELIVERY_PAYMENT_METHOD.PIPAY_P]: 'Pipay Post',
  [DELIVERY_PAYMENT_METHOD.MOMOPAY_P]: 'MoMo pay',
  [DELIVERY_PAYMENT_METHOD.CREDITCARD]: 'Credit Card',
  [DELIVERY_PAYMENT_METHOD.TADAPAY]: 'TADA Wallet',
  [DELIVERY_PAYMENT_METHOD.CORPORATE]: 'Corporate',
  [DELIVERY_PAYMENT_METHOD.CMCB]: 'CMCB',
  [DELIVERY_PAYMENT_METHOD.DELIVERY]: 'Delivery',
  [DELIVERY_PAYMENT_METHOD.NETSQR]: 'NETSQR',
  [DELIVERY_PAYMENT_METHOD.OCBC_PAO]: 'OCBC Pay Anyone',
};

export const ALL_DELIVERY_PAYMENT_METHOD_FILTER_TYPES = ALL_DELIVERY_PAYMENT_METHOD.map((value) => ({
  value,
  label: DELIVERY_PAYMENT_METHOD_STRINGS[value],
}));

export enum DELIVERY_PLAN {
  BASE = 0,
  FLAT_BRONZE = 1,
  FLAT_SILVER = 2,
  FLAT_GOLD = 3,
  FLAT_PLATINUM = 4,
  FLAT_FLEX = 10,
}

export const ALL_DELIVERY_PLAN = [
  DELIVERY_PLAN.BASE,
  DELIVERY_PLAN.FLAT_BRONZE,
  DELIVERY_PLAN.FLAT_SILVER,
  DELIVERY_PLAN.FLAT_GOLD,
  DELIVERY_PLAN.FLAT_PLATINUM,
  DELIVERY_PLAN.FLAT_FLEX,
];

export const DELIVERY_PLAN_STRINGS = {
  [DELIVERY_PLAN.BASE]: 'Base',
  [DELIVERY_PLAN.FLAT_BRONZE]: 'Bronze (Flat Fare Plan)',
  [DELIVERY_PLAN.FLAT_SILVER]: 'Silver (Flat Fare Plan)',
  [DELIVERY_PLAN.FLAT_GOLD]: 'Gold (Flat Fare Plan)',
  [DELIVERY_PLAN.FLAT_PLATINUM]: 'Platinum (Flat Fare Plan)',
  [DELIVERY_PLAN.FLAT_FLEX]: 'Flex (Flat Fare Plan)',
};

export enum VehicleRoutingResultStatus {
  IN_PROGRESS = 'InProgress',
  COMPLETED = 'Complete',
}

export enum ROUTING_RESULT_CAR_TYPE {
  SEDAN = 0,
  VAN = 1,
  BUSINESS_VAN = 4,
  BLACK_SEDAN = 13,
  TUKTUK = 1000,
  BIKE = 1001,
  TAXI_STANDARD = 10000,
  TAXI_STANDARD_LARGE = 10001,
  TAXI_PREMIUM = 10002,
  TAXI_PREMIUM_LARGE = 10003,
}

export enum ROUTING_RESULT_CAR_GROUP {
  CAR = 0,
  BIKE = 1,
  TUKTUK = 2,
}

export enum ROUTING_RESULT_DELIVERY_SIZE {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export const ROUTING_RESULT_DELIVERY_SIZE_STRINGS: Record<ROUTING_RESULT_DELIVERY_SIZE, string> = {
  [ROUTING_RESULT_DELIVERY_SIZE.SMALL]: 'Small',
  [ROUTING_RESULT_DELIVERY_SIZE.MEDIUM]: 'Medium',
  [ROUTING_RESULT_DELIVERY_SIZE.LARGE]: 'Large',
};

export const DEFAULT_DELIVERY_LOCATION = {
  address: 'Samdach Sothearos Blvd (3), Phnom Penh, Cambodia',
  name: 'Samdach Sothearos Blvd(3)',
  lat: 11.563902,
  lng: 104.9312521,
  googlePlaceId: 'ChIJ42tqxz1RCTER36bOGZOA8fg',
};

export enum DELIVERY_TYPE {
  DELIVERY_PICKUP = 'PICKUP',
  DELIVERY_DROPOFF = 'DROPOFF',
  DELIVERY_SINGLE_PICKUP = 'DELIVERY_SINGLE_PICKUP',
  DELIVERY_SINGLE_DROPOFF = 'DELIVERY_SINGLE_DROPOFF',
  EXPRESS = 'EXPRESS',
  EXPRESS_SINGLE_ROUTE = 'EXPRESS_SINGLE',
}

export const ALL_DELIVERY_TYPE = [
  DELIVERY_TYPE.DELIVERY_PICKUP,
  DELIVERY_TYPE.DELIVERY_DROPOFF,
  DELIVERY_TYPE.DELIVERY_SINGLE_PICKUP,
  DELIVERY_TYPE.DELIVERY_SINGLE_DROPOFF,
  DELIVERY_TYPE.EXPRESS,
  DELIVERY_TYPE.EXPRESS_SINGLE_ROUTE,
];

export const DELIVERY_TYPE_STRINGS = {
  [DELIVERY_TYPE.DELIVERY_PICKUP]: 'Pickup',
  [DELIVERY_TYPE.DELIVERY_DROPOFF]: 'Dropoff',
  [DELIVERY_TYPE.DELIVERY_SINGLE_PICKUP]: 'Single Route Pickup',
  [DELIVERY_TYPE.DELIVERY_SINGLE_DROPOFF]: 'Single Route Dropoff',
  [DELIVERY_TYPE.EXPRESS]: 'Express',
  [DELIVERY_TYPE.EXPRESS_SINGLE_ROUTE]: 'Express Single Route',
};

export const DELIVERY_SUMMARY = {
  COUNT_TOTAL: 'countTotal',
  COUNT_TOTAL_REQUEST_LIMIT: 'countTotalRequestLimit',
  COUNT_TOTAL_PICKUP_ASSIGNED: 'countTotalPickupAssigned',
  COUNT_TOTAL_DROPOFF_ASSIGNED: 'countTotalDropoffAssigned',
  COUNT_TOTAL_DROPOFF_ASSIGNED_REQUEST_LIMIT: 'countTotalDropoffAssignedRequestLimit',
  COUNT_TOTAL_RETURN_ASSIGNED: 'countTotalReturnAssigned',
  COUNT_TOTAL_PICKUP_FAILED: 'countTotalPickupFailed',
  COUNT_TOTAL_DROPOFF_FAILED: 'countTotalDropoffFailed',
  COUNT_TOTAL_RETURN_FAILED: 'countTotalReturnFailed',
  COUNT_DROPOFF_ASSIGNED_TOTAL: 'dropoffAssignedTotal',
  COUNT_DROPOFF_ASSIGNED_ON_REQUEST_TIME_LIMIT: 'dropoffAssignedOnRequestTimeLimit',
  COUNT_DROPOFF_FAILED_ON_ASSIGNED: 'dropoffFailedOnAssigned',
  COUNT_WAITING_PICKUP: 'countWaitingPickup',
  COUNT_ON_PICKUP: 'countOnPickup',
  COUNT_WAITING_DROPOFF: 'countWaitingDropoff',
  COUNT_WAITING_DROPOFF_REQUEST_LIMIT: 'countWaitingDropoffRequestLimit',
  COUNT_ON_DROP_OFF: 'countOnDropoff',
  COUNT_ON_DROP_OFF_REQUEST_LIMIT: 'countOnDropoffRequestLimit',
  COUNT_DROP_OFF_FAILED: 'countDropoffFailed',
  COUNT_FINISHED: 'countFinished',
  COUNT_FINISHED_REQUEST_LIMIT: 'countFinishedRequestLimit',
  COUNT_WAITING_RETURN: 'countWaitingReturn',
  COUNT_ON_RETURN: 'countOnReturn',
  COUNT_RETURNED: 'countReturned',
  COUNT_DROPPED: 'countDropped',
};

export const DELIVERY_SUMMARY_STRINGS = {
  [DELIVERY_SUMMARY.COUNT_TOTAL]: 'Total',
  [DELIVERY_SUMMARY.COUNT_TOTAL_PICKUP_ASSIGNED]: 'Total Pickup Assigned',
  [DELIVERY_SUMMARY.COUNT_TOTAL_DROPOFF_ASSIGNED]: 'Total Dropoff Assigned',
  [DELIVERY_SUMMARY.COUNT_TOTAL_RETURN_ASSIGNED]: 'Total Return Assigned ',
  [DELIVERY_SUMMARY.COUNT_TOTAL_PICKUP_FAILED]: 'Total Pickup Failed',
  [DELIVERY_SUMMARY.COUNT_TOTAL_DROPOFF_FAILED]: 'Total Dropoff Failed',
  [DELIVERY_SUMMARY.COUNT_TOTAL_RETURN_FAILED]: 'Total Return Failed ',
  [DELIVERY_SUMMARY.COUNT_DROPOFF_ASSIGNED_TOTAL]: 'Dropoff Assigned (Total)',
  [DELIVERY_SUMMARY.COUNT_DROPOFF_ASSIGNED_ON_REQUEST_TIME_LIMIT]: 'Dropoff Assigned (Request Time Limit)',
  [DELIVERY_SUMMARY.COUNT_DROPOFF_FAILED_ON_ASSIGNED]: 'Dropoff Failed on Assigned',
  [DELIVERY_SUMMARY.COUNT_WAITING_PICKUP]: 'Need Pick Up',
  [DELIVERY_SUMMARY.COUNT_ON_PICKUP]: 'Pick Up > Warehouse',
  [DELIVERY_SUMMARY.COUNT_WAITING_DROPOFF]: 'At Warehouse (Total)',
  [DELIVERY_SUMMARY.COUNT_WAITING_DROPOFF_REQUEST_LIMIT]: 'At Warehouse (Request Limit)',
  [DELIVERY_SUMMARY.COUNT_ON_DROP_OFF]: 'Dropoff On-going (Total)',
  [DELIVERY_SUMMARY.COUNT_ON_DROP_OFF_REQUEST_LIMIT]: 'Dropoff On-going (Request Limit)',
  [DELIVERY_SUMMARY.COUNT_DROP_OFF_FAILED]: 'Failed on Dropoff',
  [DELIVERY_SUMMARY.COUNT_FINISHED]: 'Finished (Total)',
  [DELIVERY_SUMMARY.COUNT_FINISHED_REQUEST_LIMIT]: 'Finished (Request Limit)',
  [DELIVERY_SUMMARY.COUNT_WAITING_RETURN]: 'Waiting Return',
  [DELIVERY_SUMMARY.COUNT_ON_RETURN]: 'On Return',
  [DELIVERY_SUMMARY.COUNT_RETURNED]: 'Returned',
  [DELIVERY_SUMMARY.COUNT_DROPPED]: 'Dropped',
};

export const DELIVERY_SUMMARY_ALL = [
  DELIVERY_SUMMARY.COUNT_TOTAL,
  DELIVERY_SUMMARY.COUNT_TOTAL_PICKUP_ASSIGNED,
  DELIVERY_SUMMARY.COUNT_TOTAL_DROPOFF_ASSIGNED,
  DELIVERY_SUMMARY.COUNT_TOTAL_RETURN_ASSIGNED,
  DELIVERY_SUMMARY.COUNT_TOTAL_PICKUP_FAILED,
  DELIVERY_SUMMARY.COUNT_TOTAL_DROPOFF_FAILED,
  DELIVERY_SUMMARY.COUNT_TOTAL_RETURN_FAILED,
  DELIVERY_SUMMARY.COUNT_DROPOFF_ASSIGNED_TOTAL,
  DELIVERY_SUMMARY.COUNT_DROPOFF_ASSIGNED_ON_REQUEST_TIME_LIMIT,
  DELIVERY_SUMMARY.COUNT_DROPOFF_FAILED_ON_ASSIGNED,
  DELIVERY_SUMMARY.COUNT_WAITING_PICKUP,
  DELIVERY_SUMMARY.COUNT_ON_PICKUP,
  DELIVERY_SUMMARY.COUNT_WAITING_DROPOFF,
  DELIVERY_SUMMARY.COUNT_WAITING_DROPOFF_REQUEST_LIMIT,
  DELIVERY_SUMMARY.COUNT_ON_DROP_OFF,
  DELIVERY_SUMMARY.COUNT_ON_DROP_OFF_REQUEST_LIMIT,
  DELIVERY_SUMMARY.COUNT_DROP_OFF_FAILED,
  DELIVERY_SUMMARY.COUNT_FINISHED,
  DELIVERY_SUMMARY.COUNT_FINISHED_REQUEST_LIMIT,
  DELIVERY_SUMMARY.COUNT_WAITING_RETURN,
  DELIVERY_SUMMARY.COUNT_ON_RETURN,
  DELIVERY_SUMMARY.COUNT_RETURNED,
  DELIVERY_SUMMARY.COUNT_DROPPED,
];

export enum DELIVERY_EXPORT_TYPE {
  SENDER_DELIVERY_SUMMARY = 'sender_delivery_summary',
  SMART_PRICING_APPLICATION = 'smart_pricing_application_summary',
}

export const DELIVERY_EXPORT_TYPE_STRINGS = {
  [DELIVERY_EXPORT_TYPE.SENDER_DELIVERY_SUMMARY]: 'Sender Delivery Summary',
  [DELIVERY_EXPORT_TYPE.SMART_PRICING_APPLICATION]: 'Smart Pricing Application',
};

export const DELIVERY_EXPORT_TYPE_ALL = [
  DELIVERY_EXPORT_TYPE.SENDER_DELIVERY_SUMMARY,
  DELIVERY_EXPORT_TYPE.SMART_PRICING_APPLICATION,
];

export const DELIVERY_DASHBOARD_STATUS = [
  DeliveryStatus.PICKUP_ASSIGNED,
  DeliveryStatus.PICKUP_PENDING,
  DeliveryStatus.CONFIRMING_SENDER_PICKUP,
  DeliveryStatus.PICKUP_TO_WAREHOUSE,
  DeliveryStatus.CONFIRMING_WAREHOUSE_ARRIVAL,
  DeliveryStatus.PICKUP_FAILED,
  DeliveryStatus.PICKUP_CANCELED,
];

export enum DELIVERY_WAREHOUSE_FILTER {
  CURRENT_WAREHOUSE = 1,
  TARGET_WAREHOUSE = 2,
  CURRENT_OR_TARGET_WAREHOUSE = 3,
}

export const ALL_DELIVERY_WAREHOUSE_FILTER = [
  DELIVERY_WAREHOUSE_FILTER.CURRENT_WAREHOUSE,
  DELIVERY_WAREHOUSE_FILTER.TARGET_WAREHOUSE,
  DELIVERY_WAREHOUSE_FILTER.CURRENT_OR_TARGET_WAREHOUSE,
];

export const DELIVERY_WAREHOUSE_FILTER_STRINGS = {
  [DELIVERY_WAREHOUSE_FILTER.CURRENT_WAREHOUSE]: 'Current Warehouse',
  [DELIVERY_WAREHOUSE_FILTER.TARGET_WAREHOUSE]: 'Target Warehouse',
  [DELIVERY_WAREHOUSE_FILTER.CURRENT_OR_TARGET_WAREHOUSE]: 'Current or Target Warehouse',
};

export enum DELIVERY_PAYMENT_METHOD_FILTER {
  SENDER = 1,
  RECEIVER = 2,
  SENDER_OR_RECEIVER = 3,
}

export const ALL_DELIVERY_PAYMENT_METHOD_FILTER = [
  DELIVERY_PAYMENT_METHOD_FILTER.SENDER,
  DELIVERY_PAYMENT_METHOD_FILTER.RECEIVER,
  DELIVERY_PAYMENT_METHOD_FILTER.SENDER_OR_RECEIVER,
];

export const DELIVERY_PAYMENT_METHOD_FILTER_STRINGS = {
  [DELIVERY_PAYMENT_METHOD_FILTER.SENDER]: 'Sender',
  [DELIVERY_PAYMENT_METHOD_FILTER.RECEIVER]: 'Receiver',
  [DELIVERY_PAYMENT_METHOD_FILTER.SENDER_OR_RECEIVER]: 'Sender or Receiver',
};

export enum DELIVERY_DATE_FILTER {
  CREATED_TIME = 1,
  REQUESTED_TIME = 2,
  FINISHED_TIME = 3,
  FINISHED_OR_FAILED_TIME = 4,
  LAST_FAILED_TIME = 5,
  PICKED_UP_TIME = 6,
}

export const ALL_DELIVERY_DATE_FILTER = [
  DELIVERY_DATE_FILTER.CREATED_TIME,
  DELIVERY_DATE_FILTER.REQUESTED_TIME,
  DELIVERY_DATE_FILTER.FINISHED_TIME,
  DELIVERY_DATE_FILTER.FINISHED_OR_FAILED_TIME,
  DELIVERY_DATE_FILTER.LAST_FAILED_TIME,
  DELIVERY_DATE_FILTER.PICKED_UP_TIME,
];

export enum DELIVERY_APP_TYPE {
  DELIVERY_WEBTOOL = 1,
  ADMIN = 2,
  RIDER_APP = 5,
  EXTERNAL_API = 10,
}

export const ALL_DELIVERY_APP_TYPES = [
  DELIVERY_APP_TYPE.DELIVERY_WEBTOOL,
  DELIVERY_APP_TYPE.ADMIN,
  DELIVERY_APP_TYPE.RIDER_APP,
  DELIVERY_APP_TYPE.EXTERNAL_API,
];

export const DELIVERY_APP_TYPE_STRINGS: Record<DELIVERY_APP_TYPE, string> = {
  [DELIVERY_APP_TYPE.DELIVERY_WEBTOOL]: 'Merchant Web/App',
  [DELIVERY_APP_TYPE.ADMIN]: 'Admin',
  [DELIVERY_APP_TYPE.RIDER_APP]: 'Rider App',
  [DELIVERY_APP_TYPE.EXTERNAL_API]: 'External API',
};

export const ALL_DELIVERY_APP_FILTER_TYPES = ALL_DELIVERY_APP_TYPES.map((type) => ({
  value: type,
  label: DELIVERY_APP_TYPE_STRINGS[type],
}));

export const ALL_SELECT_PARCEL_PAYMENT = [DeliveryPriceType.RECEIVER_PAYING, DeliveryPriceType.RECEIVER_PREPAID];

export const ALL_SELECT_DELIVERY_PAYMENT = [DeliveryPriceType.RECEIVER_PAYING, DeliveryPriceType.SENDER_PAYING];

export const SELECT_PARCEL_PAYMENT_STRINGS: Partial<Record<DeliveryPriceType, string>> = {
  [DeliveryPriceType.RECEIVER_PAYING]: 'Yes',
  [DeliveryPriceType.RECEIVER_PREPAID]: 'No',
};

export const SELECT_DELIVERY_PAYMENT_STRINGS: Partial<Record<DeliveryPriceType, string>> = {
  [DeliveryPriceType.RECEIVER_PAYING]: 'Receiver',
  [DeliveryPriceType.SENDER_PAYING]: 'Sender',
};

export enum DELIVERY_FEE_TYPE {
  DISTANCE_BASED = 0,
  FLAT_FEE = 1,
}

export const ALL_DELIVERY_FEE_TYPE = [DELIVERY_FEE_TYPE.DISTANCE_BASED, DELIVERY_FEE_TYPE.FLAT_FEE];

export const DELIVERY_FEE_TYPE_STRINGS = {
  [DELIVERY_FEE_TYPE.DISTANCE_BASED]: 'Distance Based',
  [DELIVERY_FEE_TYPE.FLAT_FEE]: 'Flat Fee',
};

export enum DELIVERY_STAKE_HOLDER {
  SENDER = 0,
  RECEIVER = 1,
  ADMIN = 2,
  AGENT = 4,
  SYSTEM = 8,
  DRIVER = 16,
}

export const ALL_DELIVERY_STAKE_HOLDER = [DELIVERY_STAKE_HOLDER.SENDER, DELIVERY_STAKE_HOLDER.RECEIVER];

export const DELIVERY_STAKE_HOLDER_STRINGS = {
  [DELIVERY_STAKE_HOLDER.SENDER]: 'Sender',
  [DELIVERY_STAKE_HOLDER.RECEIVER]: 'Receiver',
  [DELIVERY_STAKE_HOLDER.ADMIN]: 'Admin',
  [DELIVERY_STAKE_HOLDER.AGENT]: 'Agent',
  [DELIVERY_STAKE_HOLDER.SYSTEM]: 'System',
  [DELIVERY_STAKE_HOLDER.DRIVER]: 'Driver',
};

export enum DELIVERY_KEY_IN_TYPE {
  UPDATE_INFO = 1,
  UPDATE_PRICE = 2,
  CONFIRM_TRANSFER = 3,
}

export const DELIVERY_KEY_IN_TYPE_STRINGS = {
  [DELIVERY_KEY_IN_TYPE.UPDATE_INFO]: 'Update Info',
  [DELIVERY_KEY_IN_TYPE.UPDATE_PRICE]: 'Update Price',
  [DELIVERY_KEY_IN_TYPE.CONFIRM_TRANSFER]: 'Confirm Transfer',
};

export const ALL_DELIVERY_KEY_IN_TYPE = [
  DELIVERY_KEY_IN_TYPE.UPDATE_INFO,
  DELIVERY_KEY_IN_TYPE.UPDATE_PRICE,
  DELIVERY_KEY_IN_TYPE.CONFIRM_TRANSFER,
];

export enum DELIVERY_KEY_IN_USE_TYPE {
  RIDE_GENERATION = 1,
}

export const DELIVERY_KEY_IN_USE_TYPE_STRINGS = {
  [DELIVERY_KEY_IN_USE_TYPE.RIDE_GENERATION]: 'Ride Generation',
};

export enum SMS_TEMPLATE_CONTEXT_TYPE {
  SYSTEM_MESSAGE = 0,
  ADMIN = 1,
  AGENT = 10,
  DRIVER = 100,
  MERCHANT_WEBTOOL = 200,
}

export const ALL_SMS_TEMPLATE_CONTEXT_TYPES = [
  SMS_TEMPLATE_CONTEXT_TYPE.SYSTEM_MESSAGE,
  SMS_TEMPLATE_CONTEXT_TYPE.ADMIN,
  SMS_TEMPLATE_CONTEXT_TYPE.AGENT,
  SMS_TEMPLATE_CONTEXT_TYPE.DRIVER,
  SMS_TEMPLATE_CONTEXT_TYPE.MERCHANT_WEBTOOL,
];

export const SMS_TEMPLATE_CONTEXT_STRINGS: Record<SMS_TEMPLATE_CONTEXT_TYPE, string> = {
  [SMS_TEMPLATE_CONTEXT_TYPE.SYSTEM_MESSAGE]: 'Auto Sending Message From Server',
  [SMS_TEMPLATE_CONTEXT_TYPE.ADMIN]: 'Admin Warehouse',
  [SMS_TEMPLATE_CONTEXT_TYPE.AGENT]: 'Agent Warehouse',
  [SMS_TEMPLATE_CONTEXT_TYPE.DRIVER]: 'Driver App',
  [SMS_TEMPLATE_CONTEXT_TYPE.MERCHANT_WEBTOOL]: 'Merchant Webtool',
};

export enum CONTACT_LOG_TYPE {
  SMS = 0,
  CALL = 1,
}

export const CONTACT_LOG_STRINGS = {
  [CONTACT_LOG_TYPE.SMS]: 'SMS',
  [CONTACT_LOG_TYPE.CALL]: 'CALL',
};

type ScheduleInterface = ['pickupSchedule', 'dropoffSchedule', 'returnSchedule', 'releaseSchedule', 'dropSchedule'];

export const DELIVERY_SCHEDULES: ScheduleInterface = [
  'pickupSchedule',
  'dropoffSchedule',
  'returnSchedule',
  'releaseSchedule',
  'dropSchedule',
];

export enum WAREHOUSE_TYPE {
  HUB = 1,
  SUB = 10,
}

export const ALL_WAREHOUSE_TYPE = [WAREHOUSE_TYPE.HUB, WAREHOUSE_TYPE.SUB];

export const WAREHOUSE_TYPE_STRINGS = {
  [WAREHOUSE_TYPE.HUB]: 'Hub',
  [WAREHOUSE_TYPE.SUB]: 'Sub',
};

export enum PRICE_PLAN_TYPE {
  ADMIN = 'ADMIN',
  AGENT = 'AGENT',
}

export enum USER_FEATURE_TYPE {
  FACEBOOK = 1,
  CREATE_SENDER = 2,
  WEBHOOK = 4,
  CLOUD_PRINTER = 8,
  THIRD_PARTY_API_FOR_DELIVERY_RIDE = 16,
  CUSTOM_SMART_PRICING_OPTION = 32,
  WAREHOUSE_AGENT = 64,
}
