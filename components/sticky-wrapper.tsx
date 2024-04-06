type StickyWrapper = {
  children: React.ReactNode;
}

function StickyWrapper({ children }: StickyWrapper) {
  return (
    <div className="hidden lg:block w-[368px]">
      <div className="sticky top-6 bottom-6 flex flex-col gap-y-4 min-h-[calc(100vh-48px)]">
        {children}
      </div>
    </div>
  );
}

export { StickyWrapper };