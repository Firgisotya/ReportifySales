import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateSales } from "../../services/sales/SalesService";
import { updateUserBySales } from "../../services/user/UserService";

const EditSales = ({sales, onUpdate}) => {
    const MySwal = withReactContent(Swal);
    const [nik, setNik] = useState(sales.nik);
    const [namaSales, setNamaSales] = useState(sales.nama_sales);

    const modalId = `edit_sales_${sales.id}`;

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await updateSales(sales.id, {
                nik: nik,
                nama_sales: namaSales
            
            });
            const resUser = await updateUserBySales({
                nik: nik,
            })
            onUpdate(response, resUser);
            document.getElementById(modalId).close();
            MySwal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Sales berhasil diupdate!",
            });
        } catch (error) {
            console.error(error);
            document.getElementById(modalId).close();
            MySwal.fire({
                icon: "error",
                title: "Gagal",
                text: "Sales gagal diupdate!",
            });
        }
    }
  return (
    <>
    <button
      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg"
      onClick={() => document.getElementById(modalId).showModal()}
    >
      Edit
    </button>
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Sales</h3>

        <div className="form-control">
          <label className="label">
            <span className="label-text">NIK</span>
          </label>
          <input
            type="text"
            placeholder="NIK"
            className="input input-bordered"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
          />
        </div>
      
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nama Sales</span>
          </label>
          <input
            type="text"
            placeholder="Nama Sales"
            className="input input-bordered"
            value={namaSales}
            onChange={(e) => setNamaSales(e.target.value)}
          />
        </div>
        <div className="modal-action space-x-2">
          <button className="btn btn-primary" onClick={handleUpdate}>
            Edit
          </button>
          <form method="dialog">
            <button className="btn">Tutup</button>
          </form>
        </div>
      </div>
    </dialog>
  </>
  )
}

export default EditSales