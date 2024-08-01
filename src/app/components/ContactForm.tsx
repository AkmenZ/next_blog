"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import { sendEmail } from "../lib/actions";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

// to change button state we need to make it a separate component
function SubmitButton() {
  const status = useFormStatus();
  return (
    <Button
      type="submit"
      variant="ghost"
      color="secondary"
      isLoading={status.pending}
    >
      {status.pending ? "Sending" : "Send Email"}
    </Button>
  );
}

export default function ContactForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  return (
    <form
      ref={ref}
      action={async (formData) => {
        const data = {
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        };

        const result = contactFormSchema.safeParse(data);

        if (!result.success) {
          const formErrors = result.error.flatten().fieldErrors;
          setErrors({
            name: formErrors.name ? formErrors.name[0] : "",
            email: formErrors.email ? formErrors.email[0] : "",
            message: formErrors.message ? formErrors.message[0] : "",
          });
          return;
        }
        setErrors({ name: "", email: "", message: "" });

        await sendEmail(formData);
        ref.current?.reset(); // reset the form
      }}
      className=" w-full p-6 items-center"
    >
      <div className="space-y-4 pb-10 border-b border-black border-opacity-20">
        <Input type="name" name="name" label="Name" variant="faded"></Input>
        <Input type="email" name="email" label="Email" variant="faded"></Input>
        <Textarea label="Message" name="message" variant="faded"></Textarea>
        <div className="flex justify-center w-full pt-6">
          <SubmitButton></SubmitButton>
        </div>
      </div>
    </form>
  );
}
