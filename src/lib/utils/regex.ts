export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const percentInStringRegex = /(\d{1,2}|100)(\.\d+)?%/g;

/** Matches prices (e.g. £100, $9.99, 100£) and percentages (e.g. 10%, 50.5%) */
export const priceOrPercentRegex =
  /[£$€¥₹₩]\d+(?:\.\d+)?|\d+(?:\.\d+)?[£$€¥₹₩]|(?:\d{1,2}|100)(?:\.\d+)?%/g;
