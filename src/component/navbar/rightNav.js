"use client";

import { useState } from "react";
import Link from "next/link";
import { UserCircle, X, Mail, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const RightNav = () => {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    setIsProfileOpen(false);
    signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="flex items-center gap-6">
      {session?.user ? (
        <>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-[#4895EF] transition-colors"
            >
              <UserCircle className="w-6 h-6 text-gray-700" />
              <span className="hidden md:inline text-gray-700">{session.user.firstName}</span>
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="hidden md:block px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsProfileOpen(false)}
                  className="fixed inset-0 bg-black/50 z-40"
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
                      <button
                        onClick={() => setIsProfileOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
                          <UserCircle className="w-16 h-16 text-purple-600" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <User className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="text-gray-700">{session.user.firstName}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Mail className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-gray-700">{session.user.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link
          href="/login"
          className="p-2 rounded-md hover:bg-[#4895EF] transition-colors"
        >
          <UserCircle className="w-6 h-6 text-gray-700" />
        </Link>
      )}
    </div>
  );
};

export default RightNav;