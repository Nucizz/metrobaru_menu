import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { MoneyFormat } from "./MoneyFormat";
import { Link } from "react-router-dom";

export default function CheckoutDialog({ open, handleClose, cart }) {
    let total = 0
    let message = "Halo, saya ingin memesan:"
    + cart.map((item) => "\r\n- " + item.name + " x" + item.quantity)
    + "\r\ndengan total harga "

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
            <DialogTitle>Pastikan pesanan Anda sesuai!</DialogTitle>
            <DialogContent>
                <DialogContentText className="flex flex-col">
                    {cart.map((item) => {
                        total = total + (item.price * item.quantity)
                        return (
                            <div key={item.name} className="flex flex-row justify-between">
                                <span>{item.name}</span>
                                <span>x{item.quantity}</span>
                            </div>
                        );
                    })}
                    <span className="text-3xl text-black font-semibold w-full text-right">{MoneyFormat(total)}</span>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button onClick={handleClose} className="text-red-600 hover:text-red-800 transition-all duration-300 mr-2">
                    Batalkan
                </button>
                <Link to={`https://api.whatsapp.com/send?phone=+6281274108899&text=${encodeURIComponent(message + MoneyFormat(total))}`} target="_blank" onClick={handleClose} className="px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-800 transition-all duration-300">
                    Pesan Sekarang
                </Link>
            </DialogActions>
        </Dialog>
    );
}
