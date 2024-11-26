import { auth, clerkClient } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";
import { getCurrentMonthTransactions } from "../data/get-current-month-transactions";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const user = await clerkClient().users.getUser(userId);
  const currentMonthTransactions = await getCurrentMonthTransactions();
  const hasPremiunPlan = user?.publicMetadata.subscriptionPlan === "premiun";
  return (
    <>
      <Navbar></Navbar>
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Subscription</h1>
        <div className="flex gap-6">
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8">
              <h2 className="text-center text-2xl font-semibold">Basic Plan</h2>

              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">$</span>
                <span className="text-6xl font-semibold">0</span>
                <span className="text-2xl text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary"></CheckIcon>
                <p>
                  Only 10 transactions per month ({currentMonthTransactions}/10)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <XIcon></XIcon>
                <p>AI Reports</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {hasPremiunPlan && (
                <Badge className="absolute left-4 top-12 bg-primary/10 text-primary">
                  Active
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Premiun Plan
              </h2>

              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">$</span>
                <span className="text-6xl font-semibold">4</span>
                <span className="text-2xl text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary"></CheckIcon>
                <p>Unlimited transactions</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary"></CheckIcon>
                <p>AI Reports</p>
              </div>
              <AcquirePlanButton></AcquirePlanButton>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
