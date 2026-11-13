import Image from "next/image";
import LinearGradientText from "../common/linear-gradient-text";

export default function GuideToBook() {
    return (
        <div className="bg-white w-full">
            <div className={`flex flex-col m-auto sm:px-8 px-4 sm:py-20 py-16 sm:w-[80%] text-center gap-20`}>
                <div>
                    <div className="font-bold sm:text-[2.3rem] text-[1.5rem]">A Quick Guide To Book A <LinearGradientText text={{ en: "shipment", fr: "expédition" }} /> On Our App </div>
                    <div className="font-bold sm:text-[2.3rem] text-[1.5rem]">Follow The Steps To Place Your <LinearGradientText text={{ en: "shipment", fr: "expédition" }} /> </div>
                </div>

                <div className="flex flex-col gap-16">
                    <div className={`flex sm:flex-row flex-col   items-center text-center gap-16`}>
                        <Image className="flex-1 sm:order-0 order-1 " src={'/images/step1.svg'} alt="quick quote form" width={500} height={500} />
                        <div className="flex sm:order-1 order-0 flex-1 flex-col sm:items-start items-center sm:text-start text-center gap-4">
                            <div className="text-base-purple text-2xl">Step # 01</div>
                            <div className="sm:text-[2rem] text-[1.5rem] font-bold">Get a <LinearGradientText extraClass="" text={{ en: "Quick Quote", fr: "Soumission rapide" }} /> </div>
                            <p className="text-text-gray text-md">Start by heading to our "Quick Quote" tool. Enter your basic shipment details like weight, dimensions, and destination. Instantly view estimated costs to streamline your decision-making.</p>
                        </div>
                    </div>


                    <div className={`flex sm:flex-row flex-col   items-center text-center gap-16`}>
                        <div className="flex flex-1 flex-col sm:items-start items-center sm:text-start text-center gap-4">
                            <div className="text-base-purple text-2xl">Step # 02</div>
                            <div className="sm:text-[2rem] text-[1.5rem] font-bold">Provide <LinearGradientText extraClass="" text={{ en: "Shipment Details", fr: "Détails de l'expédition" }} /> </div>
                            <p className="text-text-gray text-md">Fill in all the necessary information about your shipment, including pickup location, delivery address, and package specifics. Accurate details ensure smooth processing.</p>
                        </div>
                        <Image className="flex-1" src={'/images/step2.svg'} alt="shipping form" width={500} height={500} />
                    </div>


                    <div className={`flex  flex-col   items-center text-center gap-4`}>
                        <div className="flex flex-col gap-1">
                            <div className="text-base-purple text-2xl">Step # 03</div>
                            <div className="sm:text-[2rem] text-[1.5rem] font-bold"><LinearGradientText extraClass="" text={{ en: "Compare and Choose ", fr: "Comparer et choisir " }} /> the Best Carrier </div>
                            <p className="text-text-gray text-md">Browse through a list of top carriers. Compare prices, delivery times, and service options to find the one that perfectly meets your shipping needs.</p>
                        </div>

                        <Image className="flex-1 w-full" src={'/images/step3.svg'} alt="carrier selection form" width={500} height={500} />
                        {/* <div className="flex flex-1 flex-col sm:items-start items-center sm:text-start text-center gap-4">
                                            <div className="text-base-purple text-2xl">Step # 04</div>
                                        </div> */}
                    </div>


                    <div className={`flex sm:flex-row flex-col   items-center text-center gap-16`}>
                        <div className="flex flex-1 flex-col sm:items-start items-center sm:text-start text-center gap-4">
                            <div className="text-base-purple text-2xl">Step # 04</div>
                            <div className="sm:text-[2rem] text-[1.5rem] font-bold">Complete <LinearGradientText extraClass="" text={{ en: "Address and Additional ", fr: "Adresse et renseignements supplémentaires " }} /> Info </div>
                            <p className="text-text-gray text-md">Add the final touches by entering remaining address details, special instructions, or preferences. Double-check for accuracy to avoid delays.</p>
                        </div>
                        <Image className="flex-1" src={'/images/step4.svg'} alt="pickup and consignee form" width={500} height={500} />
                    </div>




                    <div className={`flex sm:flex-row flex-col   items-center text-center gap-16`}>
                        <Image className="flex-1 sm:order-0 order-1 " src={'/images/step5.svg'} alt="payment form" width={500} height={500} />
                        <div className="flex flex-1 sm:order-1 order-0  flex-col sm:items-start items-center sm:text-start text-center gap-4">
                            <div className="text-base-purple text-2xl">Step # 05</div>
                            <div className="sm:text-[2rem] text-[1.5rem] font-bold">Make the Payment and <LinearGradientText extraClass="" text={{ en: "Confirm Order", fr: "Confirmer la commande " }} /> </div>
                            <p className="text-text-gray text-md">Securely complete your payment using your preferred method. Once done, your shipping order is placed and ready for processing!</p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}