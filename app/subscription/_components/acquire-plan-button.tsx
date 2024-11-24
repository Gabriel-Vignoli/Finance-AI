"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";

const AcquirePlanButton = () => {
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHED_KEY) {
      throw new Error("Stripe published key is not set");
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHED_KEY,
    );
    if (!stripe) {
      throw new Error("Stripe is not loaded");
    }
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Purchase plan
    </Button>
  );
};

export default AcquirePlanButton;