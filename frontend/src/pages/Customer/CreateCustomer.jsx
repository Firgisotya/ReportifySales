import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createCustomer } from "../../services/customer/CustomerService";

const CreateCustomer = ({addedcustomer}) => {
    const MySwal = withReactContent(Swal);
    const [customer, setCustomer] = useState({
        nama_customer: "",
        alamat: "",
        no_telepon: "",
        foto_ktp: "",
        foto_rumah: "",
    });

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await createCustomer(customer)
            addedcustomer(customer);
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
            value={customer.nama_customer}
            onChange={(e) => setCustomer({ ...customer, nama_customer: e.target.value })}
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
            onChange={(e) => setCustomer({ ...customer, no_telepon: e.target.value })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Alamat</span>
          </label>
          <textarea className="input input-bordered" 
          placeholder="Alamat" 
          value={customer.alamat}
          onChange={(e) => setCustomer({...customer, alamat: e.target.value})}
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
            onChange={(e) => setCustomer({ ...customer, foto_ktp: e.target.value })}
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
            onChange={(e) => setCustomer({ ...customer, foto_rumah: e.target.value })}
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

export default CreateCustomer