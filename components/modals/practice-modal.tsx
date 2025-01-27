"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import {usePracticeModal} from "@/hooks/use-practice-modal";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function PracticeModal() {
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = usePracticeModal();

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
                        src="/images/icons/heart.svg"
                        height={80}
                        width={80}
                        alt="Heart"
                    />
                    <DialogTitle className="font-bold text-2xl">Practice lesson</DialogTitle>
                    <DialogDescription className="text-base text-center">
                        Use practice lessons to regain hearts and points. You can not lose hearts or points in practice lessons.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col flex-wrap items-center gap-4">
                    <Button
                        className="w-full"
                        variant="primary"
                        size="lg"
                        onClick={close}
                    >
                        I understand
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}