import { Link } from "@remix-run/react";
import React from "react";

export default function PaymentSucess() {
  return (
    <div className="h-[90vh] flex flex-col items-center justify-center overflow-hidden w-full">
      <div className="bg-white p-6 mdL mx-auto">
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Thank you for your purchase!{" "}
            <p className="text-gray-600 my-2 text-lg">
              You will receive an email shortly with your receipt.
            </p>
            <div className="py-10 text-center ">
              <Link
                to="/"
                className="px-12 bg-purple-300 hover:bg-purple-200 rounded-lg text-white font-semi-bold py-3"
              >
                Return To Homepage
              </Link>
            </div>
          </h3>
        </div>
      </div>
    </div>
  );
}
