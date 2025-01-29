"use client";

import {useTransition} from "react";
import Image from "next/image";
import {toast} from "sonner";
import {refillHearts} from "@/actions/user-progress";
import {Button} from "@/components/ui/button";
import {DEFAULT_HEART_COUNT, POINTS_TO_REFILL} from "@/const";

type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
}

export function Items({ hearts, points, hasActiveSubscription }: Props) {
    const [pending, startTransition] = useTransition();
    const isDisabled = pending || hearts === DEFAULT_HEART_COUNT || points < POINTS_TO_REFILL;

    const handleRefillHearts = () => {
        if (pending || hearts === DEFAULT_HEART_COUNT) return;

        startTransition(() => {
            refillHearts()
                .catch((err) => {toast.error(err.message)});
        });
    };

    return (
        <ul className="w-full">
            <li className="flex items-center gap-x-4 w-full p-4 border-t-2">
                <Image src="/images/icons/heart.svg" width={60} height={60} alt="Heart" />
                <p className="flex-1 text-neutral-700 text-base lg:text-xl font-bold">Refill hearts</p>
                <Button disabled={isDisabled} onClick={handleRefillHearts}>
                    {hearts === DEFAULT_HEART_COUNT ? <span>full</span>: (
                        <div className="flex items-center">
                            <Image src="/images/icons/points.svg" width={20} height={20} alt="Points" />
                            <p>{POINTS_TO_REFILL}</p>
                        </div>
                    )}
                </Button>
            </li>
        </ul>
    );
}