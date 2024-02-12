import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createPaket } from "../../services/paket/PaketService";

const CreatePaket = ({addedpaket}) => {
    const MySwal = withReactContent(Swal);
    const [paket, setPaket] = useState({
      nama_Paket: "",
      harga: "",
    });
  
    const handleCreate = async (e) => {
      e.preventDefault();
      try {
        const response = await createPaket(paket);
        addedpaket(response);
        document.getElementById("create_paket").close();
        MySwal.fire({
          icon: "success",
          title: "Berhasil",
          text: "paket berhasil ditambahkan!",
        });
      } catch (error) {
        console.error(error);
        document.getElementById("create_paket").close();
        MySwal.fire({
          icon: "error",
          title: "Gagal",
          text: "Paket gagal ditambahkan!",
        });
      }
    };

  return (
    <>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      onClick={() => document.getElementById("create_paket").showModal()}
    >
      Tambah
    </button>
    <dialog id="create_paket" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Tambah Paket</h3>
      
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nama Paket</span>
          </label>
          <input
            type="text"
            placeholder="Nama Paket"
            className="input input-bordered"
            value={paket.nama_paket}
            onChange={(e) => setPaket({ ...paket, nama_paket: e.target.value })}
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
            value={paket.harga}
            onChange={(e) => setPaket({ ...paket, harga: e.target.value })}
          />
        </div>
        <div className="modal-action space-x-2">
          <button className="btn btn-primary" onClick={handleCreate}>
            Tambah
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

export default CreatePaket