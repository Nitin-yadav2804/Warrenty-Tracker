const DAY_IN_MS = 24 * 60 * 60 * 1000;

// Use India calendar dates, independent of the server's time zone.
const indiaDate = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export const getWarrantyDetails = (warrantyEndDate, now = new Date()) => {
  const end = new Date(warrantyEndDate);

  if (warrantyEndDate == null || Number.isNaN(end.getTime()) || Number.isNaN(now.getTime())) {
    throw new Error("A valid warranty end date and current date are required");
  }

  const parts = Object.fromEntries(
    indiaDate.formatToParts(now).map(({ type, value }) => [type, value])
  );
  const today = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day));

  // Inputs such as 2027-10-08 are stored as UTC dates by MongoDB.
  const endDay = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());
  const days = Math.round((endDay - today) / DAY_IN_MS);

  let warrantyStatus = "active";
  if (days < 0) warrantyStatus = "expired";
  else if (days <= 30) warrantyStatus = "expiring-soon";

  return {
    warrantyStatus,
    daysRemaining: Math.max(0, days),
  };
};

export const addWarrantyDetails = (device, now = new Date()) => {
  const data = device.toObject();
  return { ...data, ...getWarrantyDetails(data.warrantyEndDate, now) };
};
