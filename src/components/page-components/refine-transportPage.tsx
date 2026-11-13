import Image from "next/image";
import RefineTransportForm from "../forms/refine-transport-form";

export default function RefineTransportPage() {
    return (
        <div className="bg-linearBlue w-full relative overflow-hidden">
            <div className={`flex flex-col m-auto sm:px-8 px-4 sm:py-20 py-16 sm:w-[80%]  text-center gap-4`}>
                <div className="flex flex-col gap-4 relative z-10 text-start sm:w-1/2 text-white">
                    <Image src={'/logo-fullWhite.svg'} alt="MGC freight logo" height={600} width={600} />
                    <h2 className="sm:text-[2.3rem] text-[1.3rem] font-bold">Join the MGC Freight Carrier Network — Partner With a Trusted Ontario Freight Broker</h2>
                    <RefineTransportForm />
                </div>
                <Image className="absolute right-0 top-0 z-0 h-[50rem] sm:block hidden" src={'/images/dashboard1.svg'} alt="dashboard" width={600} height={500} />
            </div>
        </div>
    )
}