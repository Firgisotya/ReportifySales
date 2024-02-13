import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateCustomer } from "../../services/customer/CustomerService";
import { BaseUrl } from "../../services/BaseUrl";

const EditCustomer = ({customer, onUpdate}) => {

    const imageUrl = BaseUrl().imageUrl

    const MySwal = withReactContent(Swal)
    const [namaCustomer, setNamaCustomer] = useState(customer.nama_customer)
    const [noTelepon, setNoTelepon] = useState(customer.no_telepon)
    const [alamat, setAlamat] = useState(customer.alamat)
    const [fotoKtp, setFotoKtp] = useState(customer.foto_ktp)
    const [fotoRumah, setFotoRumah] = useState(customer.foto_rumah)
    const [previewKTP, setPreviewKTP] = useState(null)
    const [previewRumah, setPreviewRumah] = useState(null)

    const modalId = `edit_customer_${customer.id}`

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

    const handleUpdate = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("nama_customer", namaCustomer)
        formData.append("no_telepon", noTelepon)
        formData.append("alamat", alamat)
        formData.append("foto_ktp", fotoKtp)
        formData.append("foto_rumah", fotoRumah)

        try {
            const response = await updateCustomer(customer.id, formData)
            onUpdate(response)
            document.getElementById(modalId).close()
            MySwal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Customer berhasil diupdate!"
            })
        } catch (error) {
            console.error(error)
            document.getElementById(modalId).close()
            MySwal.fire({
                icon: "error",
                title: "Gagal",
                text: "Customer gagal diupdate!"
            })
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
        <h3 className="font-bold text-lg">Edit Customer</h3>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Nama Customer</span>
          </label>
          <input
            type="text"
            placeholder="Nama Customer"
            className="input input-bordered"
            value={customer.nama_customer}
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
            value={customer.no_telepon}
            onChange={(e) => setNoTelepon(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Alamat</span>
          </label>
          <textarea className="input input-bordered" 
          placeholder="Alamat" 
          value={customer.alamat}
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
            className="file-input"
            accept="image/*"
            onChange={handleKTP}
          />
          {previewKTP ? (
            <img width={100} height={100} src={previewKTP} alt="Foto KTP" />
          ) : (
            <img width={100} height={100} src={imageUrl + "/" + customer.foto_ktp} alt="Foto KTP" />
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Foto Rumah</span>
          </label>
          <input
            type="file"
            placeholder="Foto Rumah"
            className="file-input"
            accept="image/*"
            onChange={handleRumah}
          />
          {previewRumah ? (
            <img width={100} height={100} src={previewRumah} alt="Foto KTP" />
          ) : (
            <img width={100} height={100} src={imageUrl + "/" + customer.foto_rumah} alt="Foto Rumah" />
          )}
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

export default EditCustomer