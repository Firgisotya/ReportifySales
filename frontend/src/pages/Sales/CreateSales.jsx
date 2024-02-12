import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createSales } from "../../services/sales/SalesService";
import { createUser } from "../../services/user/UserService";

const CreateSales = ({addedsales}) => {
    const MySwal = withReactContent(Swal);
    const [sales, setSales] = useState({
      nik: "",
      nama_sales: "",
      password: "",
    });
  
    const handleCreate = async (e) => {
      e.preventDefault();
      try {
        const response = await createSales(sales);
        const resUser = await createUser({
            nik: sales.nik,
            password: sales.password,
        })
        addedsales(response, resUser);
        document.getElementById("create_sales").close();
        MySwal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Sales berhasil ditambahkan!",
        });
      } catch (error) {
        console.error(error);
        document.getElementById("create_sales").close();
        MySwal.fire({
          icon: "error",
          title: "Gagal",
          text: "Sales gagal ditambahkan!",
        });
      }
    };

  return (
    <>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      onClick={() => document.getElementById("create_sales").showModal()}
    >
      Tambah
    </button>
    <dialog id="create_sales" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Tambah Sales</h3>

        <div className="form-control">
          <label className="label">
            <span className="label-text">NIK</span>
          </label>
          <input
            type="text"
            placeholder="NIK"
            className="input input-bordered"
            value={sales.nik}
            onChange={(e) => setSales({ ...sales, nik: e.target.value })}
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
            value={sales.nama_sales}
            onChange={(e) => setSales({ ...sales, nama_sales: e.target.value })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered"
            value={sales.password}
            onChange={(e) => setSales({ ...sales, password: e.target.value })}
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

export default CreateSales