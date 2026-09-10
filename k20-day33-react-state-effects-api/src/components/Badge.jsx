export default function Badge({type,text}){
    const isDiscount = type === "discount";
    return(<span className={`text-xs font-bold px-2 py-1 rounded shadow-sm text-white ${
      isDiscount ? 'bg-rose-500' : 'bg-slate-500'
    }`}>
      {text}
    </span>)
}