// import Link from "next/link";
// import Image from "next/image";
// import { Menu, ShoppingBag, Users, Truck, User, Ship, MapPin, BarChart3, Settings } from "lucide-react";
// import ThemeToggle from "./ThemeToggle";

// export default function Sidebar() {
//   return (
//     <>
//       {/* Drawer Toggle Input */}
//       <input id="my-drawer" type="checkbox" className="drawer-toggle" />

//       {/* Sidebar */}
//       <div className="drawer-side z-50 hide-scrollbar">
//         <label
//           htmlFor="my-drawer"
//           aria-label="close sidebar"
//           className="drawer-overlay"
//         ></label>

//         <ul className="menu p-6 w-80 min-h-full bg-base-200/80 backdrop-blur-md text-base-content overflow-y-auto border-r border-base-300/30 shadow-2xl font-medium flex flex-col gap-3 hide-scrollbar">

//           {/* Logo & Title - Desktop Only */}
//           <div className="hidden lg:flex items-center gap-4 px-2 mb-8">
//             <Link href="/" className="flex items-center gap-4 group">
//               <div className="flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/10">
//                 <Image
//                   src="/digigrainLogo.png"
//                   alt="Digi Grain Logo"
//                   width={64}
//                   height={64}
//                   className="object-contain rounded-xl"
//                 />
//               </div>
//             </Link>
//             <div>
//               <h1 className="font-bold bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent">
//                 Shipment Trackings
//               </h1>
//             </div>
//           </div>

//           {/* Mobile Close Button */}
//           <div className="flex lg:hidden justify-end mb-4">
//             <label htmlFor="my-drawer" className="btn btn-ghost btn-circle hover:bg-base-300 transition-all">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={2}
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </label>
//           </div>

//           {/* Menu Items */}
//           <li>
//             <details open>
//               <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
//                 <ShoppingBag className="h-5 w-5 text-primary" />
//                 Item Master
//               </summary>
//               <ul className="ml-6 mt-2 space-y-1">
//                 <li>
//                   <Link
//                     href="/Items/add-Item"
//                     className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
//                   >
//                     Add Item
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/Items"
//                     className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
//                   >
//                     All Items
//                   </Link>
//                 </li>
//               </ul>
//             </details>
//           </li>

//           <li>
//             <details>
//               <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
//                 <Users className="h-5 w-5 text-primary" />
//                 Customer Master
//               </summary>
//               <ul className="ml-6 mt-2 space-y-1">
//                 <li>
//                   <Link
//                     href="/customers/add-customer"
//                     className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
//                   >
//                     Add Customer
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/customers"
//                     className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
//                   >
//                     All Customers
//                   </Link>
//                 </li>
//               </ul>
//             </details>
//           </li>

//           <li>
//             <details>
//               <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
//                 <Truck className="h-5 w-5 text-primary" />
//                 Truck Master
//               </summary>
//               <ul className="ml-6 mt-2 space-y-1">
//                 <li>
//                   <Link
//                     href="/trucks/add-trucks"
//                     className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
//                   >
//                     Add Truck
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/trucks"
//                     className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
//                   >
//                     All Trucks
//                   </Link>
//                 </li>
//               </ul>
//             </details>
//           </li>

//           <li>
//             <details>
//               <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
//                 <User className="h-5 w-5 text-primary" />
//                 Driver Master
//               </summary>
//               <ul className="ml-6 mt-2 space-y-1">
//                 <li>
//                   <Link
//                     href="/drivers/add-driver"
//                     className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
//                   >
//                     Add Driver
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/drivers"
//                     className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
//                   >
//                     All Drivers
//                   </Link>
//                 </li>
//               </ul>
//             </details>
//           </li>

//           <li>
//             <details>
//               <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
//                 <Ship className="h-5 w-5 text-primary" />
//                 Shipments
//               </summary>
//               <ul className="ml-6 mt-2 space-y-1">
//                 <li>
//                   <Link
//                     href="/shipments/add-shipment"
//                     className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
//                   >
//                     Add Shipment
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/shipments/status"
//                     className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
//                   >
//                     Shipment Status
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/shipments"
//                     className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
//                   >
//                     All Shipments
//                   </Link>
//                 </li>
//               </ul>
//             </details>
//           </li>

//           <li>
//             <details>
//               <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
//                 <MapPin className="h-5 w-5 text-primary" />
//                 Trips
//               </summary>
//               <ul className="ml-6 mt-2 space-y-1">
//                 <li>
//                   <Link
//                     href="/trips/add-trip"
//                     className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
//                   >
//                     Add Trip
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/trips/status"
//                     className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
//                   >
//                     Trip Status
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/trips"
//                     className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
//                   >
//                     All Trips
//                   </Link>
//                 </li>
//               </ul>
//             </details>
//           </li>

//           <div className="divider my-8 opacity-50"></div>

//           <li>
//             <Link
//               href="/reports"
//               className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold"
//             >
//               <BarChart3 className="h-5 w-5 text-primary" />
//               Reports
//             </Link>
//           </li>

//           <li className="mt-auto">
//             <div className="flex items-center justify-between px-4 py-3">
//               <Link
//                 href="/settings"
//                 className="flex items-center gap-3 hover:bg-base-300/70 rounded-xl px-4 py-3 -ml-4 flex-1 transition-all duration-300 hover:shadow-md font-semibold"
//               >
//                 <Settings className="h-5 w-5 text-primary" />
//                 Settings
//               </Link>
//               <ThemeToggle />
//             </div>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// }



import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingBag, Users, Truck, User, Ship, MapPin, BarChart3, Settings } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  return (
    <>
      {/* Drawer Toggle Input */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Sidebar */}
      <div className="drawer-side z-50 hide-scrollbar">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul 
          className="menu p-6 w-80 min-h-full bg-base-200/80 backdrop-blur-md text-base-content overflow-y-auto border-r border-base-300/30 shadow-2xl font-medium flex flex-col gap-3 hide-scrollbar"
          style={{ '--p': '#007dc5', '--pf': '#71bf43' } as React.CSSProperties}
        >

          {/* Logo & Title - Desktop Only */}
          <div className="hidden lg:flex items-center gap-4 px-2 mb-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/10">
                <Image
                  src="/digigrainLogo.png"
                  alt="Digi Grain Logo"
                  width={64}
                  height={64}
                  className="object-contain rounded-xl"
                />
              </div>
            </Link>
            <div>
              <h1 className="font-bold bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent">
                Shipment Trackings
              </h1>
            </div>
          </div>

          {/* Mobile Close Button */}
          <div className="flex lg:hidden justify-end mb-4">
            <label htmlFor="my-drawer" className="btn btn-ghost btn-circle hover:bg-base-300 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </label>
          </div>

          {/* Menu Items */}
          <li>
            <details open>
              <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Item Master
              </summary>
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <Link
                    href="/Items/add-Item"
                    className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    Add Item
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Items"
                    className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    All Items
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
                <Users className="h-5 w-5 text-primary" />
                Customer Master
              </summary>
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <Link
                    href="/customers/add-customer"
                    className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    Add Customer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/customers"
                    className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    All Customers
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
                <Truck className="h-5 w-5 text-primary" />
                Truck Master
              </summary>
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <Link
                    href="/trucks/add-trucks"
                    className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    Add Truck
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trucks"
                    className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    All Trucks
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
                <User className="h-5 w-5 text-primary" />
                Driver Master
              </summary>
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <Link
                    href="/drivers/add-driver"
                    className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    Add Driver
                  </Link>
                </li>
                <li>
                  <Link
                    href="/drivers"
                    className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    All Drivers
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
                <Ship className="h-5 w-5 text-primary" />
                Shipments
              </summary>
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <Link
                    href="/shipments/add-shipment"
                    className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    Add Shipment
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipments/status"
                    className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    Shipment Status
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipments"
                    className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    All Shipments
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
                <MapPin className="h-5 w-5 text-primary" />
                Trips
              </summary>
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <Link
                    href="/trips/add-trip"
                    className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    Add Trip
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trips/status"
                    className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    Trip Status
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trips"
                    className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    All Trips
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <div className="divider my-8 opacity-50"></div>

          <li>
            <Link
              href="/reports"
              className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold"
            >
              <BarChart3 className="h-5 w-5 text-primary" />
              Reports
            </Link>
          </li>

          <li className="mt-auto">
            <div className="flex items-center justify-between px-4 py-3">
              <Link
                href="/settings"
                className="flex items-center gap-3 hover:bg-base-300/70 rounded-xl px-4 py-3 -ml-4 flex-1 transition-all duration-300 hover:shadow-md font-semibold"
              >
                <Settings className="h-5 w-5 text-primary" />
                Settings
              </Link>
              <ThemeToggle />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}