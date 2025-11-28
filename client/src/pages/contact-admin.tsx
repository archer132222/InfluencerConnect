import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLocation } from "wouter";

const messageSchema = z.object({
  subject: z.string().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  content: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message must be less than 5000 characters"),
});

type MessageFormData = z.infer<typeof messageSchema>;

export default function ContactAdmin() {
  const [, setLocation] = useLocation();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data: MessageFormData) => {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to send message");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Message sent successfully!");
      form.reset();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to send message");
    },
  });

  async function onSubmit(values: MessageFormData) {
    sendMessageMutation.mutate(values);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Contact Admin</h1>
            <p className="text-slate-400">Send a message to the super admin for support or inquiries</p>
          </div>

          {/* Form Card */}
          <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700">
            {submitted ? (
              <div className="text-center py-12">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                <p className="text-slate-400 mb-6">Your message has been sent to the admin. We'll get back to you soon.</p>
                <Button
                  onClick={() => setLocation("/")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  data-testid="button-back-home"
                >
                  Back to Home
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What is your message about?"
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                            {...field}
                            data-testid="input-subject"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your message here..."
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 min-h-[200px] resize-none"
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={sendMessageMutation.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
                    data-testid="button-send-message"
                  >
                    {sendMessageMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-slate-700/50 border border-slate-600 rounded-lg p-4">
            <p className="text-slate-300 text-sm">
              <span className="font-semibold text-blue-400">Note:</span> Your message will be sent to the admin with your name and email. The admin will review your message and respond accordingly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
