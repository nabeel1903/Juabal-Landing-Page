export function VoiceWave({ compact = false }: { compact?: boolean }) {
  const bars = compact
    ? [24, 48, 80, 38, 66, 92, 52, 74, 34, 58, 86, 44]
    : [20, 36, 58, 84, 42, 70, 96, 54, 76, 34, 64, 90, 48, 72, 28, 56, 82, 40];

  return (
    <div className={`voice-wave ${compact ? "is-compact" : ""}`} aria-hidden="true">
      {bars.map((height, index) => (
        <span
          key={`${height}-${index}`}
          style={{ height: `${height}%`, animationDelay: `${index * -75}ms` }}
        />
      ))}
    </div>
  );
}
