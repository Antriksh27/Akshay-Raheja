export default function Beam({ className = "", color = "white" }: { className?: string, color?: "white" | "flash" }) {
  const bgClass = color === "flash" ? "bg-accent-flash" : "bg-white";
  return (
    <div className={`absolute pointer-events-none rounded-[50%] blur-[100px] opacity-[0.08] mix-blend-screen ${bgClass} ${className}`}></div>
  );
}
