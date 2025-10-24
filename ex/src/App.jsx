import { useState, useEffect, lazy, Suspense, useRef } from 'react'
import './App.css'
import { Users } from './users'
import { color } from 'motion';
import Header from "./Header";
import DynamicSearch from './DynamicSearch';
import RollingGallery from './RollingGallery'
import SizeGuide from './SizeGuide';
import CareGuide from './CareGuide';
  
const heroGallery = lazy(() => import("./RollingGallery"))
const dynamicSearch = lazy(() => import("./DynamicSearch"))






function App() {



  const [query, setQuery] = useState("");
  const [itemGender, setItemGender] = useState("Unisex");
  const [clothingType, setClothingType] = useState("T-shirts");
  const [selectedItem, setSelectedItem] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const dialogRef = useRef(null)
  const totalPrice = cartItems.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);
  const [heroItems, setHeroItems] = useState([]);
  const [dialogContent, setDialogContent] = useState(null);

  
  
useEffect(() => {
  if (heroItems.length === 0) {
    const indices = Array.from({ length: Users.length }, (_, i) => i);
    const shuffled = indices.sort(() => 0.5 - Math.random());
    const newItems = shuffled.slice(0, 5);
    setHeroItems(newItems);
  }
}, []);

useEffect(() => {
  if (heroItems.length > 0) {
    console.log("Hero items updated:", heroItems);
  }
}, [heroItems]);





  console.log(selectedItem)
  console.log(cartItems)
  return (
    <> 

      <div className="herocontainer">
  <Header />
<div className='herocontent'>
  <h1>FIND YOUR <span className="italictext">FIT</span></h1>

  {/* {heroItems.length === 5 && (
  <div className="gallery-wrap">
    {heroItems.map((index, i) => (
      <div
        key={i}
        className={`heroitem heroitem-${i + 1}`}
        style={{ backgroundImage: `url(${Users[index]?.image1})`}}
      onClick={() => { setSelectedItem(index + 1); window.location.href = "#singleitem";
      }
      }
      ></div>
    ))}

    
    
  </div>
)} */
<Suspense
				fallback={<div>RollingGallery Loading...</div>}
			>
				<RollingGallery autoplay={true} pauseOnHover={true} />
			</Suspense>
}
  </div>

            </div> 
<Suspense
				fallback={<div>Items Loading...</div>}
			>
				<DynamicSearch
  query={query}
  setQuery={setQuery}
  itemGender={itemGender}
  setItemGender={setItemGender}
  clothingType={clothingType}
  setClothingType={setClothingType}
  setSelectedItem={setSelectedItem}
  Users={Users}
/>
			</Suspense>



       <div className='singleitemcontainer' id='singleitem'>

        <div className='singleleft'>
<h1>{Users[selectedItem - 1].first_name.toUpperCase()}</h1>
<div className='singleimagecontainer'> <img src={Users[selectedItem - 1].image1} alt={Users[selectedItem - 1].first_name} height="450px" width="345px"></img> </div>
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
  <button onClick={ () => {setDialogContent(<SizeGuide />) 
toggleDialog()}}>SIZE GUIDE</button></div>


<div className='buttonline2'><button onClick={ () => {setDialogContent(<CareGuide />) 
toggleDialog()}}>CARE GUIDE</button></div>

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
<dialog ref={dialogRef}>{dialogContent} <button onClick={toggleDialog}>Close</button></dialog>




      <div className='cartcontainer'>
        

 <h1>YOUR CART</h1>
  <ul>
    {cartItems.map((item, index) => (
      <li key={index} className='cartitem'>
        <img src={item.image} width="70px" height="90px"></img>{item.name} - {item.size} <div className='quantitysticker'>{item.quantity}x</div> <div className='price'>${item.price}</div>
      </li>
    ))}
  </ul>
  <hr></hr>
<div className='cartbottomarea'>
  <button onClick={() => setCartItems([])}>
  CLEAR CART
</button>

<h1 className='totalPrice'> Total: ${totalPrice.toFixed(2)} </h1>
<button className='paymentButton'>Proceed to Payment</button>
</div>

      </div>


    </>
  )

  function toggleDialog() {


  if(!dialogRef.current){
    return;
  }
  dialogRef.current.hasAttribute("open")
  ? dialogRef.current.close()
  : dialogRef.current.showModal()

}
}

export default App
