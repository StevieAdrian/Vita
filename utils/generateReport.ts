// npm uninstall react-native-print
// npm install react-native-print@0.8.0 --legacy-peer-deps

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

interface ReportData {
  name: string;
  dob: string;
  age: number;
  gender: string;
  bloodType: string;
  period: string;
  bloodSugar: { avg: number; high: number; low: number };
  bloodPressure: { avg: string; high: string; low: string };
  heartRate: { avg: number; high: number; low: number };
  weight: { avg: number; high: number; low: number };
  appointments: { date: string; desc: string; status: string }[];
}

export async function generateReportPDF(data: ReportData) {
  try {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Health Report - ${data.name}</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                margin: 15mm; 
                line-height: 1.6;
                color: #333;
                font-size: 12px;
            }
            .header { 
                background: #1e40af; 
                color: white; 
                padding: 20px; 
                text-align: center;
                margin-bottom: 20px;
            }
            .section { 
                margin: 15px 0; 
                padding: 15px;
                border: 1px solid #e0e0e0;
                background: #fafafa;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 10px 0;
                font-size: 11px;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f0f4f8;
                font-weight: bold;
            }
            .status-confirmed { color: #059669; font-weight: bold; }
            .status-not-confirmed { color: #dc2626; font-weight: bold; }
            @media print {
                body { margin: 0; padding: 15mm; }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1 style="margin: 0; font-size: 18px;">MONTHLY HEALTH REPORT</h1>
            <h2 style="margin: 5px 0 0 0; font-size: 14px;">${data.period}</h2>
        </div>

        <div class="section">
            <h2 style="color: #1e40af; margin: 0 0 10px 0; font-size: 14px;">Personal Information</h2>
            <table>
                <tr><td><strong>Name:</strong></td><td>${data.name}</td></tr>
                <tr><td><strong>Age:</strong></td><td>${data.age}</td></tr>
                <tr><td><strong>Gender:</strong></td><td>${
                  data.gender
                }</td></tr>
                <tr><td><strong>Blood Type:</strong></td><td>${
                  data.bloodType
                }</td></tr>
            </table>
        </div>

        <div class="section">
            <h2 style="color: #1e40af; margin: 0 0 10px 0; font-size: 14px;">Vital Signs</h2>
            <table>
                <tr><th>Metric</th><th>Average</th><th>Highest</th><th>Lowest</th></tr>
                <tr><td>Blood Sugar</td><td>${
                  data.bloodSugar.avg
                } mg/dL</td><td>${data.bloodSugar.high} mg/dL</td><td>${
      data.bloodSugar.low
    } mg/dL</td></tr>
                <tr><td>Heart Rate</td><td>${data.heartRate.avg} bpm</td><td>${
      data.heartRate.high
    } bpm</td><td>${data.heartRate.low} bpm</td></tr>
                <tr><td>Blood Pressure</td><td>${
                  data.bloodPressure.avg
                }</td><td>${data.bloodPressure.high}</td><td>${
      data.bloodPressure.low
    }</td></tr>
                <tr><td>Weight</td><td>${data.weight.avg} kg</td><td>${
      data.weight.high
    } kg</td><td>${data.weight.low} kg</td></tr>
            </table>
        </div>

        <div class="section">
            <h2 style="color: #1e40af; margin: 0 0 10px 0; font-size: 14px;">Appointments</h2>
            <table>
                <tr><th>Date</th><th>Description</th><th>Status</th></tr>
                ${data.appointments
                  .map(
                    (appt: any) => `
                <tr>
                    <td>${appt.date}</td>
                    <td>${appt.desc}</td>
                    <td class="${
                      appt.status === "Confirmed"
                        ? "status-confirmed"
                        : "status-not-confirmed"
                    }">${appt.status}</td>
                </tr>
                `
                  )
                  .join("")}
            </table>
        </div>

        <div style="margin-top: 20px; text-align: center; color: #666; font-size: 10px;">
            <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
    </body>
    </html>
    `;

    if (Platform.OS === "web") {
      const printFrame = document.createElement("iframe");
      printFrame.style.position = "fixed";
      printFrame.style.right = "0";
      printFrame.style.bottom = "0";
      printFrame.style.width = "0";
      printFrame.style.height = "0";
      printFrame.style.border = "none";
      printFrame.style.opacity = "0";
      printFrame.style.pointerEvents = "none";

      document.body.appendChild(printFrame);

      const iframeDoc =
        printFrame.contentDocument || printFrame.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Health Report</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 15mm; 
            line-height: 1.6;
            color: #333;
            font-size: 12px;
          }
          .header { 
            background: #1e40af; 
            color: white; 
            padding: 20px; 
            text-align: center;
            margin-bottom: 20px;
          }
          .section { 
            margin: 15px 0; 
            padding: 15px;
            border: 1px solid #e0e0e0;
            background: #fafafa;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
            font-size: 11px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f0f4f8;
            font-weight: bold;
          }
          @media print {
            body { margin: 0; padding: 15mm; }
            .header { margin: 0 0 20px 0; }
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `);
        iframeDoc.close();

        printFrame.onload = () => {
          setTimeout(() => {
            const iframeWindow = printFrame.contentWindow;
            if (iframeWindow) {
              iframeWindow.focus();
              iframeWindow.print();

              setTimeout(() => {
                document.body.removeChild(printFrame);
              }, 1000);
            }
          }, 500);
        };
      }
    } else {
      try {
        const { uri } = await Print.printToFileAsync({
          html: htmlContent,
        });

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri, {
            mimeType: "application/pdf",
            dialogTitle: "Download Health Report",
            UTI: "com.adobe.pdf",
          });
        }
      } catch (mobileError) {
        console.error(mobileError);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
