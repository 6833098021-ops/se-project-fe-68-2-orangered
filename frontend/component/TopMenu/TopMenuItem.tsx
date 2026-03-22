import Link from "next/link"

interface TopMenuItemProps{
  item: string
  pageRef: string
}

export default function TopMenuItem({item, pageRef}: TopMenuItemProps){
  return(
    <Link href={pageRef} className="text-white font-mono p-5 hover:bg-sky-500/10 transition-all duration-150">
      {item}
    </Link>
  )
}