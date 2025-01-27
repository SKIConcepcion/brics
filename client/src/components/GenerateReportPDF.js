import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// const DownloadPDF = () => {
  export const GenerateReportPDF = async (data) => {
    const reservationColors = ["#4285F4", "#AA46BB", "#2B3A67", "#DB4437"];
    const userColors = ["#4285F4", "#AA46BB"];

    //console.log("Here")
    //startDateUser, endDateUser, startDateReservation, endDateReservation, userReport, reservationReport, imgReservDoughnut, imgUserDoughtnut, imgReserveBar, imgUserBar
    try {
      const doc = new jsPDF();
  
      // Add the text at the top of the PDF document
      const title = 'Report Summary';
      const subTitle = `This report contains a brief overview of the system's data on the current Reservations and User Accounts. The report on Reservations are from ${data.startDateReservation} to ${data.endDateReservation}, while the report on User Accounts are from ${data.startDateUser} to ${data.endDateUser}.`;
      const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const subTitleWidth = doc.internal.pageSize.getWidth() - 40; // Adjusted width for paragraph
      const docWidth = doc.internal.pageSize.getWidth();
      const titleX = (docWidth - titleWidth) / 2 - 20;
      const subTitleX = 20; // Adjusted x-coordinate for paragraph
      const subTitleY = 30; // Y-coordinate of the start of the paragraph


      doc.setFontSize(30);
      doc.setFont(undefined, 'bold')
      doc.setTextColor(20, 85, 204)
      
      doc.text(title, titleX, 20);
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(11);
      doc.setFont(undefined, 'normal')
      doc.text(subTitle, subTitleX, subTitleY, { maxWidth: subTitleWidth });

      const titleReservations = 'Reservations Report';
      const subTitleReservations = `The following are the statistics of the Reservations made within the specified date range.`;
      const titleReservationsWidth = doc.getStringUnitWidth(titleReservations) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const subTitleReservationsWidth = doc.internal.pageSize.getWidth() - 40; // Adjusted width for paragraph
      const titleReservationsX = (docWidth - titleReservationsWidth) / 2 - 5;
      let subTitleReservationsX =15; // Adjusted x-coordinate for paragraph
      let subTitleReservationsY = 60; // Y-coordinate of the start of the paragraph
      
        doc.setFontSize(22);
        doc.setFont(undefined, 'bold')
        doc.setTextColor(20, 85, 204)

        doc.text(titleReservations, titleReservationsX, 50);
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal')
        //doc.text(subTitleReservations, subTitleReservationsX, subTitleReservationsY, { maxWidth: subTitleReservationsWidth });

        doc.setFontSize(13);
        doc.setFont(undefined, 'bold')
        doc.setTextColor(20, 85, 204)
        const adjustingY2 = 10;
        doc.text("Reservation Status Distribution", 15, 70-adjustingY2);
        doc.text("Demographics of Reservations Made", 110, 70-adjustingY2);
        doc.text("Overview", 130, 140-adjustingY2);
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold')
        doc.setTextColor(reservationColors[0]);
        subTitleReservationsY = subTitleReservationsY + 70;
        doc.text(`Awaiting Approval: ${data.reservationReport.awaitingApprovalCount}`, subTitleReservationsX, subTitleReservationsY+20-adjustingY2, { maxWidth: subTitleReservationsWidth });
        doc.setTextColor(reservationColors[1]);
        doc.text(`Pending Payment: ${data.reservationReport.pendingPaymentCount}`, subTitleReservationsX, subTitleReservationsY+25-adjustingY2, { maxWidth: subTitleReservationsWidth });
        doc.setTextColor(reservationColors[2]);
        doc.text(`Finalized: ${data.reservationReport.finalizedCount}`, subTitleReservationsX, subTitleReservationsY+30-adjustingY2, { maxWidth: subTitleReservationsWidth });
        doc.setTextColor(reservationColors[3]);
        doc.text(`Rejected: ${data.reservationReport.rejectedCount}`, subTitleReservationsX, subTitleReservationsY+35-adjustingY2, { maxWidth: subTitleReservationsWidth });

        doc.setFontSize(11);
        doc.setFont(undefined, 'normal')  
        doc.addImage(data.chartImages[1], 'PNG', 15, 60-adjustingY2, 80, 100);
        doc.addImage(data.chartImages[3], 'PNG', 100, 80-adjustingY2, 100, 50);
        // //console.log("eto")
        // //console.log(data.reservationReport.totalReservations);

        // let totalReservations = data.reservationReport.awaitingApprovalCount + data.reservationReport.pendingPaymentCount + data.reservationReport.finalizedCount + data.reservationReport.rejectedCount;


        const reportReservationText = `The total reservations for this report is ${data.reservationReport.totalReservations} reservations , distributed to ${data.reservationReport.awaitingApprovalCount} awaiting approval, ${data.reservationReport.pendingPaymentCount} pending payment, ${data.reservationReport.finalizedCount} finalized, and ${data.reservationReport.rejectedCount} rejected. The room with the most reservations is ${data.reservationReport.mostReservedSpace} with ${data.reservationReport.totalReservationsMostReserved} reservations. On the other hand, the room with the least reservations is ${data.reservationReport.leastReservedSpace} with ${data.reservationReport.totalReservationsLeastReserved} reservations.`;
        doc.setTextColor(0,0,0);
        doc.text(reportReservationText, 90, 150-adjustingY2, { maxWidth: 110 });






        const adjustingY = 115;
      const titleUsers = 'Users Report';
      const subTitleUsers = `The following are the statistics of the Users Demographics made within the specified date range.`;
      const titleUsersWifth = doc.getStringUnitWidth(titleReservations) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const subTitleUsersWidth = doc.internal.pageSize.getWidth() - 40; // Adjusted width for paragraph
      const titleUsersX = (docWidth - titleReservationsWidth) / 2 - 5;
      let subTitleUsersX =15; // Adjusted x-coordinate for paragraph
      let subTitleUsersY = 60+adjustingY; // Y-coordinate of the start of the paragraph
      
        doc.setFontSize(22);
        doc.setFont(undefined, 'bold')
        doc.setTextColor(20, 85, 204)

        doc.text(titleUsers, titleUsersX, 60+adjustingY);
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal')
       // doc.text(subTitleUsers, subTitleUsersX, subTitleUsersY, { maxWidth: subTitleReservationsWidth });

        
        doc.setFontSize(13);
        doc.setFont(undefined, 'bold')
        doc.setTextColor(20, 85, 204)
        doc.text("User Demographics of BRICS", 15, 70+adjustingY);
        doc.text("Reservations per College", 110, 70+adjustingY);
        doc.text("Overview", 130, 140+adjustingY);
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold')
        doc.setTextColor(userColors[0]);
      
        subTitleReservationsY = 260;
        doc.text(`Student: ${data.userReport.studentOrgCount}`, subTitleReservationsX, subTitleReservationsY, { maxWidth: subTitleReservationsWidth });
        doc.setTextColor(userColors[1]);
        doc.text(`Faculty: ${data.userReport.facultyCount}`, subTitleReservationsX, subTitleReservationsY+5, { maxWidth: subTitleReservationsWidth });
        
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal')  
        doc.addImage(data.chartImages[0], 'PNG', 15, 60+adjustingY, 80, 100);
        doc.addImage(data.chartImages[2], 'PNG', 100, 80+adjustingY, 100, 50);

        
        const reportUsersText = `The total users for this report is ${data.userReport.totalUsers} users, distributed to ${data.userReport.studentOrgCount} students and ${data.userReport.facultyCount} faculty members. The user with the most reservations is ${data.userReport.mostReservations.class} with ${data.userReport.mostReservations.count} reservations. On the other hand, the user with the least reservations is ${data.userReport.leastReservations.class} with ${data.userReport.leastReservations.count} reservations.`;
        doc.setTextColor(0,0,0);
        doc.text(reportUsersText, 90, 150+adjustingY, { maxWidth: 110 });
        


        

      //console.log('Generating PDF...');
      // Save the PDF
      doc.save('Report.pdf');
      //console.log('PDF saved successfully.');
    } catch (error) {
      //console.error('Error fetching or generating PDF:', error);
    }
  };
  