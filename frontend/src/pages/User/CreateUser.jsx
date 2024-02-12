import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createUser } from "../../services/user/UserService";

const CreateUser = ({ addedUser }) => {
  const MySwal = withReactContent(Swal);
  const [user, setUser] = useState({
    nik: "",
    password: "",
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(user);
      addedUser(response);
      document.getElementById("create_user").close();
      MySwal.fire({
        icon: "success",
        title: "Berhasil",
        text: "User berhasil ditambahkan!",
      });
    } catch (error) {
      console.error(error);
      document.getElementById("create_user").close();
      MySwal.fire({
        icon: "error",
        title: "Gagal",
        text: "User gagal ditambahkan!",
      });
    }
  };
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        onClick={() => document.getElementById("create_user").showModal()}
      >
        Tambah
      </button>
      <dialog id="create_user" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah User</h3>
          {/* nik input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">NIK</span>
            </label>
            <input
              type="text"
              placeholder="NIK"
              className="input input-bordered"
              value={user.nik}
              onChange={(e) => setUser({ ...user, nik: e.target.value })}
            />
          </div>
          {/* password input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
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
  );
};

export default CreateUser;
