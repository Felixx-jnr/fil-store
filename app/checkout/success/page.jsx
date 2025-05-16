// /app/checkout/success/page.js
import { Suspense } from "react";
import VerifyPaymentPage from "./VerifyPaymentPage";

export default function Page() {
  return (
    <Suspense fallback={<p className="p-4">Loading...</p>}>
      <VerifyPaymentPage />
    </Suspense>
  );
}
