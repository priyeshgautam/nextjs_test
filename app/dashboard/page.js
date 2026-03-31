"use client";
import React, { useState } from 'react'
import { authClient } from '@/lib/auth-client';
import { Button } from '../../components/ui/button';
import { useRouter } from 'next/navigation';
import PaymentStripe from '@/components/PaymentStripe';
import PaymentRazorPay from '@/components/PaymentRazorPay';
import PaymentPolar from '@/components/PaymentPolar';

const HomeView = () => {

  const {data:session} = authClient.useSession();
  const router = useRouter()
  const[ selectedTab, setSelectedTab] = useState("stripe")

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-solid mb-4"></div>
        <p className="text-gray-500 text-lg font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 gap-y-6 rounded-lg shadow-md bg-white max-w-md mx-auto mt-8 items-center">
      <div className="flex items-center gap-x-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold text-blue-600">
          {
          session.user?.image && (
            <img
              src={session.user.image}
              alt="User Avatar"
              className="mt-2 w-10 h-10 rounded-full border"
            />
          ) || session.user?.name?.[0] || <span>U</span>}
        </div>
        <div>
          <p className="font-semibold text-gray-800">Logged in as</p>
          <p className="text-md text-blue-700">{session.user.name}</p>
          <p className="text-xs text-gray-500">{session.user.email}</p>
          
        </div>
      </div>
      <div className="w-full bg-gray-50 rounded p-4 text-sm mt-3">
        <ul className="space-y-2">

          <li>
            <span className="font-medium text-gray-700">User ID:</span>{" "}
            <span className="text-gray-600">{session.user?.id || "N/A"}</span>
          </li>
          <li>
            <span className="font-medium text-gray-700">Provider:</span>{" "}
            <span className="text-gray-600">{session.user?.provider || "N/A"}</span>
          </li>
          {session.user?.role && (
            <li>
              <span className="font-medium text-gray-700">Role:</span>{" "}
              <span className="text-gray-600">{session.user.role}</span>
            </li>
          )}
        </ul>
      </div>

      <div className="w-full">
        <div className="flex mb-2 border-b border-gray-200">
          <button
            type="button"
            className={`flex-1 py-2 px-4 text-center font-semibold ${
              selectedTab === "stripe"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 border-b-2 border-transparent"
            } focus:outline-none`}
            aria-selected={selectedTab === "stripe"}
            tabIndex={0}
            onClick={() => setSelectedTab("stripe")}
          >
            Stripe
          </button>

          <button
            type="button"
            className={`flex-1 py-2 px-4 text-center font-semibold ${
              selectedTab === "polar"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 border-b-2 border-transparent"
            } focus:outline-none`}
            aria-selected={selectedTab === "polar"}
            tabIndex={-1}
            onClick={() => setSelectedTab("polar")}
            
          >
            Polar
          </button>

          <button
            type="button"
            className={`flex-1 py-2 px-4 text-center font-semibold ${
              selectedTab === "razorpay"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 border-b-2 border-transparent"
            } focus:outline-none`}
            aria-selected={selectedTab === "razorpay"}
            tabIndex={-1}
            onClick={() => setSelectedTab("razorpay")}
            
          >
            Razorpay
          </button>

        </div>
        

        <div className="w-full">
          {selectedTab === "stripe" && (
            <PaymentStripe></PaymentStripe>
          )}
        </div>

        <div className="w-full">
          {selectedTab === "polar" && (
            <PaymentRazorPay></PaymentRazorPay>
          )}
        </div>
        <div className="w-full">
          {selectedTab === "razorpay" && (
            <PaymentPolar></PaymentPolar>
          )}
        </div>
      </div>
      {/* 
        Why are Polar and Razorpay tabs not clickable?
        - 'disabled' is set on their buttons, so the browser won't allow interaction.
        - Styling with 'cursor-not-allowed' and gray color further indicate unavailability.
        - Only the Stripe tab is selectable.
        - This prevents accidental or unsupported switching.
      */}
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push("/login"),
            },
          })
        }
        variant="destructive"
        className="w-full"
      >
        Sign Out
      </Button>
    </div>
  )
}

export default HomeView