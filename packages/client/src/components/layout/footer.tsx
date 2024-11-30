export default function Footer() {
  const fullYear = new Date().getFullYear()

  return (
    <footer className="z-[1000] mt-auto h-24 w-full border-t bg-background py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {fullYear} Budgeteer.
          <br />
          The source code is available on{" "}
          <a
            href="https://github.com/0-BSCode/Budgeteer"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
