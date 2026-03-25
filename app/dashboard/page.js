"use client";
import React from 'react'
import { authClient } from '@/lib/auth-client';
import { Button } from '../../components/ui/button';
import { useRouter } from 'next/navigation';

const HomeView = () => {

  const {data:session} = authClient.useSession();
  const router = useRouter()

  if(!session){

      return(
          <p>Loading...</p>
      )
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