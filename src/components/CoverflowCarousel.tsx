"use client"

import { useState } from "react"
import { motion } from "motion/react"

interface Props {
  images: string[]
}

export default function CoverflowCarousel({ images }: Props) {
  const [active, setActive] = useState(0)
  const total = images.length

  const prev = () => setActive((a) => (a - 1 + total) % total)
  const next = () => setActive((a) => (a + 1) % total)

  const getOffset = (index: number) => {
    let diff = index - active
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return diff
  }

  return (
    <div style={{ perspective: "1200px", position: "relative", width: "100%", height: "340px", overflow: "hidden" }}>
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {images.map((src, i) => {
          const offset = getOffset(i)
          const absOffset = Math.abs(offset)
          if (absOffset > 2) return null

          const rotateY = offset * 45
          const translateX = offset * 280
          const translateZ = -absOffset * 180
          const scale = 1 - absOffset * 0.12
          const opacity = 1 - absOffset * 0.3

          return (
            <motion.div
              key={i}
              animate={{ rotateY, x: translateX, z: translateZ, scale, opacity }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              style={{
                position: "absolute",
                width: "480px",
                height: "300px",
                overflow: "hidden",
                boxShadow: offset === 0 ? "0 8px 30px rgba(0,0,0,0.12)" : "0 4px 16px rgba(0,0,0,0.08)",
                zIndex: total - absOffset,
                transformStyle: "preserve-3d",
                cursor: offset === 0 ? "default" : "pointer",
              }}
              onClick={() => { if (offset !== 0) setActive(i) }}
            >
              <img
                src={src}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </motion.div>
          )
        })}
      </div>

      <button
        onClick={prev}
        style={{
          position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)",
          background: "none", border: "none", cursor: "pointer",
          fontSize: "24px", color: "#999", zIndex: 20, padding: "8px",
          lineHeight: 1,
        }}
        aria-label="Previous"
      >‹</button>
      <button
        onClick={next}
        style={{
          position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)",
          background: "none", border: "none", cursor: "pointer",
          fontSize: "24px", color: "#999", zIndex: 20, padding: "8px",
          lineHeight: 1,
        }}
        aria-label="Next"
      >›</button>

      <div style={{ position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px", zIndex: 20 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: "5px", height: "5px", borderRadius: "50%", border: "none",
              background: i === active ? "#555" : "#ccc",
              cursor: "pointer", padding: 0,
              transition: "background 0.2s",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
