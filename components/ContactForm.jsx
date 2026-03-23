"use client"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Card, CardContent,CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { useState } from "react"
import { createContact } from "@/actions";

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(false);

    async function onSubmit(formData) {
        setIsSubmitting(true)
        setMessage("")
    
        const result = await createContact(formData);
        console.log(result)
        if(result.success){
          setMessage("Message sent successfully!")
    
          const form = document.getElementById("contact-form")
          form.reset()
        }
        else{
            setMessage(result.error || "Something went wrong")
        }
    
        setIsSubmitting(false)
    
      }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight text-center">
        Get in Touch
      </h2>
          
        <div className="flex flex-col md:flex-row items-start gap-0 w-fit mx-auto">
          {/* Part 1 */}
          <div className="w-full flex-none md:w-[32rem]">
            <Card className="bg-white w-full">
              <CardHeader>
                <CardTitle>
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form 
                  id="contact-form" 
                  action={onSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" type="text" required disabled={isSubmitting} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required disabled={isSubmitting} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" type="text" required disabled={isSubmitting} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" required disabled={isSubmitting} />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full text-white bg-black">
                    {isSubmitting ? "Sending Message" : "Send Message"}
                  </Button>
                  {message && (
                    <div className="mt-2 p-2 text-center text-sm text-green-700">
                      {message}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Increased gap between Part 1 and Part 2 */}
          <div className="h-10 md:h-0 md:w-10"></div>

          {/* Part 2 */}
          <div className="w-full flex-none md:w-96">
            <div className='p-6 bg-white rounded-lg shadow-md h-full'>
              <h2 className="text-xl font-bold mb-2">Key Learnings from the Contact App</h2>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Understanding and implementing CRUD operations using server actions</li>
                <li>Connecting to and working with MongoDB</li>
                <li>Using Shadcn components</li>
              </ol>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ContactForm