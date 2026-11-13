"use client";

import Image from "next/image";

export default function Quote() {
  return (
    <div className=" bg-white rounded-xl p-8  flex gap-4 flex-col  items-center justify-center">
      <Image
        src={"/images/rb_41788 1.svg"}
        alt="sucess email"
        height={400}
        width={400}
      />
      <div className="font-semibold text-3xl">
        Shipping Quote  <span className="text-base-purple">Sent Successfully!</span>
      </div>
      <p>
        Your shipping quote has been sent to your email. Please check your inbox
        for further details. If you don’t see it, kindly check your spam or junk
        folder.
      </p>
    </div>
  );
}
