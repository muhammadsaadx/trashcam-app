-- Drop the user_reports table first (because it references users and reports)
DROP TABLE IF EXISTS user_reports;

-- Drop the report_offenders table (because it references reports and offenders)
DROP TABLE IF EXISTS report_offenders;

-- Drop the report_litter table (because it references reports and litter)
DROP TABLE IF EXISTS report_litter;

-- Drop the reports table (because it is referenced by report_litter and report_offenders)
DROP TABLE IF EXISTS reports;

-- Drop the offenders table (because it is referenced by report_offenders)
DROP TABLE IF EXISTS offenders;

-- Drop the litter table
DROP TABLE IF EXISTS litter;

-- Drop the users table (because it is referenced by user_reports)
DROP TABLE IF EXISTS users;


SELECT 
                        o.name AS name,
                        o.cnic AS cnic,
                        r.latitude AS location_latitude,
                        r.longitude AS location_longitude,
                        r.locationStr AS Location,
                        r.fineissued AS fine,
                        r.fineStatus as status,
                        r.reportid AS id
                FROM 
                        offenders o
                JOIN 
                        report_offenders ro ON o.offenderid = ro.offenderid
                JOIN 
                        reports r ON ro.reportid = r.reportid