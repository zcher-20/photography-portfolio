"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import MarqueeAlongSvgPath from "./MarqueeAlongSvgPath"

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
  "/photography/thumbs/trail--IMG_8531.webp",
  "/photography/thumbs/trail--IMG_9023.webp",
  "/photography/thumbs/trail--IMG_9108.webp",
  "/photography/thumbs/trail--IMG_9553.webp",
  "/photography/thumbs/trail--IMG_9863.webp",
  "/photography/thumbs/trail--Tezza-5653.webp",
]

const MARQUEE_IMAGES = [
  PHOTOS[0], PHOTOS[2], PHOTOS[4], PHOTOS[6],
  PHOTOS[8], PHOTOS[10], PHOTOS[13], PHOTOS[15],
  PHOTOS[1], PHOTOS[5], PHOTOS[9], PHOTOS[16],
]

const RECT_PATH =
  "M-20,-10 L1220,-10 Q1240,-10 1240,10 L1240,590 Q1240,610 1220,610 L-20,610 Q-40,610 -40,590 L-40,10 Q-40,-10 -20,-10"

export default function PhotographyHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMoving, setIsMoving] = useState(false)
  const moveTimeoutRef = useRef<number>(0)
  const lastXRef = useRef(0)
  const lastYRef = useRef(0)
  const distAccumRef = useRef(0)
  const photoIndexRef = useRef(0)

  useEffect(() => {
    PHOTOS.forEach((src) => { const i = new Image(); i.src = src })
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

      {/* Marquee along rectangular path */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transition: "opacity 0.5s ease",
          opacity: isMoving ? 0 : 1,
          pointerEvents: "none",
          zIndex: 4,
        }}
      >
        <MarqueeAlongSvgPath
          path={RECT_PATH}
          viewBox="0 0 1200 600"
          baseVelocity={3}
          slowdownOnHover={true}
          repeat={2}
          className="w-full h-full"
          responsive
          enableRollingZIndex={false}
        >
          {MARQUEE_IMAGES.map((src, i) => (
            <div key={i} style={{ width: "80px", height: "60px" }}>
              <img
                src={src}
                alt=""
                draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </MarqueeAlongSvgPath>
      </div>
    </section>
  )
}
