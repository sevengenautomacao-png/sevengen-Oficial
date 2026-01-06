import { QuoteForm } from "@/components/quote-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Fill out the form to get a personalized quote for your automation project.",
};

export default function QuotePage() {
  return (
    <div className="container max-w-3xl py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Let's Build Something Great Together</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tell us about your project, and our team of experts will get back to you with a personalized estimate.
        </p>
      </div>
      <Card>
        <CardContent className="p-6 sm:p-8">
            <QuoteForm />
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
