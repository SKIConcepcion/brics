export const acronym = {
  "College of Agriculture and Food Science": "CAFS",
  "College of Arts and Sciences": "CAS",
  "College of Development Communication": "CDC",
  "College of Economics and Management": "CEM",
  "College of Engineering and Agro-Industrial Technology": "CEAT",
  "College of Forestry and Natural Resources": "CFNR",
  "College of Human Ecology": "CHE",
  "College of Veterinary Medicine": "CVM",
  "College of Public Affairs and Development": "CPAF",
  "Graduate School": "GS",
  "School of Environmental Science and Management": "SESAM",
  "Not applicable": "N/A",
};

export const optionsColleges = [
    "College of Agriculture and Food Science",
    "College of Arts and Sciences",
    "College of Development Communication",
    "College of Economics and Management",
    "College of Engineering and Agro-Industrial Technology",
    "College of Forestry and Natural Resources",
    "College of Human Ecology",
    "College of Veterinary Medicine",
    "College of Public Affairs and Development",
    "Graduate School",
    "School of Environmental Science and Management",
    "Not applicable",
];

//function for returning the list of college
export function listDept(chosenCollege) {
  //Insti/Dept for CAFS
  //https://cafs.uplb.edu.ph/about/cafs-organizational-structure/
  const optionsCAFS = [
    "Agricultural Systems Institute",
    "Insitute of Animal Science",
    "Institute of Crop Science",
    "Institute of Weed Science, Entomology, and Plant Pathology",
    "Institute of Food Science and Technology",
    "Daily Training and Research Institute",
    "Institute of Plant Breeding",
    "National Crop Protection Center",
    "Dairy Training and Research Institute",
  ];

  //Insti/Dept for CAS
  //https://cas.uplb.edu.ph/cas-units/
  const optionsCAS = [
    "Institute of Compter Science",
    "Institute of Chemistry",
    "Instittue of Biological Sciences",
    "Institute of Mathematical Sciences and Physics",
    "Insittue of Statistics",
    "Department of Humanitites",
    "Department of Social Sciences",
    "Department of Human Kinetics",
    "UP Rural High School",
  ];

  //Insti/Dept for CDC
  const optionsCDC = [
    "Department of Development Broadcasting and Telecommuication",
    "Department of Development Journalism",
    "Department of Educational Communication",
    "Department of Science Communication",
  ];

  //Insti/Dept for CEM
  //https://cem.uplb.edu.ph/cem-units/department-of-agribusiness-management-and-entrepreneurship/
  const optionsCEM = [
    "Department of Agribusiness Management and Entrepreneurship",
    "Department of Agricultural and Applied Economics",
    "Institute of Cooperatives and Bio-Enterprise Development",
    "Department of Economics",
  ];

  //Insti/Dept for CEAT
  const optionsCEAT = [
    "Institute of Agricultural Engineering",
    "Department of Civil Engineering",
    "Department of Chemical Engineering",
    "Department of Electrical Engineering",
    "Department of Engineering Science",
    "Department of Industrial Engineering",
    "Department of Mechanical Engineering",
  ];

  //Insti/Dept for CFNR
  const optionsCFNR = [
    "Forest Biological Sciences",
    "Forest Products and Paper Science",
    "Social Forestry and Forest Governance",
    "Institute of Renewable Natural Resources",
  ];

  //Insti/Dept for CHE
  const optionsCHE = [
    "Department of Community and Environmental Resource Planning",
    "Department of Human and Family Development Studies ",
    "Department of Social Development Services",
    "Institute of Human Nutrition and Food",
  ];

  //Insti/Dept for CVM
  const optionsCVM = [
    "Department of Basic Veterinary Sciences",
    "Department of Veterinary Praclinical Sciences",
    "Department of Veterinary Clinical Sciences",
  ];

  var optionsInsti = [];
  switch (chosenCollege) {
    case "College of Agriculture and Food Science":
      optionsInsti = optionsCAFS;
      break;
    case "College of Arts and Sciences":
      optionsInsti = optionsCAS;
      break;
    case "College of Development Communication":
      optionsInsti = optionsCDC;
      break;
    case "College of Economics and Management":
      optionsInsti = optionsCEM;
      break;
    case "College of Engineering and Agro-Industrial Technology":
      optionsInsti = optionsCEAT;
      break;
    case "College of Forestry and Natural Resources":
      optionsInsti = optionsCFNR;
      break;
    case "College of Human Ecology":
      optionsInsti = optionsCHE;
      break;
    case "College of Veterinary Medicine":
      optionsInsti = optionsCVM;
      break;
    default:
      optionsInsti = ["Non departmentalized college"];
  }

  return optionsInsti;
}

