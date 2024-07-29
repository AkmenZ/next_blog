"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import { sendEmail } from "../lib/actions";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

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

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await sendEmail(formData);
        ref.current?.reset(); // reset the form
      }}
      className=" w-full p-6 items-center"
    >
      <div className="space-y-4 pb-10 border-b border-black border-opacity-20">
        <Input type="name" name="name" label="Name" variant="faded"></Input>
        <Input type="email" name="email" label="Email" variant="faded"></Input>
        <Textarea label="Message" name="message" variant="faded"></Textarea>
        <div className="flex justify-center w-full">
          <SubmitButton></SubmitButton>
        </div>
      </div>
    </form>
  );
}
