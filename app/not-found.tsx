import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black text-white">
      <h2 className="text-4xl font-bold">404 - Not Found</h2>
      <p className="mt-4">Could not find the requested resource</p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        Return Home
      </Link>
    </div>
  )
}
