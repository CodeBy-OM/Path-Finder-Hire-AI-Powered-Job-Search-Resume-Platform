const StatCard = ({ title, count, icon, active }) => (
  <div
    className={`flex items-center justify-between p-6 rounded-xl border ${
      active ? "border-blue-600 bg-blue-50" : "bg-white"
    }`}
  >
    <div>
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold">{count}</h2>
    </div>
    <div className="text-3xl">{icon}</div>
  </div>
);

const MyDocs = () => {
  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">MY DOCUMENTS</h1>
        <p className="text-gray-500">
          Manage your CVs, Cover Letters, and Applications
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Curriculums Vitae" count={0} icon="📄" active />
        <StatCard title="Cover Letters" count={0} icon="🔖" />
        <StatCard title="Tailored Applications" count={0} icon="✈️" />
      </div>

      {/* CV LIST */}
      <div className="bg-white rounded-xl p-6 border">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">CVs</h2>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
              Generated 0
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              Saved 0
            </span>
          </div>
        </div>

        <div className="text-center py-20 text-gray-400">
          📄 <p className="mt-2 font-semibold">No CVs Found</p>
          <p>Generate your first CV to get started</p>
        </div>
      </div>
    </div>
  );
};

export default MyDocs;
