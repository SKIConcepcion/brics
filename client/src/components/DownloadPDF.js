import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// const DownloadPDF = () => {
  export const handleDownloadPDF = async () => {
    try {
      const response = await fetch('https://brics-api.vercel.app/api/rooms/get-all-rooms');
      if (!response.ok) {
        throw new Error('Failed to fetch room data');
      }
      const roomData = await response.json();
  
      const doc = new jsPDF();
  
      const title = 'ICS ROOMS INFORMATION';
      const subTitle = `     Listed below are the most significant information regarding the rooms currently handled by the Institute of Computer Science. It is also important to take into account that per reservation, there is a Utility Fee of Php 200.00 per hour to cover the cost of the assigned administrative staff tasked to assist on the site.`;
      const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const subTitleWidth = doc.internal.pageSize.getWidth() - 40;
      const docWidth = doc.internal.pageSize.getWidth();
      const titleX = (docWidth - titleWidth) / 2;
      const subTitleX = 20; // Adjusted x-coordinate for paragraph
      const subTitleY = 30; // Y-coordinate of the start of the paragraph
  
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold')
      doc.setTextColor(17, 85, 204)
  
      doc.text(title, titleX, 20);
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(11);
      doc.setFont(undefined, 'normal')
      doc.text(subTitle, subTitleX, subTitleY, { maxWidth: subTitleWidth });
  
      // Define the columns and rows for the table
      const columns = ['Room Name', 'Short Description', 'Location', 'Seating Capacity', 'Equipment Included', 'Reservation Fee'];
      const data = [
        columns, // First row contains the column names
        ...roomData.map(room => [
          `${room.name} (${room.acronym})`,
          room.roomDesc,
          buildLocation(room),
          room.seatingCapacity,
          buildEquipmentList(room),
          buildReservationFee(room)
        ])
      ];
  
      doc.autoTable({
        startY: 50,
        body: data,
        theme: 'grid',
  
        // Column styles
        styles: {
          font: 'helvetica',
          fontSize: 10,
          textColor: [0, 0, 0],
          cellPadding: 3,
          row: {
            0: { fontStyle: 'bold' } // Style the first row
          }
        },
  
        alternateRowStyles: {
          fillColor: [17, 85, 204], // Background color for alternate rows
          textColor: [255, 255, 255], // Black font color for alternate rows
          fontStyle: 'normal',
          lineWidth: 0.5,
        },
  
        columnStyles: {
          0: { cellWidth: 30, fontStyle: 'bold' }, // Room Name
          1: { cellWidth: 40 }, // Short Description
          2: { cellWidth: 24 }, // Location
          3: { cellWidth: 21 }, // Seating Capacity
          4: { cellWidth: 37 }, // Equipment Included
          5: { cellWidth: 30 }, // Reservation Fee
        },
  
        rowStyles: {
          0: { fontStyle: 'bold' },
        },
  
        didDrawCell: function (data) {
          // Add grid lines
          doc.setLineWidth(0.1);
          doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height); // Vertical line
          doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height); // Horizontal line
        },
  
        didParseCell: function (data) {
          if (data.row.index === 0) {
            data.cell.styles.fontStyle = 'bold';
          }
        }
      });
  
      // Save the PDF
      doc.save('ICS Rooms Information.pdf');
    } catch (error) {
      console.error('Error fetching or generating PDF:', error);
    }
  };
  
  // Function to build bulleted equipment list
  const buildEquipmentList = (room) => {
    let equipmentIncluded = '';
    if (room.hasPodium) {
      equipmentIncluded += '• Podium\n';
    }
    if (room.hasProjector) {
      equipmentIncluded += '• Projector\n';
    }
    if (room.mic > 0) {
      equipmentIncluded += `• Microphone/s: ${room.mic}\n`;
    }
    if (room.speakers > 0) {
      equipmentIncluded += `• Speakers: ${room.speakers}\n`;
    }
    if (room.computerCount > 0) {
      equipmentIncluded += `• Computer/s: ${room.computerCount}\n`;
    }
    if (room.hasWifi) {
      equipmentIncluded += '• Wifi\n';
    }
  
    return equipmentIncluded;
  };
  
  const buildReservationFee = (room) => {
    let reservationFee = '';
    if (room.reservationFee) {
      reservationFee += `Php ${room.reservationFee}.00/per hour\n`;
    }
    if (room.computerFee) {
      reservationFee += `\nPhp ${room.computerFee}.00/per computer`;
    }
  
    return reservationFee;
  };
  
  const buildLocation = (room) => {
    let location = '';
    const floorLevel = parseInt(room.floorLevel, 10); // Convert to integer
    const lastDigit = floorLevel % 10;
  
    if ((floorLevel >= 11 && floorLevel <= 13) || lastDigit === 0) {
      location += floorLevel + 'th';
    } else if (lastDigit === 1) {
      location += floorLevel + 'st';
    } else if (lastDigit === 2) {
      location += floorLevel + 'nd';
    } else if (lastDigit === 3) {
      location += floorLevel + 'rd';
    } else {
      location += floorLevel + 'th';
    }
  
    location += " Floor, " + room.building; // Fixed concatenation
  
    if (room.landmark) {
      location += ", " + room.landmark; // Fixed concatenation
    }
  
    return location;
  };