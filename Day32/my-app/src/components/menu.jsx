import MenuItem from "./menuItem";

const Menu = ({items}) => {
  return (
    <div className="grid grid-cols-1 gap-3 bg-amber-500 mt-2 p-3">
          {items.map((item,index) => 
          {
              console.log(Object.entries(item)[0][1])
              return <MenuItem key={index} value={Object.entries(item)[0][1]} />
          })}
    </div>
    );
    
};
export default Menu;
