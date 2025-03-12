
CREATE TABLE litter (
    litterid SERIAL PRIMARY KEY,
    trashtype VARCHAR(50) UNIQUE,
    trashamount DECIMAL
);

-- Create the offenders table
CREATE TABLE offenders (
    offenderid SERIAL PRIMARY KEY,
    name VARCHAR(100),
    cnic VARCHAR(20),
    address TEXT
);

-- Create the reports table with a unique constraint on a combination of infodetails and timestamp
CREATE TABLE reports (
    reportid SERIAL PRIMARY KEY,
    latitude DECIMAL,
    longitude DECIMAL,
	locationStr TEXT,
    timestamp TIMESTAMP,
    fineStatus VARCHAR(20),
    fineIssued VARCHAR(20),
    infodetails TEXT
);

-- Create the report_litter table with a composite primary key on reportid and litterid
CREATE TABLE report_litter (
    reportid INT REFERENCES reports(reportid),
    litterid INT REFERENCES litter(litterid),
    PRIMARY KEY (reportid, litterid)
);


-- Create the report_offenders table to establish the many-to-many relationship
CREATE TABLE report_offenders (
    reportid INT REFERENCES reports(reportid),
    offenderid INT REFERENCES offenders(offenderid),
    PRIMARY KEY (reportid, offenderid)
);


-- Create the users table with a unique constraint on name
CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    phonenumber VARCHAR(20),
    email VARCHAR(100),
    passwordhash TEXT,
    isloggedin BOOLEAN,
    typeofuser VARCHAR(50)
);

-- Create the user_reports table with a composite primary key on userid and reportid
CREATE TABLE user_reports (
    userid INT REFERENCES users(userid),
    reportid INT REFERENCES reports(reportid),
    PRIMARY KEY (userid, reportid)
);






















