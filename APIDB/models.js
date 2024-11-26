const mongoose = require('mongoose');

const organizationCalculationSchema = new mongoose.Schema({
  company_total_employees: { type: Number, required: true },
  company_sector: { type: String, required: true },
  office_heating_source: { type: String, required: true },
  office_surface_area: { type: Number, required: true },
  fleet_totalcars: { type: Number, required: true },
  fleet_km_avg: { type: Number, required: true },
  travel_short_flight: { type: Number, required: true },
  travel_long_flight: { type: Number, required: true },
  travel_train: { type: Number, required: true },
  IT_laptop: { type: Number, required: true },
  IT_mobile: { type: Number, required: true },
  IT_monitor: { type: Number, required: true },
  IT_desktop: { type: Number, required: true },
});

const contactSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  message: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, maxlength: 100 },
  password: { type: String, required: true, maxlength: 255 },
});

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  industry: { type: String, required: true, maxlength: 100 },
  country: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true },
  companyID: { type: mongoose.Schema.Types.ObjectId, auto: true }
});

const esgmetricSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true },
  category: { type: String, enum: ['Environmental', 'Social', 'Governance'], required: true },
  subcategory: { type: String, required: true, maxlength: 100 },
  metricID: { type: mongoose.Schema.Types.ObjectId, auto: true }
});

const companyESGDataSchema = new mongoose.Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  metricID: { type: mongoose.Schema.Types.ObjectId, ref: 'ESGmetric', required: true },
  value: { type: String, required: true, maxlength: 255 },
  year: { type: Number, required: true },
  // additional_details: { type: String, required: true },
});

const reportSchema = new mongoose.Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date_created: { type: Date, default: Date.now },
});

const userActionSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  actionType: { type: String, enum: ['View', 'Edit', 'Create', 'Delete'], required: true },
  actionDetails: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true},
  type: { type: String, required: true, default: 'system'}
});

const permissionSchema = new mongoose.Schema({
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  permissions: {
    'Edit/Add New Company': {
      view: { type: Boolean, default: false },
      add: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    'View Company': {
      view: { type: Boolean, default: false },
      add: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    'Search': {
      view: { type: Boolean, default: false },
      add: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    'Metric(Add/Edit)': {
      view: { type: Boolean, default: false },
      add: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    'Company ESG Data(ESG Data Entry)': {
      view: { type: Boolean, default: false },
      add: { type: Boolean, default: false },
      edit: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    }
  }
});

const excelDataSchema = new mongoose.Schema({
  energyConsumption: { type: Number, required: true },
  renewableEnergy: { type: Number, required: true },
  ghgEmissions: { type: Number, required: true },
  employmentRates: { type: Number, required: true },
  diversity: { type: Number, required: true },
  boardComposition: { type: Number, required: true },
  ethicalPractices: { type: Number, required: true }
});

const boundarySchema = new mongoose.Schema({
  carbon: { type: Number, required: true },
  forestarea: { type: Number, required: true },
  foresttype: { type: String, required: true },
  protectedstatus: { type: String, required: true },
  treespecies: { type: String, required: true },
  vegetationdesnity: { type: Number, required: true },
  carbonsource: { type: String, required: true },
  carbonsink: { type: String, required: true },
  Annualcarbonemmision: { type: Number, required: true },
  carbonseqrate: { type: Number, required: true },
});

const OrganizationCalculation = mongoose.model('OrganizationCalculation', organizationCalculationSchema);
const Contact = mongoose.model('Contact', contactSchema);
const User = mongoose.model('User', userSchema);
const Company = mongoose.model('Company', companySchema);
const ESGmetric = mongoose.model('ESGmetric', esgmetricSchema);
const CompanyESG = mongoose.model('CompanyESG', companyESGDataSchema);
const Report = mongoose.model('Report', reportSchema);
const Action = mongoose.model('Action', userActionSchema);
const Role = mongoose.model('Role', roleSchema);
const Permission = mongoose.model('Permission', permissionSchema);
const ExcelData = mongoose.model('excelData', excelDataSchema);
const Boundary = mongoose.model('Boundary', boundarySchema);

module.exports = {
  OrganizationCalculation,
  Contact,
  User,
  Company,
  ESGmetric,
  CompanyESG,
  Report,
  Action,
  Role,
  Permission,
  ExcelData,
  Boundary
};
