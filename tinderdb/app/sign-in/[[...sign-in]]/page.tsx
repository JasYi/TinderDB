import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white p-6 rounded-lg z-10"> 
      <div className="flex justify-center items-center h-screen p-5">
          <SignIn />
      </div>
    </div>
  )
}