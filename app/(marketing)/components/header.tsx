import Image from "next/image";
import Link from "next/link";
import {
  ClerkLoading,
  ClerkLoaded,
  UserButton,
  SignedIn,
  SignInButton,
  SignedOut,
} from "@clerk/nextjs";
import { Loader } from "@/components/loader";
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
        <Loader className="px-8" />
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
