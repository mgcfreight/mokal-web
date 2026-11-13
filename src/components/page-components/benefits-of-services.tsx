import Image from "next/image";
import LinearGradientText from "../common/linear-gradient-text";

export default function BenefitsOfServices() {
    return (
        <div className="bg-base-shadeBlue w-full">
            <div className={`flex flex-col m-auto sm:px-8 px-4 sm:py-20 py-16 sm:w-[80%] text-center gap-4`}>
                <div className="font-bold sm:text-[2.3rem] text-[1.5rem]">Benefits of <LinearGradientText text={{ en: 'Services', fr: 'Services' }} /></div>
                <div className="flex gap-4 flex-wrap">
                    <div className="flex flex-col gap-2 bg-white shadow-lg flex-[1_0_35%] items-start text-start rounded-xl p-4">
                        <Image src={'/icons/efficiency.svg'} alt={'efficiency'} width={50} height={50} />
                        <LinearGradientText extraClass="font-bold text-2xl" text={{ en: 'Cost Efficiency', fr: 'Efficacité des coûts' }} />
                        <p className="text-text-gray">Save on transportation expenses with optimized routes and competitive pricing tailored to your specific freight needs.</p>
                    </div>

                    <div className="flex flex-col gap-2 bg-white shadow-lg flex-[1_0_35%] items-start text-start rounded-xl p-4">
                        <Image src={'/icons/reliable-delivery.svg'} alt={'reliable delivery'} width={50} height={50} />
                        <LinearGradientText extraClass="font-bold text-2xl" text={{ en: 'Reliable Delivery', fr: 'Livraison fiable' }} />
                        <p className="text-text-gray">Count on timely and secure deliveries, ensuring your goods reach their destination without hassle.</p>
                    </div>


                    <div className="flex flex-col gap-2 bg-white shadow-lg flex-[1_0_35%] items-start text-start rounded-xl p-4">
                        <Image src={'/icons/flexible-solutions.svg'} alt={'flexible solutions'} width={50} height={50} />
                        <LinearGradientText extraClass="font-bold text-2xl" text={{ en: 'Flexible Solutions', fr: 'Solutions flexibles' }} />
                        <p className="text-text-gray">Enjoy customizable shipping options designed to meet the unique requirements of your business operations.</p>
                    </div>

                    <div className="flex flex-col gap-2 bg-white shadow-lg flex-[1_0_35%] items-start text-start rounded-xl p-4">
                        <Image src={'/icons/trusted-partnerships.svg'} alt={'trusted partnerships'} width={50} height={50} />
                        <LinearGradientText extraClass="font-bold text-2xl" text={{ en: 'Trusted Partnerships', fr: 'Partenariats de confiance' }} />
                        <p className="text-text-gray">Work with a network of experienced and reputable carriers committed to providing top-notch service.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}