"use client"

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import type { ReactNode, RefObject } from "react"
import { useAnimationFrame, motion, stagger, useAnimate } from "motion/react"

const PHOTOS = [
  "/photography/thumbs/trail--100_1775.webp",
  "/photography/thumbs/trail--IMG_0005.webp",
  "/photography/thumbs/trail--IMG_0064.webp",
  "/photography/thumbs/trail--IMG_0145.webp",
  "/photography/thumbs/trail--IMG_0667.webp",
  "/photography/thumbs/trail--IMG_0840.webp",
  "/photography/thumbs/trail--IMG_0858.webp",
  "/photography/thumbs/trail--IMG_1176.webp",
  "/photography/thumbs/trail--IMG_2675.webp",
  "/photography/thumbs/trail--IMG_3857.webp",
  "/photography/thumbs/trail--IMG_6484.webp",
  "/photography/thumbs/trail--IMG_6875.webp",
  "/photography/thumbs/trail--IMG_6875.webp",
  "/photography/thumbs/trail--IMG_8531.webp",
  "/photography/thumbs/trail--IMG_9023.webp",
  "/photography/thumbs/trail--IMG_9108.webp",
  "/photography/thumbs/trail--IMG_9553.webp",
  "/photography/thumbs/trail--IMG_9863.webp",
  "/photography/thumbs/trail--Tezza-5653.webp",
]

const FLOATING_IMAGES = [
  PHOTOS[0], PHOTOS[2], PHOTOS[4], PHOTOS[6],
  PHOTOS[8], PHOTOS[10], PHOTOS[14], PHOTOS[17],
]

// --- Mouse position hook ---
function useMousePositionRef(containerRef: RefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        positionRef.current = { x: ev.clientX - rect.left, y: ev.clientY - rect.top }
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [containerRef])

  return positionRef
}

// --- Floating context ---
interface FloatingContextType {
  registerElement: (id: string, element: HTMLDivElement, depth: number) => void
  unregisterElement: (id: string) => void
}

const FloatingContext = createContext<FloatingContextType | null>(null)

function Floating({
  children,
  className,
  sensitivity = 1,
  easingFactor = 0.05,
}: {
  children: ReactNode
  className?: string
  sensitivity?: number
  easingFactor?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsMap = useRef(
    new Map<string, { element: HTMLDivElement; depth: number; currentPosition: { x: number; y: number } }>()
  )
  const mousePositionRef = useMousePositionRef(containerRef)

  const registerElement = useCallback((id: string, element: HTMLDivElement, depth: number) => {
    elementsMap.current.set(id, { element, depth, currentPosition: { x: 0, y: 0 } })
  }, [])

  const unregisterElement = useCallback((id: string) => {
    elementsMap.current.delete(id)
  }, [])

  useAnimationFrame(() => {
    if (!containerRef.current) return
    elementsMap.current.forEach((data) => {
      const strength = (data.depth * sensitivity) / 20
      const newTargetX = mousePositionRef.current.x * strength
      const newTargetY = mousePositionRef.current.y * strength
      data.currentPosition.x += (newTargetX - data.currentPosition.x) * easingFactor
      data.currentPosition.y += (newTargetY - data.currentPosition.y) * easingFactor
      data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`
    })
  })

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div ref={containerRef} className={className} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        {children}
      </div>
    </FloatingContext.Provider>
  )
}

function FloatingElement({ children, className, depth = 1 }: { children: ReactNode; className?: string; depth?: number }) {
  const elementRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(FloatingContext)

  useEffect(() => {
    if (!elementRef.current || !context) return
    context.registerElement(idRef.current, elementRef.current, depth)
    return () => context.unregisterElement(idRef.current)
  }, [depth, context])

  return (
    <div ref={elementRef} className={className} style={{ position: "absolute", willChange: "transform" }}>
      {children}
    </div>
  )
}

// --- Main component ---
export default function PhotographyHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMoving, setIsMoving] = useState(false)
  const moveTimeoutRef = useRef<number>(0)
  const lastXRef = useRef(0)
  const lastYRef = useRef(0)
  const distAccumRef = useRef(0)
  const photoIndexRef = useRef(0)
  const [scope, animate] = useAnimate()

  useEffect(() => {
    PHOTOS.forEach((src) => { const i = new Image(); i.src = src })
  }, [])

  useEffect(() => {
    if (!scope.current) return
    animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.12) })
  }, [])

  const spawnPhoto = useCallback((x: number, y: number) => {
    if (!sectionRef.current) return
    const img = document.createElement("img")
    img.decoding = "async"
    img.src = PHOTOS[photoIndexRef.current % PHOTOS.length]
    photoIndexRef.current++
    const w = 110 + Math.random() * 70
    const h = w * (0.65 + Math.random() * 0.5)
    const rotate = (Math.random() - 0.5) * 18
    img.style.cssText = `position:absolute;left:${x - w / 2}px;top:${y - h / 2}px;width:${w}px;height:${h}px;object-fit:cover;border-radius:2px;pointer-events:none;transform:rotate(${rotate}deg) scale(0.85);opacity:0;transition:opacity 0.15s ease,transform 0.15s ease;z-index:5;`
    img.className = "trail-photo"
    sectionRef.current.appendChild(img)
    requestAnimationFrame(() => {
      img.style.opacity = "1"
      img.style.transform = `rotate(${rotate}deg) scale(1)`
    })
    setTimeout(() => {
      img.style.opacity = "0"
      img.style.transform = `rotate(${rotate}deg) scale(1.08)`
      setTimeout(() => img.remove(), 500)
    }, 1800)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const dx = mouseX - lastXRef.current
    const dy = mouseY - lastYRef.current
    distAccumRef.current += Math.sqrt(dx * dx + dy * dy)

    if (!isMoving) setIsMoving(true)

    clearTimeout(moveTimeoutRef.current)
    moveTimeoutRef.current = window.setTimeout(() => {
      setIsMoving(false)
    }, 1500)

    if (distAccumRef.current >= 80) {
      distAccumRef.current = 0
      spawnPhoto(mouseX, mouseY)
    }

    lastXRef.current = mouseX
    lastYRef.current = mouseY
  }, [isMoving, spawnPhoto])

  const handleMouseLeave = useCallback(() => {
    setIsMoving(false)
    clearTimeout(moveTimeoutRef.current)
  }, [])

  const floatingLayout = [
    { top: "8%", left: "6%", w: "120px", h: "90px", depth: 0.5 },
    { top: "5%", left: "30%", w: "140px", h: "100px", depth: 1 },
    { top: "3%", left: "62%", w: "130px", h: "170px", depth: 2 },
    { top: "8%", left: "85%", w: "110px", h: "90px", depth: 1 },
    { top: "55%", left: "3%", w: "140px", h: "110px", depth: 1.5 },
    { top: "60%", left: "78%", w: "130px", h: "160px", depth: 2 },
    { top: "70%", left: "20%", w: "150px", h: "100px", depth: 3 },
    { top: "65%", left: "52%", w: "120px", h: "100px", depth: 1 },
  ]

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width: "100%",
        height: "90vh",
        overflow: "hidden",
        cursor: "crosshair",
        background: "#fff",
      }}
    >
      <h1
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(3rem, 10vw, 7rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "#111",
          pointerEvents: "none",
          zIndex: 10,
          whiteSpace: "nowrap",
          transition: "opacity 0.4s",
          userSelect: "none",
          opacity: isMoving ? 0.06 : 1,
        }}
      >
        Photography
      </h1>

      {/* Floating parallax images - visible when idle */}
      <div
        ref={scope}
        style={{
          position: "absolute",
          inset: 0,
          transition: "opacity 0.5s ease",
          opacity: isMoving ? 0 : 1,
          pointerEvents: "none",
          zIndex: 4,
        }}
      >
        <Floating sensitivity={-1} className="overflow-hidden">
          {floatingLayout.map((pos, i) => (
            <FloatingElement key={i} depth={pos.depth} className={`top-[${pos.top}] left-[${pos.left}]`}>
              <motion.img
                initial={{ opacity: 0 }}
                src={FLOATING_IMAGES[i]}
                style={{
                  width: pos.w,
                  height: pos.h,
                  objectFit: "cover",
                  position: "absolute",
                  top: pos.top,
                  left: pos.left,
                }}
              />
            </FloatingElement>
          ))}
        </Floating>
      </div>
    </section>
  )
}
