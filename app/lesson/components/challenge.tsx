import {challengeOptions, challenges} from "@/db/schema";
import {cn} from "@/lib/utils";
import {Card} from "./card";
import {ChallengeTypes} from "@/const";
import {QuizStatus} from "@/types";

type Props = {
    options: typeof challengeOptions.$inferSelect[];
    status: QuizStatus;
    selectedOption?: number;
    type: typeof challenges.$inferSelect["type"];
    disabled?: boolean;
    onSelect: (id: number) => void;
}

export function Challenge({
    options,
    status,
    selectedOption,
    type,
    disabled,
    onSelect,
}: Props) {
    return (
        <ul className={cn(
            "grid gap-2",
            type === ChallengeTypes.Assist && "grid-cols-1",
            type === ChallengeTypes.Select && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
        )}>
            {options.map((option, index) => (
                <li key={option.id}>
                    <Card
                        id={option.id}
                        text={option.text}
                        imageSrc={option.imageSrc}
                        shortcut={`${index + 1}`}
                        selected={selectedOption === option.id}
                        status={status}
                        audioSrc={option.audioSrc}
                        disabled={disabled}
                        type={type}
                        onClick={() => onSelect(option.id)}
                    />
                </li>
            ))}
        </ul>
    );
}