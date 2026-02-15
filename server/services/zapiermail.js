import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
//development
const sendPaymentEmail = async (toEmail, userName, paymentToken) => {
  const paymentLink = `http://localhost:3000/payment/${paymentToken}`;
  console.log(paymentLink);
  //development

  // production
  // const FRONTEND_URL = process.env.FRONTEND_URL || "http://185.164.25.144";

  // const sendPaymentEmail = async (toEmail, userName, paymentToken) => {
  //   const paymentLink = `${FRONTEND_URL}/payment/${paymentToken}`;
  //production
  try {
    await axios.post(process.env.ZAPIER_PAYMENT_WEBHOOK_URL, {
      email: toEmail,
      userName: userName,
      link: paymentLink,
    });

    console.log("✅ Zapier payment link webhook triggered successfully");
  } catch (err) {
    console.error("❌ Error triggering Zapier payment link webhook:", err);
  }
};
// const reportDataRow = reportData.rows[0];
//     sendReportDetails(
//       lostUserDataRow.reportid,
//       lostUserDataRow.email,
//       lostUserDataRow.name,

//       reportDataRow.location,
//       reportDataRow.description,
//       reportDataRow.file,
//       reportDataRow.recipientDescription,
//       reportDataRow.found_date
//     );
//   }
const sendReportDetails = async (
  reportId,
  toEmail,
  userName,
  // location,
  // description,
  // file,
  // recipientDescription,
  // foundDate
) => {
  //development
  const DetailsLink = `http://localhost:3000/item-details/${reportId}`;
  console.log(DetailsLink);
  //production
  // const DetailsLink = `${FRONTEND_URL}/item-details/${reportId}`;
  try {
    await axios.post(process.env.ZAPIER_ITEM_DETAILS_WEBHOOK_URL, {
      reportId: reportId,
      toEmail: toEmail,
      userName: userName,
      // location: location,
      // description: description,
      // file: file,
      // recipientDescription: recipientDescription,
      // foundDate: foundDate,
      link: DetailsLink,
    });

    console.log("✅ Zapier item details webhook triggered successfully");
  } catch (err) {
    console.error("❌ Error triggering Zapier item details webhook:", err);
  }
};

export { sendPaymentEmail, sendReportDetails };
