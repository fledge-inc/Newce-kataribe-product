export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-kinari px-8 text-center">
      <span className="block h-6 w-px bg-rule-strong" aria-hidden="true" />
      <h1 className="mincho mt-6 text-[19px] tracking-jp">Content not found</h1>
      <p className="mt-4 text-[13px] leading-7 text-muted">
        The requested product or page is not available.
      </p>
    </main>
  );
}
