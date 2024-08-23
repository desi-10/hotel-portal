"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Ensure that the Stripe public key is defined
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  throw new Error(
    "Stripe public key not found. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your environment variables."
  );
}

// Create a Stripe instance using the public key
const stripePromise = loadStripe(stripePublishableKey);

const StripeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
