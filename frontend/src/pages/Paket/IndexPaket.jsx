import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Search from "../../utils/search/Search";
import Pagination from "../../utils/pagination/Pagination";
import { deletePaket, getAllPaket } from "../../services/paket/PaketService";
import CreatePaket from "./CreatePaket";
import EditPaket from "./EditPaket";
import Loader from "../../utils/loader/Loader";

const IndexPaket = () => {
    const MySwal = withReactContent(Swal);
    const [paket, setPaket] = useState([]);
    const [selectedPaket, setSelectedPaket] = useState(null);
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
    const currentPaket = paket.slice(startIndex, endIndex);

    const fetchPaket = async () => {
        try {
            const response = await getAllPaket();
            setPaket(response);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching paket data: ", error);
        }
    }

    const handleSearch = (query) => {
        const filteredPaket = paket.filter((paket) =>
          paket.nama_paket.toLowerCase().includes(query.toLowerCase())
        );
        setSearch(true);
        setQuery(filteredPaket);
        setLoading(false);
      };
    
      const handleCreated = (newPaket) => {
        setPaket((prevState) => [...prevState, newPaket]);
    
        if (selectedPaket && selectedPaket.id === newPaket.id) {
          setSelectedPaket(null);
        }
      };
    
      const handleEdited = () => {
        setSelectedPaket(null);
        fetchPaket();
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
              const response = await deletePaket(id);
              await fetchPaket();
              console.log(response);
              MySwal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        fetchPaket();
    }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <h2 className="text-2xl font-medium">List paket</h2>
     <div class="w-[75vw] mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
       <div className="flex items-center justify-between pb-4">
         <Search handleSearch={handleSearch} />
         <div>
           <CreatePaket addedpaket={handleCreated} />
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
                 Paket
               </th>
               <th scope="col" className="px-6 py-3">
                   Harga
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
                   <td className="px-6 py-4">{item.nama_paket}</td>
                   <td className="px-6 py-4">{item.harga}</td>
                   <td className="flex px-6 py-4 space-x-2">
                     <EditPaket paket={item} onUpdate={handleEdited} />

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
           currentPaket.map((item, index) => (
               <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                 <td className="px-6 py-4">{index + 1}</td>
                 <td className="px-6 py-4">{item.nama_paket}</td>
                   <td className="px-6 py-4">{item.harga}</td>
                 <td className="flex px-6 py-4 space-x-2">
                 <EditPaket dataPaket={item} onUpdate={handleEdited} />

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
           totalPages={Math.ceil(paket.length / itemsPerPage)}
           onPageChange={handlePageChange}
           totalResults={paket.length}
         />
       </div>
     </div>
   </>
      )}
    </>
  )
}

export default IndexPaket