CREATE TABLE litter (
    litterid SERIAL PRIMARY KEY,
    trashtype VARCHAR(50) UNIQUE,
    trashamount DECIMAL
);

CREATE TABLE offenders (
    offenderid SERIAL PRIMARY KEY,
    name VARCHAR(100),
    cnic VARCHAR(20),
    address TEXT
);

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

CREATE TABLE report_litter (
    reportid INT REFERENCES reports(reportid),
    litterid INT REFERENCES litter(litterid),
    PRIMARY KEY (reportid, litterid)
);


CREATE TABLE report_offenders (
    reportid INT REFERENCES reports(reportid),
    offenderid INT REFERENCES offenders(offenderid),
    PRIMARY KEY (reportid, offenderid)
);


CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    phonenumber VARCHAR(20),
    email VARCHAR(100),
    passwordhash TEXT,
    isloggedin BOOLEAN,
    typeofuser VARCHAR(50)
);

CREATE TABLE user_reports (
    userid INT REFERENCES users(userid),
    reportid INT REFERENCES reports(reportid),
    PRIMARY KEY (userid, reportid)
);










--********************************STATIC TABLESSSSS

CREATE TABLE cities (
    CityID SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE area (
    AreaID SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    CityID INT NOT NULL,
    FOREIGN KEY (CityID) REFERENCES cities(CityID) ON DELETE CASCADE
);