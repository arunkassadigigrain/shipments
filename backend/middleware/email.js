import transporter from "../middleware/transporter.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class emailMiddleware {
  static async emailSending(shipmentId, email, contactPersonName, items) {
    try {
      if (!email || typeof email !== "string") {
        throw new Error("Invalid email provided");
      }

      if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Items must be a non-empty array");
      }

      let grandTotal = 0;

      console.log("i am here in email middleware", shipmentId, email, contactPersonName, items);

      const rows = items
        .map((item, index) => {
          const price = Number(item.itemRate) || 0;
          const quantity = Number(item.quantity) || 0;
          const total = quantity * price;

          grandTotal += total;

          return `
            <tr style="text-align:center;">
              <td style="border:1px solid #ddd;padding:10px;">${index + 1}</td>
              <td style="border:1px solid #ddd;padding:10px;">
                ${item.item?.itemDescription || "Item"}
              </td>
              <td style="border:1px solid #ddd;padding:10px;">${quantity}</td>
              <td style="border:1px solid #ddd;padding:10px;">₹${price.toFixed(2)}</td>
              <td style="border:1px solid #ddd;padding:10px;">₹${total.toFixed(2)}</td>
            </tr>
          `;
        })
        .join("");

      const htmlMessage = `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f5f5f5;padding:30px;">

     

        <div style="max-width:800px;margin:auto;background:#ffffff;padding:25px;border-radius:8px;">
        <img src="cid:companylogo" alt="DigiGrain Logo" style="height:60px;" />

          <table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="right">
      <h3 style="margin:0;">Order Confirmation</h3>
      <p style="margin:4px 0 0 0;">
        Order ID: <strong>#${shipmentId}</strong>
      </p>
    </td>
  </tr>
</table>


          <hr style="margin:20px 0;" />

          <p>Hello <strong>${contactPersonName}</strong>,</p>

          <p>
            Thank you for your order <strong>#${shipmentId}</strong>!
            We appreciate your business.
          </p>

          <h3 style="margin-top:25px;">Shipment Details</h3>

          <table width="100%" cellspacing="0" cellpadding="0"
            style="border-collapse:collapse;margin-top:10px;text-align:center;">
            <thead>
              <tr style="background:#f2f2f2;">
                <th style="border:1px solid #ddd;padding:10px;">Sl No</th>
                <th style="border:1px solid #ddd;padding:10px;">Item Name</th>
                <th style="border:1px solid #ddd;padding:10px;">Quantity</th>
                <th style="border:1px solid #ddd;padding:10px;">Price</th>
                <th style="border:1px solid #ddd;padding:10px;">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>

          <h3 style="text-align:right;margin-top:15px;">
            Grand Total: ₹${grandTotal.toFixed(2)}
          </h3>

          <p style="margin-top:25px;">
            Thank you again for choosing <strong>DigiGrain</strong>.
            If you have any questions, feel free to contact our support team.
          </p>

          <p>
            Best Regards,<br/>
            <strong>DigiGrain Support Team</strong>
          </p>

        </div>
      </div>
      `;

      await transporter.sendMail({
        from: `"DigiGrain" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Order Confirmation - #${shipmentId}`,
        html: htmlMessage,
        attachments: [
          {
            filename: "digigrain.png",
            path: path.join(__dirname, "digigrain.png"),
            cid: "companylogo",
          }
        ]
      });

      console.log("Email sent successfully to:", email);
      return true;
    } catch (error) {
      console.error("Email error:", error);
      throw error;
    }
  }
}

export default emailMiddleware;