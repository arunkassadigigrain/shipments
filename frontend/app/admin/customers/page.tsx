"use client";
 
import Sidebar from "@/app/admin/components/sidebar";
import { useState, useMemo } from "react";
import { useGetAllCustomerQuery } from "@/app/admin/services/customerApi";
import { Menu } from "lucide-react";
type BillingAddress = {
  addressLine1: string;
  addressLine2?: string;
  cityOrDistrict: string;
  stateOrProvince: string;
  postalCode: number;
};
 
type Customer = {
  id: number;
  businessName: string;
  phoneNumber: string;
  email: string;
  contactPersonName: string;
  billingAddress: BillingAddress;
};
 
export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const { data: customers = [], isLoading, isError } = useGetAllCustomerQuery();
 
  // Filter customers based on search
  const filteredCustomers = useMemo(() => {
    const query = search.toLowerCase();
    return customers.filter((customer: Customer) =>
      customer.businessName.toLowerCase().includes(query)
    );
  }, [customers, search]);
 
  // Helper to format billing address
  const formatAddress = (address: BillingAddress) => {
    return `${address.addressLine1}${address.addressLine2 ? ", " + address.addressLine2 : ""}, ${address.cityOrDistrict}, ${address.stateOrProvince} - ${address.postalCode}`;
  };
 
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <Sidebar />
      <div className="drawer-content bg-base-200 p-6">
        {/* Header + Search */}
        {/* Drawer toggle button (mobile only) */}
                          <label
              htmlFor="my-drawer"
              className="btn btn-square btn-ghost lg:hidden"
            >
              <Menu className="h-5 w-5" />
                          </label>
       
 
 
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">All Customers</h1>
 
          <input
            type="text"
            placeholder="Search customers..."
            className="input input-bordered w-full md:w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
 
        {/* Table */}
        <div className="card bg-base-100 shadow rounded-xl">
          <div className="overflow-x-auto p-4">
            <table className="table table-zebra w-full">
            <thead className="text-black">
                <tr>
                  <th>Business Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Billing Address</th>
                  <th>Contact Person</th>
                </tr>
              </thead>
 
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400">
                      No matching customers found
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{item.businessName}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.email}</td>
                      <td>{formatAddress(item.billingAddress)}</td>
                      <td>{item.contactPersonName}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}