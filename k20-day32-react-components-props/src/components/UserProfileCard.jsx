import React from "react";
const UserProfileCard = ({ avatar, fullName, jobTitle, isOnline, skills }) => {
  const handleContact = () => {
    alert(`Đang kết nối với ${fullName}...`);
  };

  return (
    <div className="w-60 bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm flex flex-col items-center gap-2">
      <div className="relative">
        <img
          src={avatar}
          alt={fullName}
          className="w-20 h-20 rounded-full object-cover"
        />
        <span
          className={`absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
            isOnline ? "bg-green-500" : "bg-gray-400"
          }`}
        ></span>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900">{fullName}</h3>
        <p className="text-sm text-gray-500">{jobTitle}</p>
      </div>

      <div className="my-1">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${isOnline ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
        >
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 items-center">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      <button
        onClick={handleContact}
        className="mt-auto w-full cursor-pointer flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors"
      >
        <span>
          <i className="fa-solid fa-phone"></i>
        </span>
        <span>Liên hệ</span>
      </button>
    </div>
  );
};

export default UserProfileCard;
