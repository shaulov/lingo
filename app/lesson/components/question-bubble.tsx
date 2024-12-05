import Image from "next/image";

type Props = {
    question: string;
}

function QuestionBubble({ question }: Props) {
    return (
        <article className="flex items-center gap-x-4 mb-6">
            <Image
                className="hidden lg:block"
                src="/images/mascot.svg"
                height={60}
                width={60}
                alt="Mascot"
            />
            <Image
                className="block lg:hidden"
                src="/images/mascot.svg"
                height={40}
                width={40}
                alt="Mascot"
            />
            <p className="relative px-4 py-2 text-sm lg:text-base border-2 rounded-xl">
                {question}
                <span className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90" />
            </p>
        </article>
    );
}

export { QuestionBubble };