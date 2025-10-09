import {
  generateReportHTML,
  ReportData,
} from "@/components/report/ReportTemplate";
import { Asset } from "expo-asset";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

export async function generateReportPDF(data: ReportData) {
  try {
    const asset = Asset.fromModule(
      require("../assets/images/vita-logo.png")
    );
    await asset.downloadAsync();
    const imageUri = asset.localUri || asset.uri;

    const htmlContent = generateReportHTML({ data, imageUri });

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
