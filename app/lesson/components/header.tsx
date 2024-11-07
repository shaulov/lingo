import Image from "next/image";
import {InfinityIcon, X} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import {useExitModal} from "@/hooks/use-exit-modal";

type Props = {
  hearts: number;
  percentage: number;
  hasActiveSubscription?: boolean;
};

export function Header({ hearts, percentage, hasActiveSubscription }: Props) {
    const { open } = useExitModal();

    return (
        <header className="flex gap-x-7 items-center justify-between max-w-[1140px] w-full mx-auto lg:pt-[50px] pt-[20px] px-10">
            <button onClick={open}>
                <X className="text-slate-500 hover:opacity-75 transition" />
                <span className="sr-only">Close</span>
            </button>
            <Progress value={percentage} />
            <div className="flex items-center font-bold text-rose-500">
                <Image className="mr-2" src="/images/icons/heart.svg" width="28" height="28" alt="Heart" />
                {hasActiveSubscription
                    ? <InfinityIcon className="h-6 w-6 stroke-[3]" />
                    : hearts
                }
            </div>
        </header>
    )
}