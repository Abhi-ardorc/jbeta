import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const NewsletterForm = ({ dark = false, testId = "newsletter" }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await axios.post(`${API}/subscribe`, { email: email.trim() });
      toast.success("You're on the list. Watch your inbox for book updates.");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex w-full max-w-md items-end gap-4" data-testid={`${testId}-form`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className={`field ${dark ? "!text-linen !border-linen/30 placeholder:!text-linen/40 focus:!border-copper-light" : ""}`}
        data-testid={`${testId}-email-input`}
      />
      <button
        type="submit"
        disabled={loading}
        className="btn-primary shrink-0 !px-5"
        data-testid={`${testId}-submit-button`}
      >
        {loading ? "Joining…" : "Join"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
};
