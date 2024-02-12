import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateCustomer } from "../../services/customer/CustomerService";

const EditCustomer = ({customer, onUpdate}) => {
    const MySwal = withReactContent(Swal)
    const [namaCustomer, setNamaCustomer] = useState(customer.nama_customer)
    const [noTelepon, setNoTelepon] = useState(customer.no_telepon)
    const [alamat, setAlamat] = useState(customer.alamat)
    const [fotoKtp, setFotoKtp] = useState(customer.foto_ktp)
    const [fotoRumah, setFotoRumah] = useState(customer.foto_rumah)

    const modalId = `edit_customer_${customer.id}`

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const response = await updateCustomer(customer.id, {
                nama_customer: namaCustomer,
                no_telepon: noTelepon,
                alamat: alamat,
                foto_ktp: fotoKtp,
                foto_rumah: fotoRumah
            })
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
            className="input input-bordered"
            value={customer.foto_ktp}
            onChange={(e) => setFotoKtp(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Foto Rumah</span>
          </label>
          <input
            type="file"
            placeholder="Foto Rumah"
            className="input input-bordered"
            value={customer.foto_rumah}
            onChange={(e) => setFotoRumah(e.target.value)}
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

export default EditCustomer