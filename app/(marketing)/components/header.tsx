import Image from "next/image";
import Link from "next/link";
import { Loader } from "lucide-react";
import {
  ClerkLoading,
  ClerkLoaded,
  UserButton,
  SignedIn,
  SignInButton,
  SignedOut,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="flex justify-between items-center w-full h-20 border-b-2 border-slate-200 px-4">
      <Link className="flex items-center gap-x-3" href="/">
        <Image src="/images/mascot.svg" width="40" height="40" alt="Logo" />
        <span className="text-2xl font-extrabold text-green-600 tracking-wide">
          Lingo
        </span>
      </Link>
      <ClerkLoading>
        <div className="px-8">
          <span className="sr-only">Loading...</span>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton
            mode="modal"
            afterSignInUrl="/learn"
            afterSignUpUrl="/learn"
          >
            <Button variant="ghost" size="lg">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </header>
  );
}

export { Header };
