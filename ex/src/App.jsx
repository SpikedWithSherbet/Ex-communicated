import { useState } from 'react'
import './App.css'
import { Users } from './users'
import { color } from 'motion';

function App() {



  const [query, setQuery] = useState("");
  const [itemGender, setItemGender] = useState("Unisex");
  const [clothingType, setClothingType] = useState("T-shirts");
  const [selectedItem, setSelectedItem] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const totalPrice = cartItems.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);
  



  console.log(selectedItem)
  console.log(cartItems)
  return (
    <> 
    <div className='herocontainer'>


      <h1> FIND
        YOUR
        <div className='italictext'> FIT </div>
      </h1>
    </div>
    
    <div className='dynamicsearch'><div className='selectioncontainer'>
      <input type="text" className="search" placeholder='Search' onChange={e=> setQuery(e.target.value)}/> 
      <div className='buttoncontainer' style={{display: "flex"}}>
      <button
        className='Unisex'
        onClick={() => setItemGender("Unisex")}
      >
        Unisex
      </button>

      <button
        className='Male'
        onClick={() => setItemGender("Male")}
      >
        Male
      </button>

       <button
        className='Female'
        onClick={() => setItemGender("Female")}
      >
        Female
      </button></div>
     
      <h2>Clothing Type</h2>
       <div className='clothingtype'>
      <button
        className='T-shirts'
        onClick={() => setClothingType("T-shirts")}
      >
        T-shirts
      </button>

       <button
        className='Sweatpants'
        onClick={() => setClothingType("Sweatpants")}
      >
        Sweatpants
      </button>

       <button
        className='Shorts'
        onClick={() => setClothingType("Shorts")}
      >
        Shorts
      </button>

       <button
        className='Jackets'
        onClick={() => setClothingType("Jackets")}
      >
        Jackets
      </button>
</div>
      </div>
       
      
<div className='gridcontainer'>
      <ul className='itemlist'>
      {Users
            .filter(user => {
              // Make sure you check query separately from gender
              const matchesQuery = user.first_name
                .toLowerCase()
                .includes(query.toLowerCase());
              const matchesGender = user.gender === itemGender;
              const matchesCType = user.clothing_type == clothingType
              return matchesQuery && matchesGender && matchesCType;
            }).map((user) => (

        <li key={user.id} className='listItem' onClick={() => setSelectedItem(user.id)}>
           <div className='itemtoparea'><h2>{user.first_name}</h2> <p>${user.price}</p></div><div className='itembottomarea'> <button>S</button> <button>M</button> <button>L</button> <button>XL</button> </div> 
          </li> 
          
        // This is where you would stylise for each item. ^^
    ))}


      </ul>
      </div>
      </div>

       <div className='singleitemcontainer'>

        <div className='singleleft'>
<h1>{Users[selectedItem - 1].first_name.toUpperCase()}</h1>
<div className='singleimagecontainer'> <img src={Users[selectedItem - 1].image1} alt={Users[selectedItem - 1].first_name} height="450px" width="345px"></img> <img src={Users[selectedItem - 1].image2} alt={Users[selectedItem - 1].first_name} height="450px" width="345px"></img></div>
<img></img>
        </div>

        <div className='singleright'>
<div className='singlerighttop'><span>${Users[selectedItem - 1].price}</span> <div className='starrating'> <span className="fa fa-star checked"></span>
<span className="fa fa-star checked"></span>
<span className="fa fa-star checked"></span>
<span className="fa fa-star"></span>
<span className="fa fa-star"></span></div></div>
<ul><li>Lorem Ipsum</li> <li>Dolor Sit</li> <li>Amet Consecutor</li> <li>Lorem Ipsum</li> </ul>

<div className='buttonline1'>
  {["S", "M", "L", "XL"].map(size => (
    <button key={size} onClick={() => setSelectedSize(size)}>
      {size}
    </button>
  ))}
  <button>SIZE GUIDE</button>
</div>


<div className='buttonline2'><button>CARE GUIDE</button></div>

<div className='buttonline3'>
<button
  onClick={() => {
    const itemId = Users[selectedItem - 1].id;
    const itemName = Users[selectedItem - 1].first_name;
    const itemPrice = Users[selectedItem - 1].price;
    const itemImage = Users[selectedItem - 1].image1;
    const newItem = {
      id: itemId,
      image: itemImage,
      name: itemName,
      size: selectedSize,
      quantity: quantity,
      price: itemPrice,
    };
    setCartItems([...cartItems, newItem]);
  }}
>
  ADD TO CART
</button>
 <div className='quantityselector'>
  <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
  {quantity}
  <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
</div>
</div>
</div>
</div>

      <div className='cartcontainer'>
        

 <h1>YOUR CART</h1>
  <ul>
    {cartItems.map((item, index) => (
      <li key={index} className='cartitem'>
        <img src={item.image} width="70px" height="90px"></img>{item.name} - {item.size} <div className='quantitysticker'>{item.quantity}x</div> <div className='price' style={{marginLeft: "67vw"}}>${item.price}</div>
      </li>
    ))}
  </ul>
  <hr></hr>

  <button onClick={() => setCartItems([])}>
  CLEAR CART
</button>

<h1 className='totalPrice'> Total: ${totalPrice.toFixed(2)} </h1>
<button className='paymentButton'>Proceed to Payment</button>


      </div>


    </>
  )
}

export default App
