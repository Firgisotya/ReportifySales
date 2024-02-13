import {React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import Loader from '../../utils/loader/Loader';
import { getAllSalesTransaction } from '../../services/report/ReportService';
import Search from '../../utils/search/Search';
import Pagination from '../../utils/pagination/Pagination';
import ExportSalesTransaction from '../Export/ExportSalesTransaction';

const IndexSalesTransaction = () => {
  const MySwal = withReactContent(Swal);
  const [transaction, setTransaction] = useState([]);
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
  const currentTransaction = transaction.slice(startIndex, endIndex);

  const handleSearch = (query) => {
    const filteredTransaction = transaction.filter((transaction) =>
      transaction.sales_id.toLowerCase().includes(query.toLowerCase())
    );
    setSearch(true);
    setQuery(filteredTransaction);
  };

  const fetchSalesTransaction = async () => {
    try {
      const response = await getAllSalesTransaction();
      setTransaction(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSalesTransaction();
  }, []);
  return (
    <>
      {loading ? (
      <Loader />
    ) : (
      <>
      <h2 className="text-2xl font-medium">List Transaction</h2>
      <div class="w-[75vw] mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between pb-4">
          <Search handleSearch={handleSearch} />
          <div>
            {/* <CreateCustomer addedcustomer={handleCreated} /> */}
            <Link 
            to={"/dashboard/export"}
            className='px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md'
            >
            Report PDF
            </Link>
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
                  Nama Sales
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Customer
                </th>
                <th scope="col" className="px-6 py-3">
                  Paket
                </th>
                <th scope="col" className="px-6 py-3">
                  Tanggal Penjualan
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Harga
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
                    <td className="px-6 py-4">{item.sales.nama_sales}</td>
                    <td className="px-6 py-4">{item.customer.nama_customer}</td>
                    <td className="px-6 py-4">{item.paket.nama_paket}</td>
                    <td className="px-6 py-4">{item.tanggal_penjualan}</td>
                    <td className="px-6 py-4">{item.total_harga}</td>
                    <td className="flex px-6 py-4 space-x-2">
                      {/* <EditCustomer customer={item} onUpdate={handleEdited} /> */}

                      {/* <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                      >
                        Delete
                      </button> */}
                    </td>
                  </tr>
                ))
              ) : !search ? (
                currentTransaction.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.sales.nama_sales}</td>
                    <td className="px-6 py-4">{item.customer.nama_customer}</td>
                    <td className="px-6 py-4">{item.paket.nama_paket}</td>
                    <td className="px-6 py-4">{item.tanggal_penjualan}</td>
                    <td className="px-6 py-4">{item.total_harga}</td>
                    <td className="flex px-6 py-4 space-x-2">
                      {/* <EditCustomer customer={item} onUpdate={handleEdited} />

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                      >
                        Delete
                      </button> */}
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
            totalPages={Math.ceil(transaction.length / itemsPerPage)}
            onPageChange={handlePageChange}
            totalResults={transaction.length}
          />
        </div>
      </div>
    </>
    )}
    </>
  )
}

export default IndexSalesTransaction