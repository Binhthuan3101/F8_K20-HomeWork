const MenuItem = ({value}) => {
    return <div className="flex flex-col gap-2">
        <h3 className="text-xl text-red-500 font-bold">{value}</h3>
    </div>
}

export default MenuItem;