export default function UserSkillBadge({ label, value }) {
  return (
    <span className="bg-slate-100 text-slate-700 text-xs py-1 px-2.5 rounded-full border border-slate-200">
      <strong className="text-slate-900">{label}:</strong> {value}
    </span>
  );
}
