'use client'

import Image from "next/image"
import { FaQuoteRight } from "react-icons/fa"
import ReactStars from "react-stars"

interface BlogPostProp {
    index: number
    rating: number
    description: string
    name: string,
    imageUrl: string,
    createdAt: string
}

export default function BlogPost({ index, description, rating, name, imageUrl }: BlogPostProp) {
    return (
        <div className="px-8">
            <div className={`p-4 ${index % 2 == 0 ? 'text-white bg-base-blue' : 'text-base-blue bg-white'} items-start text-start shadow-xl  rounded-xl flex flex-col gap-2`}>
                <div className="flex justify-between w-full">
                    <Image src={imageUrl} alt="person" height={70} width={70} />
                    <FaQuoteRight className="text-base-purple text-2xl" />
                </div>
                <div>
                    <p className="font-semibold">{name}</p>
                    {/* <p className="text-xs text-text-gray">{new Date(createdAt).toDateString()}</p> */}
                </div>
                <ReactStars
                    edit={false}

                    value={rating}
                    count={5}
                    onChange={() => { }}
                    size={24}
                    color2={'yellow'} />
                <p>{description}</p>
            </div>
        </div>
    )
}