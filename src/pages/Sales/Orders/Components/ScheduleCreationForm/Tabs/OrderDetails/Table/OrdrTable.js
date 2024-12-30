/** @format */

// import { React, useState, useEffect } from "react";
// import { Tab, Table, Tabs, Form, Modal } from "react-bootstrap";

// function OrdrTable(props) {
//   const {
//     OrderData,
//     OrderCustData,
//     OrdrDetailsData,
//     selectedItems,
//     selectItem,
//     setDetailsColour,
//     calculateMinSrlStatus,
//     updateOrderStatus,
//     getStatusText,
//   } = props;

//   useEffect(() => {
//     // Call setDetailsColour after OrdrDetailsData changes
//     setDetailsColour();
//   }, [OrdrDetailsData]); // Run this effect whenever OrdrDetailsData changes

//   //console.log("OrderData", OrderData);

//   // Function to determine background color based on conditions
//   const getRowBackgroundColor = (order) => {
//     if (order.Qty_Ordered === 0) return "lavender";
//     else if (order.QtyDelivered >= order.Qty_Ordered) return "lightgreen";
//     else if (order.QtyDelivered > 0 && order.QtyPacked >= order.Qty_Ordered)
//       return "orange";
//     else if (order.QtyPacked >= order.Qty_Ordered) return "lightgreen";
//     else if (order.QtyPacked > 0 && order.QtyProduced >= order.Qty_Ordered)
//       return "greenyellow";
//     else if (order.QtyProduced >= order.Qty_Ordered) return "yellow";
//     else if (order.QtyProduced > 0 && order.QtyScheduled >= order.Qty_Ordered)
//       return "greenyellow";
//     else if (order.QtyScheduled >= order.Qty_Ordered) return "lightyellow";
//     else if (order.QtyScheduled > 0) return "lightcoral";
//     else return "lightblue";
//   };

//   return (
//     <div style={{ overflow: "auto", height: "480px" }}>
//       <Table className="table-data border" style={{ border: "1px" }}>
//         <thead
//           className="tableHeaderBGColor"
//           style={{
//             textAlign: "center",
//             position: "sticky",
//             top: "-1px",
//             whiteSpace: "nowrap",
//           }}
//         >
//           <tr>
//             <th>Drawing/Part Name</th>
//             {props.OrderData?.Type === "Profile" ? (
//               <th style={{ whiteSpace: "nowrap" }}>Dwg Exists</th>
//             ) : null}{" "}
//             <th>Material</th>
//             <th>Operation</th>
//             <th>Source</th>
//             <th>Insp Level</th>
//             <th>Tolerance</th>
//             <th>Packing Level</th>
//             {/* <th>LOC</th> */}
//             {/* <th>Pierces</th> */}
//             <th>JW Cost</th>
//             <th>Mtrl Cost</th>
//             <th>Unit Rate</th>
//             <th>Qty Ordered</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody style={{ textAlign: "center" }}>
//           {OrdrDetailsData.map((OrdrDetailsItem, i) => {
//             const isSelected = selectedItems?.includes(OrdrDetailsItem);
//             const backgroundColor = getRowBackgroundColor(OrdrDetailsItem);
//             return (
//               <tr
//                 key={i}
//                 onClick={() => selectItem(OrdrDetailsItem)}
//                 style={{
//                   cursor: "pointer",
//                   backgroundColor: isSelected ? "#98a8f8" : backgroundColor,
//                 }}
//                 // key={order.id}
//                 className="order-details-row"
//                 data-srlstatus={OrdrDetailsItem.SrlStatus}
//               >
//                 <td>{OrdrDetailsItem.DwgName}</td>
//                 {props.OrderData?.Type === "Profile" ? (
//                   <td>
//                     <Form.Check type="checkbox" id="selected" />
//                   </td>
//                 ) : null}
//                 <td>{OrdrDetailsItem.Mtrl_Code}</td>
//                 <td>{OrdrDetailsItem.Operation}</td>
//                 <td>{OrdrDetailsItem.Mtrl_Source}</td>
//                 <td>{OrdrDetailsItem.InspLevel}</td>
//                 <td>{OrdrDetailsItem.tolerance}</td>
//                 <td>{OrdrDetailsItem.PackingLevel}</td>
//                 {/* <td>{OrdrDetailsItem.LOC}</td> */}
//                 {/* <td>{OrdrDetailsItem.Holes}</td> */}
//                 <td>{OrdrDetailsItem.JWCost}</td>
//                 <td>{OrdrDetailsItem.MtrlCost}</td>
//                 <td>{OrdrDetailsItem.UnitPrice}</td>
//                 <td>{OrdrDetailsItem.Qty_Ordered}</td>
//                 <td>{OrdrDetailsItem.Total}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default OrdrTable;
// import { React, useState, useEffect } from "react";
// import { Tab, Table, Tabs, Form, Modal } from "react-bootstrap";

// function OrdrTable(props) {
//   const {
//     OrderData,
//     OrderCustData,
//     OrdrDetailsData,
//     selectedItems,
//     selectItem,
//     setDetailsColour,
//     calculateMinSrlStatus,
//     updateOrderStatus,
//     getStatusText,
//   } = props;

//   useEffect(() => {
//     // Call setDetailsColour after OrdrDetailsData changes
//     setDetailsColour();
//   }, [OrdrDetailsData]); // Run this effect whenever OrdrDetailsData changes

//   //console.log("OrderData", OrderData);

//   // Function to determine background color based on conditions
//   const getRowBackgroundColor = (order) => {
//     if (order.Qty_Ordered === 0) return "lavender";
//     else if (order.QtyDelivered >= order.Qty_Ordered) return "lightgreen";
//     else if (order.QtyDelivered > 0 && order.QtyPacked >= order.Qty_Ordered)
//       return "orange";
//     else if (order.QtyPacked >= order.Qty_Ordered) return "lightgreen";
//     else if (order.QtyPacked > 0 && order.QtyProduced >= order.Qty_Ordered)
//       return "greenyellow";
//     else if (order.QtyProduced >= order.Qty_Ordered) return "yellow";
//     else if (order.QtyProduced > 0 && order.QtyScheduled >= order.Qty_Ordered)
//       return "greenyellow";
//     else if (order.QtyScheduled >= order.Qty_Ordered) return "lightyellow";
//     else if (order.QtyScheduled > 0) return "lightcoral";
//     else return "lightblue";
//   };

//   return (
//     <div style={{ overflow: "auto", height: "480px" }}>
//       <Table striped bordered hover className="table-data border">
//         <thead
//           className="tableHeaderBGColor"
//           style={{
//             textAlign: "center",
//             position: "sticky",
//             top: "-1px",
//             whiteSpace: "nowrap",
//           }}
//         >
//           <tr>
//             <th>Drawing/Part Name</th>
//             {props.OrderData?.Type === "Profile" ? (
//               <th style={{ whiteSpace: "nowrap" }}>Dwg Exists</th>
//             ) : null}{" "}
//             <th>Material</th>
//             <th>Operation</th>
//             <th>Source</th>
//             <th>Insp Level</th>
//             <th>Tolerance</th>
//             <th>Packing Level</th>
//             {/* <th>LOC</th> */}
//             {/* <th>Pierces</th> */}
//             <th>JW Cost</th>
//             <th>Mtrl Cost</th>
//             <th>Unit Rate</th>
//             <th>Qty Ordered</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody style={{ textAlign: "center" }}>
//           {OrdrDetailsData.map((OrdrDetailsItem, i) => {
//             const isSelected = selectedItems?.includes(OrdrDetailsItem);
//             const backgroundColor = getRowBackgroundColor(OrdrDetailsItem);
//             return (
//               <tr
//                 key={i}
//                 onClick={() => selectItem(OrdrDetailsItem)}
//                 style={{
//                   cursor: "pointer",
//                   backgroundColor: isSelected ? "#98a8f8" : backgroundColor,
//                 }}
//                 // key={order.id}
//                 className="order-details-row"
//                 data-srlstatus={OrdrDetailsItem.SrlStatus}
//               >
//                 <td>{OrdrDetailsItem.DwgName}</td>
//                 {props.OrderData?.Type === "Profile" ? (
//                   <td>
//                     <Form.Check type="checkbox" id="selected" />
//                   </td>
//                 ) : null}
//                 <td>{OrdrDetailsItem.Mtrl_Code}</td>
//                 <td>{OrdrDetailsItem.Operation}</td>
//                 <td>{OrdrDetailsItem.Mtrl_Source}</td>
//                 <td>{OrdrDetailsItem.InspLevel}</td>
//                 <td>{OrdrDetailsItem.tolerance}</td>
//                 <td>{OrdrDetailsItem.PackingLevel}</td>
//                 {/* <td>{OrdrDetailsItem.LOC}</td> */}
//                 {/* <td>{OrdrDetailsItem.Holes}</td> */}
//                 <td>{OrdrDetailsItem.JWCost}</td>
//                 <td>{OrdrDetailsItem.MtrlCost}</td>
//                 <td>{OrdrDetailsItem.UnitPrice}</td>
//                 <td>{OrdrDetailsItem.Qty_Ordered}</td>
//                 <td>{OrdrDetailsItem.Total}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default OrdrTable;

import { React, useState, useEffect } from "react";
import { Tab, Table, Tabs, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

function OrdrTable(props) {
  const {
    OrderData,
    OrderCustData,
    OrdrDetailsData,
    selectedItems,
    selectedRowItem,
    imprtDwgObj,
    selectItem,
    setDetailsColour,
    calculateMinSrlStatus,
    updateOrderStatus,
    getStatusText,
    scheduleType,
    scheduleOption,
    handleSelectAll,
    handleReverseSelection,
    filteredData,
    setFilteredData,
    newSerial,
    setNewSerial,
    ordrDetailsChange,
    setordrDetailsChange,
    handleJWMR,
  } = props;

  useEffect(() => {
    // Call setDetailsColour after OrdrDetailsData changes
    console.log("inside useeffect in order table page");

    setDetailsColour();
  }, [OrdrDetailsData]); // Run this effect whenever OrdrDetailsData changes
  //   }, []); // Run this effect whenever OrdrDetailsData changes

  //console.log("OrderData", OrderData);

  // Function to determine background color based on conditions
  const getRowBackgroundColor = (order) => {
    if (order.Qty_Ordered === 0) return "lavender";
    else if (order.QtyDelivered >= order.Qty_Ordered) return "lightgreen";
    else if (order.QtyDelivered > 0 && order.QtyPacked >= order.Qty_Ordered)
      return "orange";
    else if (order.QtyPacked >= order.Qty_Ordered) return "lightgreen";
    else if (order.QtyPacked > 0 && order.QtyProduced >= order.Qty_Ordered)
      return "greenyellow";
    else if (order.QtyProduced >= order.Qty_Ordered) return "yellow";
    else if (order.QtyProduced > 0 && order.QtyScheduled >= order.Qty_Ordered)
      return "greenyellow";
    else if (order.QtyScheduled >= order.Qty_Ordered) return "lightyellow";
    else if (order.QtyScheduled > 0) return "lightcoral";
    else return "lightblue";
  };

  // Function to filter data based on scheduleType
  // const getFilteredData = () => {
  //   if (scheduleType === "Job Work") {
  //     return OrdrDetailsData.filter(
  //       (item) => item.Mtrl_Source.toLowerCase() === "customer"
  //     );
  //   } else if (scheduleType === "Sales") {
  //     return OrdrDetailsData.filter(
  //       (item) => item.Mtrl_Source.toLowerCase() === "magod"
  //     );
  //   } else {
  //     return OrdrDetailsData;
  //   }
  // };

  // const filteredData = getFilteredData();

  // useEffect(() => {
  //   if (scheduleOption === "Full Order") {
  //     handleSelectAll();
  //   }
  // }, [filteredData, scheduleOption, handleSelectAll]);
  // table header sorting
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // sorting function for table headings of the table
  const requestSort = (key) => {
    console.log("entering into the request sort");
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const dataCopy = [...filteredData];

    if (sortConfig.key) {
      dataCopy.sort((a, b) => {
        let valueA = a[sortConfig.key];
        let valueB = b[sortConfig.key];

        // Convert only for the "intiger" columns
        if (
          sortConfig.key === "JWCost" ||
          sortConfig.key === "MtrlCost" ||
          sortConfig.key === "UnitPrice" ||
          sortConfig.key === "Qty_Ordered" ||
          sortConfig.key === "Total"
        ) {
          valueA = parseFloat(valueA);
          valueB = parseFloat(valueB);
        }

        if (valueA < valueB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return dataCopy;
  };

  // console.log("imprtDwgObj", imprtDwgObj);
  // console.log("filteredData", filteredData);
  // console.log("filteredDataJWCost", filteredData[0].JWCost);
  // console.log("filteredDataMtrlCost", filteredData[0].MtrlCost);
  // console.log("filteredDataUnitPrice", filteredData[0].UnitPrice);
  // console.log("filteredDataQty_Ordered", filteredData[0].Qty_Ordered);
  const [editItem, setEditItem] = useState({
    // JWCost: OrdrDetailsItem.JWCost,
    // MtrlCost: OrdrDetailsItem.MtrlCost,
    // UnitPrice: OrdrDetailsItem.UnitPrice,
    // Qty_Ordered: OrdrDetailsItem.Qty_Ordered,
  });

  // // Handle input change
  // const handleChange = (e) => {
  // 	const { name, value } = e.target;
  // 	setEditItem((prev) => ({ ...prev, [name]: value }));
  // };
  //onchange JW and Material Rate inputfield
  //// const handleJWMR = (index, field, value) => {
  // 	console.log("value is", value);
  // 	if (value < 0) {
  // 		toast.error("Please Enter a Positive Number", {
  // 			position: toast.POSITION.TOP_CENTER,
  // 		});
  // 	} else {
  // 		// const updatedDwgdata = [...filteredData];
  // 		const updatedDwgdata = [...ordrDetailsChange];
  // 		// Update the specific item's field with the new value
  // 		updatedDwgdata[index] = {
  // 			...updatedDwgdata[index],
  // 			[field]: value,
  // 		};
  // 		// setFilteredData(updatedDwgdata);
  // 		setordrDetailsChange(updatedDwgdata);
  // 	}
  // };
  return (
    <div style={{ overflow: "auto", height: "350px" }}>
      <Table bordered hover className="table-data border">
        <thead
          className="tableHeaderBGColor"
          style={{
            textAlign: "center",
            position: "sticky",
            top: "-1px",
            whiteSpace: "nowrap",
          }}
        >
          <tr>
            <th onClick={() => requestSort("DwgName")}>Drawing/Part Name</th>
            {props.OrderData?.Type === "Profile" ? (
              <th style={{ whiteSpace: "nowrap" }}>Dwg Exists</th>
            ) : null}{" "}
            <th onClick={() => requestSort("Mtrl_Code")}>Material</th>
            <th onClick={() => requestSort("Operation")}>Operation</th>
            <th onClick={() => requestSort("Mtrl_Source")}>Source</th>
            <th onClick={() => requestSort("InspLevel")}>Insp Level</th>
            <th onClick={() => requestSort("tolerance")}>Tolerance</th>
            <th onClick={() => requestSort("PackingLevel")}>Packing Level</th>
            <th>LOC</th>
            <th>Pierces</th>
            <th onClick={() => requestSort("JWCost")}>JW Cost</th>
            <th onClick={() => requestSort("MtrlCost")}>Mtrl Cost</th>
            <th onClick={() => requestSort("UnitPrice")}>Unit Rate</th>
            <th onClick={() => requestSort("Qty_Ordered")}>Qty Ordered</th>
            <th onClick={() => requestSort("Total")}>Total</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {sortedData()?.map((OrdrDetailsItem, i) => {
            const backgroundColor = getRowBackgroundColor(OrdrDetailsItem);
            return (
              <tr
                key={i}
                onClick={() => selectItem(OrdrDetailsItem, imprtDwgObj)}
                // onClick={() => selectedRowItem(OrdrDetailsItem, imprtDwgObj)}
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedItems?.includes(OrdrDetailsItem)
                    ? "#98a8f8"
                    : backgroundColor,
                  whiteSpace: "nowrap",
                }}
                // className="order-details-row"

                data-srlstatus={OrdrDetailsItem.SrlStatus}
              >
                <td>{OrdrDetailsItem.DwgName}</td>
                {props.OrderData?.Type === "Profile" ? (
                  <td>
                    <Form.Check type="checkbox" id="selected" defaultChecked />
                  </td>
                ) : null}
                <td>{OrdrDetailsItem.Mtrl_Code}</td>
                <td>{OrdrDetailsItem.Operation}</td>
                <td>{OrdrDetailsItem.Mtrl_Source}</td>
                <td>{OrdrDetailsItem.InspLevel}</td>
                <td>{OrdrDetailsItem.tolerance}</td>
                <td>{OrdrDetailsItem.PackingLevel}</td>
                <td>{OrdrDetailsItem.LOC}</td>
                <td>{OrdrDetailsItem.Holes}</td>
                {/* <td>
									{" "}
									<input value={OrdrDetailsItem.JWCost} />{" "}
								</td> */}

                <td>
                  {" "}
                  <input
                    className="table-cell-editor"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    value={OrdrDetailsItem.JWCost}
                    onChange={(e) => handleJWMR(i, "JWCost", e.target.value)}
                  />
                </td>
                {/* <td>
									<input value={OrdrDetailsItem.MtrlCost} />
								</td> */}
                <td>
                  {" "}
                  <input
                    className="table-cell-editor"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    value={OrdrDetailsItem.MtrlCost}
                    onChange={(e) => handleJWMR(i, "MtrlCost", e.target.value)}
                  />
                </td>
                <td>
                  {/* <input value={OrdrDetailsItem.UnitPrice} /> */}
                  {OrdrDetailsItem.UnitPrice}
                </td>
                {/* <td> */}
                {/* <input value={OrdrDetailsItem.Qty_Ordered} /> */}
                {/* {OrdrDetailsItem.Qty_Ordered} */}
                {/* </td> */}
                <td>
                  {" "}
                  <input
                    className="table-cell-editor"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    value={OrdrDetailsItem.Qty_Ordered}
                    onChange={(e) =>
                      handleJWMR(i, "Qty_Ordered", e.target.value)
                    }
                  />
                </td>
                <td>{OrdrDetailsItem.Total}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default OrdrTable;
