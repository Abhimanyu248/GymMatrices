import Member from '../Models/member.js';
import Gym from '../Models/gym.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ExcelJS from 'exceljs';
import twilio from 'twilio';


// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Function to generate Excel and return a Promise
const generateExcel = (members) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, 'members.xlsx');
    const dirPath = path.dirname(filePath);

    // Ensure the directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Members');

    // Define columns
    worksheet.columns = [
      { header: 'Serial', key: 'Sr', width: 20 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Phone', key: 'phone', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Gender', key: 'gender', width: 15 },
      { header: 'Payment', key: 'payment', width: 10 },
      { header: 'Joining Date', key: 'joiningdate', width: 20 },
      { header: 'Month', key: 'membership_month', width: 10 },
      { header: 'Price', key: 'membership_price', width: 10 },
      { header: 'N.P Date', key: 'nextPaymentDate', width: 20 },
    ];

    // Add rows
    members.forEach((member, index) => {
      worksheet.addRow({
        Sr: index + 1,
        name: member.name,
        phone: member.phone,
        email: member.email,
        gender: member.gender,
        payment: member.payment || 'N/A',
        joiningdate: member.joiningdate.toDateString(),
        membership_month: member.membership.month,
        membership_price: member.membership.price,
        nextPaymentDate: member.nextPaymentDate ? member.nextPaymentDate.toDateString() : 'N/A',
      });
    });

    // Write to file
    workbook.xlsx.writeFile(filePath)
      .then(() => {
        resolve(filePath);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


export const gexcel = async (req, res) => {
  try {
    const members = await Member.find({gym_id: req.gym._id}).exec();

    if (members.length === 0) {
      return res.status(404).send('No members found');
    }

    const filePath = await generateExcel(members);

    // Send the Excel file as a response
    res.download(filePath, 'members.xlsx', (err) => {
      if (err) {
        console.error('Error sending Excel:', err);
        res.status(500).send('Error sending Excel');
      }
      // Optionally, delete the file after sending
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error('Error fetching members or generating Excel:', error);
    res.status(500).send('Error fetching members or generating Excel');
  }
};



