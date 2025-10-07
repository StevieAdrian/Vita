import { Allergic } from "@/constants/allergic";
import { Chronic } from "@/constants/chronic";
import { Asset } from "expo-asset";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

interface ReportData {
  name: string;
  dob: string;
  age: number;
  today: Date;
  gender: string;
  bloodType: string;
  period: string;
  bloodSugar: { avg: number; high: number; low: number };
  bloodPressure: { avg: string; high: string; low: string };
  heartRate: { avg: number; high: number; low: number };
  weight: { avg: number; high: number; low: number };
  appointments: { date: string; desc: string; status: string }[];
  allergics: Allergic;
  chronic: Chronic;
}

export async function generateReportPDF(data: ReportData) {
  try {
    const asset = Asset.fromModule(
      require("../assets/utilsIcon/vita-generate.png")
    );
    await asset.downloadAsync();

    const imageUri = asset.localUri || asset.uri;

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Health Report - ${data.name}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body { 
                font-family: 'Segoe UI', Arial, sans-serif; 
                background: white;
                color: black;
                font-size: 12px;
                line-height: 1.4;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
            }
            .header { 
                background: #1A73E8;
                color: white; 
                padding: 30px 40px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .header-left {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            .logo {
                width: 120px;
                height: auto;
            }
            .logo img {
                width: 100%;
                height: auto;
                display: block;
            }
            .header-title h1 {
                font-size: 32px;
                font-weight: 600;
                margin-bottom: 5px;
            }
            .header-title p {
                font-size: 11px;
                opacity: 0.95;
            }
            .header-date {
                text-align: right;
                font-size: 11px;
                opacity: 0.95;
            }
            .content {
                padding: 40px;
            }
            .section-title {
                font-size: 24px;
                font-weight: 600;
                color: black;
                margin: 30px 0 20px 0;
                padding-bottom: 8px;
                border-bottom: 2px solid white;
                text-align: center;
                font-style: italic;
            }
            .section-title:first-of-type {
                margin-top: 0;
            }
            .info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px 30px;
                margin-bottom: 20px;
            }
            .info-row {
                display: flex;
                padding: 8px 0;
            }
            .info-label {
                font-weight: 600;
                color: #B1A6A6;
                min-width: 120px;
                font-size: 11px;
            }
            .info-value {
                color: black;
                font-size: 11px;
            }
            .conditions-section {
                margin: 15px 0;
            }
            .condition-label {
                font-weight: 600;
                color: #828282;
                font-size: 11px;
                margin-bottom: 5px;
            }
            .condition-value {
                color: black;
                font-size: 11px;
                padding-left: 0;
            }
            .report-card {
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 25px;
                margin: 20px 0;
            }
            .vital-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 25px;
            }
            .vital-box {
                background: white;
                border-radius: 6px;
                padding: 15px;
            }
            .vital-title {
                font-size: 12px;
                font-weight: 600;
                color: #8CB9F3;
                margin-bottom: 12px;
            }
            .vital-item {
                display: flex;
                justify-content: space-between;
                padding: 6px 0;
                font-size: 11px;
                border-bottom: 1px solid #e2e8f0;
            }
            .vital-item:last-child {
                border-bottom: none;
            }
            .vital-label {
                color: black;
            }
            .vital-value {
                color: black;
                font-weight: 500;
            }
            .vital-date {
                color: #828282;
                font-size: 9px;
                margin-left: 8px;
            }
            .appointments {
                margin-top: 20px;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 25px;
            }
            .appointment-main-title {
                font-size: 12px;
                font-weight: 600;
                color: #1A73E8;
                margin-bottom: 20px;
                display: inline-block;
            }
            .appointment-item {
                background: white;
                border-radius: 6px;
                padding: 15px;
            }
            .appointment-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            .appointment-date {
                font-weight: 600;
                color: black;
                font-size: 12px;
            }
            .appointment-details {
                padding-left: 15px;
            }
            .appointment-detail {
                display: flex;
                align-items: flex-start;
                margin-bottom: 5px;
                font-size: 11px;
            }
            .appointment-detail::before {
                content: "•";
                color: #2563eb;
                font-weight: bold;
                margin-right: 8px;
            }
            .appointment-desc {
                color: #1e293b;
            }
            .appointment-location {
                color: #64748b;
            }
            .status-confirmed { 
                color: #059669;
                font-weight: 600;
                font-size: 11px;
                font-style: italic;
            }
            .status-not-confirmed { 
                color: #FE4A23;
                font-weight: 600;
                font-size: 11px;
                font-style: italic;
            }
            .note-text {
                color: #8CB9F3;
                font-size: 9px;
                margin-top: 10px;
                font-style: italic;
                text-align: right;
                display: block;
            }
            .footer {
                margin-top: 40px;
                text-align: center;
                color: #FE4A23;
                font-size: 10px;
                font-style: italic;
            }
            @media print {
                body { 
                    background: white;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 100%;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="header-left">
                    <div class="logo">
                        <img src="${imageUri}" alt="Vita Logo" />
                    </div>
                </div>
                <div class="header-date">${data.period}</div>
            </div>

            <div class="content">
                <div class="section-title">Personal Information</div>
                
                <div class="info-grid">
                    <div class="info-row">
                        <span class="info-label">Full Name:</span>
                        <span class="info-value">${data.name}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Date of Birth:</span>
                        <span class="info-value">${data.dob}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Age:</span>
                        <span class="info-value">${data.age}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Gender:</span>
                        <span class="info-value">${data.gender}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Blood Type:</span>
                        <span class="info-value">${data.bloodType}</span>
                    </div>
                </div>

                <div class="conditions-section">
                    <div class="condition-label">Allergic Conditions:</div>
                    <div class="condition-value">${data.allergics}</div>
                </div>
                
                <div class="conditions-section">
                    <div class="condition-label">Chronical Conditions:</div>
                    <div class="condition-value">${data.chronic}</div>
                </div>

                <div class="section-title">September Report Card</div>

                <div class="report-card">
                  <span class="appointment-main-title">Vital Sign</span>
                    <div class="vital-grid">
                        <div class="vital-box">
                            <div class="vital-title">Blood Sugar</div>
                            <div class="vital-item">
                                <span class="vital-label">Average</span>
                                <span class="vital-value">${
                                  data.bloodSugar.avg
                                } mg/dL
                            </div>
                            <div class="vital-item">
                                <span class="vital-label">Highest</span>
                                <span class="vital-value">${
                                  data.bloodSugar.high
                                } mg/dL<span class="vital-date">(September 20, 2025)</span></span>
                            </div>
                            <div class="vital-item">
                                <span class="vital-label">Lowest</span>
                                <span class="vital-value">${
                                  data.bloodSugar.low
                                } mg/dL<span class="vital-date">(September 3, 2025)</span></span>
                            </div>
                        </div>

                        <div class="vital-box">
                            <div class="vital-title">Heart Rate</div>
                            <div class="vital-item">
                                <span class="vital-label">Average</span>
                                <span class="vital-value">${
                                  data.heartRate.avg
                                } bpm</span>
                            </div>
                            <div class="vital-item">
                                <span class="vital-label">Highest</span>
                                <span class="vital-value">${
                                  data.heartRate.high
                                } bpm<span class="vital-date">(September 20, 2025)</span></span>
                            </div>
                            <div class="vital-item">
                                <span class="vital-label">Lowest</span>
                                <span class="vital-value">${
                                  data.heartRate.low
                                } bpm<span class="vital-date">(September 3, 2025)</span></span>
                            </div>
                        </div>

                        <div class="vital-box">
                            <div class="vital-title">Blood Pressure</div>
                            <div class="vital-item">
                                <span class="vital-label">Average</span>
                                <span class="vital-value">${
                                  data.bloodPressure.avg
                                }</span>
                            </div>
                            <div class="vital-item">
                                <span class="vital-label">Highest Systolic</span>
                                <span class="vital-value">160 mmHg<span class="vital-date">(September 20, 2025)</span></span>
                            </div>
                            <div class="vital-item">
                                <span class="vital-label">Lowest Systolic</span>
                                <span class="vital-value">50 mmHg<span class="vital-date">(September 3, 2025)</span></span>
                            </div>
                            <div class="vital-item">
                                <span class="vital-label">Highest Diastolic</span>
                                <span class="vital-value">160 mmHg<span class="vital-date">(September 20, 2025)</span></span>
                            </div>
                            <div class="vital-item">
                                <span class="vital-label">Lowest Diastolic</span>
                                <span class="vital-value">50 mmHg<span class="vital-date">(September 3, 2025)</span></span>
                            </div>
                        </div>

                        <div class="vital-box">
                            <div class="vital-title">Weight</div>
                            <div class="vital-item">
                                <span class="vital-label">Average</span>
                                <span class="vital-value">${
                                  data.weight.avg
                                }kg</span>
                            </div>
                            <div class="vital-item">
                                <span class="vital-label">Highest</span>
                                <span class="vital-value">${
                                  data.weight.high
                                }kg<span class="vital-date">(September 20, 2025)</span></span>
                            </div>
                            <div class="vital-item">
                                <span class="vital-label">Lowest</span>
                                <span class="vital-value">${
                                  data.weight.low
                                }kg<span class="vital-date">(September 3, 2025)</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="note-text">Data Recorded Last Update 30 September, 2025</div>
                </div>

                <div class="section-title">Appointment Tracker</div>

                <div class="appointments">
                    <span class="appointment-main-title">Appointment Tracker</span>
                    ${data.appointments
                      .map(
                        (appt) => `
                        <div class="appointment-item">
                            <div class="appointment-header">
                                <span class="appointment-date">${
                                  appt.date
                                }</span>
                                <span class="${
                                  appt.status === "Confirmed"
                                    ? "status-confirmed"
                                    : "status-not-confirmed"
                                }">${appt.status}</span>
                            </div>
                            <div class="appointment-details">
                                <div class="appointment-detail">
                                    <span class="appointment-desc">${
                                      appt.desc
                                    }</span>
                                </div>
                            </div>
                        </div>

                    `
                      )
                      .join("")}
                      <div class="note-text">Data Recorded Last Update 30 September, 2025</div>
                </div>

                <div class="footer">
                    This Report was Generate by System on ${data.today}
                </div>
            </div>
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
            font-family: Inter;
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
          }, 100);
        };
      }
    } else {
      try {
        const { uri } = await Print.printToFileAsync({
          html: htmlContent,
        });

        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: "Download Health Report",
          UTI: "public.pdf",
        });
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
