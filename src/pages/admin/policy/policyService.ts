import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export interface Policy {
  _id: string;
  month: string;
  slNo: number;
  customerName: string;
  email: string;
  contact: string;
  reference?: string;
  vehicleNo: string;
  variant: string;
  insurerCompany: string;
  policyNumber: string;
  brokingCode?: string;
  policyStartDate: string;
  endDate: string;
  idv: number;
  ncb: number;
  premium: number;
  netPremium: number;
  cashBack: number;
  balancePayment: number;
  policyPaymentMode:
    | "CASH"
    | "UPI"
    | "BANK_TRANSFER"
    | "CARD"
    | "CHEQUE"
    | "ONLINE"
    | "OTHER";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PolicyFormData {
  month: string;
  slNo: number;
  customerName: string;
  email: string;
  contact: string;
  reference?: string;
  vehicleNo: string;
  variant: string;
  insurerCompany: string;
  policyNumber: string;
  brokingCode?: string;
  policyStartDate: string;
  endDate: string;
  idv: number;
  ncb: number;
  premium: number;
  netPremium: number;
  cashBack?: number;
  balancePayment?: number;
  policyPaymentMode:
    | "CASH"
    | "UPI"
    | "BANK_TRANSFER"
    | "CARD"
    | "CHEQUE"
    | "ONLINE"
    | "OTHER";
  isActive?: boolean;
}

/**
 * Get all policies
 */
export const getPolicies = async (): Promise<Policy[]> => {
  const response = await axios.get(`${BACKEND}/api/policies`);

  return response.data.data;
};

/**
 * Get policy by ID
 */
export const getPolicyById = async (
  id: string
): Promise<Policy> => {
  const response = await axios.get(
    `${BACKEND}/api/policies/${id}`
  );

  return response.data.data;
};

/**
 * Create policy
 */
export const createPolicy = async (
  data: PolicyFormData
): Promise<Policy> => {
  const response = await axios.post(
    `${BACKEND}/api/policies`,
    data
  );

  return response.data.data;
};

/**
 * Update policy
 */
export const updatePolicy = async (
  id: string,
  data: Partial<PolicyFormData>
): Promise<Policy> => {
  const response = await axios.put(
    `${BACKEND}/api/policies/${id}`,
    data
  );

  return response.data.data;
};

/**
 * Delete policy
 */
export const deletePolicy = async (
  id: string
): Promise<Policy> => {
  const response = await axios.delete(
    `${BACKEND}/api/policies/${id}`
  );

  return response.data.data;
};

/**
 * Activate policy
 */
export const activatePolicy = async (
  id: string
): Promise<Policy> => {
  const response = await axios.patch(
    `${BACKEND}/api/policies/${id}/activate`
  );

  return response.data.data;
};

/**
 * Deactivate policy
 */
export const deactivatePolicy = async (
  id: string
): Promise<Policy> => {
  const response = await axios.patch(
    `${BACKEND}/api/policies/${id}/deactivate`
  );

  return response.data.data;
};

export interface PolicyImportFailedRow {
  row: number;
  data: Record<string, unknown>;
  error: string;
}

export interface PolicyImportResult {
  totalRows: number;
  successCount: number;
  failedCount: number;
  importedPolicies: Policy[];
  failedRows: PolicyImportFailedRow[];
}

/**
 * Download Excel template
 */
export const downloadPolicyTemplate = async (): Promise<Blob> => {
  const response = await axios.get(
    `${BACKEND}/api/policies/template`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};

/**
 * Import policies from Excel
 */
export const importPoliciesFromExcel = async (
  file: File
): Promise<PolicyImportResult> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post(
    `${BACKEND}/api/policies/import`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
};