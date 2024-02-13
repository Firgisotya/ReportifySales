import { React, useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { reportExport } from "../../services/report/ReportService";

const ExportSalesTransaction = () => {
    const [report, setReport] = useState([]);
    const componentRef = useRef();
    const cetakPDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Laporan Transaksi Penjualan",
    });

    const fetchReport = async () => {
        try {
            const response = await reportExport();
            console.log(response);
            setReport(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchReport();
    }, []);

  return (
    <>
        <div>
            <div className="flex items-center justify-between pb-4">
            <h2 className="text-2xl font-medium">Export Sales Transaction</h2>
            <button
                onClick={cetakPDF}
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md"
            >
                Cetak PDF
            </button>
            </div>
            <div ref={componentRef}>
            <h2 className="text-2xl font-medium">Report Transaction Sales</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    No
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    Nama Sales
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    Jumlah Customer
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    Jumlah Paket
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    Total Pendapatan
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {report.map((item, index) => {
                    return (
                    <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.nama_sales}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.total_customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.total_paket}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.total_pendapatan}</td>
                    </tr>
                    );
                }
                )}
                </tbody>
            </table>
            </div>
        </div>
    </>
  )
}

export default ExportSalesTransaction