import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {AppRoutes} from "@/const";

function Promo() {
    return (
        <div className="p-4 border-2 rounded-xl">
            <div className="flex items-center gap-x-2">
                <Image src="/images/icons/unlimited.svg" width={26} height={26} alt="Pro" />
                <h3 className="font-bold text-lg">Upgrade to Pro</h3>
            </div>
            <p className="text-muted-foreground">
                Get unlimited hearts and more!
            </p>
            <Button className="w-full mt-4" size="lg" variant="super" asChild>
                <Link href={AppRoutes.Shop}>
                    Upgrade today
                </Link>
            </Button>
        </div>
    );
}

export { Promo };