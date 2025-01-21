import {useRef} from "react";
import Image from "next/image";
import ReactConfetti from "react-confetti";
import {useWindowSize} from "react-use";
import {ResultCard} from "./result-card";

type Props = {
    score: number;
    hearts: number;
}

export function FinishQuiz({ score, hearts }: Props) {
    const finishAudioRef = useRef<HTMLAudioElement | null>(null);
    const { width, height } = useWindowSize();

    return (
        <main
            className="flex flex-col items-center justify-center gap-y-4 lg:gap-y-8 max-w-lg h-full mx-auto text-center"
        >
            <audio ref={finishAudioRef} src="/sounds/finish.mp3" autoPlay />
            <ReactConfetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={500}
                tweenDuration={10000}
            />
            <Image className="hidden lg:block" width={100} height={100} src="/images/finish.svg" alt="Finish"/>
            <Image className="block lg:hidden" width={50} height={50} src="/images/finish.svg" alt="Finish"/>
            <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                Great job!<br/>You&apos;ve completed the lesson
            </h1>
            <section className="flex items-center gap-x-4 w-full">
                <h2 className="sr-only">Lesson Results</h2>
                <ResultCard
                    variant="points"
                    value={score}
                />
                <ResultCard
                    variant="hearts"
                    value={hearts}
                />
            </section>
        </main>
    );
}