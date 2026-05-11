-- MediConnect emergency intelligence seed data. Hibernate creates the schema from JPA entities.

INSERT INTO hospitals (
    name, latitude, longitude, address, contact, emergency_supported,
    icu_beds_available, general_beds_available, emergency_beds_available, trauma_beds_available,
    trauma_support, cardiac_support, neurology_support
) VALUES
('Aster Aadhar Hospital', 16.7050, 74.2433, 'E Ward, Kolhapur, Maharashtra 416003', '0231-2522000', true, 9, 34, 7, 4, true, true, true),
('CPR Hospital Kolhapur', 16.7005, 74.2200, 'Rajaram Road, Kolhapur, Maharashtra 416001', '0231-2650000', true, 12, 48, 9, 6, true, true, true),
('D Y Patil Hospital Kolhapur', 16.6830, 74.2650, 'Kasaba Bavada, Kolhapur, Maharashtra 416006', '0231-2601234', true, 7, 40, 6, 5, true, false, true),
('Shri Chhatrapati Shivaji Maharaj General Hospital', 16.7020, 74.2350, 'Tarabai Park, Kolhapur, Maharashtra 416003', '0231-2543000', true, 5, 28, 4, 3, true, false, false),
('Wanless Hospital Miraj', 16.8270, 74.6450, 'Miraj, Sangli, Maharashtra 416410', '0233-2222000', true, 8, 35, 5, 4, true, true, true),
('Sahyadri Hospital Kolhapur', 16.7100, 74.2400, 'Rajaram Road, Kolhapur, Maharashtra 416001', '0231-2660000', true, 10, 42, 8, 4, true, true, false),
('Laxmi Nursing Home Kolhapur', 16.7080, 74.2380, 'Shivaji Park, Kolhapur, Maharashtra 416001', '0231-2540000', false, 1, 12, 1, 0, false, false, false),
('Sushrut Hospital Kolhapur', 16.6950, 74.2300, 'Shahupuri, Kolhapur, Maharashtra 416001', '0231-2530000', false, 2, 15, 1, 0, false, false, false),
('Dhanwantari Hospital Kolhapur', 16.7150, 74.2450, 'Rajarampuri, Kolhapur, Maharashtra 416008', '0231-2680000', true, 6, 27, 5, 2, false, true, false),
('Shree Hospital Kolhapur', 16.7200, 74.2500, 'Kasba Bawada, Kolhapur, Maharashtra 416006', '0231-2690000', true, 4, 22, 3, 2, true, false, false),
('Kolhapur Cancer Centre', 16.7060, 74.2420, 'Nagala Park, Kolhapur, Maharashtra 416003', '0231-2610000', false, 3, 18, 1, 0, false, false, false),
('Apex Hospital Kolhapur', 16.6900, 74.2280, 'Udyamnagar, Kolhapur, Maharashtra 416012', '0231-2570000', true, 8, 31, 6, 3, true, true, true),
('Niramay Hospital Kolhapur', 16.7030, 74.2360, 'Tarabai Park, Kolhapur, Maharashtra 416003', '0231-2555000', true, 3, 19, 3, 1, false, false, true),
('Sanjeevan Hospital Kolhapur', 16.7120, 74.2410, 'Rajarampuri 10th Lane, Kolhapur, Maharashtra 416008', '0231-2670000', true, 4, 24, 4, 2, true, false, false),
('Vedant Hospital Kolhapur', 16.6980, 74.2320, 'Shahupuri 2nd Lane, Kolhapur, Maharashtra 416001', '0231-2545000', false, 2, 16, 1, 0, false, false, false);

INSERT INTO doctors (
    name, specialization, rating, reliability_score, years_experience, emergency_supported,
    hospital_id, availability, timings
) VALUES
('Dr. Rajesh Patil', 'Cardiologist', 4.8, 9.4, 18, true, 1, 'Mon-Sun', '24 Hours'),
('Dr. Sunita Desai', 'Gynecologist', 4.4, 7.2, 12, false, 1, 'Mon-Fri', '10:00 AM - 2:00 PM'),
('Dr. Anil Kulkarni', 'Neurologist', 4.7, 9.1, 16, true, 1, 'Mon-Sun', '8:00 AM - 10:00 PM'),
('Dr. Priya Sharma', 'General Physician', 4.6, 8.7, 14, true, 2, 'Mon-Sun', '24 Hours'),
('Dr. Mahesh Jadhav', 'Trauma Surgeon', 4.5, 8.9, 15, true, 2, 'Mon-Sun', '24 Hours'),
('Dr. Kavita Rane', 'Dermatologist', 4.2, 6.8, 10, false, 2, 'Mon-Fri', '10:00 AM - 1:00 PM'),
('Dr. Suresh Mane', 'Gastroenterologist', 4.2, 7.5, 13, false, 3, 'Mon-Sat', '9:00 AM - 2:00 PM'),
('Dr. Anita Pawar', 'Pediatrician', 4.6, 8.0, 11, true, 3, 'Mon-Sun', '8:00 AM - 6:00 PM'),
('Dr. Vikram Shinde', 'Pulmonologist', 4.8, 9.0, 17, true, 3, 'Tue-Sun', '8:00 AM - 8:00 PM'),
('Dr. Deepak Chavan', 'Emergency Physician', 4.3, 8.1, 12, true, 4, 'Mon-Sun', '24 Hours'),
('Dr. Meena Gaikwad', 'Ophthalmologist', 4.1, 6.5, 9, false, 4, 'Mon-Sat', '10:00 AM - 2:00 PM'),
('Dr. Ravi Kore', 'Endocrinologist', 4.3, 7.4, 13, false, 6, 'Mon-Fri', '11:00 AM - 3:00 PM'),
('Dr. Smita Patil', 'Psychiatrist', 4.5, 7.8, 12, false, 6, 'Mon-Sat', '9:00 AM - 12:00 PM'),
('Dr. Nitin Bhosale', 'Urologist', 4.4, 7.1, 11, false, 6, 'Tue-Sat', '10:00 AM - 2:00 PM'),
('Dr. Pooja Joshi', 'Cardiologist', 4.2, 6.4, 7, true, 9, 'Mon-Sat', '8:00 AM - 12:00 PM'),
('Dr. Sanjay Kadam', 'Trauma Surgeon', 4.7, 9.2, 19, true, 10, 'Mon-Sun', '24 Hours'),
('Dr. Rekha Nair', 'General Physician', 4.6, 8.5, 18, true, 12, 'Mon-Sun', '24 Hours'),
('Dr. Amol Sawant', 'Neurologist', 4.9, 9.6, 20, true, 12, 'Mon-Sun', '24 Hours'),
('Dr. Pallavi Deshpande', 'Gynecologist', 4.4, 7.2, 10, false, 14, 'Mon-Sat', '9:00 AM - 1:00 PM'),
('Dr. Kiran Patil', 'Dermatologist', 4.0, 6.3, 8, false, 14, 'Mon-Fri', '11:00 AM - 3:00 PM');

INSERT INTO doctor_schedule (doctor_id, schedule_day, start_time, end_time, is_available) VALUES
(1, 'Mon', '00:00:00', '23:59:00', true), (1, 'Tue', '00:00:00', '23:59:00', true), (1, 'Wed', '00:00:00', '23:59:00', true),
(3, 'Mon', '08:00:00', '22:00:00', true), (3, 'Tue', '08:00:00', '22:00:00', true), (3, 'Wed', '08:00:00', '22:00:00', true),
(4, 'Mon', '00:00:00', '23:59:00', true), (4, 'Tue', '00:00:00', '23:59:00', true), (4, 'Wed', '00:00:00', '23:59:00', true),
(5, 'Mon', '00:00:00', '23:59:00', true), (5, 'Tue', '00:00:00', '23:59:00', true), (5, 'Wed', '00:00:00', '23:59:00', true),
(9, 'Mon', '08:00:00', '20:00:00', true), (9, 'Tue', '08:00:00', '20:00:00', true), (9, 'Wed', '08:00:00', '20:00:00', true),
(10, 'Mon', '00:00:00', '23:59:00', true), (10, 'Tue', '00:00:00', '23:59:00', true), (10, 'Wed', '00:00:00', '23:59:00', true),
(15, 'Mon', '08:00:00', '12:00:00', true), (15, 'Tue', '08:00:00', '12:00:00', true), (15, 'Wed', '08:00:00', '12:00:00', true),
(16, 'Mon', '00:00:00', '23:59:00', true), (16, 'Tue', '00:00:00', '23:59:00', true), (16, 'Wed', '00:00:00', '23:59:00', true),
(17, 'Mon', '00:00:00', '23:59:00', true), (17, 'Tue', '00:00:00', '23:59:00', true), (17, 'Wed', '00:00:00', '23:59:00', true),
(18, 'Mon', '00:00:00', '23:59:00', true), (18, 'Tue', '00:00:00', '23:59:00', true), (18, 'Wed', '00:00:00', '23:59:00', true);

INSERT INTO ambulance_services (
    hospital_id, ambulance_type, driver_name, rating, reliability_score, availability_status,
    current_latitude, current_longitude, equipment_supported
) VALUES
(1, 'Cardiac Ambulance', 'Santosh More', 4.8, 9.5, 'Available', 16.7060, 74.2420, 'Cardiac monitor, defibrillator, oxygen, ventilator'),
(2, 'Trauma Ambulance', 'Vijay Pawar', 4.6, 9.0, 'Available', 16.7010, 74.2220, 'Trauma kit, spine board, oxygen, bleeding control'),
(3, 'ICU Ambulance', 'Nilesh Kadam', 4.7, 8.8, 'Available', 16.6840, 74.2630, 'ICU ventilator, oxygen, suction, seizure kit'),
(6, 'Basic Ambulance', 'Rahul Patil', 4.0, 7.0, 'Available', 16.7110, 74.2390, 'Oxygen, stretcher, first aid'),
(9, 'Cardiac Ambulance', 'Sameer Jadhav', 4.2, 6.8, 'Busy', 16.7155, 74.2440, 'Cardiac monitor, oxygen'),
(12, 'ICU Ambulance', 'Akash Shinde', 4.9, 9.7, 'Available', 16.6910, 74.2290, 'ICU ventilator, cardiac monitor, oxygen, defibrillator'),
(14, 'Trauma Ambulance', 'Prakash Mane', 4.4, 8.2, 'Available', 16.7130, 74.2420, 'Trauma kit, burn kit, bleeding control');

INSERT INTO ambulance_schedule (ambulance_id, schedule_day, start_time, end_time, is_available) VALUES
(1, 'Mon', '00:00:00', '23:59:00', true), (1, 'Tue', '00:00:00', '23:59:00', true),
(2, 'Mon', '00:00:00', '23:59:00', true), (2, 'Tue', '00:00:00', '23:59:00', true),
(3, 'Mon', '00:00:00', '23:59:00', true), (3, 'Tue', '00:00:00', '23:59:00', true),
(4, 'Mon', '00:00:00', '23:59:00', true), (4, 'Tue', '00:00:00', '23:59:00', true),
(5, 'Mon', '00:00:00', '23:59:00', false), (5, 'Tue', '00:00:00', '23:59:00', false),
(6, 'Mon', '00:00:00', '23:59:00', true), (6, 'Tue', '00:00:00', '23:59:00', true),
(7, 'Mon', '00:00:00', '23:59:00', true), (7, 'Tue', '00:00:00', '23:59:00', true);

INSERT INTO appointments (
    patient_name, patient_phone, doctor_id, hospital_id, appointment_type, emergency_type,
    appointment_time, status, severity_level, patient_latitude, patient_longitude, queue_priority, created_at
) VALUES
('Amit Patil', '9876543210', 1, 1, 'Emergency', 'Heart Attack', CURRENT_TIMESTAMP, 'Emergency Priority', 'Critical', 16.7040, 74.2380, 100, CURRENT_TIMESTAMP),
('Neha Kulkarni', '9876501234', 5, 2, 'Emergency', 'Accident / Trauma', CURRENT_TIMESTAMP, 'Confirmed', 'High', 16.6990, 74.2250, 75, CURRENT_TIMESTAMP),
('Rohan Desai', '9876512345', 18, 12, 'Emergency', 'Stroke', CURRENT_TIMESTAMP, 'Pending', 'High', 16.6950, 74.2300, 75, CURRENT_TIMESTAMP);

INSERT INTO blood (hospital_id, blood_group, units_available) VALUES
(1, 'A+', 15), (1, 'A-', 5), (1, 'B+', 20), (1, 'B-', 3), (1, 'O+', 25), (1, 'O-', 8), (1, 'AB+', 10), (1, 'AB-', 2),
(2, 'A+', 12), (2, 'B+', 18), (2, 'O+', 22), (2, 'AB+', 7), (2, 'A-', 4), (2, 'O-', 6),
(3, 'A+', 10), (3, 'B+', 15), (3, 'O+', 20), (3, 'AB+', 5), (3, 'B-', 2), (3, 'AB-', 1),
(4, 'A+', 8), (4, 'B+', 12), (4, 'O+', 18), (4, 'O-', 5),
(6, 'A+', 20), (6, 'A-', 6), (6, 'B+', 25), (6, 'B-', 4), (6, 'O+', 30), (6, 'O-', 10), (6, 'AB+', 12), (6, 'AB-', 3),
(9, 'A+', 9), (9, 'B+', 11), (9, 'O+', 16), (9, 'AB+', 4),
(12, 'A+', 14), (12, 'B+', 19), (12, 'O+', 24), (12, 'O-', 7), (12, 'A-', 3), (12, 'AB+', 8),
(14, 'A+', 11), (14, 'B+', 13), (14, 'O+', 17), (14, 'AB+', 6);
