export const company = {
  name: "XeonTek Ltd",
  registrationNumber: "08454858",
  registrationJurisdiction: "England and Wales",
  registeredOffice: {
    line1: "27 Old Gloucester Street",
    city: "London",
    postcode: "WC1N 3AX",
    country: "United Kingdom",
  },
} as const;

export const registeredOfficeText = [
  company.registeredOffice.line1,
  company.registeredOffice.city,
  company.registeredOffice.postcode,
  company.registeredOffice.country,
].join(", ");
