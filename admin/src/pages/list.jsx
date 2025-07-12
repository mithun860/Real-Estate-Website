// src/pages/List.jsx
import React from "react";

const List = () => {
  // Sample static data — replace this with dynamic data later
  const properties = [
    { id: 1, name: "Plot A", location: "Mysore", size: "1200 sq.ft" },
    { id: 2, name: "Plot B", location: "Bangalore", size: "1500 sq.ft" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Properties</h2> 
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Location</th>
            <th className="py-2 px-4 border">Size</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((plot) => (
            <tr key={plot.id}>
              <td className="py-2 px-4 border">{plot.id}</td>
              <td className="py-2 px-4 border">{plot.name}</td>
              <td className="py-2 px-4 border">{plot.location}</td>
              <td className="py-2 px-4 border">{plot.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;