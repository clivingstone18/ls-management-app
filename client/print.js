import * as Print from "expo-print";
import moment from "moment"
export const print = async (info, date) => {
  return new Promise((resolve, reject) =>  {
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
    let time = info[0]
    let nursery = info[1];
    let kookaburras = info[2];
    let emus = info[3];
    let kangaroos = info[4];
    let numChildren = info[5]
    let numStaff = info[8].split("\n").length
    let staffRequired = info[7]
    let staffNames = info[8].split("\n").join(", ")

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

  let { printerName, printerUrl } = Print.selectPrinterAsync().catch((e) =>
    console.log("fail")
  );

  let html =
    "<style> body {font-family:Helvetica;} img {height: 50px; width: 250px}</style><body><img alt=" +
    'kindylogo" src="https://2syco449tvc32lbc983jscyx-wpengine.netdna-ssl.com/wp-content/uploads/2018/11/little-scribblers-logo.svg"/>' +
    "<br>" +
    "<h2>Ratio Check for " +
    moment(date).format("dddd, MMMM Do YYYY") +
    "</h2><table><thead><tr>" +
    headers.map((header) => "<th>" + header + "</th>").join("") +
    "</tr></thead><tbody>" +
    info.map((element) => "<tr>" + getInfoAsStr(element) + "</tr>").join("") +
    "</tbody></table></body>";
  let { pdfURI, numPages, base64 } = Print.printToFileAsync({
    html: html,
    width: 612,
    height: 792,
    base64: true,
  });

  try {
    let printedFile = Print.printAsync({
      uri: pdfURI,
      html: html,
      width: 612,
      height: 792,
      printerUrl: printerUrl,
      orientation: Print.Orientation.portrait,
    });
    console.log(printedFile)
    resolve(printedFile)
  }
  catch (err) {
    reject(err)
  }
})
}