import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <> 
      <h1>TinderDB</h1>
      <Image 
          src="/path/to/your/image.jpg"  
          alt="Image"
          width={500}  
          height={300} 
        />
    </>
  )
}
