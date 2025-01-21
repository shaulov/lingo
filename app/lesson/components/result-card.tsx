import Image from "next/image";
import {cn} from "@/lib/utils";

type Props = {
    variant: "points" | "hearts";
    value: number;
}

export function ResultCard({ variant, value }: Props) {
    const imageSrc = variant === "points" ?
        "/images/icons/points.svg" : "/images/icons/heart.svg";

    return (
        <dl className={cn(
            "w-full border-2 rounded-2xl",
            variant === "points" && "bg-orange-400 border-orange-400",
            variant === "hearts" && "bg-rose-500 border-rose-500",
        )}>
            <dt className={cn(
                "p-1.5 font-bold text-white text-center text-xs uppercase rounded-t-xl",
                variant === "points" && "bg-orange-400",
                variant === "hearts" && "bg-rose-500",
            )}>
                {variant === "hearts" ? "Hearts Left" : "Total XP"}
            </dt>
            <dd className={cn(
                "flex items-center justify-center p-6 font-bold text-lg bg-white rounded-2xl",
                variant === "points" && "text-orange-400",
                variant === "hearts" && "text-rose-500",
            )}>
                <Image className="mr-1.5" width={30} height={30} src={imageSrc} alt={`${variant} icon`} />
                {value}
            </dd>
        </dl>
    );
}