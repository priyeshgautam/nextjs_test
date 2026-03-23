import ContactForm from "@/components/ContactForm";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const ContactFormPage = () => {
  return (
    <div>
      <div className="mb-4">
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-transparent">
            Back to home
          </Button>
        </Link>
      </div>
      <ContactForm />
    </div>
  );
};

export default ContactFormPage;
