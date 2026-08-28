import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Policy, PolicyFormData } from "./policyService";

interface PolicyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PolicyFormData) => Promise<void>;
  editingPolicy?: Policy | null;
  loading?: boolean;
}

const defaultFormData: PolicyFormData = {
  month: "",
  slNo: 0,
  customerName: "",
  email: "",
  contact: "",
  reference: "",
  vehicleNo: "",
  variant: "",
  insurerCompany: "",
  policyNumber: "",
  brokingCode: "",
  policyStartDate: "",
  endDate: "",
  idv: 0,
  ncb: 0,
  premium: 0,
  netPremium: 0,
  cashBack: 0,
  balancePayment: 0,
  policyPaymentMode: "CASH",
  isActive: true,
};

const PolicyForm: React.FC<PolicyFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingPolicy,
  loading = false,
}) => {
  const [formData, setFormData] = useState<PolicyFormData>(defaultFormData);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatDateForInput = (date: string | Date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (!isOpen) return;

    if (editingPolicy) {
      setFormData({
        month: editingPolicy.month || "",
        slNo: editingPolicy.slNo || 0,

        customerName: editingPolicy.customerName || "",
        email: editingPolicy.email || "",
        contact: editingPolicy.contact || "",

        reference: editingPolicy.reference || "",
        vehicleNo: editingPolicy.vehicleNo || "",
        variant: editingPolicy.variant || "",
        insurerCompany: editingPolicy.insurerCompany || "",
        policyNumber: editingPolicy.policyNumber || "",
        brokingCode: editingPolicy.brokingCode || "",

        policyStartDate: formatDateForInput(editingPolicy.policyStartDate),
        endDate: formatDateForInput(editingPolicy.endDate),

        idv: editingPolicy.idv || 0,
        ncb: editingPolicy.ncb || 0,
        premium: editingPolicy.premium || 0,
        netPremium: editingPolicy.netPremium || 0,
        cashBack: editingPolicy.cashBack || 0,
        balancePayment: editingPolicy.balancePayment || 0,

        policyPaymentMode: editingPolicy.policyPaymentMode || "CASH",

        isActive: editingPolicy.isActive,
      });
    } else {
      setFormData(defaultFormData);
    }

    setErrors({});
  }, [isOpen, editingPolicy]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "slNo" ||
        name === "idv" ||
        name === "ncb" ||
        name === "premium" ||
        name === "netPremium" ||
        name === "cashBack" ||
        name === "balancePayment"
          ? Number(value)
          : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.month.trim()) {
      newErrors.month = "Month is required";
    }

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }

    // Email is optional, but if entered it must be valid
    if (formData.email?.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email.trim())) {
        newErrors.customerEmail = "Please enter a valid email address";
      }
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact number must be exactly 10 digits";
    }

    if (!formData.vehicleNo.trim()) {
      newErrors.vehicleNo = "Vehicle number is required";
    }

    if (!formData.variant.trim()) {
      newErrors.variant = "Variant is required";
    }

    if (!formData.insurerCompany.trim()) {
      newErrors.insurerCompany = "Insurer company is required";
    }

    if (!formData.policyNumber.trim()) {
      newErrors.policyNumber = "Policy number is required";
    }

    if (!formData.policyStartDate) {
      newErrors.policyStartDate = "Policy start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (
      formData.policyStartDate &&
      formData.endDate &&
      new Date(formData.endDate) < new Date(formData.policyStartDate)
    ) {
      newErrors.endDate = "End date cannot be before start date";
    }

    if (formData.idv < 0) {
      newErrors.idv = "IDV cannot be negative";
    }

    if (formData.ncb < 0) {
      newErrors.ncb = "NCB cannot be negative";
    }

    if (formData.premium < 0) {
      newErrors.premium = "Premium cannot be negative";
    }

    if (formData.netPremium < 0) {
      newErrors.netPremium = "Net premium cannot be negative";
    }

    if (formData.cashBack < 0) {
      newErrors.cashBack = "Cashback cannot be negative";
    }

    if (formData.balancePayment < 0) {
      newErrors.balancePayment = "Balance payment cannot be negative";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    await onSubmit({
      ...formData,
      customerEmail: formData.customerEmail?.trim().toLowerCase(),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingPolicy ? "Edit Policy" : "Create Policy"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {editingPolicy
                ? "Update policy information"
                : "Enter the policy information"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Basic Information */}
          <section>
            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormInput
                label="Month"
                name="month"
                value={formData.month}
                onChange={handleChange}
                error={errors.month}
                placeholder="August"
              />

              <FormInput
                label="SL No"
                name="slNo"
                type="number"
                value={formData.slNo}
                onChange={handleChange}
                error={errors.slNo}
                min="0"
              />

              <FormInput
                label="Reference"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                error={errors.reference}
                placeholder="Reference"
              />
            </div>
          </section>

          {/* Customer Information */}
          <section>
            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Customer Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormInput
                label="Customer Name"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                error={errors.customerName}
                required
                placeholder="Customer name"
              />

              <FormInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.customerEmail}
                placeholder="customer@example.com"
              />

              <FormInput
                label="Contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                error={errors.contact}
                required
                placeholder="10 digit mobile number"
                maxLength={10}
              />
            </div>
          </section>

          {/* Vehicle Information */}
          <section>
            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Vehicle Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormInput
                label="Vehicle No"
                name="vehicleNo"
                value={formData.vehicleNo}
                onChange={handleChange}
                error={errors.vehicleNo}
                required
                placeholder="KA01AB1234"
              />

              <FormInput
                label="Variant"
                name="variant"
                value={formData.variant}
                onChange={handleChange}
                error={errors.variant}
                required
                placeholder="Vehicle variant"
              />
            </div>
          </section>

          {/* Insurance Information */}
          <section>
            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Insurance Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormInput
                label="Insurer Company"
                name="insurerCompany"
                value={formData.insurerCompany}
                onChange={handleChange}
                error={errors.insurerCompany}
                required
                placeholder="Insurance company"
              />

              <FormInput
                label="Policy Number"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
                error={errors.policyNumber}
                required
                placeholder="Policy number"
              />

              <FormInput
                label="Broking / Agent Code"
                name="brokingCode"
                value={formData.brokingCode}
                onChange={handleChange}
                error={errors.brokingCode}
                placeholder="Agent code"
              />
            </div>
          </section>

          {/* Policy Dates */}
          <section>
            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Policy Dates
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormInput
                label="Policy Start Date"
                name="policyStartDate"
                type="date"
                value={formData.policyStartDate}
                onChange={handleChange}
                error={errors.policyStartDate}
                required
              />

              <FormInput
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                error={errors.endDate}
                required
              />
            </div>
          </section>

          {/* Financial Information */}
          <section>
            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Financial Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormInput
                label="IDV"
                name="idv"
                type="number"
                value={formData.idv}
                onChange={handleChange}
                error={errors.idv}
                min="0"
              />

              <FormInput
                label="NCB"
                name="ncb"
                type="number"
                value={formData.ncb}
                onChange={handleChange}
                error={errors.ncb}
                min="0"
              />

              <FormInput
                label="Premium"
                name="premium"
                type="number"
                value={formData.premium}
                onChange={handleChange}
                error={errors.premium}
                min="0"
              />

              <FormInput
                label="Net Premium"
                name="netPremium"
                type="number"
                value={formData.netPremium}
                onChange={handleChange}
                error={errors.netPremium}
                min="0"
              />

              <FormInput
                label="Cashback"
                name="cashBack"
                type="number"
                value={formData.cashBack}
                onChange={handleChange}
                error={errors.cashBack}
                min="0"
              />

              <FormInput
                label="Balance Payment"
                name="balancePayment"
                type="number"
                value={formData.balancePayment}
                onChange={handleChange}
                error={errors.balancePayment}
                min="0"
              />
            </div>
          </section>

          {/* Payment */}
          <section>
            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Payment Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Payment Mode
                </label>

                <select
                  name="policyPaymentMode"
                  value={formData.policyPaymentMode}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="BANK_TRANSFER">Bank Transfer</option>
                  <option value="CARD">Card</option>
                  <option value="CHEQUE">Cheque</option>
                  <option value="ONLINE">Online</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
          </section>

          {/* Status */}
          <section>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Policy Status
                </h3>

                <p className="text-xs text-gray-500">
                  Set whether this policy is active.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: !prev.isActive,
                  }))
                }
                className={`relative h-6 w-11 rounded-full transition ${
                  formData.isActive ? "bg-black" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    formData.isActive ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : editingPolicy
                  ? "Update Policy"
                  : "Create Policy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface FormInputProps {
  label: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  min?: string;
  maxLength?: number;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
  required = false,
  placeholder,
  min,
  maxLength,
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        maxLength={maxLength}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-1 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-black focus:ring-black"
        }`}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default PolicyForm;
