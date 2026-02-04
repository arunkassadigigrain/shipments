"use client";
 
import Sidebar from "@/app/admin/components/sidebar";
import { useState, useMemo } from "react";
import {useGetAllDriverQuery} from "@/app/admin/services/driverApi"
 
type Driver = {
    id:number;
    Drivername:string;
    phoneNumber:string;
   alternatePhoneNumber:string;
};
 
export default function DriverPage() {
  const [search, setSearch] = useState("");
   
   const{
    data:Drivers =[],
    isLoading,
    isError,
   }= useGetAllDriverQuery();
 
 
 
 
  // 🔹 Filter items using useMemo (VDOM optimized)
  const filteredDrivers = useMemo(() => {
    const query = search.toLowerCase();
return Drivers.filter(
    (Driver) =>
   Driver.Drivername.toLowerCase().includes(query) ||
   Driver.phoneNumber.toLowerCase().includes(query) ||
    Driver.alternatePhoneNumber.toLowerCase().includes(query)
   
);
  }, [ Drivers , search]);
 
   
 
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <Sidebar />
      <div className="drawer-content bg-base-200 p-6">
        {/* Header + Search (Right aligned) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">ALL Drivers</h1>
 
          <input
            type="text"
            placeholder="Search items..."
            className="input input-bordered w-full md:w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
 
        {/* Table */}
        <div className="card bg-base-100 shadow rounded-xl  w-full max-w-4xl  mx-auto ">
          <div className="overflow-x-auto p-5">
            <table className="table table-zebra table-m w-full  ">
              <thead className="text-black">
                <tr>
                  <th>DriverName</th>
                  <th>PhoneNumber</th>
                   <th>AlternatePhone</th>
                </tr>
              </thead>
 
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) :filteredDrivers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center text-gray-400">
                      No matching items found
                    </td>
                  </tr>
                ) : (
                 filteredDrivers.map((item) => (
                    <tr key={item.id}>
                      <td>{item.Drivername}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.alternatePhoneNumber || "-"} </td>
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
 