import { getQuotes } from "@/lib/quotes-db";
import { QuoteTable } from "@/components/admin/quote-table";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const quotes = await getQuotes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Quote Requests</h1>
        <p className="text-muted-foreground">
          View and manage submitted quote requests from potential clients.
        </p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>All Quotes ({quotes.length})</CardTitle>
        </CardHeader>
        <CardContent>
           <QuoteTable quotes={quotes} />
        </CardContent>
      </Card>
    </div>
  );
}
