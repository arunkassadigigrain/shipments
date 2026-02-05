
"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  ShoppingBag,
  Users,
  Truck,
  User,
  Ship,
  MapPin,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Database,
  House,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleCollapse = () => setCollapsed(!collapsed);
  const toggleMobile = () => setIsMobileOpen((prev) => !prev);

  const closeMobileMenu = () => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle Button - Only visible on mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <label
          htmlFor="my-drawer"
          onClick={toggleMobile}
          className="btn btn-ghost btn-circle hover:bg-base-300/80 backdrop-blur-sm"
        >
          {isMobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </label>
      </div>

      {/* Mobile Drawer Overlay */}
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isMobileOpen}
        onChange={() => { }}
      />

      <div className="drawer-side z-50 hide-scrollbar">
        <label
          htmlFor="my-drawer"
          onClick={closeMobileMenu}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul
          className={`
            menu min-h-full bg-base-200/95 backdrop-blur-md 
            text-base-content overflow-y-auto border-r border-base-300/30 
            shadow-2xl flex flex-col hide-scrollbar
            hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300
          `}
          style={{ "--p": "#007dc5", "--pf": "#71bf43" } as React.CSSProperties}
        >
          {/* Mobile Header with Close Button */}
          {isMobile && (
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-4 group"
                >
                  <div className="flex-shrink-0 transition-all duration-300">
                    <h1 className="text-xl text-green-400 font-bold">
                      DigiPOD
                    </h1>
                  </div>
                </Link>
              </div>
              <button
                onClick={closeMobileMenu}
                className="btn btn-ghost btn-circle hover:bg-base-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Collapse Button - Always visible on desktop, hidden on mobile */}
          {!isMobile && (
            <div className={`${collapsed ? "mt-4" : "mb-4"} flex justify-end`}>
              <button
                onClick={toggleCollapse}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="
                  btn 
                  btn-circle 
                  w-10 
                  h-10 
                  min-h-0 
                  p-0 
                  hover:bg-base-300 
                  transition-all
                  flex items-center justify-cente"
              >
                {collapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <ChevronLeft className="h-5 w-5" />
                )}
              </button>
            </div>
          )}

          {/* Content - Only shown when NOT collapsed on desktop, always shown on mobile */}
          {(isMobile || !collapsed) && (
            <>
              {/* Logo & Title - Only on desktop when not collapsed */}
              {!isMobile && !collapsed && (
                <div className="hidden lg:flex justify-center items-center gap-4 px-2">
                  <Link
                    href="/"
                    className="group"
                  >
                    <div className="flex-shrink-0 transition-all duration-300">
                      <h1 className="text-xl text-green-400 font-bold">
                        DigiPOD
                      </h1>
                    </div>
                  </Link>
                </div>
              )}


              {/* Menu Items - Only show when not collapsed */}
              {!collapsed && (
                <>
                  <div className="flex items-center justify-between px-4 py-3">
                    <Link
                      href="/admin"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 hover:bg-base-300/70 rounded-xl px-4 py-3 -ml-4 flex-1 transition-all duration-300 hover:shadow-md font-semibold"
                    >
                      <House className="h-6 w-6 text-primary" />
                      <span>Home</span>
                    </Link>
                  </div>

                  <li>
                    <details>
                      <summary
                        onClick={isMobile ? closeMobileMenu : undefined}
                        className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold"
                      >
                        <Ship className="h-6 w-6 text-primary" />
                        <span>Shipments</span>
                      </summary>
                      <ul className="ml-6 mt-2 space-y-1">
                        <li>
                          <Link
                            href="/admin/shipments/add-shipment"
                            onClick={closeMobileMenu}
                            className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                          >
                            Add Shipment
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/admin/shipments/status"
                            onClick={closeMobileMenu}
                            className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                          >
                            Shipment Status
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/admin/shipments"
                            onClick={closeMobileMenu}
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
                      <summary
                        onClick={isMobile ? closeMobileMenu : undefined}
                        className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold"
                      >
                        <MapPin className="h-6 w-6 text-primary" />
                        <span>Trips</span>
                      </summary>
                      <ul className="ml-6 mt-2 space-y-1">
                        <li>
                          <Link
                            href="/admin/trips/add-trip"
                            onClick={closeMobileMenu}
                            className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                          >
                            Add Trip
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/admin/trips/addtrip-status"
                            onClick={closeMobileMenu}
                            className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                          >
                            Trip Status
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/admin/trips"
                            onClick={closeMobileMenu}
                            className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                          >
                            All Trips
                          </Link>
                        </li>
                      </ul>
                    </details>
                  </li>

                  {/* MASTER DROPDOWN */}
                  <li>
                    <details>
                      <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
                        <Database className="h-6 w-6 text-primary" />
                        <span>Masters</span>
                      </summary>
                      <ul className="ml-4 mt-2 space-y-1">
                        {/* Item Master */}
                        <li>
                          <details>
                            <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
                              <ShoppingBag className="h-6 w-6 text-primary" />
                              <span>Item Master</span>
                            </summary>
                            <ul className="ml-6 mt-2 space-y-1">
                              <li>
                                <Link
                                  href="/admin/Items/add-Item"
                                  onClick={closeMobileMenu}
                                  className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                                >
                                  Add Item
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/admin/Items"
                                  onClick={closeMobileMenu}
                                  className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                                >
                                  All Items
                                </Link>
                              </li>
                            </ul>
                          </details>
                        </li>

                        {/* Customer Master */}
                        <li>
                          <details>
                            <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
                              <Users className="h-6 w-6 text-primary" />
                              <span>Customer Master</span>
                            </summary>
                            <ul className="ml-6 mt-2 space-y-1">
                              <li>
                                <Link
                                  href="/admin/customers/add-customer"
                                  onClick={closeMobileMenu}
                                  className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                                >
                                  Add Customer
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/admin/customers"
                                  onClick={closeMobileMenu}
                                  className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                                >
                                  All Customers
                                </Link>
                              </li>
                            </ul>
                          </details>
                        </li>
                        {/* Driver Master */}

                        <li>
                          <details>
                            <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
                              <User className="h-6 w-6 text-primary" />
                              <span>Driver Master</span>
                            </summary>
                            <ul className="ml-6 mt-2 space-y-1">
                              <li>
                                <Link
                                  href="/admin/drivers/add-driver"
                                  onClick={closeMobileMenu}
                                  className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                                >
                                  Add Driver
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/admin/drivers"
                                  onClick={closeMobileMenu}
                                  className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                                >
                                  All Drivers
                                </Link>
                              </li>
                            </ul>
                          </details>
                        </li>

                        {/* Truck Master */}
                        <li>
                          <details>
                            <summary className="hover:bg-base-300/70 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-md flex items-center gap-3 font-semibold">
                              <Truck className="h-6 w-6 text-primary" />
                              <span>Truck Master</span>
                            </summary>
                            <ul className="ml-6 mt-2 space-y-1">
                              <li>
                                <Link
                                  href="/admin/trucks/add-trucks"
                                  onClick={closeMobileMenu}
                                  className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                                >
                                  Add Truck
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/admin/trucks"
                                  onClick={closeMobileMenu}
                                  className="block py-2.5 px-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2 font-medium"
                                >
                                  All Trucks
                                </Link>
                              </li>
                            </ul>
                          </details>
                        </li>
                      </ul>
                    </details>
                  </li>

                  <div className="divider my-8 opacity-50"></div>

                  <li className="mt-auto">
                    <h1 className="text-l opacity-75">
                      Powered by
                      <Image src="/digigrainLogo2.png"
                        alt="Digi Grain Logo"
                        width={48}
                        height={48}
                        className="object-contain rounded-xl" />
                    </h1>

                    <div className="flex items-center justify-between px-4 py-3">
                      <Link
                        href="/admin/settings"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 hover:bg-base-300/70 rounded-xl px-4 py-3 -ml-4 flex-1 transition-all duration-300 hover:shadow-md font-semibold"
                      >
                        <Settings className="h-6 w-6 text-primary" />
                        <span>Settings</span>
                      </Link>
                      <ThemeToggle />
                    </div>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </>
  );
}