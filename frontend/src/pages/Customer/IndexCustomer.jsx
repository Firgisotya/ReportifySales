import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Search from "../../utils/search/Search";
import Pagination from "../../utils/pagination/Pagination";
import {
  deleteCustomer,
  getAllCustomers,
} from "../../services/customer/CustomerService";
import CreateCustomer from "./CreateCustomer";
import EditCustomer from "./EditCustomer";

const IndexCustomer = () => {
  const MySwal = withReactContent(Swal);
  const [customer, setCustomer] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState([]);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomer = customer.slice(startIndex, endIndex);

  const fetchCustomer = async () => {
    try {
      const response = await getAllCustomers();
      setCustomer(response);
    } catch (error) {
      console.error("Error fetching customer data: ", error);
    }
  };

  const handleSearch = (query) => {
    const filteredCustomer = customer.filter((customer) =>
      customer.nama_customer.toLowerCase().includes(query.toLowerCase())
    );
    setSearch(true);
    setQuery(filteredCustomer);
  };

  const handleCreated = (newCustomer) => {
    setCustomer((prevState) => [...prevState, newCustomer]);

    if (selectedCustomer && selectedCustomer.id === newCustomer.id) {
      setSelectedCustomer(null);
    }
  };

  const handleEdited = () => {
    setSelectedCustomer(null);
    fetchCustomer();
  };

  const handleDelete = async (id) => {
    try {
      MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteCustomer(id);
          await fetchCustomer();
          console.log(response);
          MySwal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-medium">List Customer</h2>
      <div class="w-[75vw] mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between pb-4">
          <Search handleSearch={handleSearch} />
          <div>
            <CreateCustomer addedcustomer={handleCreated} />
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Customer
                </th>
                <th scope="col" className="px-6 py-3">
                  Nomor Telepon
                </th>
                <th scope="col" className="px-6 py-3">
                  Alamat
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {query.length !== 0 && search ? (
                query.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.nama_customer}</td>
                    <td className="px-6 py-4">{item.no_telepon}</td>
                    <td className="px-6 py-4">{item.alamat}</td>
                    <td className="flex px-6 py-4 space-x-2">
                      <EditCustomer customer={item} onUpdate={handleEdited} />

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : !search ? (
                currentCustomer.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.nama_customer}</td>
                    <td className="px-6 py-4">{item.no_telepon}</td>
                    <td className="px-6 py-4">{item.alamat}</td>
                    <td className="flex px-6 py-4 space-x-2">
                      <EditCustomer customer={item} onUpdate={handleEdited} />

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4">
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(customer.length / itemsPerPage)}
            onPageChange={handlePageChange}
            totalResults={customer.length}
          />
        </div>
      </div>
    </>
  );
};

export default IndexCustomer;
