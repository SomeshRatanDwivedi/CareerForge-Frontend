import { CARRIER_FORGE_BASE_URL } from "@/constants/api.constant";
import type { FiltersDataType, PageBuilderState } from "@/types";

export const getCompanySettings = async (companySlug: string) => {
  const res = await fetch(`${CARRIER_FORGE_BASE_URL}/companies/get-all-data/${companySlug}`);
  const data = await res.json();
  if (!res.ok && res.status==404) {
     window.location.replace("/auth/login")
  }
  return data
};

export const publishCompanyData = async (
  payload: PageBuilderState
) => {
  console.log("Publishing data for:", payload);
  const res = await fetch(`${CARRIER_FORGE_BASE_URL}/companies/save-all-data/${payload.slug}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};

export const companyLogin = async (companyName: string) => {
  const payload = { companyName };
  const res = await fetch(`${CARRIER_FORGE_BASE_URL}/companies/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
}

export const getJobsByFilterAndQuery = async (companySlug: string, filterValues: FiltersDataType, query = "") => {
  const payload = { filterValues, query };
  const res = await fetch(`${CARRIER_FORGE_BASE_URL}/jobs/get-jobs-by-filters/${companySlug}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
}

export const getJobFilters = async (companySlug: string) => {
  const res = await fetch(`${CARRIER_FORGE_BASE_URL}/jobs/filter-values/${companySlug}`);
  const data = await res.json();
  return data;
}