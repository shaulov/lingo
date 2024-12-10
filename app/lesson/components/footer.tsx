import {useCallback} from "react";
import {useKey, useMedia} from "react-use";
import {CheckCircle, XCircle} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {AppRoutes} from "@/const";
import {FooterStatus} from "@/types";

type Props = {
    status: FooterStatus;
    disable?: boolean;
    lessonId?: string;
    onCheck: () => void;
}

export function Footer({ disable, status, lessonId, onCheck }: Props) {
    useKey("Enter", onCheck, {}, [onCheck]);
    const isMobile = useMedia("(max-width: 1024px)");

    const handleComplete = useCallback(() => {
        window.location.href = `${AppRoutes.Lesson}/${lessonId}`;
    }, [lessonId]);

    return (
        <footer className={cn(
            "lg:h-[140px] h-[100px] border-t-2",
            status === "correct" && "bg-green-100 border-transparent",
            status === "wrong" && "bg-rose-100 border-transparent",
        )}>
            <div className="flex items-center justify-between max-w-[1140px] h-full mx-auto px-6 lg:px-10">
                {status === "correct" && (
                    <div className="flex items-center text-green-500 font-bold text-base lg:text-2xl">
                        <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                        Nicely done!
                    </div>
                )}
                {status === "wrong" && (
                    <div className="flex items-center text-rose-500 font-bold text-base lg:text-2xl">
                        <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                        Try again.
                    </div>
                )}
                {status === "completed" && (
                    <Button
                        variant="default"
                        size={isMobile ? "sm": "lg"}
                        onClick={handleComplete}
                    >
                        Practice again
                    </Button>
                )}
                <Button
                    className="ml-auto"
                    size={isMobile ? "sm" : "lg"}
                    variant={status === "wrong" ? "danger" : "secondary"}
                    disabled={disable}
                    onClick={onCheck}
                >
                    {status === "none" && "Check"}
                    {status === "correct" && "Next"}
                    {status === "wrong" && "Retry"}
                    {status === "completed" && "Continue"}
                </Button>
            </div>
        </footer>
    );
}