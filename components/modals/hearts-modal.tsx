"use client";

import {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {useHeartsModal} from "@/hooks/use-hearts-modal";
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

export function HeartsModal() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useHeartsModal();

    useEffect(() => setIsClient(true), []);

    const handleClick = useCallback(() => {
        router.push(AppRoutes.Shop);
        close();
    }, [router, close]);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader className="flex items-center">
                    <Image
                        className="mb-5 text-center rounded"
                        src="/images/mascot_bad.svg"
                        height={80}
                        width={80}
                        alt="Sad face mascot"
                    />
                    <DialogTitle className="font-bold text-2xl">You ran out of hearts!</DialogTitle>
                    <DialogDescription className="text-base text-center">
                        Get Pro for unlimited hearts, or purchase them in the store.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col flex-wrap items-center gap-4">
                    <Button
                        className="w-full"
                        variant="primary"
                        size="lg"
                        onClick={handleClick}
                    >
                        Get unlimited hearts
                    </Button>
                    <Button
                        className="w-full"
                        variant="primaryOutline"
                        size="lg"
                        onClick={close}
                    >
                        No thanks
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}