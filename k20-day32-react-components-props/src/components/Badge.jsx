const Badge = ({ type, text }) => {
    const isDiscount = type === "discount";
    return <span className={`absolute top-2.5 left-2.5 py-1 rounded text-xs font-bold text-white z-10 ${isDiscount?'bg-red-500':'bg-gray-500'}`}>{text}</span>
}

export default Badge;