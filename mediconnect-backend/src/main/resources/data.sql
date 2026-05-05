-- MediConnect seed data. Hibernate creates the schema from JPA entities.

-- =====================
-- INSERT KOLHAPUR HOSPITALS (15 hospitals)
-- =====================
INSERT INTO hospitals (name, latitude, longitude, address, contact) VALUES
('Aster Aadhar Hospital', 16.7050, 74.2433, 'E Ward, Kolhapur, Maharashtra 416003', '0231-2522000'),
('CPR Hospital Kolhapur', 16.7005, 74.2200, 'Rajaram Road, Kolhapur, Maharashtra 416001', '0231-2650000'),
('D Y Patil Hospital Kolhapur', 16.6830, 74.2650, 'Kasaba Bavada, Kolhapur, Maharashtra 416006', '0231-2601234'),
('Shri Chhatrapati Shivaji Maharaj General Hospital', 16.7020, 74.2350, 'Tarabai Park, Kolhapur, Maharashtra 416003', '0231-2543000'),
('Wanless Hospital Miraj', 16.8270, 74.6450, 'Miraj, Sangli, Maharashtra 416410', '0233-2222000'),
('Sahyadri Hospital Kolhapur', 16.7100, 74.2400, 'Rajaram Road, Kolhapur, Maharashtra 416001', '0231-2660000'),
('Laxmi Nursing Home Kolhapur', 16.7080, 74.2380, 'Shivaji Park, Kolhapur, Maharashtra 416001', '0231-2540000'),
('Sushrut Hospital Kolhapur', 16.6950, 74.2300, 'Shahupuri, Kolhapur, Maharashtra 416001', '0231-2530000'),
('Dhanwantari Hospital Kolhapur', 16.7150, 74.2450, 'Rajarampuri, Kolhapur, Maharashtra 416008', '0231-2680000'),
('Shree Hospital Kolhapur', 16.7200, 74.2500, 'Kasba Bawada, Kolhapur, Maharashtra 416006', '0231-2690000'),
('Kolhapur Cancer Centre', 16.7060, 74.2420, 'Nagala Park, Kolhapur, Maharashtra 416003', '0231-2610000'),
('Apex Hospital Kolhapur', 16.6900, 74.2280, 'Udyamnagar, Kolhapur, Maharashtra 416012', '0231-2570000'),
('Niramay Hospital Kolhapur', 16.7030, 74.2360, 'Tarabai Park, Kolhapur, Maharashtra 416003', '0231-2555000'),
('Sanjeevan Hospital Kolhapur', 16.7120, 74.2410, 'Rajarampuri 10th Lane, Kolhapur, Maharashtra 416008', '0231-2670000'),
('Vedant Hospital Kolhapur', 16.6980, 74.2320, 'Shahupuri 2nd Lane, Kolhapur, Maharashtra 416001', '0231-2545000');

-- =====================
-- INSERT DOCTORS
-- =====================
INSERT INTO doctors (name, specialization, hospital_id, availability, timings) VALUES
-- Aster Aadhar Hospital (id=1)
('Dr. Rajesh Patil', 'Cardiologist', 1, 'Mon-Sat', '9:00 AM - 1:00 PM'),
('Dr. Sunita Desai', 'Gynecologist', 1, 'Mon-Fri', '10:00 AM - 2:00 PM'),
('Dr. Anil Kulkarni', 'Neurologist', 1, 'Tue-Sat', '11:00 AM - 3:00 PM'),

-- CPR Hospital (id=2)
('Dr. Priya Sharma', 'General Physician', 2, 'Mon-Sun', '8:00 AM - 8:00 PM'),
('Dr. Mahesh Jadhav', 'Orthopedic', 2, 'Mon-Sat', '9:00 AM - 5:00 PM'),
('Dr. Kavita Rane', 'Dermatologist', 2, 'Mon-Fri', '10:00 AM - 1:00 PM'),

-- D Y Patil Hospital (id=3)
('Dr. Suresh Mane', 'Gastroenterologist', 3, 'Mon-Sat', '9:00 AM - 2:00 PM'),
('Dr. Anita Pawar', 'Pediatrician', 3, 'Mon-Sun', '8:00 AM - 6:00 PM'),
('Dr. Vikram Shinde', 'Pulmonologist', 3, 'Tue-Sat', '10:00 AM - 4:00 PM'),

-- Shri Chhatrapati Hospital (id=4)
('Dr. Deepak Chavan', 'ENT Specialist', 4, 'Mon-Fri', '9:00 AM - 1:00 PM'),
('Dr. Meena Gaikwad', 'Ophthalmologist', 4, 'Mon-Sat', '10:00 AM - 2:00 PM'),

-- Sahyadri Hospital (id=6)
('Dr. Ravi Kore', 'Endocrinologist', 6, 'Mon-Fri', '11:00 AM - 3:00 PM'),
('Dr. Smita Patil', 'Psychiatrist', 6, 'Mon-Sat', '9:00 AM - 12:00 PM'),
('Dr. Nitin Bhosale', 'Urologist', 6, 'Tue-Sat', '10:00 AM - 2:00 PM'),

-- Dhanwantari Hospital (id=9)
('Dr. Pooja Joshi', 'Cardiologist', 9, 'Mon-Sat', '8:00 AM - 12:00 PM'),
('Dr. Sanjay Kadam', 'Orthopedic', 9, 'Mon-Fri', '9:00 AM - 5:00 PM'),

-- Apex Hospital (id=12)
('Dr. Rekha Nair', 'General Physician', 12, 'Mon-Sun', '24 Hours'),
('Dr. Amol Sawant', 'Neurologist', 12, 'Mon-Sat', '10:00 AM - 4:00 PM'),

-- Sanjeevan Hospital (id=14)
('Dr. Pallavi Deshpande', 'Gynecologist', 14, 'Mon-Sat', '9:00 AM - 1:00 PM'),
('Dr. Kiran Patil', 'Dermatologist', 14, 'Mon-Fri', '11:00 AM - 3:00 PM');

-- =====================
-- INSERT BLOOD BANK DATA
-- =====================
INSERT INTO blood (hospital_id, blood_group, units_available) VALUES
-- Aster Aadhar Hospital
(1, 'A+', 15), (1, 'A-', 5), (1, 'B+', 20), (1, 'B-', 3),
(1, 'O+', 25), (1, 'O-', 8), (1, 'AB+', 10), (1, 'AB-', 2),

-- CPR Hospital
(2, 'A+', 12), (2, 'B+', 18), (2, 'O+', 22), (2, 'AB+', 7),
(2, 'A-', 4), (2, 'O-', 6),

-- D Y Patil Hospital
(3, 'A+', 10), (3, 'B+', 15), (3, 'O+', 20), (3, 'AB+', 5),
(3, 'B-', 2), (3, 'AB-', 1),

-- Shri Chhatrapati Hospital
(4, 'A+', 8), (4, 'B+', 12), (4, 'O+', 18), (4, 'O-', 5),

-- Sahyadri Hospital
(6, 'A+', 20), (6, 'A-', 6), (6, 'B+', 25), (6, 'B-', 4),
(6, 'O+', 30), (6, 'O-', 10), (6, 'AB+', 12), (6, 'AB-', 3),

-- Dhanwantari Hospital
(9, 'A+', 9), (9, 'B+', 11), (9, 'O+', 16), (9, 'AB+', 4),

-- Apex Hospital
(12, 'A+', 14), (12, 'B+', 19), (12, 'O+', 24), (12, 'O-', 7),
(12, 'A-', 3), (12, 'AB+', 8),

-- Sanjeevan Hospital
(14, 'A+', 11), (14, 'B+', 13), (14, 'O+', 17), (14, 'AB+', 6);
