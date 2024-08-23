"use client";

import React, { useEffect, useState } from "react";
import convertToSubcurrency from "@/lib/convertToSubcurrency";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [paymentIntentUrl, setPaymentIntentUrl] = useState<
    string | undefined
  >();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch payment intent URL from backend
    const fetchPaymentIntentUrl = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        });

        const data = await response.json();
        setPaymentIntentUrl(data.paymentIntentUrl);
      } catch (error) {
        console.error("Error fetching payment intent URL:", error);
      }
    };

    fetchPaymentIntentUrl();
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!paymentIntentUrl) {
      setErrorMessage("Payment intent URL is not available.");
      setLoading(false);
      return;
    }

    // Redirect to payment intent URL
    window.location.href = paymentIntentUrl;
    setLoading(false);
  };

  if (!paymentIntentUrl) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
