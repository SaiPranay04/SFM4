const express = require('express');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { OrganizationCalculation, Contact, User, Company, ESGmetric, CompanyESG, Report, Action, Role,ExcelData } = require('./models');
const router = express.Router();
const secret = 'your_jwt_secret';
const multer =require('multer');
const XLSX = require('xlsx');
const upload = multer({ dest: 'uploads/' });

router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().populate('company');
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/organizationcalculations', async (req, res) => {
  try {
    const org = await OrganizationCalculation.find();
    res.json(org);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/organizationcalculations', async (req, res) => {
  try {
    const org = new OrganizationCalculation(req.body);
    await org.save();
    res.status(201).json(org);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/signup', async (req, res) => {
  console.log('Received data:', req.body);
  const { username, email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    
    // Save the user to the database
    await newUser.save();
    console.log('User saved successfully');
    // Set up the nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sfmpyt@gmail.com', // Your Gmail address
        pass: 'xsee xmzk wkdm shve', // Your 16-character App password
      },
    });

    // Email options
    let mailOptions = {
      from: 'thoro3444@gmail.com',
      to: email, // Send to the registered user's email
      subject: 'Welcome to SFMPY!',
      html: `
        <h1>Welcome to SFMPY</h1>
        <p>Hi ${username}, we're excited to have you on board.</p>
        <p>Feel free to reach out to us for anything you need.</p>
        <p>Best regards,<br>SFMPY Team</p>
      `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        return res.status(500).send('Error sending welcome email');
      } else {
        console.log('Email sent:', info.response);
        return res.status(201).send('User created and email sent');
      }
    });

  } catch (err) {
    console.error('Error during user creation:', err);
    res.status(500).send('Error creating user');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received:', { email }); // Avoid logging the password
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Invalid email or password');
    }
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Server error:', err); // Log any server errors
    res.status(500).send('Server error');
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('User deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/company', async (req, res) => {
  try {
    const cmp = await Company.find();
    res.json(cmp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/company', async (req, res) => {
  try {
    const cmp = new Company(req.body);
    await cmp.save();
    res.status(201).json(cmp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/esgmetric', async (req, res) => {
  try {
    const esg = await ESGmetric.find();
    res.json(esg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/esgmetric', async (req, res) => {
  try {
    const esg = new ESGmetric(req.body);
    await esg.save();
    res.status(201).json(esg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/esgmetric/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ESGmetric.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: 'ESG metric deleted successfully' });
    } else {
      res.status(404).json({ message: 'ESG metric not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/companyesg', async (req, res) => {
  try {
    const esg = await CompanyESG.find().populate('companyID').populate('metricID');
    res.json(esg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/companyesg', async (req, res) => {
  try {
    const esgDataArray = req.body;

    console.log('Received ESG Data:', esgDataArray);

    if (!Array.isArray(esgDataArray) || esgDataArray.length === 0) {
      return res.status(400).json({ error: 'Invalid data format or empty array' });
    }

    const savedData = await CompanyESG.insertMany(esgDataArray);
    res.status(201).json(savedData);
  } catch (error) {
    console.error('Error saving ESG data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/reports', async (req, res) => {
  try {
    const rpt = await Report.find().populate('companyID');
    res.json(rpt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/reports', async (req, res) => {
  try {
    const rpt = new Report(req.body);
    await rpt.save();
    res.status(201).json(rpt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/actions', async (req, res) => {
  try {
    const act = await Action.find().populate('userID');
    res.json(act);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/actions', async (req, res) => {
  try {
    const act = new Action(req.body);
    await act.save();
    res.status(201).json(act);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/roles', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/roles', async (req, res) => {
  try {
    const role = new Role({ ...req.body, type: 'system' }); // Ensure type is set to 'system'
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/roles/:id', async (req, res) => {
  try {
    const roleId = req.params.id;
    const deletedRole = await Role.findByIdAndDelete(roleId);

    if (!deletedRole) {
      return res.status(404).json({ error: 'Role not found' });
    }

    res.json({ message: 'Role deleted successfully', role: deletedRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/permissions/:roleId', async (req, res) => {
  const { permissions } = req.body;

  try {
    let permission = await Permission.findOne({ role: req.params.roleId });

    if (permission) {
      permission.permissions = permissions;
    } else {
      permission = new Permission({
        role: req.params.roleId,
        permissions
      });
    }

    await permission.save();
    res.json(permission);
  } catch (err) {
    res.status(500).json({ error: 'Error saving permissions' });
  }
});

router.get('/permissions/:roleId', async (req, res) => {
  try {
    const permissions = await Permission.findOne({ role: req.params.roleId }).populate('role');
    res.json(permissions);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching permissions' });
  }
});



router.put('/permissions/:roleId', async (req, res) => {
  const { roleId } = req.params;
  const { permissions } = req.body;

  try {
    // Remove existing permissions for the role
    await Permission.deleteMany({ role: roleId });

    // Create new permissions from the provided data
    const newPermissions = permissions.map(permission => ({
      role: roleId,
      feature: permission.feature,
      view: permission.view,
      add: permission.add,
      edit: permission.edit,
      delete: permission.delete,
    }));

    // Save new permissions to the database
    await Permission.insertMany(newPermissions);

    res.json({ message: 'Permissions updated successfully' });
  } catch (err) {
    console.error('Error updating permissions:', err);
    res.status(500).send('Server error');
  }
});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
      const file = req.file;
      const workbook = XLSX.readFile(file.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Iterate over each row in the Excel sheet and save to MongoDB
      for (let row of sheet) {
          const newEntry = new ExcelData({
              energyConsumption: row.energyConsumption,
              renewableEnergy: row.renewableEnergy,
              ghgEmissions: row.ghgEmissions,
              employmentRates: row.employmentRates,
              diversity: row.diversity,
              boardComposition: row.boardComposition,
              ethicalPractices: row.ethicalPractices
          });
          await newEntry.save();
      }

      res.status(200).send('Excel data uploaded successfully!');
  } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Server error');
  }
});

router.get('/data', async (req, res) => {
  try {
      const data = await ExcelData.find(); // Fetch all documents from the ExcelData collection
      res.status(200).json(data); // Send the data as JSON
  } catch (error) {
      res.status(500).send('Error fetching data from the database');
  }
});

module.exports = router;
