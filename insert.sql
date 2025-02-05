        
-- Inserting dummy data into the `litter` table
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
INSERT INTO offenders (name, cnic, address)
VALUES
    ('John Doe', '12345-6789012-3', '123 Maple Street, Springfield'),
    ('Jane Smith', '23456-7890123-4', '456 Elm Street, Metropolis'),
    ('Michael Brown', '34567-8901234-5', '789 Oak Street, Gotham'),
    ('Emily Davis', '45678-9012345-6', '321 Pine Street, Star City'),
    ('Daniel Wilson', '56789-0123456-7', '654 Cedar Street, Central City'),
    ('Sophia Johnson', '67890-1234567-8', '987 Birch Street, Coast City'),
    ('William Martinez', '78901-2345678-9', '159 Maple Ave, Hill Valley'),
    ('Olivia Garcia', '89012-3456789-0', '753 Main Street, Riverdale'),
    ('Noah Miller', '90123-4567890-1', '852 Sunset Blvd, Smallville'),
    ('Emma Anderson', '12345-6789012-2', '369 Broadway, Pleasantville');

-- Create the reports table with a unique constraint on the combination of infodetails and timestamp

-- Insert data into the reports table
INSERT INTO reports (latitude, longitude, locationStr, timestamp, fineStatus, fineIssued, infodetails) 
VALUES
    (33.6844, 73.0479, 'Littering near F-6 Markaz, Islamabad', '2022-03-10 08:00:00', 'Pending', '3500', 'On March 10th, 2022, around 8:00 AM, a large amount of plastic bags and paper wrappers were discovered near the entrance of a local shop in F-6 Markaz, Islamabad. The waste appeared to be discarded carelessly by passersby. Investigations suggest that the litter accumulated over time, with no nearby waste bins available. The situation reflects a growing concern about improper waste disposal in high-traffic commercial areas. Authorities have yet to identify the individuals responsible for the littering.'),
    (33.6932, 73.0687, 'Littering near F-7 Markaz, Islamabad', '2022-06-15 09:15:00', 'Paid', '2000', 'On June 15th, 2022, at approximately 9:15 AM, food wrappers and empty cans were found scattered near F-7 Markaz, Islamabad, specifically around a public park. The litter was attributed to park visitors who consumed food and left their waste behind. Witnesses reported that the area lacked sufficient waste disposal bins, which may have contributed to the littering. The authorities were quick to address the issue, issuing a fine for cleanup and taking preventive measures to avoid further occurrences.'),
    (33.7044, 73.0451, 'Littering near F-10, Islamabad', '2022-01-20 10:30:00', 'Missed', '4000', 'On January 20th, 2022, a case of littering occurred near F-10, Islamabad, at approximately 10:30 AM. Plastic bags and bottles were scattered along the footpath near a popular café. CCTV footage revealed that pedestrians had discarded their waste without using nearby bins. Investigators believe this was a deliberate act, as the area is frequented by people consuming food and drinks on the go. No immediate suspects were identified, but the event raised concerns about littering behavior in commercial zones.'),
    (33.6750, 73.0576, 'Littering near G-9 Markaz, Islamabad', '2022-05-18 11:45:00', 'Pending', '3500', 'On May 18th, 2022, at approximately 11:45 AM, paper and plastic packaging were found scattered near a bus stop in G-9 Markaz, Islamabad. The litter appeared to be from fast-food packaging, likely discarded by individuals who had eaten on the street. Investigators noted that the area lacks sufficient trash disposal facilities, contributing to the littering problem. The fine status remains pending, as authorities continue to monitor the area for similar incidents.'),
    (33.6865, 73.0584, 'Littering near G-6, Islamabad', '2022-02-24 12:10:00', 'Paid', '3000', 'On February 24th, 2022, at 12:10 PM, investigators found discarded cardboard and cans near the sidewalk in G-6, Islamabad. The waste appeared to originate from a nearby store, with customers leaving packaging behind after business hours. The littering was seen as a result of inadequate waste disposal infrastructure in the area. A fine was promptly issued, and plans for increasing the number of waste bins in the vicinity were discussed to prevent future issues.'),
    (33.6890, 73.0600, 'Littering near G-11, Islamabad', '2022-06-19 13:25:00', 'Pending', '4500', 'On June 19th, 2022, at 13:25 PM, glass and plastic bottles were discovered near a commercial building entrance in G-11, Islamabad. Witnesses reported that the area is frequently littered after office hours, as workers often discard waste carelessly while leaving for the day. Authorities are currently investigating the incident, but due to a lack of sufficient trash bins, this type of littering has become an ongoing issue in the area. The fine remains pending as the investigation continues.'),
    (33.6881, 73.0657, 'Littering near F-8, Islamabad', '2022-09-11 14:05:00', 'Missed', '2500', 'On September 11th, 2022, newspapers and plastic bags were found scattered in a park near F-8, Islamabad. The waste seemed to have been discarded by park visitors, as it was found near popular gathering spots. The littering incident occurred despite the area being well-frequented and having accessible waste disposal bins. Local authorities missed the opportunity to issue a fine, but the incident prompted discussions on improving waste management in public spaces.'),
    (33.6782, 73.0511, 'Littering near G-8, Islamabad', '2022-03-08 15:30:00', 'Paid', '2800', 'On March 8th, 2022, around 15:30 PM, cigarette butts and paper waste were found near a busy street corner in G-8, Islamabad. The waste appeared to be left behind by pedestrians who ignored nearby trash bins. Local authorities promptly issued a fine and are working on improving the situation with better signage and additional bins in the area to reduce littering in high-footfall zones.'),
    (33.6889, 73.0634, 'Littering near F-5, Islamabad', '2022-07-14 16:45:00', 'Pending', '3500', 'On July 14th, 2022, at 20:00 PM, food wrappers and plastic waste were scattered near the entrance to a public park in F-5, Islamabad. The littering incident is believed to have occurred when visitors discarded waste after snacking in the park. Local authorities are investigating the situation, but due to the lack of trash bins near the park entrance, the problem has been recurrent in the area. The fine remains pending as further information is gathered.'),
    (33.6766, 73.0721, 'Littering near H-9, Islamabad', '2023-11-20 17:30:00', 'Paid', '3300', 'On November 20th, 2023, at around 17:30 PM, plastic bags and wrappers were found abandoned in a commercial area in H-9, Islamabad. The littering occurred after office hours when workers and visitors discarded food wrappers and packaging. Authorities issued a fine for the cleanup of the area, emphasizing the need for better waste disposal facilities in such busy areas.'),
    (33.7010, 73.0473, 'Littering near E-7, Islamabad', '2023-01-25 18:00:00', 'Missed', '2700', 'On January 25th, 2023, plastic cups and food wrappers were found discarded near a shopping complex in E-7, Islamabad. The waste was believed to have been left by individuals who were enjoying food and beverages while walking. Investigations revealed that the area lacked proper waste disposal bins, leading to the improper disposal of litter. Authorities missed the chance to issue a fine, but the issue was flagged for future monitoring.'),
    (33.6990, 73.0606, 'Littering near D-12, Islamabad', '2023-05-10 19:15:00', 'Pending', '3200', 'On May 10th, 2023, at approximately 19:15 PM, plastic bottles and cans were found discarded near a community center in D-12, Islamabad. This incident follows a pattern of littering that often occurs after local events, with attendees leaving behind waste. Authorities are investigating the cause of the incident, and a fine may be imposed once the individuals responsible are identified.'),
    (33.6857, 73.0582, 'Littering near I-8, Islamabad', '2023-09-12 20:00:00', 'Paid', '2500', 'On September 12th, 2023, at 20:00 PM, plastic and paper waste was found scattered on the streets near a local fair in I-8, Islamabad. The waste was primarily from food and drink packaging left behind by visitors. Investigators believe that the crowds at the event contributed to the excessive littering. A fine was issued, and authorities are discussing measures to better manage waste during such events.'),
    (33.6700, 73.0505, 'Littering near I-9, Islamabad', '2023-02-17 21:30:00', 'Pending', '3700', 'On February 17th, 2023, at approximately 21:30 PM, cardboard and plastic wrappers were left on the street near a shopping district in I-9, Islamabad. The litter was traced to local shops and visitors, who failed to dispose of their waste properly. The absence of trash bins in the vicinity contributed to the littering issue. Authorities are investigating the incident and preparing to impose a fine on the responsible parties.'),
    (33.6812, 73.0665, 'Littering near F-11, Islamabad', '2023-05-28 22:05:00', 'Missed', '3500', 'On May 28th, 2023, at 22:05 PM, plastic bags and food containers were found near the market area in F-11, Islamabad. The litter was believed to be from shoppers who discarded their food containers without properly disposing of them. Authorities were unable to issue a fine at the time, but the incident was noted as part of ongoing efforts to combat littering in busy commercial zones.'),
    (33.6904, 73.0499, 'Littering near D-11, Islamabad', '2023-09-13 23:25:00', 'Paid', '2000', 'On September 13th, 2023, at 23:25 PM, plastic bottles and wrappers were discarded near a bus stop in D-11, Islamabad. It appeared that commuters had left their waste behind after using the bus stop. Local authorities were able to issue a fine and are working to install more trash bins to curb such incidents in the future.'),
    (33.7020, 73.0547, 'Littering near H-10, Islamabad', '2024-01-06 08:15:00', 'Pending', '3000', 'On January 6th, 2024, at 08:15 AM, plastic bags and packaging were left at the entrance of a shopping complex in H-10, Islamabad. Investigations revealed that the litter was discarded by customers after consuming products inside the mall. Authorities are investigating the cause and plan to address the issue with additional waste disposal options.'),
    (33.6880, 73.0598, 'Littering near G-10, Islamabad', '2024-04-18 09:00:00', 'Paid', '2900', 'On April 18th, 2024, at 09:00 AM, paper and plastic waste was discovered near a busy shopping area in G-10, Islamabad. The litter was primarily from food packaging left behind by shoppers. Authorities were able to identify the individuals responsible, and a fine was issued as part of the cleanup efforts.'),
    (33.6694, 73.0650, 'Littering near G-7, Islamabad', '2024-08-23 10:30:00', 'Pending', '3200', 'On August 23rd, 2024, at 10:30 AM, plastic bottles and wrappers were found along the main road in G-7, Islamabad. Investigators traced the litter to pedestrians who discarded their trash after shopping. Authorities are working on identifying the individuals responsible, but due to the lack of adequate bins, the problem has persisted in the area.'),
    (33.6728, 73.0531, 'Littering near F-9, Islamabad', '2024-11-15 11:45:00', 'Missed', '4500', 'On November 15th, 2024, at 11:45 AM, food wrappers and plastic waste were scattered near a park in F-9, Islamabad. The area, being a popular spot for picnics, often sees visitors leaving their trash behind after their outings. Authorities were unable to issue a fine due to the timing of the event, but the littering problem in the area remains a concern.'),
    (33.6938, 73.0651, 'Littering near H-8, Islamabad', '2024-03-19 12:15:00', 'Paid', '2500', 'On March 19th, 2024, at 12:15 PM, plastic and paper waste was found near a bus terminal in H-8, Islamabad. Passengers were observed discarding wrappers and bottles due to a lack of nearby trash receptacles. A fine was issued, and authorities are now working on improving waste disposal options around transportation hubs.'),
    (33.6864, 73.0550, 'Littering near I-10, Islamabad', '2024-06-05 13:30:00', 'Pending', '3000', 'On June 5th, 2024, at 13:30 PM, plastic bags and wrappers were found scattered along the sidewalk near a shopping mall in I-10, Islamabad. The litter appeared to have been discarded by shoppers who failed to use nearby trash bins. Authorities are investigating the situation, and plans for improving waste management in the area are underway.'),
    (33.6792, 73.0473, 'Littering near F-4, Islamabad', '2024-09-25 14:10:00', 'Paid', '2000', 'On October 1st, 2024, at 14:45 PM, cigarette butts and plastic wrappers were discovered on the streets near G-5, Islamabad. The littering was attributed to pedestrians who ignored nearby trash bins. Authorities acted swiftly to issue a fine and are working on increasing awareness about proper waste disposal in public spaces.'),
    (33.6967, 73.0589, 'Littering near G-12, Islamabad', '2024-01-12 15:45:00', 'Missed', '2500', 'On December 1st, 2024, at 15:30 PM, food wrappers and plastic bottles were found discarded near a popular shopping mall in G-4, Islamabad. The litter appeared to have been discarded by shoppers who consumed snacks on the go. Investigations are ongoing, and local authorities are working on improving waste disposal solutions in the area.'),
    (33.6755, 73.0615, 'Littering near G-13, Islamabad', '2024-03-29 16:30:00', 'Pending', '3500', 'On March 29th, 2024, at 16:30 PM, plastic and food waste was found discarded near G-13, Islamabad. Investigations revealed that the litter was left behind by pedestrians and shop visitors. The waste consisted primarily of plastic wrappers and food containers. The fine status is currently pending as authorities continue to assess the situation.'),
    (33.6907, 73.0460, 'Littering near E-11, Islamabad', '2024-07-14 17:25:00', 'Paid', '2700', 'On July 14th, 2024, at 17:25 PM, plastic bags and wrappers were discovered near E-11, Islamabad. The waste was attributed to people consuming food and beverages in the area. Local authorities issued a fine, and the waste was promptly cleaned up. The status of the fine is marked as paid.'),
    (33.6852, 73.0601, 'Littering near I-11, Islamabad', '2024-10-10 18:50:00', 'Pending', '3200', 'On October 10th, 2024, at 18:50 PM, plastic bottles and packaging were found scattered near I-11, Islamabad. The litter was likely discarded by commuters or passersby who failed to dispose of their waste properly. Investigators are still looking into the matter, and the fine remains pending.'),
    (33.6800, 73.0629, 'Littering near F-12, Islamabad', '2024-02-08 19:30:00', 'Missed', '4000', 'On February 8th, 2024, at 19:30 PM, food wrappers and plastic waste were found near F-12, Islamabad. The littering was seen as a result of individuals consuming food in public areas and discarding the packaging without using available waste bins. The authorities missed the opportunity to issue a fine at the time, and the incident was marked as missed.'),
    (33.6916, 73.0485, 'Littering near F-13, Islamabad', '2024-05-20 20:05:00', 'Paid', '2500', 'On May 20th, 2024, at 20:05 PM, plastic wrappers and bottles were discovered near F-13, Islamabad. The waste was left behind by visitors to a nearby shop or café. Authorities issued a fine, which was paid promptly, and the cleanup was conducted swiftly.'),
    (33.6731, 73.0540, 'Littering near H-11, Islamabad', '2024-09-16 21:10:00', 'Pending', '3300', 'On September 16th, 2024, at 21:10 PM, plastic bags and food containers were found near H-11, Islamabad. The litter was likely discarded by local residents or visitors to the area. The fine status is pending, as the authorities are still investigating the incident.'),
    (33.6928, 73.0569, 'Littering near D-13, Islamabad', '2024-11-12 22:20:00', 'Paid', '3000', 'On November 12th, 2024, at 22:20 PM, plastic bottles and food wrappers were found scattered near D-13, Islamabad. The litter was attributed to people leaving the area after consuming food and drinks. A fine was issued and paid, and the waste was cleared from the area.');

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



---##################################################################
---##################################################################
---##################################################################
---##################################################################
---##################################################################
---##################################################################
---##################################################################
---##################################################################
---##################################################################
