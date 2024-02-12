import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createCustomer } from "../../services/customer/CustomerService";

const CreateCustomer = ({addedcustomer}) => {
    const MySwal = withReactContent(Swal);
    const [namaCustomer, setNamaCustomer] = useState("");
    const [noTelepon, setNoTelepon] = useState("");
    const [alamat, setAlamat] = useState("");
    const [fotoKtp, setFotoKtp] = useState(null);
    const [fotoRumah, setFotoRumah] = useState(null);
    const [previewKTP, setPreviewKTP] = useState(null);
    const [previewRumah, setPreviewRumah] = useState(null);


    const handleKTP = (e) => {
        const file = e.target.files[0];
        const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
        if (file && ALLOWED_TYPES.includes(file.type)) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setPreviewKTP(reader.result);
            };
            reader.readAsDataURL(file);
            setFotoKtp(file);
        } else {
            setPreviewKTP(null);
        }
    };

    const handleRumah = (e) => {
        const file = e.target.files[0];
        const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
        if (file && ALLOWED_TYPES.includes(file.type)) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setPreviewRumah(reader.result);
            };
            reader.readAsDataURL(file);
            setFotoRumah(file);
        } else {
            setPreviewRumah(null);
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("nama_customer", namaCustomer)
        formData.append("no_telepon", noTelepon)
        formData.append("alamat", alamat)
        formData.append("foto_ktp", fotoKtp)
        formData.append("foto_rumah", fotoRumah)

        try {
            const response = await createCustomer(formData)
            addedcustomer(response);
            document.getElementById("create_customer").close();
            MySwal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Customer berhasil ditambahkan!",
            });
        } catch (error) {
            console.error(error);
            document.getElementById("create_customer").close();
            MySwal.fire({
                icon: "error",
                title: "Gagal",
                text: "Customer gagal ditambahkan!",
            });
        }
    }

  return (
     <>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      onClick={() => document.getElementById("create_customer").showModal()}
    >
      Tambah
    </button>
    <dialog id="create_customer" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Tambah Customer</h3>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Nama Customer</span>
          </label>
          <input
            type="text"
            placeholder="Nama Customer"
            className="input input-bordered"
            value={namaCustomer}
            onChange={(e) => setNamaCustomer(e.target.value)}
          />
        </div>
      
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nomor Telepon</span>
          </label>
          <input
            type="text"
            placeholder="Nomor Telepon"
            className="input input-bordered"
            value={noTelepon}
            onChange={(e) => setNoTelepon(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Alamat</span>
          </label>
          <textarea className="input input-bordered" 
          placeholder="Alamat" 
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          >
            
          </textarea>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Foto KTP</span>
          </label>
          <input
            type="file"
            placeholder="Foto KTP"
            className="file-input input-bordered"
            accept="image/*"
            onChange={handleKTP}
          />
          {previewKTP && (
            <img width={100} height={100} src={previewKTP} alt="Foto KTP" />
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Foto Rumah</span>
          </label>
          <input
            type="file"
            placeholder="Foto Rumah"
            className="file-input input-bordered"
            accept="image/*"
            onChange={handleRumah}
          />
          {previewRumah && (
            <img width={100} height={100} src={previewRumah} alt="Foto Rumah" />
          )}
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

export default CreateCustomer