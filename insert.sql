

        

        -- Inserting data into the `litter` table
INSERT INTO litter (trashtype, trashamount) 
VALUES 
    ('Plastic', 5.2),
    ('Glass', 3.8),
    ('Paper', 2.1),
    ('Metal', 4.0),
    ('Food Waste', 6.3),
    ('Clothing', 2.5),
    ('Electronics', 1.9),
    ('Bottles', 3.5),
    ('Tires', 7.0),
    ('Cigarette Butts', 0.5);




-- Inserting data into the `offenders` table
INSERT INTO offenders (name, cnic, address, offencecount)
VALUES
    ('John Doe', '12345-6789012-3', '123 Maple Street, Springfield', 5),
    ('Jane Smith', '23456-7890123-4', '456 Elm Street, Metropolis', 3),
    ('Michael Brown', '34567-8901234-5', '789 Oak Street, Gotham', 2),
    ('Emily Davis', '45678-9012345-6', '321 Pine Street, Star City', 4),
    ('Daniel Wilson', '56789-0123456-7', '654 Cedar Street, Central City', 1),
    ('Sophia Johnson', '67890-1234567-8', '987 Birch Street, Coast City', 3),
    ('William Martinez', '78901-2345678-9', '159 Maple Ave, Hill Valley', 6),
    ('Olivia Garcia', '89012-3456789-0', '753 Main Street, Riverdale', 2),
    ('Noah Miller', '90123-4567890-1', '852 Sunset Blvd, Smallville', 4),
    ('Emma Anderson', '12345-6789012-2', '369 Broadway, Pleasantville', 1);

-- Create the reports table with a unique constraint on the combination of infodetails and timestamp

-- Insert data into the reports table
INSERT INTO reports (latitude, longitude, locationStr, timestamp, fineStatus, fineIssued, infodetails) 
VALUES
    (33.6844, 73.0479, 'Littering near F-6 Markaz, Islamabad', '2019-03-10 08:00:00', 'Pending', '3500', 'Plastic and paper waste.'),
    (33.6932, 73.0687, 'Littering near F-7 Markaz, Islamabad', '2019-06-15 09:15:00', 'Paid', '2000', 'Food wrappers and cans.'),
    (33.7044, 73.0451, 'Littering near F-10, Islamabad', '2020-01-20 10:30:00', 'Missed', '4000', 'Plastic bags and bottles.'),
    (33.6750, 73.0576, 'Littering near G-9 Markaz, Islamabad', '2020-05-18 11:45:00', 'Pending', '3500', 'Paper and plastic packaging.'),
    (33.6865, 73.0584, 'Littering near G-6, Islamabad', '2021-02-24 12:10:00', 'Paid', '3000', 'Cardboard and cans.'),
    (33.6890, 73.0600, 'Littering near G-11, Islamabad', '2021-06-19 13:25:00', 'Pending', '4500', 'Glass and plastic bottles.'),
    (33.6881, 73.0657, 'Littering near F-8, Islamabad', '2021-09-11 14:05:00', 'Missed', '2500', 'Newspapers and plastic bags.'),
    (33.6782, 73.0511, 'Littering near G-8, Islamabad', '2022-03-08 15:30:00', 'Paid', '2800', 'Cigarette butts and paper waste.'),
    (33.6889, 73.0634, 'Littering near F-5, Islamabad', '2022-07-14 16:45:00', 'Pending', '3500', 'Food wrappers and plastic bottles.'),
    (33.6766, 73.0721, 'Littering near H-9, Islamabad', '2022-11-20 17:30:00', 'Paid', '3300', 'Plastic bags and wrappers.'),
    (33.7010, 73.0473, 'Littering near E-7, Islamabad', '2023-01-25 18:00:00', 'Missed', '2700', 'Plastic cups and food wrappers.'),
    (33.6990, 73.0606, 'Littering near D-12, Islamabad', '2023-05-10 19:15:00', 'Pending', '3200', 'Plastic bottles and cans.'),
    (33.6857, 73.0582, 'Littering near I-8, Islamabad', '2023-09-12 20:00:00', 'Paid', '2500', 'Plastic and paper waste.'),
    (33.6700, 73.0505, 'Littering near I-9, Islamabad', '2024-02-17 21:30:00', 'Pending', '3700', 'Cardboard and plastic wrappers.'),
    (33.6812, 73.0665, 'Littering near F-11, Islamabad', '2024-05-28 22:05:00', 'Missed', '3500', 'Plastic bags and food containers.'),
    (33.6904, 73.0499, 'Littering near D-11, Islamabad', '2024-09-13 23:25:00', 'Paid', '2000', 'Plastic bottles and wrappers.'),
    (33.7020, 73.0547, 'Littering near H-10, Islamabad', '2025-01-06 08:15:00', 'Pending', '3000', 'Plastic bags and packaging.'),
    (33.6880, 73.0598, 'Littering near G-10, Islamabad', '2025-04-18 09:00:00', 'Paid', '2900', 'Paper and plastic waste.'),
    (33.6694, 73.0650, 'Littering near G-7, Islamabad', '2025-08-23 10:30:00', 'Pending', '3200', 'Plastic bottles and wrappers.'),
    (33.6728, 73.0531, 'Littering near F-9, Islamabad', '2025-11-15 11:45:00', 'Missed', '4500', 'Food wrappers and plastic.'),
    (33.6938, 73.0651, 'Littering near H-8, Islamabad', '2026-03-19 12:15:00', 'Paid', '2500', 'Plastic and paper waste.'),
    (33.6864, 73.0550, 'Littering near I-10, Islamabad', '2026-06-05 13:30:00', 'Pending', '3000', 'Plastic bags and wrappers.'),
    (33.6792, 73.0473, 'Littering near F-4, Islamabad', '2026-09-25 14:10:00', 'Paid', '2000', 'Cigarette butts and food wrappers.'),
    (33.6967, 73.0589, 'Littering near G-12, Islamabad', '2027-01-12 15:45:00', 'Missed', '2500', 'Paper and plastic waste.'),
    (33.6755, 73.0615, 'Littering near G-13, Islamabad', '2027-03-29 16:30:00', 'Pending', '3500', 'Plastic and food waste.'),
    (33.6907, 73.0460, 'Littering near E-11, Islamabad', '2027-07-14 17:25:00', 'Paid', '2700', 'Plastic bags and wrappers.'),
    (33.6852, 73.0601, 'Littering near I-11, Islamabad', '2027-10-10 18:50:00', 'Pending', '3200', 'Plastic bottles and packaging.'),
    (33.6800, 73.0629, 'Littering near F-12, Islamabad', '2028-02-08 19:30:00', 'Missed', '4000', 'Food wrappers and plastic.'),
    (33.6916, 73.0485, 'Littering near F-13, Islamabad', '2028-05-20 20:05:00', 'Paid', '2500', 'Plastic wrappers and bottles.'),
    (33.6731, 73.0540, 'Littering near H-11, Islamabad', '2028-09-16 21:10:00', 'Pending', '3300', 'Plastic bags and food containers.'),
    (33.6928, 73.0569, 'Littering near D-13, Islamabad', '2028-11-12 22:20:00', 'Paid', '3000', 'Plastic bottles and food wrappers.');


-- Inserting data into the `report_litter` table
-- Inserting data into the `report_litter` table (corrected)
INSERT INTO report_litter (reportid, litterid) 
VALUES
    (1, 1), (1, 2), (1, 3), (1, 4), 
    (2, 5), (3, 6), (3, 7), (4, 8),
    (5, 1), (6, 2), (7, 3), (8, 4),
    (9, 5), (10, 6), (11, 7), (12, 8),
    (13, 1), (14, 2), (15, 3), (16, 4),
    (17, 5), (18, 6), (19, 7), (20, 8),
    (21, 1), (22, 2), (23, 3), (24, 4),
    (25, 5), (26, 6), (27, 7), (28, 8),
    (29, 1), (30, 2);  -- Corrected to ensure all reportids are valid


-- Inserting data into the `report_offenders` table
INSERT INTO report_offenders (reportid, offenderid)
VALUES
    (1, 1), (1, 2), (2, 3), (3, 4),
    (4, 5), (5, 6), (6, 7), (7, 8),
    (8, 9), (9, 10), (10, 1), (11, 2),
    (12, 3), (13, 4), (14, 5), (15, 6),
    (16, 7), (17, 8), (18, 9), (19, 10),
    (20, 1), (21, 2), (22, 3), (23, 4),
    (24, 5), (25, 6), (26, 7), (27, 8),
    (28, 9), (29, 10), (30, 1);


-- Inserting data into the `users` table
INSERT INTO users (name, phonenumber, email, passwordhash, isloggedin, typeofuser) 
VALUES
    ('Alice Smith', '123-456-7890', 'alice@example.com', 'hashedpassword1', TRUE, 'Admin'),
    ('Bob Johnson', '234-567-8901', 'bob@example.com', 'hashedpassword2', FALSE, 'User'),
    ('Charlie Brown', '345-678-9012', 'charlie@example.com', 'hashedpassword3', TRUE, 'User'),
    ('David Williams', '456-789-0123', 'david@example.com', 'hashedpassword4', FALSE, 'User'),
    ('Eva Green', '567-890-1234', 'eva@example.com', 'hashedpassword5', TRUE, 'Admin'),
    ('Frank Harris', '678-901-2345', 'frank@example.com', 'hashedpassword6', FALSE, 'User'),
    ('Grace Lee', '789-012-3456', 'grace@example.com', 'hashedpassword7', TRUE, 'User');


-- Inserting data into the `user_reports` table
-- Inserting data into the `user_reports` table (corrected)
INSERT INTO user_reports (userid, reportid) 
VALUES
    (1, 1), (1, 2), (2, 3), (3, 4), 
    (1, 5), (2, 6), (3, 7), (4, 8),
    (5, 9), (6, 10), (7, 11), (1, 12),
    (2, 13), (3, 14), (4, 15), (5, 16),
    (6, 17), (7, 18), (1, 19), (2, 20),
    (3, 21), (4, 22), (5, 23), (6, 24),
    (7, 25), (1, 26), (2, 27), (3, 28),
    (4, 29), (5, 30);  -- Removed reference to reportid = 31


