-- Drop tables with foreign key dependencies first
DROP TABLE IF EXISTS user_reports;
DROP TABLE IF EXISTS report_offenders;
DROP TABLE IF EXISTS report_litter;
DROP TABLE IF EXISTS area;
DROP TABLE IF EXISTS users;

-- Drop parent tables
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS offenders;
DROP TABLE IF EXISTS litter;
DROP TABLE IF EXISTS cities;
