import * as Print from "expo-print";
import { PrintSheet } from "./PrintSheet";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { timeToStr, minsToNextUpdate, dateToStr } from "./TimeKeeper";
import { calcRatio } from "./calcRatio";

export const print = (info) => {
  info = info.slice(1);

  const headers = [
    "Time",
    "# Nursery",
    "# Kooka",
    "# Emus",
    "# Kanga",
    "# Children",
    "# Staff",
    "# Staff req",
    "Staff initials",
  ];

  const getInfoAsStr = (info) => {
    let time = timeToStr(info.date);
    let nursery = info.numNursery;
    let kookaburras = info.numKook;
    let emus = info.numEmus;
    let kangaroos = info.numKangaroos;
    let numChildren = nursery + kookaburras + emus + kangaroos;
    let numStaff = info.staffOnDuty.length;
    let staffRequired = calcRatio(nursery, kookaburras, emus + kangaroos);
    let staffNames = processNames(info.staffOnDuty);
    return `<td>${time}</td>
      <td>${nursery}</td>
      <td>${kookaburras}</td>
      <td>${emus}</td>
      <td>${kangaroos}</td>
      <td>${numChildren}</td>
      <td>${numStaff}</td>
      <td>${staffRequired}</td>
      <td>${staffNames}</td>`;
  };

  const processNames = (staff) => {
    let initials = "";
    for (let i = 0; i < staff.length; i++) {
      initials += staff[i].firstName[0] + "." + staff[i].lastName[0];
      if (i != staff.length - 1) {
        initials += "\n";
      }
    }
    return initials;
  };

  let { printerName, printerUrl } = Print.selectPrinterAsync().catch((e) =>
    console.log("fail")
  );

  let html =
    "<style> body {font-family:Helvetica;} img {height: 50px; width: 250px}</style><body><img alt=" +
    'kindylogo" src="https://2syco449tvc32lbc983jscyx-wpengine.netdna-ssl.com/wp-content/uploads/2018/11/little-scribblers-logo.svg"/>' +
    "<br>" +
    "<h2>Ratio Check for " +
    dateToStr(info[0].date) +
    "</h2><table><thead><tr>" +
    headers.map((header) => "<th>" + header + "</th>") +
    "</tr></thead><tbody>" +
    info.map((element) => "<tr>" + getInfoAsStr(element) + "</tr>") +
    "</tbody></table></body>";
  let { pdfURI, numPages, base64 } = Print.printToFileAsync({
    html: html,
    width: 612,
    height: 792,
    base64: true,
  });
  Print.printAsync({
    uri: pdfURI,
    html: html,
    width: 612,
    height: 792,
    printerUrl: printerUrl,
    orientation: Print.Orientation.portrait,
  });
};
