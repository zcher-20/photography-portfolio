import Letter3DSwap from "./Letter3DSwap";

export default function HeroName({ name }: { name: string }) {
  return (
    <Letter3DSwap
      as="span"
      mainClassName=""
      frontFaceClassName="bg-white dark:bg-black dark:text-white"
      secondFaceClassName="bg-white dark:bg-black dark:text-white"
      rotateDirection="top"
      staggerDuration={0.05}
      staggerFrom="first"
      transition={{ type: "spring", damping: 27, stiffness: 110 }}
    >
      {name}
    </Letter3DSwap>
  );
}
