import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateUser } from "../../services/user/UserService";

const EditUser = ({user, onUpdate}) => {
    const MySwal = withReactContent(Swal);
  const [open, setOpen] = useState(false);
  const [nik, setNik] = useState(user.nik);

  const modalId = `edit_user_${user.id}`;

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUser(user.id, {nik});
            onUpdate(response);
            document.getElementById(modalId).close();
            MySwal.fire({
                icon: "success",
                title: "Berhasil",
                text: "User berhasil diupdate!",
            });
        } catch (error) {
            console.error(error);
            document.getElementById(modalId).close();
            MySwal.fire({
                icon: "error",
                title: "Gagal",
                text: "User gagal diupdate!",
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
          <h3 className="font-bold text-lg">Edit User</h3>
          {/* nik input */}
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

export default EditUser