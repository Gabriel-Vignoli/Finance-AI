import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="flex h-full flex-col justify-center p-8 max-w-[550px] mx-auto">
        <Image src="/soon.svg" alt="Finance AI" width={173} height={39} className="mb-8"/>
        <h1 className="text-4xl font-bold mb-3">Welcome</h1>
        <p className="mb-8">
          Finance AI is a financial management platform that uses AI to monitor
          your transactions and provide personalized insights, making it easier
          to manage your budget.
        </p>
        <Button variant="outline">
            <LogInIcon className="mr-2"/>
            Login or create an account
        </Button>
      </div>
      <div className="relative h-full w-full">
        <Image src="/login.png" alt="Login" fill className="object-cover" />
      </div>
    </div>
  );
};

export default LoginPage;
