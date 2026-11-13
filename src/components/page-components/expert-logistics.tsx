'use client'
import LinearGradientText from "../common/linear-gradient-text";
import { Video } from "@triyanox/react-video";


export default function ExpertLogistics() {
    return (
        <div className="bg-base-shadeBlue w-full">
            <div className={`flex flex-col m-auto sm:px-8 px-4 sm:py-20 py-16 sm:w-[80%] text-center gap-4`}>
                <div className="font-bold sm:text-[2.3rem] text-[1.5rem]">Expert Logistics Management for Your <LinearGradientText text={{ en: "Business Growth", fr: "Croissance de l'entreprise" }} /></div>
                <p className="text-text-gray ">Take your logistics to the next level with MGC Freight's comprehensive, consultative approach. We go beyond traditional shipping to address every aspect of your supply chain, providing smart solutions tailored to optimize your operations. Wherever you are in your growth journey, our 360-degree solutions empower you to choose what fits your unique needs, unlocking new opportunities and driving your success forward.</p>

                <Video
                    autoPlay={false}
                    className="max-h-96"
                    icons={
                        {
                            play: () => <div className="p-4 border-2 rounded-full border-white text-white"><p>PLAY</p></div>,
                            backBy10() {
                                return <></>
                            },
                            forwardBy10() {
                                return <></>
                            },
                        }
                    }
                    poster=""
                    src="https://vjs.zencdn.net/v/oceans.mp4"
                />
            </div>
        </div>
    )
}