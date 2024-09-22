export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="flex items-center justify-center min-h-[85vh]">
        {children}
      </main>
    </>
  )
}