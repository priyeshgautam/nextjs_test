import LoginForm from '@/components/login-form'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button";


const LoginPage = async() => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect("/");
  }

  return (
    <>
    <div className="mb-4">
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-transparent">
            Back to home
          </Button>
        </Link>
      </div>

    <div>
      <LoginForm/>
    </div>

    <div className="md:w-96 w-full">
    <div className="p-6 h-full bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">
        Key Learnings from the Auth App
      </h2>
      <ol className="list-decimal list-inside space-y-1 text-gray-700">
        <li>Prisma ORM with postgress [ serverless db : neon ]</li>
        <li>Authentication with better-auth for social media</li>
        <li>Using Google and Github urls</li>
      </ol>
    </div>
  </div>
  </>
  )
}

export default LoginPage