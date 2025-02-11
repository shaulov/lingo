import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Progress} from "@/components/ui/progress";
import {AppRoutes, quests} from "@/const";

type Props = {
    points: number;
}

function Quests({ points }: Props) {
    return (
        <div className="space-y-4 p-4 border-2 rounded-xl">
            <div className="flex items-center justify-between w-full">
                <h3 className="font-bold text-lg">Quests</h3>
                <Button size="sm" variant="primaryOutline" asChild>
                    <Link href={AppRoutes.Quests}>
                        View all
                    </Link>
                </Button>
            </div>
            <ul className="w-full space-y-4">
                {quests.map((quest, index) => {
                    const progress = (points / quest.value) * 100;

                    return (
                        <li
                            className="flex items-center gap-x-3 w-full pb-4"
                            key={quest.title}
                        >
                            <Image src="/images/icons/points.svg" width={40} height={40} alt="Points" />
                            <div className="flex flex-col gap-y-2 w-full">
                                <p className="text-sm font-bold text-neutral-700">
                                    {quest.title}
                                </p>
                                <Progress className="h-3" value={progress} />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export {Quests};