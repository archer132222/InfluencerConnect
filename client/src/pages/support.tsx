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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Phone, Mail, AlertCircle } from "lucide-react";

const supportSchema = z.object({
  email: z.string().email("Invalid email address"),
  issueType: z.enum(["feedback", "bug_report", "other"]),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
});

type SupportFormData = z.infer<typeof supportSchema>;

export default function Support() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<SupportFormData>({
    resolver: zodResolver(supportSchema),
  });

  const sendSupportMutation = useMutation({
    mutationFn: async (data: SupportFormData) => {
      const response = await fetch("/api/support-tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit support ticket");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Support ticket submitted successfully!");
      form.reset();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to submit support ticket");
    },
  });

  async function onSubmit(values: SupportFormData) {
    sendSupportMutation.mutate(values);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Technical Support</h1>
          <p className="text-slate-400 text-lg">We're here to help! Send us your feedback or report an issue</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="md:col-span-1 space-y-6">
            {/* Email */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Email</h3>
              </div>
              <p className="text-slate-400 text-sm">
                <a href="mailto:ramiorton1325@gmail.com" className="text-blue-400 hover:text-blue-300">
                  ramiorton1325@gmail.com
                </a>
              </p>
            </div>

            {/* Phone */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Phone</h3>
              </div>
              <p className="text-slate-400 text-sm">+1 (555) 123-4567</p>
            </div>

            {/* Made By */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <p className="text-slate-400 text-sm mb-2">Made by</p>
              <p className="text-lg font-bold text-white">Rami Faisal</p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-slate-800 rounded-lg p-8 border border-slate-700">
            {submitted ? (
              <div className="text-center py-12">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Ticket Submitted!</h2>
                <p className="text-slate-400">Thank you for your feedback. We'll review it shortly.</p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                            {...field}
                            data-testid="input-support-email"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="issueType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">Issue Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-blue-500">
                              <SelectValue placeholder="Select issue type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            <SelectItem value="feedback" className="text-white">Feedback</SelectItem>
                            <SelectItem value="bug_report" className="text-white">Bug Report</SelectItem>
                            <SelectItem value="other" className="text-white">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Brief subject of your issue"
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                            {...field}
                            data-testid="input-support-subject"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide detailed information about your issue..."
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 min-h-[150px] resize-none"
                            {...field}
                            data-testid="input-support-description"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={sendSupportMutation.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
                    data-testid="button-submit-support"
                  >
                    {sendSupportMutation.isPending ? "Submitting..." : "Submit Support Ticket"}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />
          <p className="text-blue-300 text-sm">
            Our support team typically responds within 24 hours. You can also reach us directly via email or phone for urgent matters.
          </p>
        </div>
      </div>
    </div>
  );
}
