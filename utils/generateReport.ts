import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

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
  const html = `
  <html>
  <head>
    <meta charset="utf-8" />
    <style>
      @page { size: A4; margin: 20mm; }
      body { font-family: 'Helvetica', 'Arial', sans-serif; color: #333; font-size: 13px; margin: 0; padding: 0; }
      header {
        background-color: #1e73be;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 30px;
        border-bottom: 4px solid #1760a0;
      }
      header img { height: 40px; }
      h2 { text-align: center; margin: 28px 0 12px 0; font-size: 18px; color: #000; }
      table { border-collapse: collapse; width: 100%; }
      td, th { padding: 6px 10px; vertical-align: top; }
      .info-table td:first-child { width: 140px; font-weight: bold; }
      .section { border: 1px solid #ddd; border-radius: 8px; padding: 14px 18px; margin-top: 20px; }
      .section h3 { color: #1e73be; margin-bottom: 10px; font-size: 15px; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
      .vital-container { display: flex; justify-content: space-between; gap: 16px; }
      .vital-box { flex: 1; border: 1px solid #ddd; border-radius: 8px; padding: 12px; }
      .vital-box h4 { color: #1e73be; font-size: 14px; margin-top: 0; margin-bottom: 6px; }
      .vital-box td:first-child { width: 90px; font-weight: bold; }
      .appointment { width: 100%; margin-top: 8px; border: 1px solid #ddd; border-radius: 6px; }
      .appointment th { background: #f5f8fb; text-align: left; padding: 8px 10px; font-size: 13px; border-bottom: 1px solid #ddd; }
      .appointment td { padding: 8px 10px; border-bottom: 1px solid #eee; vertical-align: top; }
      .confirmed { color: #007b2d; font-weight: 600; }
      .not-confirmed { color: #c60000; font-weight: 600; }
      .footer { font-size: 11px; color: #999; text-align: center; margin-top: 30px; }
    </style>
  </head>

  <body>

    <header>
      <img src="https://i.ibb.co/nQDYqJ0/vita-logo.png" />
      <div class="period">${data.period}</div>
    </header>

    <h2>Personal Information</h2>
    <table class="info-table">
      <tr>
        <td>Full Name:</td><td>${data.name}</td>
        <td>Date of Birth:</td><td>${data.dob}</td>
      </tr>
      <tr>
        <td>Age:</td><td>${data.age}</td>
        <td>Gender:</td><td>${data.gender}</td>
      </tr>
      <tr>
        <td>Blood Type:</td><td>${data.bloodType}</td>
        <td>Period:</td><td>${data.period}</td>
      </tr>
    </table>

    <h2>Monthly Health Report</h2>

    <div class="vital-container">
      <div class="vital-box">
        <h4>Blood Sugar</h4>
        <table>
          <tr><td>Average</td><td>${data.bloodSugar.avg} mg/dL</td></tr>
          <tr><td>Highest</td><td style="color:red;">${
            data.bloodSugar.high
          } mg/dL</td></tr>
          <tr><td>Lowest</td><td>${data.bloodSugar.low} mg/dL</td></tr>
        </table>

        <br/>
        <h4>Blood Pressure</h4>
        <table>
          <tr><td>Average</td><td>${data.bloodPressure.avg}</td></tr>
          <tr><td>Highest</td><td style="color:red;">${
            data.bloodPressure.high
          }</td></tr>
          <tr><td>Lowest</td><td>${data.bloodPressure.low}</td></tr>
        </table>
      </div>

      <div class="vital-box">
        <h4>Heart Rate</h4>
        <table>
          <tr><td>Average</td><td>${data.heartRate.avg} bpm</td></tr>
          <tr><td>Highest</td><td style="color:red;">${
            data.heartRate.high
          } bpm</td></tr>
          <tr><td>Lowest</td><td>${data.heartRate.low} bpm</td></tr>
        </table>

        <br/>
        <h4>Weight</h4>
        <table>
          <tr><td>Average</td><td>${data.weight.avg} kg</td></tr>
          <tr><td>Highest</td><td>${data.weight.high} kg</td></tr>
          <tr><td>Lowest</td><td>${data.weight.low} kg</td></tr>
        </table>
      </div>
    </div>

    <div class="section">
      <h3>Appointment Tracker</h3>
      <table class="appointment">
        <tr><th>Date</th><th>Details</th><th>Status</th></tr>
        ${data.appointments
          .map(
            (a) => `
            <tr>
              <td>${a.date}</td>
              <td>${a.desc}</td>
              <td class="${
                a.status === "Confirmed" ? "confirmed" : "not-confirmed"
              }">${a.status}</td>
            </tr>`
          )
          .join("")}
      </table>
    </div>

    <div class="footer">
      Generated by System on ${new Date().toLocaleDateString()}
    </div>

  </body>
  </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  const dir = (FileSystem as any).documentDirectory || "";
  const pdfName = FileSystem.documentDirectory + "MonthlyReport.pdf";
  await FileSystem.moveAsync({ from: uri, to: pdfName });

  await Sharing.shareAsync(pdfName);
}
