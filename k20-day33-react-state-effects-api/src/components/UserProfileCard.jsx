import UserSkillBadge from "./UserSkillBadge";
export default function UserProfileCard({ user }) {
  const fullName = `${user.firstName} ${user.lastName}`;
  const avatar = user.image;
  const companyInfo = user.company
    ? `${user.company.title} - ${user.company.name}`
    : "Chưa cập nhật";
  const isOnline = user.age > 25;
  const extraInfo = [
    { label: "Role", value: user.role },
    { label: "gender", value: user.gender },
    { label: "Blood Group", value: user.bloodGroup },
    { label: "Department", value: user.company.department },
  ];

  const handleClick = () => {
    alert(`Đang kết nối với ${user.firstName} qua email ${user.email}...`);
  };
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md border border-slate-100 p-6 text-center">
      <div className="relative inline-block mb-3">
        <img
          className="w-24 h-24 object-cover border border-slate-200"
          src={avatar}
          alt={fullName}
        />
        <span
          className={`absolute bottom-1 right-1 w-4 h-4 rounded-full ${isOnline ? "bg-green-500" : "bg-slate-400"}`}
        ></span>
      </div>

      <h2 className="text-xl font-bold text-slate-500">{fullName}</h2>
      <p className="text-sm text-slate-500 mb-2">{companyInfo}</p>

      <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
        <span
          className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-slate-500"}`}
        ></span>
        <span className={`${isOnline ? "text-green-500" : "text-slate-500"}`}>
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {extraInfo.map((info, index) => {
          <UserSkillBadge key={index} label={info.label} value={info.value} />;
        })}
      </div>

      <button
        onClick={handleClick}
        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-all shadow-sm"
      >
        Liên hệ
      </button>
    </div>
  );
}
