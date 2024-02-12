import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updatePaket } from "../../services/paket/PaketService";

const EditPaket = ({dataPaket, onUpdate}) => {
    const MySwal = withReactContent(Swal);
    const [namaPaket, setNamaPaket] = useState(dataPaket.nama_paket);
    const [harga, setHarga] = useState(dataPaket.harga);

    const modalId = `edit_paket_${dataPaket.id}`;

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await updatePaket(dataPaket.id, {
                nama_paket: namaPaket,
                harga: harga
            
            });
            onUpdate(response);
            document.getElementById(modalId).close();
            MySwal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Paket berhasil diupdate!",
            });
        } catch (error) {
            console.error(error);
            document.getElementById(modalId).close();
            MySwal.fire({
                icon: "error",
                title: "Gagal",
                text: "Paket gagal diupdate!",
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
          <h3 className="font-bold text-lg">Edit Paket</h3>
          <div className="form-control">
          <label className="label">
            <span className="label-text">Nama Paket</span>
          </label>
          <input
            type="text"
            placeholder="Nama Paket"
            className="input input-bordered"
            value={namaPaket}
            onChange={(e) => setNamaPaket(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Harga</span>
          </label>
          <input
            type="number"
            placeholder="Harga"
            className="input input-bordered"
            value={harga}
            onChange={(e) => setHarga(e.target.value )}
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

export default EditPaket