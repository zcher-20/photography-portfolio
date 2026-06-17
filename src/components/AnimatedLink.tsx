"use client"

import CenterUnderline from "./UnderlineCenter"

interface Props {
  href: string
  children: React.ReactNode
}

export default function AnimatedLink({ href, children }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <CenterUnderline>{children}</CenterUnderline>
    </a>
  )
}
