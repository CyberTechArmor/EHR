// ============================================================
// Enchart EMR — Dummy Data
// All mock data used by the frontend until backend API is ready
// ============================================================

// Current provider
export const CURRENT_PROVIDER = {
  id: 'prov-001',
  npi: '1234567890',
  name: 'Dr. Anjali Patel',
  firstName: 'Anjali',
  lastName: 'Patel',
  credential: 'MD',
  role: 'Physician',
  specialty: 'Internal Medicine',
  initials: 'AP',
  avatar: null
};

// ============================================================
// PATIENTS
// ============================================================
export const PATIENTS = [
  {
    id: 'pt-001',
    mrn: '1042851',
    firstName: 'Sarah',
    lastName: 'Chen',
    name: 'Chen, Sarah',
    dob: '1973-06-14',
    age: 52,
    sex: 'F',
    phone: '(555) 234-5678',
    email: 'sarah.chen@email.com',
    insurance: { name: 'BCBS PPO', memberId: 'BCB-9982341' },
    pcp: 'Dr. Anjali Patel',
    preferredPharmacy: 'CVS #4521 — 123 Main St',
    allergies: [
      { substance: 'Penicillin', reaction: 'Rash', severity: 'moderate' },
      { substance: 'Sulfa drugs', reaction: 'Hives', severity: 'severe' }
    ],
    medications: [
      { name: 'Metformin', dose: '1000mg', frequency: 'BID', prescriber: 'Dr. Patel', lastFill: '2026-02-28', rxId: 'rx-001' },
      { name: 'Lisinopril', dose: '20mg', frequency: 'QD', prescriber: 'Dr. Patel', lastFill: '2026-02-28', rxId: 'rx-002' },
      { name: 'Atorvastatin', dose: '40mg', frequency: 'QHS', prescriber: 'Dr. Patel', lastFill: '2026-02-15', rxId: 'rx-003' }
    ],
    problems: [
      { icd10: 'E11.65', description: 'Type 2 diabetes mellitus w/ hyperglycemia', status: 'active', onsetDate: '2019-03-15' },
      { icd10: 'I10', description: 'Essential hypertension', status: 'active', onsetDate: '2018-08-22' },
      { icd10: 'E78.5', description: 'Hyperlipidemia, unspecified', status: 'active', onsetDate: '2020-01-10' },
      { icd10: 'E66.01', description: 'Morbid obesity due to excess calories, BMI 28-29.9', status: 'active', onsetDate: '2021-06-01' }
    ],
    vitals: {
      latest: { bp: '138/86', hr: 78, temp: 98.6, spo2: 98, weight: 187, bmi: 28.4, date: '2026-03-12' },
      trends: [
        { bp: '142/88', hr: 82, temp: 98.4, spo2: 97, weight: 189, bmi: 28.7, date: '2026-02-15' },
        { bp: '136/84', hr: 76, temp: 98.6, spo2: 99, weight: 190, bmi: 28.9, date: '2025-12-10' },
        { bp: '140/90', hr: 80, temp: 98.8, spo2: 98, weight: 192, bmi: 29.2, date: '2025-09-22' }
      ]
    },
    visits: [
      { date: '2026-03-12', type: 'Follow-up', provider: 'Dr. Patel', summary: 'DM follow-up', noteId: 'enc-001' },
      { date: '2026-02-15', type: 'Follow-up', provider: 'Dr. Patel', summary: 'DM follow-up — A1c 7.2', noteId: 'enc-002' },
      { date: '2025-12-10', type: 'Annual Wellness', provider: 'Dr. Patel', summary: 'Annual wellness visit', noteId: 'enc-003' },
      { date: '2025-09-22', type: 'Acute', provider: 'Dr. Patel', summary: 'Acute visit — URI', noteId: 'enc-004' }
    ],
    careGaps: [
      { measure: 'PHQ-9', description: 'PHQ-9 screening overdue', dueDate: '2026-02-01', status: 'overdue' },
      { measure: 'Mammogram', description: 'Mammogram referral open', dueDate: '2026-01-15', status: 'open' },
      { measure: 'Eye Exam', description: 'Diabetic eye exam (12+ months)', dueDate: '2025-12-01', status: 'overdue' }
    ],
    preVisitSummary: {
      lastVisit: { date: '2026-02-15', summary: 'DM follow-up' },
      relevantResults: [
        { test: 'HbA1c', value: '7.2%', date: '2026-02-15', previousValue: '7.8%', trend: 'improving' },
        { test: 'BMP', value: 'Normal', date: '2026-02-15' },
        { test: 'Lipid Panel', value: 'LDL 118', date: '2026-02-15', previousValue: 'LDL 132', trend: 'improving' }
      ],
      openOrders: ['Mammogram referral'],
      dueScreenings: ['PHQ-9', 'Diabetic eye exam referral'],
      reasonToday: 'DM follow-up'
    }
  },
  {
    id: 'pt-002',
    mrn: '1038472',
    firstName: 'Marcus',
    lastName: 'Johnson',
    name: 'Johnson, Marcus',
    dob: '1985-11-02',
    age: 40,
    sex: 'M',
    phone: '(555) 345-6789',
    email: 'marcus.j@email.com',
    insurance: { name: 'Aetna HMO', memberId: 'AET-7723456' },
    pcp: 'Dr. Anjali Patel',
    preferredPharmacy: 'Walgreens #1102 — 456 Oak Ave',
    allergies: [
      { substance: 'Codeine', reaction: 'Nausea/vomiting', severity: 'moderate' }
    ],
    medications: [
      { name: 'Sertraline', dose: '100mg', frequency: 'QD', prescriber: 'Dr. Patel', lastFill: '2026-03-01', rxId: 'rx-004' },
      { name: 'Omeprazole', dose: '20mg', frequency: 'QD', prescriber: 'Dr. Patel', lastFill: '2026-02-15', rxId: 'rx-005' }
    ],
    problems: [
      { icd10: 'F32.1', description: 'Major depressive disorder, single episode, moderate', status: 'active', onsetDate: '2024-06-15' },
      { icd10: 'K21.0', description: 'GERD with esophagitis', status: 'active', onsetDate: '2023-03-10' }
    ],
    vitals: {
      latest: { bp: '122/78', hr: 72, temp: 98.4, spo2: 99, weight: 195, bmi: 26.5, date: '2026-03-10' },
      trends: []
    },
    visits: [
      { date: '2026-03-10', type: 'Follow-up', provider: 'Dr. Patel', summary: 'Depression follow-up', noteId: 'enc-010' },
      { date: '2025-12-05', type: 'Follow-up', provider: 'Dr. Patel', summary: 'GERD follow-up', noteId: 'enc-011' }
    ],
    careGaps: [
      { measure: 'PHQ-9', description: 'PHQ-9 due for depression monitoring', dueDate: '2026-04-10', status: 'upcoming' }
    ],
    preVisitSummary: {
      lastVisit: { date: '2026-03-10', summary: 'Depression follow-up' },
      relevantResults: [],
      openOrders: [],
      dueScreenings: [],
      reasonToday: 'New patient visit'
    }
  },
  {
    id: 'pt-003',
    mrn: '1029384',
    firstName: 'Rosa',
    lastName: 'Williams',
    name: 'Williams, Rosa',
    dob: '1960-03-28',
    age: 65,
    sex: 'F',
    phone: '(555) 456-7890',
    email: 'rosa.w@email.com',
    insurance: { name: 'Medicare', memberId: 'MED-112233' },
    pcp: 'Dr. Anjali Patel',
    preferredPharmacy: 'CVS #4521 — 123 Main St',
    allergies: [],
    medications: [
      { name: 'Amlodipine', dose: '10mg', frequency: 'QD', prescriber: 'Dr. Patel', lastFill: '2026-03-01', rxId: 'rx-006' },
      { name: 'Metoprolol', dose: '50mg', frequency: 'BID', prescriber: 'Dr. Patel', lastFill: '2026-03-01', rxId: 'rx-007' },
      { name: 'Aspirin', dose: '81mg', frequency: 'QD', prescriber: 'Dr. Patel', lastFill: '2026-02-20', rxId: 'rx-008' },
      { name: 'Levothyroxine', dose: '75mcg', frequency: 'QAM', prescriber: 'Dr. Patel', lastFill: '2026-02-20', rxId: 'rx-009' }
    ],
    problems: [
      { icd10: 'I10', description: 'Essential hypertension', status: 'active', onsetDate: '2010-05-01' },
      { icd10: 'E03.9', description: 'Hypothyroidism, unspecified', status: 'active', onsetDate: '2015-08-20' },
      { icd10: 'M17.11', description: 'Primary osteoarthritis, right knee', status: 'active', onsetDate: '2022-01-15' }
    ],
    vitals: {
      latest: { bp: '148/92', hr: 68, temp: 98.2, spo2: 97, weight: 165, bmi: 27.1, date: '2026-03-12' },
      trends: []
    },
    visits: [
      { date: '2026-03-05', type: 'Follow-up', provider: 'Dr. Patel', summary: 'HTN follow-up', noteId: 'enc-020' },
      { date: '2025-11-20', type: 'Annual Wellness', provider: 'Dr. Patel', summary: 'AWV', noteId: 'enc-021' }
    ],
    careGaps: [
      { measure: 'Colonoscopy', description: 'Colonoscopy overdue (last 2018)', dueDate: '2025-06-01', status: 'overdue' },
      { measure: 'TSH', description: 'TSH recheck due', dueDate: '2026-04-01', status: 'upcoming' }
    ],
    preVisitSummary: {
      lastVisit: { date: '2026-03-05', summary: 'HTN follow-up' },
      relevantResults: [
        { test: 'TSH', value: '3.2 mIU/L', date: '2025-11-20' },
        { test: 'BMP', value: 'Normal', date: '2025-11-20' }
      ],
      openOrders: [],
      dueScreenings: ['Colonoscopy'],
      reasonToday: 'Annual wellness visit'
    }
  },
  {
    id: 'pt-004',
    mrn: '1051234',
    firstName: 'James',
    lastName: 'Thompson',
    name: 'Thompson, James',
    dob: '1978-09-15',
    age: 47,
    sex: 'M',
    phone: '(555) 567-8901',
    email: 'james.t@email.com',
    insurance: { name: 'United Healthcare', memberId: 'UHC-5567890' },
    pcp: 'Dr. Anjali Patel',
    preferredPharmacy: 'Rite Aid #302 — 789 Elm St',
    allergies: [
      { substance: 'Amoxicillin', reaction: 'Anaphylaxis', severity: 'severe' },
      { substance: 'Ibuprofen', reaction: 'GI bleeding', severity: 'moderate' }
    ],
    medications: [
      { name: 'Losartan', dose: '50mg', frequency: 'QD', prescriber: 'Dr. Patel', lastFill: '2026-02-28', rxId: 'rx-010' },
      { name: 'Metformin', dose: '500mg', frequency: 'BID', prescriber: 'Dr. Patel', lastFill: '2026-02-28', rxId: 'rx-011' }
    ],
    problems: [
      { icd10: 'I10', description: 'Essential hypertension', status: 'active', onsetDate: '2020-04-01' },
      { icd10: 'E11.9', description: 'Type 2 diabetes mellitus without complications', status: 'active', onsetDate: '2024-08-15' },
      { icd10: 'J45.20', description: 'Mild intermittent asthma, uncomplicated', status: 'active', onsetDate: '2005-01-01' }
    ],
    vitals: {
      latest: { bp: '130/82', hr: 75, temp: 98.6, spo2: 98, weight: 210, bmi: 30.2, date: '2026-03-12' },
      trends: []
    },
    visits: [
      { date: '2026-03-01', type: 'Follow-up', provider: 'Dr. Patel', summary: 'DM follow-up', noteId: 'enc-030' }
    ],
    careGaps: [],
    preVisitSummary: {
      lastVisit: { date: '2026-03-01', summary: 'DM follow-up' },
      relevantResults: [{ test: 'HbA1c', value: '6.8%', date: '2026-03-01' }],
      openOrders: [],
      dueScreenings: [],
      reasonToday: 'Follow-up'
    }
  },
  {
    id: 'pt-005',
    mrn: '1062345',
    firstName: 'Emily',
    lastName: 'Davis',
    name: 'Davis, Emily',
    dob: '1990-12-20',
    age: 35,
    sex: 'F',
    phone: '(555) 678-9012',
    email: 'emily.d@email.com',
    insurance: { name: 'Cigna PPO', memberId: 'CIG-3345678' },
    pcp: 'Dr. Anjali Patel',
    preferredPharmacy: 'CVS #4521 — 123 Main St',
    allergies: [],
    medications: [
      { name: 'Escitalopram', dose: '10mg', frequency: 'QD', prescriber: 'Dr. Patel', lastFill: '2026-03-05', rxId: 'rx-012' }
    ],
    problems: [
      { icd10: 'F41.1', description: 'Generalized anxiety disorder', status: 'active', onsetDate: '2023-02-01' }
    ],
    vitals: {
      latest: { bp: '118/72', hr: 68, temp: 98.4, spo2: 99, weight: 140, bmi: 22.6, date: '2026-03-12' },
      trends: []
    },
    visits: [
      { date: '2026-02-20', type: 'Follow-up', provider: 'Dr. Patel', summary: 'Anxiety follow-up', noteId: 'enc-040' }
    ],
    careGaps: [
      { measure: 'GAD-7', description: 'GAD-7 screening due', dueDate: '2026-04-20', status: 'upcoming' }
    ],
    preVisitSummary: {
      lastVisit: { date: '2026-02-20', summary: 'Anxiety follow-up' },
      relevantResults: [],
      openOrders: [],
      dueScreenings: ['GAD-7'],
      reasonToday: 'Follow-up'
    }
  },
  {
    id: 'pt-006',
    mrn: '1073456',
    firstName: 'Robert',
    lastName: 'Martinez',
    name: 'Martinez, Robert',
    dob: '1955-04-08',
    age: 70,
    sex: 'M',
    phone: '(555) 789-0123',
    email: 'robert.m@email.com',
    insurance: { name: 'Medicare Advantage', memberId: 'MA-8899001' },
    pcp: 'Dr. Anjali Patel',
    preferredPharmacy: 'Walgreens #1102 — 456 Oak Ave',
    allergies: [
      { substance: 'Lisinopril', reaction: 'Cough', severity: 'mild' }
    ],
    medications: [
      { name: 'Losartan', dose: '100mg', frequency: 'QD', prescriber: 'Dr. Patel', lastFill: '2026-03-01', rxId: 'rx-013' },
      { name: 'Metformin', dose: '1000mg', frequency: 'BID', prescriber: 'Dr. Patel', lastFill: '2026-03-01', rxId: 'rx-014' },
      { name: 'Glipizide', dose: '5mg', frequency: 'BID', prescriber: 'Dr. Patel', lastFill: '2026-03-01', rxId: 'rx-015' },
      { name: 'Atorvastatin', dose: '80mg', frequency: 'QHS', prescriber: 'Dr. Patel', lastFill: '2026-02-15', rxId: 'rx-016' },
      { name: 'Aspirin', dose: '81mg', frequency: 'QD', prescriber: 'Dr. Patel', lastFill: '2026-02-15', rxId: 'rx-017' }
    ],
    problems: [
      { icd10: 'E11.65', description: 'Type 2 diabetes mellitus w/ hyperglycemia', status: 'active', onsetDate: '2008-05-01' },
      { icd10: 'I10', description: 'Essential hypertension', status: 'active', onsetDate: '2005-01-01' },
      { icd10: 'E78.5', description: 'Hyperlipidemia, unspecified', status: 'active', onsetDate: '2010-03-15' },
      { icd10: 'I25.10', description: 'Atherosclerotic heart disease of native coronary artery', status: 'active', onsetDate: '2020-11-01' },
      { icd10: 'N18.3', description: 'Chronic kidney disease, stage 3', status: 'active', onsetDate: '2023-06-01' }
    ],
    vitals: {
      latest: { bp: '152/94', hr: 82, temp: 98.0, spo2: 96, weight: 220, bmi: 32.5, date: '2026-03-12' },
      trends: []
    },
    visits: [
      { date: '2026-02-28', type: 'Follow-up', provider: 'Dr. Patel', summary: 'DM/CKD follow-up', noteId: 'enc-050' }
    ],
    careGaps: [
      { measure: 'Eye Exam', description: 'Diabetic eye exam overdue', dueDate: '2025-09-01', status: 'overdue' },
      { measure: 'Foot Exam', description: 'Diabetic foot exam due', dueDate: '2026-03-28', status: 'upcoming' },
      { measure: 'Urine Albumin', description: 'Urine albumin-to-creatinine ratio due', dueDate: '2026-03-01', status: 'overdue' }
    ],
    preVisitSummary: {
      lastVisit: { date: '2026-02-28', summary: 'DM/CKD follow-up' },
      relevantResults: [
        { test: 'HbA1c', value: '8.1%', date: '2026-02-28', previousValue: '7.9%', trend: 'worsening' },
        { test: 'Creatinine', value: '1.8 mg/dL', date: '2026-02-28' },
        { test: 'eGFR', value: '42 mL/min', date: '2026-02-28' }
      ],
      openOrders: [],
      dueScreenings: ['Diabetic eye exam', 'Urine albumin'],
      reasonToday: 'DM/CKD follow-up'
    }
  },
  {
    id: 'pt-007',
    mrn: '1084567',
    firstName: 'Lisa',
    lastName: 'Anderson',
    name: 'Anderson, Lisa',
    dob: '1982-07-22',
    age: 43,
    sex: 'F',
    phone: '(555) 890-1234',
    email: 'lisa.a@email.com',
    insurance: { name: 'BCBS PPO', memberId: 'BCB-4456789' },
    pcp: 'Dr. Anjali Patel',
    preferredPharmacy: 'CVS #4521 — 123 Main St',
    allergies: [],
    medications: [],
    problems: [
      { icd10: 'J06.9', description: 'Acute upper respiratory infection', status: 'active', onsetDate: '2026-03-10' }
    ],
    vitals: {
      latest: { bp: '120/76', hr: 88, temp: 100.2, spo2: 98, weight: 155, bmi: 24.0, date: '2026-03-12' },
      trends: []
    },
    visits: [
      { date: '2025-10-15', type: 'Annual Wellness', provider: 'Dr. Patel', summary: 'AWV', noteId: 'enc-060' }
    ],
    careGaps: [],
    preVisitSummary: {
      lastVisit: { date: '2025-10-15', summary: 'Annual wellness visit' },
      relevantResults: [],
      openOrders: [],
      dueScreenings: [],
      reasonToday: 'Acute — sore throat, cough x 3 days'
    }
  },
  {
    id: 'pt-008',
    mrn: '1095678',
    firstName: 'David',
    lastName: 'Wilson',
    name: 'Wilson, David',
    dob: '1968-01-30',
    age: 58,
    sex: 'M',
    phone: '(555) 901-2345',
    email: 'david.w@email.com',
    insurance: { name: 'Aetna PPO', memberId: 'AET-6678901' },
    pcp: 'Dr. Anjali Patel',
    preferredPharmacy: 'Rite Aid #302 — 789 Elm St',
    allergies: [
      { substance: 'NSAIDs', reaction: 'GI upset', severity: 'mild' }
    ],
    medications: [
      { name: 'Lisinopril', dose: '40mg', frequency: 'QD', prescriber: 'Dr. Patel', lastFill: '2026-02-20', rxId: 'rx-018' },
      { name: 'Hydrochlorothiazide', dose: '25mg', frequency: 'QD', prescriber: 'Dr. Patel', lastFill: '2026-02-20', rxId: 'rx-019' },
      { name: 'Rosuvastatin', dose: '20mg', frequency: 'QHS', prescriber: 'Dr. Patel', lastFill: '2026-02-20', rxId: 'rx-020' }
    ],
    problems: [
      { icd10: 'I10', description: 'Essential hypertension', status: 'active', onsetDate: '2015-02-01' },
      { icd10: 'E78.0', description: 'Pure hypercholesterolemia', status: 'active', onsetDate: '2018-05-01' }
    ],
    vitals: {
      latest: { bp: '134/84', hr: 70, temp: 98.6, spo2: 98, weight: 198, bmi: 29.3, date: '2026-03-08' },
      trends: []
    },
    visits: [
      { date: '2026-03-08', type: 'Follow-up', provider: 'Dr. Patel', summary: 'HTN follow-up', noteId: 'enc-070' }
    ],
    careGaps: [
      { measure: 'Colonoscopy', description: 'Colonoscopy screening due', dueDate: '2026-06-01', status: 'upcoming' }
    ],
    preVisitSummary: {
      lastVisit: { date: '2026-03-08', summary: 'HTN follow-up' },
      relevantResults: [{ test: 'Lipid Panel', value: 'LDL 95', date: '2026-02-20' }],
      openOrders: [],
      dueScreenings: [],
      reasonToday: 'Follow-up'
    }
  }
];

// ============================================================
// SCHEDULE (Today: March 12, 2026)
// ============================================================
export const SCHEDULE = {
  date: '2026-03-12',
  provider: CURRENT_PROVIDER,
  stats: {
    total: 18,
    confirmed: 12,
    pending: 3,
    inProgress: 2,
    completed: 1,
    avgWaitMinutes: 12
  },
  appointments: [
    { id: 'apt-001', time: '08:00', patient: PATIENTS[0], visitType: 'Follow-up', provider: 'Dr. Patel', status: 'confirmed', intake: { vitals: true, medRec: true, screeners: false } },
    { id: 'apt-002', time: '08:30', patient: PATIENTS[1], visitType: 'New Patient', provider: 'Dr. Patel', status: 'pending', intake: { vitals: false, medRec: false, screeners: false } },
    { id: 'apt-003', time: '09:00', patient: PATIENTS[2], visitType: 'AWV', provider: 'Dr. Patel', status: 'in_progress', intake: { vitals: true, medRec: true, screeners: true } },
    { id: 'apt-004', time: '09:30', patient: PATIENTS[3], visitType: 'Follow-up', provider: 'Dr. Patel', status: 'confirmed', intake: { vitals: true, medRec: false, screeners: false } },
    { id: 'apt-005', time: '10:00', patient: PATIENTS[4], visitType: 'Follow-up', provider: 'Dr. Patel', status: 'confirmed', intake: { vitals: false, medRec: false, screeners: false } },
    { id: 'apt-006', time: '10:30', patient: PATIENTS[5], visitType: 'Follow-up', provider: 'Dr. Patel', status: 'in_progress', intake: { vitals: true, medRec: true, screeners: true } },
    { id: 'apt-007', time: '11:00', patient: PATIENTS[6], visitType: 'Acute', provider: 'Dr. Patel', status: 'confirmed', intake: { vitals: true, medRec: true, screeners: false } },
    { id: 'apt-008', time: '11:30', patient: PATIENTS[7], visitType: 'Follow-up', provider: 'Dr. Patel', status: 'confirmed', intake: { vitals: false, medRec: false, screeners: false } },
    { id: 'apt-009', time: '13:00', patient: PATIENTS[0], visitType: 'Follow-up', provider: 'Dr. Patel', status: 'confirmed', intake: { vitals: false, medRec: false, screeners: false } },
    { id: 'apt-010', time: '13:30', patient: PATIENTS[1], visitType: 'Follow-up', provider: 'Dr. Patel', status: 'pending', intake: { vitals: false, medRec: false, screeners: false } },
    { id: 'apt-011', time: '14:00', patient: PATIENTS[2], visitType: 'Follow-up', provider: 'Dr. Patel', status: 'confirmed', intake: { vitals: false, medRec: false, screeners: false } },
    { id: 'apt-012', time: '14:30', patient: PATIENTS[3], visitType: 'Follow-up', provider: 'Dr. Patel', status: 'confirmed', intake: { vitals: false, medRec: false, screeners: false } },
    { id: 'apt-013', time: '15:00', patient: PATIENTS[4], visitType: 'Follow-up', provider: 'Dr. Patel', status: 'pending', intake: { vitals: false, medRec: false, screeners: false } },
    { id: 'apt-014', time: '15:30', patient: PATIENTS[5], visitType: 'Follow-up', provider: 'Dr. Patel', status: 'confirmed', intake: { vitals: false, medRec: false, screeners: false } },
    { id: 'apt-015', time: '16:00', patient: PATIENTS[6], visitType: 'Follow-up', provider: 'Dr. Patel', status: 'confirmed', intake: { vitals: false, medRec: false, screeners: false } },
    { id: 'apt-016', time: '16:30', patient: PATIENTS[7], visitType: 'Follow-up', provider: 'Dr. Patel', status: 'confirmed', intake: { vitals: false, medRec: false, screeners: false } },
    { id: 'apt-017', time: '17:00', patient: PATIENTS[0], visitType: 'Follow-up', provider: 'Dr. Patel', status: 'confirmed', intake: { vitals: false, medRec: false, screeners: false } },
    { id: 'apt-018', time: '17:30', patient: PATIENTS[1], visitType: 'Follow-up', provider: 'Dr. Patel', status: 'confirmed', intake: { vitals: false, medRec: false, screeners: false } }
  ]
};

// ============================================================
// INBOX
// ============================================================
export const INBOX = {
  categories: {
    results: {
      count: 5,
      items: [
        { id: 'inbox-001', patient: PATIENTS[0], subject: 'HbA1c Result', preview: 'HbA1c: 7.0% (improved from 7.2%)', date: '2026-03-12T10:30:00', type: 'lab', urgency: 'normal', read: false, body: 'Lab result for Sarah Chen:\n\nHbA1c: 7.0% (Reference: <7.0%)\nPrevious: 7.2% on 2/15/2026\n\nTrend: Improving. Patient approaching goal.' },
        { id: 'inbox-002', patient: PATIENTS[5], subject: 'BMP Result — Abnormal', preview: 'Creatinine: 2.1 (H), eGFR: 35', date: '2026-03-12T09:15:00', type: 'lab', urgency: 'urgent', read: false, body: 'Lab result for Robert Martinez:\n\nBMP:\n  Sodium: 138 mEq/L (Normal)\n  Potassium: 4.8 mEq/L (Normal)\n  Creatinine: 2.1 mg/dL (HIGH — prev 1.8)\n  BUN: 32 mg/dL (HIGH)\n  eGFR: 35 mL/min (prev 42)\n  Glucose: 165 mg/dL (HIGH)\n\nNote: Worsening renal function. Consider nephrology referral.' },
        { id: 'inbox-003', patient: PATIENTS[3], subject: 'HbA1c Result', preview: 'HbA1c: 6.6% — at goal', date: '2026-03-11T14:20:00', type: 'lab', urgency: 'normal', read: true, body: 'Lab result for James Thompson:\n\nHbA1c: 6.6% (Reference: <7.0%)\nPrevious: 6.8% on 3/1/2026\n\nAt goal. Continue current regimen.' },
        { id: 'inbox-004', patient: PATIENTS[7], subject: 'Lipid Panel Result', preview: 'LDL: 88 mg/dL — at goal', date: '2026-03-11T11:00:00', type: 'lab', urgency: 'normal', read: true, body: 'Lab result for David Wilson:\n\nLipid Panel:\n  Total Cholesterol: 172 mg/dL\n  LDL: 88 mg/dL (Goal: <100)\n  HDL: 52 mg/dL\n  Triglycerides: 160 mg/dL\n\nAt goal on Rosuvastatin 20mg.' },
        { id: 'inbox-005', patient: PATIENTS[4], subject: 'CBC Result', preview: 'All values within normal limits', date: '2026-03-10T16:45:00', type: 'lab', urgency: 'normal', read: true, body: 'Lab result for Emily Davis:\n\nCBC — All values within normal limits.\n\nWBC: 6.8 K/uL\nHgb: 13.2 g/dL\nHct: 39.6%\nPlatelets: 245 K/uL' }
      ]
    },
    messages: {
      count: 3,
      items: [
        { id: 'inbox-010', patient: PATIENTS[0], subject: 'Question about medication', preview: 'Dr. Patel, I\'ve been having some nausea since starting the new...', date: '2026-03-12T10:42:00', type: 'message', urgency: 'normal', read: false, body: 'Dr. Patel,\n\nI\'ve been having some nausea since starting the new dose of Metformin about a week ago. It\'s mostly in the morning after I take it. Should I take it with food? Also, should I be concerned?\n\nI\'ve also noticed my blood sugars have been running between 110-130 fasting, which seems better than before.\n\nThank you,\nSarah Chen' },
        { id: 'inbox-011', patient: PATIENTS[1], subject: 'Appointment request', preview: 'I\'d like to schedule a follow-up sooner than planned...', date: '2026-03-11T15:30:00', type: 'message', urgency: 'normal', read: false, body: 'Hi Dr. Patel,\n\nI\'d like to schedule a follow-up sooner than planned. My mood has been declining the last two weeks and I\'m not sure the medication is working as well as before.\n\nPlease let me know what\'s available.\n\nThanks,\nMarcus Johnson' },
        { id: 'inbox-012', patient: PATIENTS[2], subject: 'Refill follow-up', preview: 'Thank you for the refill. One quick question about timing...', date: '2026-03-10T09:00:00', type: 'message', urgency: 'normal', read: true, body: 'Dr. Patel,\n\nThank you for refilling my Levothyroxine. One quick question — should I still be taking it 30 minutes before breakfast? My morning routine has changed and I was wondering if I could take it with food.\n\nThanks,\nRosa Williams' }
      ]
    },
    refills: {
      count: 2,
      items: [
        { id: 'inbox-020', patient: PATIENTS[7], subject: 'Refill Request: Lisinopril 40mg', preview: 'Patient requests refill — last fill 2/20/2026', date: '2026-03-12T08:00:00', type: 'refill', urgency: 'normal', read: false, body: 'Refill request from David Wilson:\n\nMedication: Lisinopril 40mg QD\nLast fill: 2/20/2026 (20 days ago)\nPharmacy: Rite Aid #302\nDays supply: 30\n\nPatient has active Rx. BP at last visit: 134/84. Recommend approve.' },
        { id: 'inbox-021', patient: PATIENTS[5], subject: 'Refill Request: Glipizide 5mg', preview: 'Patient requests refill — last fill 3/1/2026', date: '2026-03-11T14:00:00', type: 'refill', urgency: 'normal', read: false, body: 'Refill request from Robert Martinez:\n\nMedication: Glipizide 5mg BID\nLast fill: 3/1/2026 (11 days ago)\nPharmacy: Walgreens #1102\nDays supply: 30\n\nNote: Consider reviewing given worsening renal function (latest eGFR 35).' }
      ]
    },
    orders: {
      count: 1,
      items: [
        { id: 'inbox-030', patient: PATIENTS[0], subject: 'Mammogram — Scheduled', preview: 'Imaging center confirmed appointment for 3/25/2026', date: '2026-03-12T11:00:00', type: 'order', urgency: 'normal', read: false, body: 'Referral update for Sarah Chen:\n\nMammogram screening — scheduled\nFacility: City Imaging Center\nDate: March 25, 2026 at 2:00 PM\nReferral ID: REF-2026-0342\n\nPatient has been notified.' }
      ]
    },
    priorAuth: {
      count: 1,
      items: [
        { id: 'inbox-040', patient: PATIENTS[5], subject: 'PA Approved: Farxiga 10mg', preview: 'Prior authorization approved by Medicare Advantage', date: '2026-03-11T16:30:00', type: 'prior-auth', urgency: 'normal', read: false, body: 'Prior Authorization Decision:\n\nPatient: Robert Martinez\nMedication: Farxiga (dapagliflozin) 10mg QD\nPayer: Medicare Advantage\nDecision: APPROVED\nAuth #: PA-2026-88431\nValid through: 9/11/2026\n\nPrescription can now be sent to pharmacy.' }
      ]
    },
    admin: {
      count: 0,
      items: []
    }
  },
  bulkSignable: {
    count: 3,
    items: [
      { id: 'bulk-001', patient: PATIENTS[3], test: 'HbA1c', value: '6.6%', range: '< 7.0%', date: '2026-03-11' },
      { id: 'bulk-002', patient: PATIENTS[7], test: 'Lipid Panel', value: 'LDL 88', range: '< 100', date: '2026-03-11' },
      { id: 'bulk-003', patient: PATIENTS[4], test: 'CBC', value: 'All WNL', range: 'N/A', date: '2026-03-10' }
    ]
  }
};

// ============================================================
// ENCOUNTERS (sample encounter for Sarah Chen)
// ============================================================
export const ENCOUNTERS = {
  'enc-001': {
    id: 'enc-001',
    patientId: 'pt-001',
    patient: PATIENTS[0],
    providerId: 'prov-001',
    visitType: 'Follow-up',
    startTime: '2026-03-12T10:15:00',
    status: 'in_progress',
    hpiProblems: [
      {
        icd10: 'E11.65',
        name: 'Type 2 Diabetes Mellitus',
        prePopulated: true,
        modified: false,
        narrative: [
          'A1c 7.2% (2/15/26), down from 7.8%',
          'On Metformin 1000mg BID',
          'Reports medication compliance',
          'No hypoglycemic episodes',
          'Fasting glucose 110-130 per patient report'
        ]
      },
      {
        icd10: 'I10',
        name: 'Essential Hypertension',
        prePopulated: true,
        modified: false,
        narrative: [
          'BP today 138/86',
          'On Lisinopril 20mg QD',
          'Home BP monitoring: 130-140/80-88 range',
          'No headaches, visual changes, or chest pain'
        ]
      }
    ],
    exam: {
      systems: [
        { system: 'Constitutional', finding: 'Normal', isDefault: true, details: '' },
        { system: 'HEENT', finding: 'Normal', isDefault: true, details: '' },
        { system: 'Cardiovascular', finding: 'Normal', isDefault: true, details: 'RRR, no murmurs' },
        { system: 'Respiratory', finding: 'Normal', isDefault: true, details: '' },
        { system: 'Abdomen', finding: 'Normal', isDefault: true, details: '' },
        { system: 'Extremities', finding: 'Normal', isDefault: true, details: 'No edema, pulses intact' },
        { system: 'Neurological', finding: 'Normal', isDefault: true, details: 'Sensation intact to monofilament bilaterally' },
        { system: 'Skin', finding: 'Normal', isDefault: true, details: '' }
      ]
    },
    assessmentPlan: [
      {
        icd10: 'E11.65',
        description: 'Type 2 diabetes mellitus w/ hyperglycemia',
        assessment: 'Improving',
        planItems: [
          { text: 'Continue Metformin 1000mg BID', checked: true, autoOrder: false },
          { text: 'Recheck A1c in 3 months', checked: true, autoOrder: true, orderType: 'lab' },
          { text: 'Diabetic eye exam referral', checked: true, autoOrder: true, orderType: 'referral' }
        ]
      },
      {
        icd10: 'I10',
        description: 'Essential hypertension',
        assessment: 'Stable',
        planItems: [
          { text: 'Continue Lisinopril 20mg QD', checked: true, autoOrder: false },
          { text: 'Recheck BMP in 3 months', checked: true, autoOrder: true, orderType: 'lab' },
          { text: 'Continue home BP monitoring', checked: true, autoOrder: false }
        ]
      }
    ],
    orders: [
      { id: 'ord-001', type: 'Lab', description: 'HbA1c', linkedDiagnosis: 'E11.65', status: 'linked' },
      { id: 'ord-002', type: 'Lab', description: 'BMP', linkedDiagnosis: 'I10', status: 'linked' },
      { id: 'ord-003', type: 'Referral', description: 'Ophthalmology — Diabetic eye exam', linkedDiagnosis: 'E11.65', status: 'linked' },
      { id: 'ord-004', type: 'Screen', description: 'PHQ-9', linkedDiagnosis: 'Z13.89', status: 'linked' },
      { id: 'ord-005', type: 'Rx', description: 'Metformin 1000mg BID (refill)', linkedDiagnosis: 'E11.65', status: 'linked' }
    ],
    emLevel: {
      calculated: '99214',
      selected: '99214',
      mdmFactors: ['2 chronic conditions addressed', 'Prescription drug management', 'Reviewed prior external data (A1c trend)'],
      timeMinutes: 18,
      thresholds: { '99213': 20, '99214': 30, '99215': 40 }
    },
    completenessCheck: {
      items: [
        { rule: 'All orders linked to diagnoses', passed: true },
        { rule: 'Diagnosis specificity sufficient', passed: true },
        { rule: 'MDM supports selected E/M level (99214)', passed: true },
        { rule: 'Exam documented', passed: true },
        { rule: 'PHQ-9 scored but not addressed in A/P', passed: false, severity: 'warning', fixAction: 'Add to A/P' },
        { rule: 'Med rec completed by MA', passed: true }
      ]
    }
  }
};

// ============================================================
// REPORTS
// ============================================================
export const REPORTS = {
  billing: {
    stats: [
      { label: 'Total Encounters', value: '142', sub: 'This month' },
      { label: 'Revenue', value: '$48,250', sub: '+8% vs last month' },
      { label: 'Denial Rate', value: '3.2%', sub: 'Down from 4.1%' },
      { label: 'Unsigned Notes', value: '4', sub: 'Action needed' }
    ],
    emDistribution: [
      { code: '99211', count: 2, percentage: 1 },
      { code: '99212', count: 8, percentage: 6 },
      { code: '99213', count: 45, percentage: 32 },
      { code: '99214', count: 68, percentage: 48 },
      { code: '99215', count: 19, percentage: 13 }
    ],
    unsignedNotes: [
      { patient: 'Martinez, Robert', date: '2026-03-11', type: 'Follow-up', age: '1 day' },
      { patient: 'Davis, Emily', date: '2026-03-10', type: 'Follow-up', age: '2 days' },
      { patient: 'Anderson, Lisa', date: '2026-03-10', type: 'Acute', age: '2 days' },
      { patient: 'Wilson, David', date: '2026-03-08', type: 'Follow-up', age: '4 days' }
    ]
  },
  quality: {
    measures: [
      { name: 'Diabetes: A1c Control (<8%)', percentage: 82, target: 80, status: 'good', numerator: 41, denominator: 50 },
      { name: 'HTN: BP Control (<140/90)', percentage: 68, target: 75, status: 'warning', numerator: 34, denominator: 50 },
      { name: 'Breast Cancer Screening', percentage: 74, target: 80, status: 'warning', numerator: 37, denominator: 50 },
      { name: 'Colorectal Cancer Screening', percentage: 85, target: 80, status: 'good', numerator: 34, denominator: 40 },
      { name: 'Depression Screening (PHQ-9)', percentage: 90, target: 85, status: 'good', numerator: 36, denominator: 40 },
      { name: 'Statin Therapy for CVD', percentage: 92, target: 85, status: 'good', numerator: 23, denominator: 25 }
    ]
  },
  referrals: [
    { patient: 'Chen, Sarah', mrn: '1042851', specialty: 'Ophthalmology', provider: 'Dr. Kim', dateSent: '2026-03-12', status: 'Sent', daysOpen: 0, consultNote: false },
    { patient: 'Chen, Sarah', mrn: '1042851', specialty: 'Imaging', provider: 'City Imaging', dateSent: '2026-02-20', status: 'Scheduled', daysOpen: 20, consultNote: false },
    { patient: 'Martinez, Robert', mrn: '1073456', specialty: 'Nephrology', provider: 'Dr. Santos', dateSent: '2026-03-01', status: 'Received', daysOpen: 11, consultNote: false },
    { patient: 'Williams, Rosa', mrn: '1029384', specialty: 'Orthopedics', provider: 'Dr. Lee', dateSent: '2026-01-15', status: 'Completed', daysOpen: 56, consultNote: true },
    { patient: 'Thompson, James', mrn: '1051234', specialty: 'Pulmonology', provider: 'Dr. Nguyen', dateSent: '2026-02-10', status: 'Sent', daysOpen: 30, consultNote: false }
  ],
  orders: [
    { patient: 'Martinez, Robert', mrn: '1073456', order: 'Urine Albumin/Creatinine', dateOrdered: '2026-02-28', expectedBy: '2026-03-07', status: 'Overdue', overdue: true },
    { patient: 'Chen, Sarah', mrn: '1042851', order: 'HbA1c', dateOrdered: '2026-03-12', expectedBy: '2026-03-19', status: 'Ordered', overdue: false },
    { patient: 'Chen, Sarah', mrn: '1042851', order: 'BMP', dateOrdered: '2026-03-12', expectedBy: '2026-03-19', status: 'Ordered', overdue: false },
    { patient: 'Wilson, David', mrn: '1095678', order: 'BMP', dateOrdered: '2026-03-08', expectedBy: '2026-03-15', status: 'Collected', overdue: false },
    { patient: 'Thompson, James', mrn: '1051234', order: 'HbA1c', dateOrdered: '2026-03-01', expectedBy: '2026-03-08', status: 'Resulted', overdue: false },
    { patient: 'Davis, Emily', mrn: '1062345', order: 'TSH', dateOrdered: '2026-03-05', expectedBy: '2026-03-12', status: 'Resulted', overdue: false }
  ]
};

// ============================================================
// NOTIFICATIONS
// ============================================================
export const NOTIFICATIONS = [
  { id: 'notif-001', type: 'critical', icon: 'alert-triangle', title: 'Critical Lab Result', desc: 'Martinez, R. — Creatinine 2.1 (H)', time: '15 min ago', route: '#/inbox' },
  { id: 'notif-002', type: 'warning', icon: 'clock', title: 'PA Decision', desc: 'Farxiga approved for Martinez, R.', time: '1 hr ago', route: '#/inbox' },
  { id: 'notif-003', type: 'info', icon: 'mail', title: 'Patient Message', desc: 'Chen, S. — Medication question', time: '2 hrs ago', route: '#/inbox' }
];

// ============================================================
// MEDICATIONS CATALOG (for prescribe panel)
// ============================================================
export const MEDICATIONS_CATALOG = [
  { name: 'Metformin', doses: ['500mg', '750mg', '1000mg'], routes: ['Oral'], frequencies: ['QD', 'BID', 'TID'] },
  { name: 'Lisinopril', doses: ['5mg', '10mg', '20mg', '40mg'], routes: ['Oral'], frequencies: ['QD'] },
  { name: 'Atorvastatin', doses: ['10mg', '20mg', '40mg', '80mg'], routes: ['Oral'], frequencies: ['QHS'] },
  { name: 'Amlodipine', doses: ['2.5mg', '5mg', '10mg'], routes: ['Oral'], frequencies: ['QD'] },
  { name: 'Losartan', doses: ['25mg', '50mg', '100mg'], routes: ['Oral'], frequencies: ['QD'] },
  { name: 'Omeprazole', doses: ['20mg', '40mg'], routes: ['Oral'], frequencies: ['QD', 'BID'] },
  { name: 'Sertraline', doses: ['25mg', '50mg', '100mg', '150mg', '200mg'], routes: ['Oral'], frequencies: ['QD'] },
  { name: 'Escitalopram', doses: ['5mg', '10mg', '20mg'], routes: ['Oral'], frequencies: ['QD'] },
  { name: 'Hydrochlorothiazide', doses: ['12.5mg', '25mg', '50mg'], routes: ['Oral'], frequencies: ['QD'] },
  { name: 'Rosuvastatin', doses: ['5mg', '10mg', '20mg', '40mg'], routes: ['Oral'], frequencies: ['QHS'] },
  { name: 'Metoprolol Succinate', doses: ['25mg', '50mg', '100mg', '200mg'], routes: ['Oral'], frequencies: ['QD'] },
  { name: 'Levothyroxine', doses: ['25mcg', '50mcg', '75mcg', '88mcg', '100mcg', '112mcg', '125mcg'], routes: ['Oral'], frequencies: ['QAM'] },
  { name: 'Glipizide', doses: ['2.5mg', '5mg', '10mg'], routes: ['Oral'], frequencies: ['QD', 'BID'] },
  { name: 'Farxiga (Dapagliflozin)', doses: ['5mg', '10mg'], routes: ['Oral'], frequencies: ['QD'] }
];

// ============================================================
// ORDER CATALOG (for order panel)
// ============================================================
export const ORDER_CATALOG = [
  { category: 'Lab', name: 'HbA1c', code: '83036' },
  { category: 'Lab', name: 'BMP (Basic Metabolic Panel)', code: '80048' },
  { category: 'Lab', name: 'CMP (Comprehensive Metabolic Panel)', code: '80053' },
  { category: 'Lab', name: 'CBC with Differential', code: '85025' },
  { category: 'Lab', name: 'Lipid Panel', code: '80061' },
  { category: 'Lab', name: 'TSH', code: '84443' },
  { category: 'Lab', name: 'Urine Albumin/Creatinine Ratio', code: '82570' },
  { category: 'Lab', name: 'Vitamin D, 25-Hydroxy', code: '82306' },
  { category: 'Lab', name: 'Hepatic Function Panel', code: '80076' },
  { category: 'Lab', name: 'PSA', code: '84153' },
  { category: 'Imaging', name: 'Chest X-Ray', code: '71046' },
  { category: 'Imaging', name: 'Mammogram Screening', code: '77067' },
  { category: 'Imaging', name: 'DXA Bone Density', code: '77080' },
  { category: 'Screen', name: 'PHQ-9 (Depression)', code: '96127' },
  { category: 'Screen', name: 'GAD-7 (Anxiety)', code: '96127' },
  { category: 'Screen', name: 'AUDIT-C (Alcohol)', code: '96127' }
];

// ============================================================
// SETTINGS
// ============================================================
export const SETTINGS = {
  categories: [
    {
      id: 'appearance',
      label: 'Appearance',
      icon: 'palette',
      settings: [
        { id: 'theme', label: 'Theme', desc: 'Choose color theme', type: 'select', options: ['Dark', 'Light'], value: 'Dark' },
        { id: 'density', label: 'Information Density', desc: 'Adjust spacing and size', type: 'select', options: ['Compact', 'Default', 'Comfortable'], value: 'Default' },
        { id: 'sidebar', label: 'Sidebar Default', desc: 'Sidebar state on load', type: 'select', options: ['Expanded', 'Collapsed'], value: 'Expanded' }
      ]
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'bell',
      settings: [
        { id: 'critical-alerts', label: 'Critical Lab Alerts', desc: 'Show alerts for critical lab values', type: 'toggle', value: true },
        { id: 'message-alerts', label: 'Patient Message Alerts', desc: 'Notify on new patient messages', type: 'toggle', value: true },
        { id: 'pa-alerts', label: 'Prior Auth Decisions', desc: 'Notify on PA approvals/denials', type: 'toggle', value: true },
        { id: 'sound', label: 'Notification Sound', desc: 'Play sound for urgent notifications', type: 'toggle', value: false }
      ]
    },
    {
      id: 'scheduling',
      label: 'Scheduling',
      icon: 'calendar',
      settings: [
        { id: 'slot-duration', label: 'Default Slot Duration', desc: 'Default appointment length', type: 'select', options: ['15 min', '20 min', '30 min', '45 min', '60 min'], value: '30 min' },
        { id: 'start-time', label: 'Day Start Time', desc: 'First available appointment', type: 'select', options: ['7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM'], value: '8:00 AM' },
        { id: 'end-time', label: 'Day End Time', desc: 'Last available appointment', type: 'select', options: ['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'], value: '5:00 PM' }
      ]
    },
    {
      id: 'documentation',
      label: 'Documentation',
      icon: 'file-text',
      settings: [
        { id: 'exam-defaults', label: 'Exam Smart Defaults', desc: 'Pre-check normal findings based on visit type', type: 'toggle', value: true },
        { id: 'hpi-prepopulate', label: 'HPI Pre-population', desc: 'Auto-fill HPI with relevant prior data', type: 'toggle', value: true },
        { id: 'voice-input', label: 'Voice Input', desc: 'Enable voice-to-text for documentation', type: 'toggle', value: false },
        { id: 'default-visit-type', label: 'Default Visit Type', desc: 'Pre-selected visit type for new encounters', type: 'select', options: ['Follow-up', 'New Patient', 'Annual Wellness', 'Acute'], value: 'Follow-up' },
        { id: 'copy-forward-highlight', label: 'Copy-Forward Highlighting', desc: 'Visually distinguish pre-populated data', type: 'toggle', value: true }
      ]
    },
    {
      id: 'order-defaults',
      label: 'Order Defaults',
      icon: 'clipboard-list',
      settings: [
        { id: 'dm-labs', label: 'DM Follow-up Labs', desc: 'A1c + BMP + Lipid Panel + Urine Microalbumin', type: 'toggle', value: true },
        { id: 'htn-labs', label: 'HTN Follow-up Labs', desc: 'BMP + Urine Microalbumin', type: 'toggle', value: true },
        { id: 'annual-labs', label: 'Annual Wellness Labs', desc: 'CBC + CMP + Lipid Panel + TSH + Vitamin D', type: 'toggle', value: true },
        { id: 'auto-link-dx', label: 'Auto-link Diagnoses', desc: 'Automatically link orders to encounter diagnoses', type: 'toggle', value: true }
      ]
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: 'layout-template',
      settings: [
        { id: 'note-style', label: 'Note Style', desc: 'Preferred documentation format', type: 'select', options: ['Structured', 'Narrative', 'Hybrid'], value: 'Structured' }
      ]
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: 'plug',
      settings: [
        { id: 'fax-service', label: 'Electronic Fax', desc: 'Enable e-fax for referrals', type: 'toggle', value: true },
        { id: 'eprescribe', label: 'e-Prescribe', desc: 'EPCS-enabled electronic prescribing', type: 'toggle', value: true },
        { id: 'patient-portal', label: 'Patient Portal Messaging', desc: 'Enable portal message routing', type: 'toggle', value: true }
      ]
    }
  ]
};

// ============================================================
// COMMAND PALETTE ITEMS
// ============================================================
export const COMMAND_PALETTE_ITEMS = [
  // Navigation
  { type: 'nav', label: 'Go to Schedule', icon: 'calendar', route: '#/schedule', keywords: ['schedule', 'home', 'appointments'] },
  { type: 'nav', label: 'Go to Inbox', icon: 'inbox', route: '#/inbox', keywords: ['inbox', 'messages', 'results'] },
  { type: 'nav', label: 'Go to Patients', icon: 'users', route: '#/patients', keywords: ['patients', 'search', 'panel'] },
  { type: 'nav', label: 'Go to Reports', icon: 'bar-chart-2', route: '#/reports', keywords: ['reports', 'billing', 'quality'] },
  { type: 'nav', label: 'Go to Settings', icon: 'settings', route: '#/settings', keywords: ['settings', 'preferences', 'config'] },

  // Actions
  { type: 'action', label: 'New Encounter', icon: 'plus-circle', action: 'new-encounter', keywords: ['new', 'encounter', 'visit', 'start'] },
  { type: 'action', label: 'e-Prescribe', icon: 'pill', action: 'prescribe', keywords: ['prescribe', 'medication', 'rx', 'drug'] },
  { type: 'action', label: 'Place Order', icon: 'flask-conical', action: 'order', keywords: ['order', 'lab', 'imaging', 'test'] },
  { type: 'action', label: 'Send Message', icon: 'mail', action: 'message', keywords: ['message', 'send', 'patient', 'communicate'] },
  { type: 'action', label: 'Create Referral', icon: 'file-output', action: 'referral', keywords: ['referral', 'refer', 'specialist'] },

  // Recent Patients
  ...PATIENTS.slice(0, 5).map(p => ({
    type: 'patient',
    label: `${p.name} — MRN ${p.mrn}`,
    icon: 'user',
    route: `#/patient/${p.id}`,
    keywords: [p.firstName.toLowerCase(), p.lastName.toLowerCase(), p.mrn]
  }))
];

// ============================================================
// HELPER: Simulated API fetch with delay
// ============================================================
export function fetchData(getter, delayMs = 800) {
  return new Promise(resolve => setTimeout(() => resolve(getter()), delayMs));
}

// ============================================================
// HELPER: Find patient by ID
// ============================================================
export function getPatientById(id) {
  return PATIENTS.find(p => p.id === id) || null;
}

// ============================================================
// HELPER: Get inbox total unread count
// ============================================================
export function getInboxUnreadCount() {
  let count = 0;
  for (const cat of Object.values(INBOX.categories)) {
    count += cat.items.filter(i => !i.read).length;
  }
  return count;
}
