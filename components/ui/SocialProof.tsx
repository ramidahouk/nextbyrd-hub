interface SocialProofProps {
  count?: number;
}

export default function SocialProof({ count }: SocialProofProps) {
  if (!count) return null;
  return (
    <p className="text-sm text-hub-muted">
      {count.toLocaleString()} business owners have used this tool
    </p>
  );
}
