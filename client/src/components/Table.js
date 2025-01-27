import React, { useState } from "react";
import {
  HiOutlineArrowNarrowUp,
  HiOutlineArrowNarrowDown,
} from "react-icons/hi";

export const Table = ({
  columns,
  data,
  renderActions,
  currentPage,
  entriesPerPage,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const sortedData = data.slice().sort((a, b) => {
    if (sortConfig.key && a[sortConfig.key] && b[sortConfig.key]) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (column) => {
    if (column === "Action") {
      return null;
    }

    const isSortable = column !== "Action";
    const isSorting = sortConfig.key === column;

    if (isSortable) {
        const iconStyle = {
            color: 'grey',
            marginLeft: '0.5rem',
            verticalAlign: 'middle',
            transition: 'color 0.2s',
            cursor: 'pointer',
        };

        // Function to handle mouse enter event
        const handleMouseEnter = (event) => {
            event.target.style.color = 'blue'; // Change color to blue on hover
        };

        // Function to handle mouse leave event
        const handleMouseLeave = (event) => {
            event.target.style.color = 'grey'; // Change color back to grey on leave
        };

        return isSorting && sortConfig.direction === 'asc' ? (
            <HiOutlineArrowNarrowUp
                style={iconStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
        ) : (
            <HiOutlineArrowNarrowDown
                style={iconStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
        );
    }

    return null;
};

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 border-b border-gray-200 text-left text-lg text-brics-custom-gray"
                      style={{ fontFamily: "Satoshi-bold" }}
                      onClick={() => handleSort(column)}
                    >
                      <div className="flex items-center">
                        {column}
                        {renderSortIcon(column)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedData.slice(startIndex, endIndex).map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } `}
                  >
                    {columns.map((column, columnIndex) => (
                      <td
                        key={columnIndex}
                        className="px-6 py-4 whitespace-wrap max-h-24 overflow-auto text-left text-base text-brics-custom-gray"
                        style={{ fontFamily: "Satoshi-regular" }}
                      >
                        {column === "Action" ? renderActions(row) : row[column]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
