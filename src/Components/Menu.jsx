import logo from '../Assets/logo.png'
import none from '../Assets/default.png';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { useState } from 'react';
import ParticleAnimation from './ParticleAnimation';
import { FOOD_LIST } from '../Assets/Data.js';
import CheckoutDialog from './Dialog.jsx';
import { MoneyFormat } from './MoneyFormat.js';

    export default function Menu() {
        const [isMenuOpen, setIsMenuOpen] = useState(false);

        return(
            <div id="tsparticles" className="w-screen h-screen bg-red-950 flex flex-row items-center justify-center px-4 py-20 md:px-8 md:py-12 overflow-hidden">

                <ParticleAnimation />

                <Cover setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />

                <List isMenuOpen={isMenuOpen} />
                
            </div>
        );
    }

    function Cover({setIsMenuOpen, isMenuOpen}) {
        return(
            <div className={`flex flex-col justify-evenly items-center lg:w-1/4 md:w-1/3 h-screen text-white transform transition-all duration-1000 ${isMenuOpen ? 'w-0 opacity-0 md:opacity-100 md:mr-8' : 'w-full opacity-100'}`}>
                    
                <div className='flex flex-col gap-3 justify-center items-center w-full'>
                    <img src={logo} className='w-2/3 mb-5' alt='logo' />
                    <h1 className='text-4xl md:text-3xl lg:text-4xl'>RM. Metro Baru</h1>
                    <h2 className='text-xl md:text-lg lg:text-xl'>PASAR JAMBI</h2>
                </div>

                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='flex flex-row items-center justify-center gap-2 border border-2 border-white rounded-xl px-3 py-2 text-lg font-semibold hover:bg-white hover:text-red-950 transiton-all duration-300'>
                    {isMenuOpen ? "Kembali" : "Lihat Menu"}
                    <ArrowCircleRightRoundedIcon className={`transition-all duration-1000 transform ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>

            </div>
        );
    }

    function List({isMenuOpen}) {
        const [cart, setCart] = useState([]);
        const [isDialogOpen, setIsDialogOpen] = useState(false);

        const checkout = () => {
            setIsDialogOpen(true);
        }

        const today = new Date();
        let dayOfWeek = (today.getDay() + 6) % 7;

        return(
            <div className={`bg-white rounded-xl transition-all duration-1000 transform overflow-y-hidden overflow-x-hidden relative ${isMenuOpen ? 'h-full lg:w-3/4 w-full opacity-100' : 'w-0 opacity-0'}`}>

                <div className='overflow-y-scroll overflow-x-hidden w-full h-full py-4 px-6'>
                    <ol className='grid grid-cols-1 lg:grid-cols-2 gap-5 w-full'>

                    {FOOD_LIST.map((item) => (
                        <ProductItem key={item.name} item={item} setCart={setCart} day={dayOfWeek} />
                    ))}

                    </ol>
                </div>
                
                { cart.length > 0 &&
                    <ShoppingCartRoundedIcon onClick={checkout} fontSize='large' className='fixed bottom-6 right-6 cursor-pointer bg-red-600 hover:bg-red-800 transition-all duration-300 text-white rounded-full p-2 transform scale-150 absolute' />
                }

                <CheckoutDialog open={isDialogOpen} handleClose={() => setIsDialogOpen(false)} cart={cart} />

            </div>
        );
    }

    function ProductItem({item, setCart, day}) {
        const [quantity, setQuantity] = useState(0);
        const availbility = item.availbility[day];

        const updateCart = (newQuantity) => {
            const updatedQuantity = Math.max(newQuantity, 0);
            setQuantity(updatedQuantity);
        
            setCart((prevCart) => {
            if (updatedQuantity === 0) {
                return prevCart.filter((cartItem) => cartItem.name !== item.name);
            } else {
                const updatedCart = [...prevCart];
                const existingCartItemIndex = updatedCart.findIndex((cartItem) => cartItem.name === item.name);
        
                if (existingCartItemIndex !== -1) {
                    updatedCart[existingCartItemIndex].quantity = updatedQuantity;
                } else {
                    updatedCart.push({
                        name: item.name,
                        price: item.price,
                        quantity: updatedQuantity,
                    });
                }
        
                return updatedCart;
            }
            });
        };

        const loadThumbnail = (format) => {
            try {
                return require(`../Assets/Food/${item.name}.${format}`);
            } catch (error) {
                return null;
            }
        };
        
        const thumbnail = loadThumbnail('avif') || loadThumbnail('jpg') || loadThumbnail("webp") || loadThumbnail("jpeg");

        return(
            <li className={`w-full flex flex-row border rounded-xl border-slate-200 p-2 gap-2 ${!availbility && 'bg-red-100 border-red-600'}`}>
                
                <img src={thumbnail ?? none} alt="" className='w-24 h-24 object-cover bg-slate-400 rounded-lg' />

                <div className='flex flex-col h-24'>

                    <h2 className='font-semibold text-xl line-clamp-1 text-black'>{item.name}</h2>
                    <h2 className='text-xl line-clamp-1 text-slate-500'>{MoneyFormat(item.price)}</h2>

                    <div className={`flex flex-row gap-5 font-semibold items-center mt-auto ${quantity > 0 && availbility ? 'block' : 'hidden'}`}>

                        <RemoveCircleRoundedIcon className='text-red-600 cursor-pointer transform scale-125 hover:text-red-800 transition-all duration-300' onClick={() => updateCart(quantity-1)} />

                        <span className='text-xl'>{quantity}</span>

                        <AddCircleRoundedIcon className='text-red-600 cursor-pointer transform scale-125 hover:text-red-800 transition-all duration-300' onClick={() => updateCart(quantity+1)} />

                    </div>

                    <button className={`w-fit flex flex-row gap-2 px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-800 transition-all duration-300 mt-auto ${quantity < 1 && availbility ? 'block' : 'hidden'}`} onClick={() => updateCart(1)} >
                        <AddCircleRoundedIcon />
                        Add to cart
                    </button>

                    { !availbility && <span className='text-red-600 mt-auto'>Tidak tersedia hari ini!</span>}

                </div>
                
            </li>
        );
    }