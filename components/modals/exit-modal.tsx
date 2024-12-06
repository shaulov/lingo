"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {useExitModal} from "@/hooks/use-exit-modal";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {AppRoutes} from "@/const";

export function ExitModal() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useExitModal();

    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader className="flex items-center">
                    <Image
                        className="mb-5 text-center rounded"
                        src="/images/mascot_sad.svg"
                        height={80}
                        width={80}
                        alt="Sad face mascot"
                    />
                    <DialogTitle className="font-bold text-2xl">Wait, don&apos;t go!</DialogTitle>
                    <DialogDescription className="text-base">
                        You&apos;re about to leave the lesson. Are you sure?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col flex-wrap items-center gap-4">
                    <Button
                        className="w-full"
                        variant="primary"
                        size="lg"
                        onClick={close}
                    >
                        Keep learning
                    </Button>
                    <Button
                        className="w-full"
                        variant="dangerOutline"
                        size="lg"
                        onClick={() => {
                            router.push(AppRoutes.Learn);
                            close();
                        }}
                    >
                        End session
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}