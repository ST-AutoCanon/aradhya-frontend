// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Pencil,
//   Trash2,
//   Plus,
//   Search,
//   RefreshCw,
//   MoreVertical,
//   Power,
//   PowerOff,
//   Upload,
//   Download,
//   FileSpreadsheet,
//   X,
// } from "lucide-react";
// import PolicyForm from "./PolicyForm";
// import {
//   activatePolicy,
//   createPolicy,
//   deactivatePolicy,
//   deletePolicy,
//   getPolicies,
//   updatePolicy,
//   downloadPolicyTemplate,
//   importPoliciesFromExcel,
//   type Policy,
//   type PolicyFormData,
//   type PolicyImportResult,
// } from "./policyService";

// const PolicyList: React.FC = () => {
//   const [policies, setPolicies] = useState<Policy[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [formLoading, setFormLoading] = useState(false);

//   const [formOpen, setFormOpen] = useState(false);
//   const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);

//   const [selectedRows, setSelectedRows] = useState<string[]>([]);
//   const [selectAll, setSelectAll] = useState(false);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<
//     "ALL" | "ACTIVE" | "INACTIVE"
//   >("ALL");

//   const [mobileMenuOpen, setMobileMenuOpen] = useState<string | null>(null);

//   const [importLoading, setImportLoading] = useState(false);
//   const [templateLoading, setTemplateLoading] = useState(false);
//   const [importResult, setImportResult] = useState<PolicyImportResult | null>(
//     null,
//   );

//   const handleDownloadTemplate = async () => {
//   try {
//     setTemplateLoading(true);

//     const blob = await downloadPolicyTemplate();

//     const url = window.URL.createObjectURL(blob);

//     const link = document.createElement("a");

//     link.href = url;
//     link.download = "policy-import-template.xlsx";

//     document.body.appendChild(link);

//     link.click();

//     link.remove();

//     window.URL.revokeObjectURL(url);
//   } catch (error: any) {
//     console.error("Template download error:", error);

//     const message =
//       error?.response?.data?.message ||
//       error?.message ||
//       "Failed to download template";

//     alert(message);
//   } finally {
//     setTemplateLoading(false);
//   }
//   };

// const handleImportExcel = async (
//   event: React.ChangeEvent<HTMLInputElement>,
// ) => {
//   const files = Array.from(event.target.files || []);

//   // Reset input so the same files can be selected again
//   event.target.value = "";

//   if (files.length === 0) return;

//   const allowedExtensions = [".xlsx", ".xls"];

//   const invalidFiles = files.filter((file) => {
//     const fileName = file.name.toLowerCase();

//     return !allowedExtensions.some((extension) => fileName.endsWith(extension));
//   });

//   if (invalidFiles.length > 0) {
//     alert(
//       `Invalid Excel file(s): ${invalidFiles
//         .map((file) => file.name)
//         .join(", ")}`,
//     );
//     return;
//   }

//   try {
//     setImportLoading(true);
//     setImportResult(null);

//     // Import each file
//     for (const file of files) {
//       await importPoliciesFromExcel(file);
//     }

//     await fetchPolicies();

//     alert(
//       files.length === 1
//         ? `${files[0].name} imported successfully!`
//         : `${files.length} Excel files imported successfully!`,
//     );
//   } catch (error: any) {
//     console.error("Excel import error:", error);

//     const message =
//       error?.response?.data?.message ||
//       error?.response?.data?.error ||
//       error?.message ||
//       "Failed to import Excel file(s)";

//     alert(message);
//   } finally {
//     setImportLoading(false);
//   }
// };

//   const fetchPolicies = async () => {
//     try {
//       setLoading(true);

//       const data = await getPolicies();

//       setPolicies(data);
//       setSelectedRows([]);
//       setSelectAll(false);
//     } catch (error) {
//       console.error("Error fetching policies:", error);

//       alert("Failed to fetch policies. Please check the backend connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   const filteredPolicies = useMemo(() => {
//     const searchValue = search.toLowerCase().trim();

//     return policies.filter((policy) => {
//       const matchesSearch =
//         !searchValue ||
//         policy.customerName?.toLowerCase().includes(searchValue) ||
//         policy.email?.toLowerCase().includes(searchValue) ||
//         policy.contact?.toLowerCase().includes(searchValue) ||
//         policy.vehicleNo?.toLowerCase().includes(searchValue) ||
//         policy.policyNumber?.toLowerCase().includes(searchValue) ||
//         policy.insurerCompany?.toLowerCase().includes(searchValue) ||
//         policy.brokingCode?.toLowerCase().includes(searchValue);

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         (statusFilter === "ACTIVE" && policy.isActive) ||
//         (statusFilter === "INACTIVE" && !policy.isActive);

//       return matchesSearch && matchesStatus;
//     });
//   }, [policies, search, statusFilter]);

//   const toggleRow = (id: string) => {
//     setSelectedRows((prev) => {
//       if (prev.includes(id)) {
//         return prev.filter((rowId) => rowId !== id);
//       }

//       return [...prev, id];
//     });
//   };

//   const toggleSelectAll = () => {
//     if (selectAll) {
//       setSelectedRows([]);
//       setSelectAll(false);
//       return;
//     }

//     const ids = filteredPolicies.map((policy) => policy._id);

//     setSelectedRows(ids);
//     setSelectAll(true);
//   };

//   useEffect(() => {
//     if (
//       filteredPolicies.length > 0 &&
//       selectedRows.length === filteredPolicies.length
//     ) {
//       setSelectAll(true);
//     } else {
//       setSelectAll(false);
//     }
//   }, [selectedRows, filteredPolicies]);

//   const handleCreate = () => {
//     setEditingPolicy(null);
//     setFormOpen(true);
//   };

//   const handleEdit = (policy: Policy) => {
//     setEditingPolicy(policy);
//     setFormOpen(true);
//     setMobileMenuOpen(null);
//   };

//   const handleCloseForm = () => {
//     if (formLoading) return;

//     setFormOpen(false);
//     setEditingPolicy(null);
//   };

//   const handleSubmit = async (data: PolicyFormData) => {
//     try {
//       setFormLoading(true);

//       if (editingPolicy) {
//         await updatePolicy(editingPolicy._id, data);

//         alert("Policy updated successfully!");
//       } else {
//         await createPolicy(data);

//         alert("Policy created successfully!");
//       }

//       setFormOpen(false);
//       setEditingPolicy(null);

//       await fetchPolicies();
//     } catch (error: any) {
//       console.error("Policy save error:", error);

//       const message =
//         error?.response?.data?.message ||
//         error?.response?.data?.error ||
//         error?.message ||
//         "Failed to save policy";

//       alert(message);
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleDelete = async (id?: string) => {
//     let ids: string[] = [];

//     if (id) {
//       ids = [id];
//     } else {
//       ids = selectedRows;
//     }

//     if (ids.length === 0) {
//       alert("Please select at least one policy.");
//       return;
//     }

//     const message =
//       ids.length === 1
//         ? "Are you sure you want to delete this policy?"
//         : `Are you sure you want to delete ${ids.length} selected policies?`;

//     const confirmed = window.confirm(message);

//     if (!confirmed) return;

//     try {
//       setLoading(true);

//       await Promise.all(ids.map((policyId) => deletePolicy(policyId)));

//       alert(
//         ids.length === 1
//           ? "Policy deleted successfully!"
//           : "Selected policies deleted successfully!",
//       );

//       await fetchPolicies();
//     } catch (error: any) {
//       console.error("Delete policy error:", error);

//       const message =
//         error?.response?.data?.message ||
//         error?.message ||
//         "Failed to delete policy";

//       alert(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (policy: Policy) => {
//     const action = policy.isActive ? "deactivate" : "activate";

//     const confirmed = window.confirm(
//       `Are you sure you want to ${action} this policy?`,
//     );

//     if (!confirmed) return;

//     try {
//       setLoading(true);

//       if (policy.isActive) {
//         await deactivatePolicy(policy._id);
//       } else {
//         await activatePolicy(policy._id);
//       }

//       await fetchPolicies();

//       alert(
//         policy.isActive
//           ? "Policy deactivated successfully!"
//           : "Policy activated successfully!",
//       );
//     } catch (error: any) {
//       console.error("Status update error:", error);

//       const message =
//         error?.response?.data?.message ||
//         error?.message ||
//         `Failed to ${action} policy`;

//       alert(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBulkStatusChange = async (active: boolean) => {
//     if (selectedRows.length === 0) {
//       alert("Please select at least one policy.");
//       return;
//     }

//     const action = active ? "activate" : "deactivate";

//     const confirmed = window.confirm(
//       `Are you sure you want to ${action} ${selectedRows.length} selected policies?`,
//     );

//     if (!confirmed) return;

//     try {
//       setLoading(true);

//       if (active) {
//         await Promise.all(selectedRows.map((id) => activatePolicy(id)));
//       } else {
//         await Promise.all(selectedRows.map((id) => deactivatePolicy(id)));
//       }

//       await fetchPolicies();

//       alert(
//         active
//           ? "Selected policies activated successfully!"
//           : "Selected policies deactivated successfully!",
//       );
//     } catch (error: any) {
//       console.error("Bulk status update error:", error);

//       alert(
//         error?.response?.data?.message ||
//           `Failed to ${action} selected policies`,
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (date: string) => {
//     if (!date) return "-";

//     const parsedDate = new Date(date);

//     if (Number.isNaN(parsedDate.getTime())) {
//       return "-";
//     }

//     return parsedDate.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const formatAmount = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       maximumFractionDigits: 2,
//     }).format(amount || 0);
//   };

//   return (
//     <div className="w-full rounded-lg bg-white p-4 shadow-sm">
//       {/* Header */}
//       <div className="mb-5 flex flex-col gap-4">
//         <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-900">
//               Policies List
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               Manage insurance policies
//             </p>
//           </div>

//           {/* <button
//             type="button"
//             onClick={handleCreate}
//             className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
//           >
//             <Plus className="h-4 w-4" />
//             Add Policy
//           </button> */}

//           <div className="flex flex-col gap-2 sm:flex-row">
//             {/* Download Template */}
//             <button
//               type="button"
//               onClick={handleDownloadTemplate}
//               disabled={templateLoading}
//               className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {templateLoading ? (
//                 <RefreshCw className="h-4 w-4 animate-spin" />
//               ) : (
//                 <Download className="h-4 w-4" />
//               )}

//               {templateLoading ? "Downloading..." : "Download Template"}
//             </button>

//             {/* Import Excel */}
//             <label
//               className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 ${
//                 importLoading ? "pointer-events-none opacity-50" : ""
//               }`}
//             >
//               {importLoading ? (
//                 <RefreshCw className="h-4 w-4 animate-spin" />
//               ) : (
//                 <Upload className="h-4 w-4" />
//               )}

//               {importLoading ? "Importing..." : "Import Excel"}

//               <input
//                 type="file"
//                 accept=".xlsx,.xls"
//                 multiple
//                 className="hidden"
//                 onChange={handleImportExcel}
//                 disabled={importLoading}
//               />
//             </label>

//             {/* Add Policy */}
//             <button
//               type="button"
//               onClick={handleCreate}
//               className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
//             >
//               <Plus className="h-4 w-4" />
//               Add Policy
//             </button>
//           </div>
//         </div>

//         {/* Excel Import Result */}
//         {importResult && (
//           <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <FileSpreadsheet className="h-5 w-5 text-gray-700" />

//                   <h3 className="text-sm font-semibold text-gray-900">
//                     Excel Import Result
//                   </h3>
//                 </div>

//                 <div className="mt-3 flex flex-wrap gap-3 text-sm">
//                   <span className="rounded-md bg-white px-3 py-1.5">
//                     Total: <strong>{importResult.totalRows}</strong>
//                   </span>

//                   <span className="rounded-md bg-white px-3 py-1.5">
//                     Imported: <strong>{importResult.successCount}</strong>
//                   </span>

//                   <span className="rounded-md bg-white px-3 py-1.5">
//                     Failed: <strong>{importResult.failedCount}</strong>
//                   </span>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setImportResult(null)}
//                 className="rounded-md p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-900"
//                 title="Close"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             </div>

//             {/* Failed Rows */}
//             {importResult.failedRows.length > 0 && (
//               <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 bg-white">
//                 <table className="min-w-full text-sm">
//                   <thead className="border-b border-gray-200 bg-gray-100">
//                     <tr>
//                       <th className="p-3 text-left">Excel Row</th>

//                       <th className="p-3 text-left">Customer</th>

//                       <th className="p-3 text-left">Policy Number</th>

//                       <th className="p-3 text-left">Error</th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-gray-200">
//                     {importResult.failedRows.map((failedRow) => (
//                       <tr key={failedRow.row}>
//                         <td className="p-3 font-medium">{failedRow.row}</td>

//                         <td className="p-3">
//                           {String(failedRow.data?.customerName || "-")}
//                         </td>

//                         <td className="p-3">
//                           {String(failedRow.data?.policyNumber || "-")}
//                         </td>

//                         <td className="p-3 text-gray-700">{failedRow.error}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Search + Filters */}
//         <div className="flex flex-col gap-3 lg:flex-row">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search customer, vehicle, policy number, insurer..."
//               className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
//             />
//           </div>

//           <select
//             value={statusFilter}
//             onChange={(e) =>
//               setStatusFilter(e.target.value as "ALL" | "ACTIVE" | "INACTIVE")
//             }
//             className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black"
//           >
//             <option value="ALL">All Policies</option>
//             <option value="ACTIVE">Active</option>
//             <option value="INACTIVE">Inactive</option>
//           </select>

//           <button
//             type="button"
//             onClick={fetchPolicies}
//             disabled={loading}
//             className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium hover:bg-gray-100 disabled:opacity-50"
//           >
//             <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
//             Refresh
//           </button>
//         </div>

//         {/* Bulk Actions */}
//         {selectedRows.length > 0 && (
//           <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
//             <span className="mr-2 text-sm font-medium text-gray-700">
//               {selectedRows.length} selected
//             </span>

//             <button
//               type="button"
//               onClick={() => handleBulkStatusChange(true)}
//               className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium hover:bg-gray-100"
//             >
//               <Power className="h-3.5 w-3.5" />
//               Activate
//             </button>

//             <button
//               type="button"
//               onClick={() => handleBulkStatusChange(false)}
//               className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium hover:bg-gray-100"
//             >
//               <PowerOff className="h-3.5 w-3.5" />
//               Deactivate
//             </button>

//             <button
//               type="button"
//               onClick={() => handleDelete()}
//               className="flex items-center gap-1.5 rounded-md bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800"
//             >
//               <Trash2 className="h-3.5 w-3.5" />
//               Delete
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Table */}
//       <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
//         <table className="min-w-[2100px] w-full table-auto text-sm">
//           <thead className="border-b border-gray-200 bg-gray-100">
//             <tr>
//               <th className="sticky left-0 z-10 bg-gray-100 p-3 text-left">
//                 <div
//                   onClick={toggleSelectAll}
//                   className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border transition ${
//                     selectAll
//                       ? "border-gray-500 bg-gray-500"
//                       : "border-gray-300 bg-white"
//                   }`}
//                 >
//                   {selectAll && (
//                     <div className="h-1.5 w-2.5 rotate-[-45deg] border-b-2 border-l-2 border-white" />
//                   )}
//                 </div>
//               </th>

//               <th className="p-3 text-left">SL</th>

//               <th className="p-3 text-left whitespace-nowrap">Month</th>

//               <th className="p-3 text-left whitespace-nowrap">Customer Name</th>

//               <th className="p-3 text-left whitespace-nowrap">Contact</th>

//               <th className="p-3 text-left whitespace-nowrap">Email</th>

//               <th className="p-3 text-left whitespace-nowrap">Reference</th>

//               <th className="p-3 text-left whitespace-nowrap">Vehicle No</th>

//               <th className="p-3 text-left whitespace-nowrap">Variant</th>

//               <th className="p-3 text-left whitespace-nowrap">
//                 Insurer Company
//               </th>

//               <th className="p-3 text-left whitespace-nowrap">Policy Number</th>

//               <th className="p-3 text-left whitespace-nowrap">
//                 Broking / Agent Code
//               </th>

//               <th className="p-3 text-left whitespace-nowrap">Start Date</th>

//               <th className="p-3 text-left whitespace-nowrap">End Date</th>

//               <th className="p-3 text-right whitespace-nowrap">IDV</th>

//               <th className="p-3 text-right whitespace-nowrap">NCB</th>

//               <th className="p-3 text-right whitespace-nowrap">Premium</th>

//               <th className="p-3 text-right whitespace-nowrap">Net Premium</th>

//               <th className="p-3 text-right whitespace-nowrap">Cashback</th>

//               <th className="p-3 text-right whitespace-nowrap">
//                 Balance Payment
//               </th>

//               <th className="p-3 text-left whitespace-nowrap">Payment Mode</th>

//               <th className="p-3 text-left whitespace-nowrap">Status</th>

//               <th className="sticky right-0 z-10 bg-gray-100 p-3 text-left">
//                 Action
//               </th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-200">
//             {loading && policies.length === 0 ? (
//               <tr>
//                 <td colSpan={23} className="p-10 text-center text-gray-500">
//                   <div className="flex items-center justify-center gap-2">
//                     <RefreshCw className="h-4 w-4 animate-spin" />
//                     Loading policies...
//                   </div>
//                 </td>
//               </tr>
//             ) : filteredPolicies.length === 0 ? (
//               <tr>
//                 <td colSpan={23} className="p-10 text-center text-gray-500">
//                   No policies found.
//                 </td>
//               </tr>
//             ) : (
//               filteredPolicies.map((policy, index) => {
//                 const selected = selectedRows.includes(policy._id);

//                 return (
//                   <tr
//                     key={policy._id}
//                     className={`transition hover:bg-gray-50 ${
//                       !policy.isActive ? "bg-gray-50" : ""
//                     }`}
//                   >
//                     {/* Checkbox */}
//                     <td className="sticky left-0 z-[1] bg-inherit p-3">
//                       <div
//                         onClick={() => toggleRow(policy._id)}
//                         className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border transition ${
//                           selected
//                             ? "border-gray-500 bg-gray-500"
//                             : "border-gray-300 bg-white"
//                         }`}
//                       >
//                         {selected && (
//                           <div className="h-1.5 w-2.5 rotate-[-45deg] border-b-2 border-l-2 border-white" />
//                         )}
//                       </div>
//                     </td>

//                     {/* SL */}
//                     <td className="p-3">{index + 1}</td>

//                     {/* Month */}
//                     <td className="p-3 whitespace-nowrap">
//                       {policy.month || "-"}
//                     </td>

//                     {/* Customer */}
//                     <td className="max-w-[180px] p-3 font-medium">
//                       <span className="block truncate">
//                         {policy.customerName}
//                       </span>
//                     </td>

//                     {/* Contact */}
//                     <td className="p-3 whitespace-nowrap">{policy.contact}</td>

//                     {/* Email */}
//                     <td className="max-w-[220px] p-3">
//                       <span className="block truncate">
//                         {policy.email || "-"}
//                       </span>
//                     </td>

//                     {/* Reference */}
//                     <td className="max-w-[150px] p-3">
//                       <span className="block truncate">
//                         {policy.reference || "-"}
//                       </span>
//                     </td>

//                     {/* Vehicle */}
//                     <td className="p-3 font-medium whitespace-nowrap">
//                       {policy.vehicleNo}
//                     </td>

//                     {/* Variant */}
//                     <td className="max-w-[150px] p-3">
//                       <span className="block truncate">{policy.variant}</span>
//                     </td>

//                     {/* Insurer */}
//                     <td className="max-w-[180px] p-3">
//                       <span className="block truncate">
//                         {policy.insurerCompany}
//                       </span>
//                     </td>

//                     {/* Policy Number */}
//                     <td className="p-3 whitespace-nowrap">
//                       {policy.policyNumber}
//                     </td>

//                     {/* Broking */}
//                     <td className="p-3 whitespace-nowrap">
//                       {policy.brokingCode || "-"}
//                     </td>

//                     {/* Start Date */}
//                     <td className="p-3 whitespace-nowrap">
//                       {formatDate(policy.policyStartDate)}
//                     </td>

//                     {/* End Date */}
//                     <td className="p-3 whitespace-nowrap">
//                       {formatDate(policy.endDate)}
//                     </td>

//                     {/* IDV */}
//                     <td className="p-3 text-right whitespace-nowrap">
//                       ₹ {formatAmount(policy.idv)}
//                     </td>

//                     {/* NCB */}
//                     <td className="p-3 text-right whitespace-nowrap">
//                       {policy.ncb}%
//                     </td>

//                     {/* Premium */}
//                     <td className="p-3 text-right whitespace-nowrap">
//                       ₹ {formatAmount(policy.premium)}
//                     </td>

//                     {/* Net Premium */}
//                     <td className="p-3 text-right whitespace-nowrap">
//                       ₹ {formatAmount(policy.netPremium)}
//                     </td>

//                     {/* Cashback */}
//                     <td className="p-3 text-right whitespace-nowrap">
//                       ₹ {formatAmount(policy.cashBack)}
//                     </td>

//                     {/* Balance */}
//                     <td className="p-3 text-right whitespace-nowrap">
//                       ₹ {formatAmount(policy.balancePayment)}
//                     </td>

//                     {/* Payment Mode */}
//                     <td className="p-3 whitespace-nowrap">
//                       {policy.policyPaymentMode.replace(/_/g, " ")}
//                     </td>

//                     {/* Status */}
//                     <td className="p-3">
//                       <button
//                         type="button"
//                         onClick={() => handleStatusChange(policy)}
//                         className={`rounded-full px-3 py-1 text-xs font-medium transition ${
//                           policy.isActive
//                             ? "bg-gray-900 text-white hover:bg-gray-700"
//                             : "bg-gray-200 text-gray-600 hover:bg-gray-300"
//                         }`}
//                       >
//                         {policy.isActive ? "Active" : "Inactive"}
//                       </button>
//                     </td>

//                     {/* Actions */}
//                     <td className="sticky right-0 z-[1] bg-inherit p-3">
//                       {/* Desktop */}
//                       <div className="hidden items-center gap-1 sm:flex">
//                         <button
//                           type="button"
//                           onClick={() => handleEdit(policy)}
//                           className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100"
//                           title="Edit"
//                         >
//                           <Pencil className="h-4 w-4" />
//                         </button>

//                         <button
//                           type="button"
//                           onClick={() => handleStatusChange(policy)}
//                           className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100"
//                           title={policy.isActive ? "Deactivate" : "Activate"}
//                         >
//                           {policy.isActive ? (
//                             <PowerOff className="h-4 w-4" />
//                           ) : (
//                             <Power className="h-4 w-4" />
//                           )}
//                         </button>

//                         <button
//                           type="button"
//                           onClick={() => handleDelete(policy._id)}
//                           className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100"
//                           title="Delete"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>

//                       {/* Mobile */}
//                       <div className="relative sm:hidden">
//                         <button
//                           type="button"
//                           onClick={() =>
//                             setMobileMenuOpen(
//                               mobileMenuOpen === policy._id ? null : policy._id,
//                             )
//                           }
//                           className="rounded-md p-1 hover:bg-gray-100"
//                         >
//                           <MoreVertical className="h-5 w-5" />
//                         </button>

//                         {mobileMenuOpen === policy._id && (
//                           <div className="absolute right-0 top-8 z-50 flex w-36 flex-col gap-1 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
//                             <button
//                               type="button"
//                               onClick={() => handleEdit(policy)}
//                               className="flex items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-gray-100"
//                             >
//                               <Pencil className="h-4 w-4" />
//                               Edit
//                             </button>

//                             <button
//                               type="button"
//                               onClick={() => handleStatusChange(policy)}
//                               className="flex items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-gray-100"
//                             >
//                               {policy.isActive ? (
//                                 <>
//                                   <PowerOff className="h-4 w-4" />
//                                   Deactivate
//                                 </>
//                               ) : (
//                                 <>
//                                   <Power className="h-4 w-4" />
//                                   Activate
//                                 </>
//                               )}
//                             </button>

//                             <button
//                               type="button"
//                               onClick={() => handleDelete(policy._id)}
//                               className="flex items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-gray-100"
//                             >
//                               <Trash2 className="h-4 w-4" />
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Footer */}
//       <div className="mt-3 flex flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
//         <span>
//           Showing {filteredPolicies.length} of {policies.length} policies
//         </span>

//         {selectedRows.length > 0 && <span>{selectedRows.length} selected</span>}
//       </div>

//       {/* Create / Edit Form */}
//       <PolicyForm
//         isOpen={formOpen}
//         onClose={handleCloseForm}
//         onSubmit={handleSubmit}
//         editingPolicy={editingPolicy}
//         loading={formLoading}
//       />
//     </div>
//   );
// };

// export default PolicyList;

import React, { useEffect, useMemo, useState } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  Search,
  RefreshCw,
  MoreVertical,
  Power,
  PowerOff,
  Upload,
  Download,
  FileSpreadsheet,
  X,
} from "lucide-react";
import PolicyForm from "./PolicyForm";
import {
  activatePolicy,
  createPolicy,
  deactivatePolicy,
  deletePolicy,
  getPolicies,
  updatePolicy,
  downloadPolicyTemplate,
  importPoliciesFromExcel,
  type Policy,
  type PolicyFormData,
  type PolicyImportResult,
} from "./policyService";

const PolicyList: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "ACTIVE" | "INACTIVE"
  >("ALL");

  const [mobileMenuOpen, setMobileMenuOpen] = useState<string | null>(null);

  const [importLoading, setImportLoading] = useState(false);
  const [templateLoading, setTemplateLoading] = useState(false);

  const [importResult, setImportResult] = useState<PolicyImportResult | null>(
    null,
  );

  // ============================================================
  // Download Excel Template
  // ============================================================

  const handleDownloadTemplate = async () => {
    try {
      setTemplateLoading(true);

      const blob = await downloadPolicyTemplate();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "policy-import-template.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error("Template download error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to download template";

      alert(message);
    } finally {
      setTemplateLoading(false);
    }
  };

  // ============================================================
  // Import Multiple Excel Files
  // ============================================================

  const handleImportExcel = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);

    // Reset input so the same file(s) can be selected again
    event.target.value = "";

    if (files.length === 0) {
      return;
    }

    const allowedExtensions = [".xlsx", ".xls"];

    // ----------------------------------------------------------
    // Validate all selected files
    // ----------------------------------------------------------

    const invalidFiles = files.filter((file) => {
      const fileName = file.name.toLowerCase();

      return !allowedExtensions.some((extension) =>
        fileName.endsWith(extension),
      );
    });

    if (invalidFiles.length > 0) {
      alert(
        `Invalid Excel file(s):\n\n${invalidFiles
          .map((file) => file.name)
          .join("\n")}\n\nPlease select only .xlsx or .xls files.`,
      );

      return;
    }

    try {
      setImportLoading(true);
      setImportResult(null);

      // --------------------------------------------------------
      // Import files one by one
      // --------------------------------------------------------

      const results: PolicyImportResult[] = [];

      for (const file of files) {
        try {
          console.log(`Importing Excel file: ${file.name}`);

          const result = await importPoliciesFromExcel(file);

          results.push(result);
        } catch (error) {
          console.error(`Failed to import ${file.name}:`, error);

          // Continue importing the remaining files.
          // We don't stop the complete import process because
          // one file failed.
        }
      }

      // --------------------------------------------------------
      // If all files failed at API level
      // --------------------------------------------------------

      if (results.length === 0) {
        alert(
          files.length === 1
            ? `Failed to import ${files[0].name}.`
            : `Failed to import all ${files.length} Excel files.`,
        );

        return;
      }

      // --------------------------------------------------------
      // Combine results from all imported files
      // --------------------------------------------------------

      const combinedResult: PolicyImportResult = {
        totalRows: results.reduce(
          (total, result) => total + Number(result.totalRows || 0),
          0,
        ),

        successCount: results.reduce(
          (total, result) => total + Number(result.successCount || 0),
          0,
        ),

        failedCount: results.reduce(
          (total, result) => total + Number(result.failedCount || 0),
          0,
        ),

        failedRows: results.flatMap((result) => result.failedRows || []),
      };

      // --------------------------------------------------------
      // Save combined result
      // --------------------------------------------------------

      setImportResult(combinedResult);

      // --------------------------------------------------------
      // Refresh policies
      // --------------------------------------------------------

      await fetchPolicies();

      // --------------------------------------------------------
      // Final message
      // --------------------------------------------------------

      const failedFileCount = files.length - results.length;

      if (combinedResult.failedCount === 0 && failedFileCount === 0) {
        alert(
          files.length === 1
            ? `${combinedResult.successCount} policies imported successfully from ${files[0].name}.`
            : `${files.length} Excel files imported successfully. ${combinedResult.successCount} policies imported.`,
        );
      } else {
        let message =
          `${combinedResult.successCount} policies imported successfully. ` +
          `${combinedResult.failedCount} rows failed.`;

        if (failedFileCount > 0) {
          message += ` ${failedFileCount} file(s) could not be processed.`;
        }

        alert(message);
      }
    } catch (error: any) {
      console.error("Excel import error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to import Excel file(s)";

      alert(message);
    } finally {
      setImportLoading(false);
    }
  };

  // ============================================================
  // Fetch Policies
  // ============================================================

  const fetchPolicies = async () => {
    try {
      setLoading(true);

      const data = await getPolicies();

      setPolicies(data);
      setSelectedRows([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error fetching policies:", error);

      alert("Failed to fetch policies. Please check the backend connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  // ============================================================
  // Filter Policies
  // ============================================================

  const filteredPolicies = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return policies.filter((policy) => {
      const matchesSearch =
        !searchValue ||
        policy.customerName?.toLowerCase().includes(searchValue) ||
        policy.email?.toLowerCase().includes(searchValue) ||
        policy.contact?.toLowerCase().includes(searchValue) ||
        policy.vehicleNo?.toLowerCase().includes(searchValue) ||
        policy.policyNumber?.toLowerCase().includes(searchValue) ||
        policy.insurerCompany?.toLowerCase().includes(searchValue) ||
        policy.brokingCode?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && policy.isActive) ||
        (statusFilter === "INACTIVE" && !policy.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [policies, search, statusFilter]);

  // ============================================================
  // Row Selection
  // ============================================================

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      }

      return [...prev, id];
    });
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
      return;
    }

    const ids = filteredPolicies.map((policy) => policy._id);

    setSelectedRows(ids);
    setSelectAll(true);
  };

  useEffect(() => {
    if (
      filteredPolicies.length > 0 &&
      selectedRows.length === filteredPolicies.length
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedRows, filteredPolicies]);

  // ============================================================
  // Create / Edit
  // ============================================================

  const handleCreate = () => {
    setEditingPolicy(null);
    setFormOpen(true);
  };

  const handleEdit = (policy: Policy) => {
    setEditingPolicy(policy);
    setFormOpen(true);
    setMobileMenuOpen(null);
  };

  const handleCloseForm = () => {
    if (formLoading) return;

    setFormOpen(false);
    setEditingPolicy(null);
  };

  const handleSubmit = async (data: PolicyFormData) => {
    try {
      setFormLoading(true);

      if (editingPolicy) {
        await updatePolicy(editingPolicy._id, data);

        alert("Policy updated successfully!");
      } else {
        await createPolicy(data);

        alert("Policy created successfully!");
      }

      setFormOpen(false);
      setEditingPolicy(null);

      await fetchPolicies();
    } catch (error: any) {
      console.error("Policy save error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to save policy";

      alert(message);
    } finally {
      setFormLoading(false);
    }
  };

  // ============================================================
  // Delete
  // ============================================================

  const handleDelete = async (id?: string) => {
    let ids: string[] = [];

    if (id) {
      ids = [id];
    } else {
      ids = selectedRows;
    }

    if (ids.length === 0) {
      alert("Please select at least one policy.");
      return;
    }

    const message =
      ids.length === 1
        ? "Are you sure you want to delete this policy?"
        : `Are you sure you want to delete ${ids.length} selected policies?`;

    const confirmed = window.confirm(message);

    if (!confirmed) return;

    try {
      setLoading(true);

      await Promise.all(ids.map((policyId) => deletePolicy(policyId)));

      alert(
        ids.length === 1
          ? "Policy deleted successfully!"
          : "Selected policies deleted successfully!",
      );

      await fetchPolicies();
    } catch (error: any) {
      console.error("Delete policy error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete policy";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // Status Change
  // ============================================================

  const handleStatusChange = async (policy: Policy) => {
    const action = policy.isActive ? "deactivate" : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this policy?`,
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      if (policy.isActive) {
        await deactivatePolicy(policy._id);
      } else {
        await activatePolicy(policy._id);
      }

      await fetchPolicies();

      alert(
        policy.isActive
          ? "Policy deactivated successfully!"
          : "Policy activated successfully!",
      );
    } catch (error: any) {
      console.error("Status update error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        `Failed to ${action} policy`;

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // Bulk Status Change
  // ============================================================

  const handleBulkStatusChange = async (active: boolean) => {
    if (selectedRows.length === 0) {
      alert("Please select at least one policy.");
      return;
    }

    const action = active ? "activate" : "deactivate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${selectedRows.length} selected policies?`,
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      if (active) {
        await Promise.all(selectedRows.map((id) => activatePolicy(id)));
      } else {
        await Promise.all(selectedRows.map((id) => deactivatePolicy(id)));
      }

      await fetchPolicies();

      alert(
        active
          ? "Selected policies activated successfully!"
          : "Selected policies deactivated successfully!",
      );
    } catch (error: any) {
      console.error("Bulk status update error:", error);

      alert(
        error?.response?.data?.message ||
          `Failed to ${action} selected policies`,
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // Formatting
  // ============================================================

  const formatDate = (date: string) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Policies List
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage insurance policies
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            {/* Download Template */}
            <button
              type="button"
              onClick={handleDownloadTemplate}
              disabled={templateLoading}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {templateLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}

              {templateLoading ? "Downloading..." : "Download Template"}
            </button>

            {/* Import Excel */}
            <label
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 ${
                importLoading ? "pointer-events-none opacity-50" : ""
              }`}
            >
              {importLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}

              {importLoading ? "Importing..." : "Import Excel"}

              <input
                type="file"
                accept=".xlsx,.xls"
                multiple
                className="hidden"
                onChange={handleImportExcel}
                disabled={importLoading}
              />
            </label>

            {/* Add Policy */}
            <button
              type="button"
              onClick={handleCreate}
              className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              <Plus className="h-4 w-4" />
              Add Policy
            </button>
          </div>
        </div>

        {/* ======================================================
            Excel Import Result
        ====================================================== */}

        {importResult && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-gray-700" />

                  <h3 className="text-sm font-semibold text-gray-900">
                    Excel Import Result
                  </h3>
                </div>

                <div className="mt-3 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-md bg-white px-3 py-1.5">
                    Total: <strong>{importResult.totalRows}</strong>
                  </span>

                  <span className="rounded-md bg-white px-3 py-1.5">
                    Imported: <strong>{importResult.successCount}</strong>
                  </span>

                  <span className="rounded-md bg-white px-3 py-1.5">
                    Failed: <strong>{importResult.failedCount}</strong>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setImportResult(null)}
                className="rounded-md p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Failed Rows */}
            {importResult.failedRows.length > 0 && (
              <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 bg-white">
                <table className="min-w-full text-sm">
                  <thead className="border-b border-gray-200 bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">Excel Row</th>
                      <th className="p-3 text-left">Customer</th>
                      <th className="p-3 text-left">Policy Number</th>
                      <th className="p-3 text-left">Error</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {importResult.failedRows.map((failedRow, index) => (
                      <tr
                        key={`${failedRow.row}-${index}`}
                        className="hover:bg-gray-50"
                      >
                        <td className="p-3 font-medium">{failedRow.row}</td>

                        <td className="p-3">
                          {String(failedRow.data?.customerName || "-")}
                        </td>

                        <td className="p-3">
                          {String(failedRow.data?.policyNumber || "-")}
                        </td>

                        <td className="p-3 text-gray-700">{failedRow.error}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Search + Filters */}
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer, vehicle, policy number, insurer..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "ALL" | "ACTIVE" | "INACTIVE")
            }
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black"
          >
            <option value="ALL">All Policies</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          <button
            type="button"
            onClick={fetchPolicies}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium hover:bg-gray-100 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Bulk Actions */}
        {selectedRows.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
            <span className="mr-2 text-sm font-medium text-gray-700">
              {selectedRows.length} selected
            </span>

            <button
              type="button"
              onClick={() => handleBulkStatusChange(true)}
              className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium hover:bg-gray-100"
            >
              <Power className="h-3.5 w-3.5" />
              Activate
            </button>

            <button
              type="button"
              onClick={() => handleBulkStatusChange(false)}
              className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium hover:bg-gray-100"
            >
              <PowerOff className="h-3.5 w-3.5" />
              Deactivate
            </button>

            <button
              type="button"
              onClick={() => handleDelete()}
              className="flex items-center gap-1.5 rounded-md bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-[2100px] w-full table-auto text-sm">
          <thead className="border-b border-gray-200 bg-gray-100">
            <tr>
              <th className="sticky left-0 z-10 bg-gray-100 p-3 text-left">
                <div
                  onClick={toggleSelectAll}
                  className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border transition ${
                    selectAll
                      ? "border-gray-500 bg-gray-500"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {selectAll && (
                    <div className="h-1.5 w-2.5 rotate-[-45deg] border-b-2 border-l-2 border-white" />
                  )}
                </div>
              </th>

              <th className="p-3 text-left">SL</th>
              <th className="whitespace-nowrap p-3 text-left">Month</th>
              <th className="whitespace-nowrap p-3 text-left">Customer Name</th>
              <th className="whitespace-nowrap p-3 text-left">Contact</th>
              <th className="whitespace-nowrap p-3 text-left">Email</th>
              <th className="whitespace-nowrap p-3 text-left">Reference</th>
              <th className="whitespace-nowrap p-3 text-left">Vehicle No</th>
              <th className="whitespace-nowrap p-3 text-left">Variant</th>
              <th className="whitespace-nowrap p-3 text-left">
                Insurer Company
              </th>
              <th className="whitespace-nowrap p-3 text-left">Policy Number</th>
              <th className="whitespace-nowrap p-3 text-left">
                Broking / Agent Code
              </th>
              <th className="whitespace-nowrap p-3 text-left">Start Date</th>
              <th className="whitespace-nowrap p-3 text-left">End Date</th>
              <th className="whitespace-nowrap p-3 text-right">IDV</th>
              <th className="whitespace-nowrap p-3 text-right">NCB</th>
              <th className="whitespace-nowrap p-3 text-right">Premium</th>
              <th className="whitespace-nowrap p-3 text-right">Net Premium</th>
              <th className="whitespace-nowrap p-3 text-right">Cashback</th>
              <th className="whitespace-nowrap p-3 text-right">
                Balance Payment
              </th>
              <th className="whitespace-nowrap p-3 text-left">Payment Mode</th>
              <th className="whitespace-nowrap p-3 text-left">Status</th>
              <th className="sticky right-0 z-10 bg-gray-100 p-3 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading && policies.length === 0 ? (
              <tr>
                <td colSpan={23} className="p-10 text-center text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Loading policies...
                  </div>
                </td>
              </tr>
            ) : filteredPolicies.length === 0 ? (
              <tr>
                <td colSpan={23} className="p-10 text-center text-gray-500">
                  No policies found.
                </td>
              </tr>
            ) : (
              filteredPolicies.map((policy, index) => {
                const selected = selectedRows.includes(policy._id);

                return (
                  <tr
                    key={policy._id}
                    className={`transition hover:bg-gray-50 ${
                      !policy.isActive ? "bg-gray-50" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="sticky left-0 z-[1] bg-inherit p-3">
                      <div
                        onClick={() => toggleRow(policy._id)}
                        className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border transition ${
                          selected
                            ? "border-gray-500 bg-gray-500"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {selected && (
                          <div className="h-1.5 w-2.5 rotate-[-45deg] border-b-2 border-l-2 border-white" />
                        )}
                      </div>
                    </td>

                    {/* SL */}
                    <td className="p-3">{index + 1}</td>

                    {/* Month */}
                    <td className="whitespace-nowrap p-3">
                      {policy.month || "-"}
                    </td>

                    {/* Customer */}
                    <td className="max-w-[180px] p-3 font-medium">
                      <span className="block truncate">
                        {policy.customerName}
                      </span>
                    </td>

                    {/* Contact */}
                    <td className="whitespace-nowrap p-3">{policy.contact}</td>

                    {/* Email */}
                    <td className="max-w-[220px] p-3">
                      <span className="block truncate">
                        {policy.email || "-"}
                      </span>
                    </td>

                    {/* Reference */}
                    <td className="max-w-[150px] p-3">
                      <span className="block truncate">
                        {policy.reference || "-"}
                      </span>
                    </td>

                    {/* Vehicle */}
                    <td className="whitespace-nowrap p-3 font-medium">
                      {policy.vehicleNo}
                    </td>

                    {/* Variant */}
                    <td className="max-w-[150px] p-3">
                      <span className="block truncate">{policy.variant}</span>
                    </td>

                    {/* Insurer */}
                    <td className="max-w-[180px] p-3">
                      <span className="block truncate">
                        {policy.insurerCompany}
                      </span>
                    </td>

                    {/* Policy Number */}
                    <td className="whitespace-nowrap p-3">
                      {policy.policyNumber}
                    </td>

                    {/* Broking */}
                    <td className="whitespace-nowrap p-3">
                      {policy.brokingCode || "-"}
                    </td>

                    {/* Start Date */}
                    <td className="whitespace-nowrap p-3">
                      {formatDate(policy.policyStartDate)}
                    </td>

                    {/* End Date */}
                    <td className="whitespace-nowrap p-3">
                      {formatDate(policy.endDate)}
                    </td>

                    {/* IDV */}
                    <td className="whitespace-nowrap p-3 text-right">
                      ₹ {formatAmount(policy.idv)}
                    </td>

                    {/* NCB */}
                    <td className="whitespace-nowrap p-3 text-right">
                      {policy.ncb}%
                    </td>

                    {/* Premium */}
                    <td className="whitespace-nowrap p-3 text-right">
                      ₹ {formatAmount(policy.premium)}
                    </td>

                    {/* Net Premium */}
                    <td className="whitespace-nowrap p-3 text-right">
                      ₹ {formatAmount(policy.netPremium)}
                    </td>

                    {/* Cashback */}
                    <td className="whitespace-nowrap p-3 text-right">
                      ₹ {formatAmount(policy.cashBack)}
                    </td>

                    {/* Balance */}
                    <td className="whitespace-nowrap p-3 text-right">
                      ₹ {formatAmount(policy.balancePayment)}
                    </td>

                    {/* Payment Mode */}
                    <td className="whitespace-nowrap p-3">
                      {policy.policyPaymentMode.replace(/_/g, " ")}
                    </td>

                    {/* Status */}
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => handleStatusChange(policy)}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                          policy.isActive
                            ? "bg-gray-900 text-white hover:bg-gray-700"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                      >
                        {policy.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="sticky right-0 z-[1] bg-white p-3">
                      {/* Desktop */}
                      <div className="hidden items-center gap-1 sm:flex">
                        <button
                          type="button"
                          onClick={() => handleEdit(policy)}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white hover:bg-gray-100"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatusChange(policy)}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white hover:bg-gray-100"
                          title={policy.isActive ? "Deactivate" : "Activate"}
                        >
                          {policy.isActive ? (
                            <PowerOff className="h-4 w-4" />
                          ) : (
                            <Power className="h-4 w-4" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(policy._id)}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white hover:bg-gray-100"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Mobile */}
                      <div className="relative sm:hidden">
                        <button
                          type="button"
                          onClick={() =>
                            setMobileMenuOpen(
                              mobileMenuOpen === policy._id ? null : policy._id,
                            )
                          }
                          className="rounded-md p-1 hover:bg-gray-100"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>

                        {mobileMenuOpen === policy._id && (
                          <div className="absolute right-0 top-8 z-50 flex w-36 flex-col gap-1 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                            <button
                              type="button"
                              onClick={() => handleEdit(policy)}
                              className="flex items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-gray-100"
                            >
                              <Pencil className="h-4 w-4" />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleStatusChange(policy)}
                              className="flex items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-gray-100"
                            >
                              {policy.isActive ? (
                                <>
                                  <PowerOff className="h-4 w-4" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <Power className="h-4 w-4" />
                                  Activate
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(policy._id)}
                              className="flex items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-gray-100"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-3 flex flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <span>
          Showing {filteredPolicies.length} of {policies.length} policies
        </span>

        {selectedRows.length > 0 && <span>{selectedRows.length} selected</span>}
      </div>

      {/* Create / Edit Form */}
      <PolicyForm
        isOpen={formOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        editingPolicy={editingPolicy}
        loading={formLoading}
      />
    </div>
  );
};

export default PolicyList;