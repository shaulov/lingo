import {useCallback} from "react";
import Image from "next/image";
import {useAudio, useKey} from "react-use";
import {cn} from "@/lib/utils";
import {challenges} from "@/db/schema";
import {ChallengeTypes} from "@/const";
import {QuizStatus} from "@/types";

type Props = {
    id: number;
    imageSrc: string | null;
    audioSrc: string | null;
    text: string;
    shortcut: string;
    selected?: boolean;
    disabled?: boolean;
    status?: QuizStatus;
    type: typeof challenges.$inferSelect["type"];
    onClick: () => void;
}

export function Card({
    id,
    imageSrc,
    audioSrc,
    text,
    shortcut,
    selected,
    disabled,
    status,
    type,
    onClick,
}: Props) {
    const [audio, _, controls] = useAudio({ src: audioSrc ?? "" });

    const handleClick = useCallback(() => {
        if (disabled) return;

        controls.play();
        onClick();
    }, [controls, disabled, onClick]);

    useKey(shortcut, handleClick, {}, [handleClick]);

    return (
        <button
            className={cn(
                "h-full w-full p-4 lg:p-6 border-2 border-b-4 active:border-b-2 rounded-xl hover:bg-black/5",
                selected && "bg-sky-100 border-sky-300 hover:bg-sky-100",
                selected && status === "correct" && "bg-green-100 border-green-300 hover:bg-green-100",
                selected && status === "wrong" && "bg-rose-100 border-rose-300 hover:bg-rose-100",
                disabled && "pointer-events-none hover:bg-white",
                type === ChallengeTypes.Assist && "w-full lg:p-3",
            )}
            onClick={handleClick}
        >
            {audio}
            {imageSrc && (
                <div className="relative aspect-square w-full max-h-[80px] lg:max-h-[150px] mb-4">
                    <Image src={imageSrc} fill alt={text} />
                </div>
            )}
            <div className={cn(
                "flex items-center justify-between",
                type === ChallengeTypes.Assist && "flex-row-reverse",
            )}>
                {type === ChallengeTypes.Assist && <div />}
                <p className={cn(
                    "text-neutral-600 text-sm lg:text-base",
                    selected && "text-sky-500",
                    selected && status === "correct" && "text-green-500",
                    selected && status === "wrong" && "text-rose-500",
                )}>
                    {text}
                </p>
                <div className={cn(
                    "flex items-center justify-center " +
                    "w-[20px] lg:w-[30px] h-[20px] lg:h-[30px] " +
                    "text-neutral-400 text-xs lg:text-[15px] font-semibold border-2 rounded-lg",
                    selected && "text-sky-500 border-sky-300",
                    selected && status === "correct" && "text-green-500 border-green-500",
                    selected && status === "wrong" && "text-rose-500 border-rose-500",
                )}>
                    {shortcut}
                </div>
            </div>
        </button>
    );
}