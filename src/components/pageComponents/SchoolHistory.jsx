const SchoolHistory = ({ history = [] }) => {
    const validHistory = Array.isArray(history) ? history : [];

    return (
        <section className="my-8 max-h-[20rem] overflow-hidden overflow-y-scroll">
            <div className="space-y-6 mt-6">
                {validHistory.map((entry, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-blue-900/80">{entry.year}</h3>
                        <p className="text-gray-700">{entry.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SchoolHistory;