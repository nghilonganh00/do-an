const customers = [
  { id: 1, order: "#12345", date: "2025-01-05", status: "Delivered", price: 120 },
  { id: 2, order: "#12346", date: "2025-01-06", status: "Pending", price: 80 },
  { id: 3, order: "#12347", date: "2025-01-07", status: "Cancelled", price: 50 },
];

const CustomerDetailPage = () => {
  return (
    <div className="px-10 py-6 ">
      <div className="flex items-center justify-between">
        <span className="text-body-xl-600">Customer Information</span>

        <div className="flex items-center gap-3">
          <button className="h-10 px-6 border border-[#D7DBEC] bg-white text-[#1E5EFF] rounded-sm">Cancel</button>
          <button className="h-10 px-6 bg-[#1E5EFF] text-white rounded-sm">Save</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[30px]">
        <div className="col-span-8">
          <div className=" p-7 bg-white">
            <div className="flex items-start gap-[18px]">
              <div className="w-[72px] h-[72px] rounded-full bg-gray-700" />
              <div>
                <div className="font-semibold">Randhir Kumar</div>
                <div className="text-sm text-[#5A607F]">India</div>
                <div className="text-sm text-[#5A607F]">5 Orders</div>
                <div className="text-sm text-[#5A607F]">Customer for 2 years</div>
              </div>
            </div>

            <h5 className="font-semibold">Customer Notes</h5>

            <div>
              <label className="text-body-small-400">Notes</label>
              <input className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
            </div>
          </div>

          <div className="p-7 bg-white mt-[30px]">
            <h5 className="font-semibold">Customer Orders</h5>

            <table className="min-w-full mt-5 border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order Status</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Price</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-800">{item.order}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.status}</td>

                    <td className="px-6 py-4 text-right text-sm text-gray-700">${item.price.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-4 p-7 rounded-md bg-white">
          <div className="font-semibold">Overview</div>
          <div className="mt-6 text-[#A1A7C4]">Address</div>
          <div className="text-[#5A607F]">Panapur langa Hajipur,vaishali 844124 India</div>
          <div className="mt-6 text-[#A1A7C4]">Email Address</div>
          <div className="text-[#5A607F]">randhirppl@gmail.com</div>
          <div className="mt-6 text-[#A1A7C4]">Phone</div>
          <div className="text-[#5A607F]">+91 8804789764</div>

          <button className="text-[#F0142F] mt-[50px]">Delete Customer</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailPage;
