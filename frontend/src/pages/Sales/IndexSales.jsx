import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Search from "../../utils/search/Search";
import Pagination from "../../utils/pagination/Pagination";
import { getAllSales, deleteSales } from "../../services/sales/SalesService";
import CreateSales from "./CreateSales";
import EditSales from "./EditSales";
import { deleteUserBySales } from "../../services/user/UserService";
import Loader from "../../utils/loader/Loader";

const IndexSales = () => {
  const MySwal = withReactContent(Swal);
  const [sales, setSales] = useState([]);
  const [selectedSales, setSelectedSales] = useState(null);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSales = sales.slice(startIndex, endIndex);

  const fetchSales = async () => {
    try {
      const response = await getAllSales();
      setSales(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sales data: ", error);
    }
  };

  const handleSearch = (query) => {
    const filteredSales = paket.filter((paket) =>
      paket.nama_sales.toLowerCase().includes(query.toLowerCase())
    );
    setSearch(true);
    setQuery(filteredSales);
    setLoading(false);
  };

  const handleCreated = (newSales) => {
    setSales((prevState) => [...prevState, newSales]);

    if (selectedSales && selectedSales.id === newSales.id) {
      setSelectedSales(null);
    }
  };

  const handleEdited = () => {
    setSelectedSales(null);
    fetchSales();
  };

  const handleDelete = async (id, nik) => {
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
          const resUser = await deleteUserBySales(nik);
          const response = await deleteSales(id);
          await fetchSales();
          console.log(response, resUser);
          MySwal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-2xl font-medium">List Sales</h2>
          <div class="w-[75vw] mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between pb-4">
              <Search handleSearch={handleSearch} />
              <div>
                <CreateSales addedsales={handleCreated} />
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
                      NIK
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nama Sales
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {query.length !== 0 && search ? (
                    query.map((item, index) => (
                      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{item.nik}</td>
                        <td className="px-6 py-4">{item.nama_sales}</td>
                        <td className="flex px-6 py-4 space-x-2">
                          <EditSales sales={item} onUpdate={handleEdited} />

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.nik)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : !search ? (
                    currentSales.map((item, index) => (
                      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{item.nik}</td>
                        <td className="px-6 py-4">{item.nama_sales}</td>
                        <td className="flex px-6 py-4 space-x-2">
                          <EditSales sales={item} onUpdate={handleEdited} />

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.nik)}
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
                totalPages={Math.ceil(sales.length / itemsPerPage)}
                onPageChange={handlePageChange}
                totalResults={sales.length}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default IndexSales;
