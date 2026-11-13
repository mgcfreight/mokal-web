'use client'

import { Video } from "@triyanox/react-video"

export default function BaseVideo({src, poster}:{src?: string | null, poster?: string}) {
    // An empty src makes the browser re-request the page; render nothing instead.
    if (!src) return null

    return (
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
            poster={poster || undefined}
            src={src}
        />
    )
}