import ContactForm from "../components/ContactForm";
import GitHubButton from "../components/GitHubButton";
import LinkedInButton from "../components/LinkedInButton";

export default function Contact() {
  return (
    <div className="flex h-screen flex-col items-center space-y-4">
      <p className="text-3xl font-semibold">Contact Me</p>
      <ContactForm></ContactForm>
      <div className="flex gap-4 pt-2">
        <GitHubButton></GitHubButton>
        <LinkedInButton></LinkedInButton>
      </div>
    </div>
  );
}
