"use client"

import React, { useCallback, useMemo, useState } from "react"
import type { ElementType } from "react"
import { useAnimate } from "motion/react"
import type { AnimationOptions, ValueAnimationTransition } from "motion/react"

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ")
}

const splitIntoCharacters = (text: string): string[] => {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" })
    return Array.from(segmenter.segment(text), ({ segment }) => segment)
  }
  return Array.from(text)
}

const extractTextFromChildren = (children: React.ReactNode): string | undefined => {
  if (children == null) return ""
  if (typeof children === "string") return children
  if (typeof children === "number") return String(children)
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("")
  }
  if (React.isValidElement(children)) {
    const props = (children as React.ReactElement).props
    const childText = (props as any).children as React.ReactNode
    if (childText != null) {
      return extractTextFromChildren(childText)
    }
    return ""
  }
}

interface WordObject {
  characters: string[]
  needsSpace: boolean
}

interface Letter3DSwapProps {
  children: React.ReactNode
  as?: ElementType
  mainClassName?: string
  frontFaceClassName?: string
  secondFaceClassName?: string
  staggerDuration?: number
  staggerFrom?: "first" | "last" | "center" | number | "random"
  transition?: ValueAnimationTransition | AnimationOptions
  rotateDirection?: "top" | "right" | "bottom" | "left"
}

const Letter3DSwap = ({
  children,
  as = "p",
  mainClassName,
  frontFaceClassName,
  secondFaceClassName,
  staggerDuration = 0.05,
  staggerFrom = "first",
  transition = { type: "spring", damping: 30, stiffness: 300 },
  rotateDirection = "right",
  ...props
}: Letter3DSwapProps) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [scope, animate] = useAnimate()

  const rotationTransform = (() => {
    switch (rotateDirection) {
      case "top":
        return "rotateX(90deg)"
      case "right":
        return "rotateY(90deg)"
      case "bottom":
        return "rotateX(-90deg)"
      case "left":
        return "rotateY(90deg)"
      default:
        return "rotateY(-90deg)"
    }
  })()

  const text = useMemo(() => {
    try {
      return extractTextFromChildren(children)
    } catch (error) {
      console.error(error)
      return ""
    }
  }, [children])

  const characters = useMemo(() => {
    const t = text?.split(" ") ?? []
    const result = t.map((word: string, i: number) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== t.length - 1,
    }))
    return result
  }, [text])

  const getStaggerDelay = useCallback(
    (index: number, totalChars: number) => {
      const total = totalChars
      if (staggerFrom === "first") return index * staggerDuration
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration
      if (staggerFrom === "center") {
        const center = Math.floor(total / 2)
        return Math.abs(center - index) * staggerDuration
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * total)
        return Math.abs(randomIndex - index) * staggerDuration
      }
      return Math.abs(staggerFrom - index) * staggerDuration
    },
    [staggerFrom, staggerDuration]
  )

  const handleHoverStart = useCallback(async () => {
    if (isAnimating || isHovering) return

    setIsHovering(true)
    setIsAnimating(true)

    const totalChars = characters.reduce(
      (sum: number, word: WordObject) => sum + word.characters.length,
      0
    )

    const delays = Array.from({ length: totalChars }, (_, i) => {
      return getStaggerDelay(i, totalChars)
    })

    await animate(
      ".letter-3d-swap-char-box-item",
      { transform: rotationTransform },
      {
        ...transition,
        delay: (i: number) => delays[i],
      }
    )

    await animate(
      ".letter-3d-swap-char-box-item",
      { transform: "rotateX(0deg) rotateY(0deg)" },
      { duration: 0 }
    )

    setIsAnimating(false)
  }, [
    isAnimating,
    isHovering,
    characters,
    transition,
    getStaggerDelay,
    rotationTransform,
    animate,
  ])

  const handleHoverEnd = useCallback(() => {
    setIsHovering(false)
  }, [])

  const ElementTag = as ?? "p"

  return (
    <ElementTag
      className={cn("flex flex-wrap relative", mainClassName)}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{text}</span>

      {characters.map(
        (wordObj: WordObject, wordIndex: number, array: WordObject[]) => {
          const previousCharsCount = array
            .slice(0, wordIndex)
            .reduce(
              (sum: number, word: WordObject) => sum + word.characters.length,
              0
            )

          return (
            <span key={wordIndex} className="inline-flex">
              {wordObj.characters.map((char: string, charIndex: number) => {
                const totalIndex = previousCharsCount + charIndex

                return (
                  <CharBox
                    key={totalIndex}
                    char={char}
                    frontFaceClassName={frontFaceClassName}
                    secondFaceClassName={secondFaceClassName}
                    rotateDirection={rotateDirection}
                  />
                )
              })}
              {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
            </span>
          )
        }
      )}
    </ElementTag>
  )
}

interface CharBoxProps {
  char: string
  frontFaceClassName?: string
  secondFaceClassName?: string
  rotateDirection: "top" | "right" | "bottom" | "left"
}

const CharBox = ({
  char,
  frontFaceClassName,
  secondFaceClassName,
  rotateDirection,
}: CharBoxProps) => {
  const getSecondFaceTransform = () => {
    switch (rotateDirection) {
      case "top":
        return `rotateX(-90deg) translateZ(0.5lh)`
      case "right":
        return `rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(-50%) rotateY(-90deg) translateX(50%)`
      case "bottom":
        return `rotateX(90deg) translateZ(0.5lh)`
      case "left":
        return `rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg) translateX(50%)`
      default:
        return `rotateY(90deg) translateZ(1ch)`
    }
  }

  const secondFaceTransform = getSecondFaceTransform()

  return (
    <span
      className="letter-3d-swap-char-box-item inline-box transform-3d"
      style={{
        transform:
          rotateDirection === "top" || rotateDirection === "bottom"
            ? "translateZ(-0.5lh)"
            : "rotateY(90deg) translateX(50%) rotateY(-90deg)",
      }}
    >
      <span
        className={cn("relative backface-hidden h-[1lh]", frontFaceClassName)}
        style={{
          transform: `${
            rotateDirection === "top" || rotateDirection === "bottom"
              ? "translateZ(0.5lh)"
              : rotateDirection === "left"
                ? "rotateY(90deg) translateX(50%) rotateY(-90deg)"
                : "rotateY(-90deg) translateX(50%) rotateY(90deg)"
          }`,
        }}
      >
        {char}
      </span>

      <span
        className={cn(
          "absolute backface-hidden h-[1lh] top-0 left-0",
          secondFaceClassName
        )}
        style={{
          transform: secondFaceTransform,
        }}
      >
        {char}
      </span>
    </span>
  )
}

Letter3DSwap.displayName = "Letter3DSwap"

export default Letter3DSwap
