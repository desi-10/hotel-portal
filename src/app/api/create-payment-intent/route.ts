import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest) {
  try {
    const { room, booking } = await request.json();

    console.log(booking);
    console.log(room);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name:
                room?.room_number ||
                room?.event_center_number ||
                "No room number",
              images: [room?.image] || [
                "https://www.pexels.com/photo/photo-of-living-room-1457842/",
              ],
            },
            unit_amount: booking?.total_cost
              ? parseFloat(booking?.total_cost) * 100
              : parseFloat(booking?.total_price) * 100 || 0,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/payment-success?session_id={CHECKOUT_SESSION_ID}&booking=${
        booking.id
      }&amount=${
        booking?.total_cost || booking?.total_price
      }&payment_method=card&event=${room?.event_center_number}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    console.log(booking);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
