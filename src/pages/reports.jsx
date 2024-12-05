import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import "../css/reports.css";

const data = [{ id: 1, name: "John Doe", location: "New York", fine: "Rs 2500", status: "Paid" },
  { id: 2, name: "Jane Smith", location: "Los Angeles", fine: "Rs 3000", status: "Pending" },
  { id: 3, name: "David Brown", location: "Chicago", fine: "Rs 1500", status: "Missed" },
  { id: 4, name: "Emily Davis", location: "Miami", fine: "Rs 2000", status: "Paid" },
  { id: 5, name: "Michael Wilson", location: "Dallas", fine: "Rs 4000", status: "Missed" },
  { id: 6, name: "Sarah Johnson", location: "San Francisco", fine: "Rs 3500", status: "Pending" },
  { id: 7, name: "William Taylor", location: "Boston", fine: "Rs 2800", status: "Paid" },
  { id: 8, name: "Linda Martinez", location: "Seattle", fine: "Rs 2200", status: "Pending" },
  { id: 9, name: "James Anderson", location: "Houston", fine: "Rs 3100", status: "Missed" },
  { id: 10, name: "Mary Thomas", location: "Austin", fine: "Rs 2700", status: "Paid" },
  { id: 11, name: "Robert Jackson", location: "Detroit", fine: "Rs 1800", status: "Pending" },
  { id: 12, name: "Patricia White", location: "Phoenix", fine: "Rs 3500", status: "Missed" },
  { id: 13, name: "Charles Harris", location: "San Diego", fine: "Rs 2500", status: "Paid" },
  { id: 14, name: "Elizabeth Clark", location: "Dallas", fine: "Rs 2000", status: "Pending" },
  { id: 15, name: "Thomas Lewis", location: "Orlando", fine: "Rs 4000", status: "Missed" },
  { id: 16, name: "Jessica Walker", location: "Atlanta", fine: "Rs 3000", status: "Paid" },
  { id: 17, name: "Daniel Hall", location: "Chicago", fine: "Rs 3300", status: "Pending" },
  { id: 18, name: "Matthew Allen", location: "Miami", fine: "Rs 2500", status: "Missed" },
  { id: 19, name: "Ashley Young", location: "Los Angeles", fine: "Rs 3200", status: "Paid" },
  { id: 20, name: "Joshua King", location: "New York", fine: "Rs 2200", status: "Pending" },
  { id: 21, name: "Amanda Scott", location: "Chicago", fine: "Rs 2900", status: "Missed" },
  { id: 22, name: "Joseph Adams", location: "Dallas", fine: "Rs 4000", status: "Paid" },
  { id: 23, name: "Deborah Nelson", location: "Austin", fine: "Rs 1800", status: "Pending" },
  { id: 24, name: "Mark Carter", location: "Boston", fine: "Rs 3500", status: "Missed" },
  { id: 25, name: "Jessica Mitchell", location: "Miami", fine: "Rs 2800", status: "Paid" },
  { id: 26, name: "Paul Perez", location: "San Francisco", fine: "Rs 2500", status: "Pending" },
  { id: 27, name: "Karen Robinson", location: "Dallas", fine: "Rs 2200", status: "Missed" },
  { id: 28, name: "Steven Moore", location: "Houston", fine: "Rs 3100", status: "Paid" },
  { id: 29, name: "Nancy Lee", location: "Los Angeles", fine: "Rs 3000", status: "Pending" },
  { id: 30, name: "Jeffrey Harris", location: "San Diego", fine: "Rs 2700", status: "Missed" },
  { id: 31, name: "Laura Garcia", location: "Chicago", fine: "Rs 3200", status: "Paid" },
  { id: 32, name: "Kevin Gonzalez", location: "Austin", fine: "Rs 3500", status: "Pending" },
  { id: 33, name: "Andrew Martinez", location: "New York", fine: "Rs 2000", status: "Missed" },
  { id: 34, name: "Karen Robinson", location: "Los Angeles", fine: "Rs 2500", status: "Paid" },
  { id: 35, name: "Joshua Scott", location: "Miami", fine: "Rs 3000", status: "Pending" },
  { id: 36, name: "Megan Turner", location: "Dallas", fine: "Rs 1800", status: "Missed" },
  { id: 37, name: "Richard Thomas", location: "San Francisco", fine: "Rs 3500", status: "Paid" },
  { id: 38, name: "Susan Carter", location: "Houston", fine: "Rs 2500", status: "Pending" },
  { id: 39, name: "Chris Clark", location: "Chicago", fine: "Rs 3200", status: "Missed" },
  { id: 40, name: "Emily Walker", location: "Austin", fine: "Rs 4000", status: "Paid" },
  { id: 41, name: "Steven Harris", location: "New York", fine: "Rs 2700", status: "Pending" },
  { id: 42, name: "William Johnson", location: "San Francisco", fine: "Rs 3300", status: "Missed" },
  { id: 43, name: "John King", location: "Dallas", fine: "Rs 2500", status: "Paid" },
  { id: 44, name: "Rebecca Allen", location: "Miami", fine: "Rs 2800", status: "Pending" },
  { id: 45, name: "George Lewis", location: "Houston", fine: "Rs 1500", status: "Missed" },
  { id: 46, name: "Daniel White", location: "San Francisco", fine: "Rs 2000", status: "Paid" },
  { id: 47, name: "Patricia Scott", location: "Austin", fine: "Rs 2200", status: "Pending" },
  { id: 48, name: "David Lee", location: "Los Angeles", fine: "Rs 3000", status: "Missed" },
  { id: 49, name: "Lisa Johnson", location: "Miami", fine: "Rs 2500", status: "Paid" },
  { id: 50, name: "James Wright", location: "Dallas", fine: "Rs 3500", status: "Pending" },
  { id: 51, name: "Andrew Thomas", location: "Houston", fine: "Rs 2700", status: "Missed" },
  { id: 52, name: "Barbara King", location: "New York", fine: "Rs 3000", status: "Paid" },
  { id: 53, name: "Michael Perez", location: "San Francisco", fine: "Rs 2200", status: "Pending" },
  { id: 54, name: "Sophia Clark", location: "Chicago", fine: "Rs 4000", status: "Missed" },
  { id: 55, name: "Lucas Adams", location: "Dallas", fine: "Rs 3200", status: "Paid" },
  { id: 56, name: "Charlotte Scott", location: "Miami", fine: "Rs 1500", status: "Pending" },
  { id: 57, name: "Jason Wright", location: "San Francisco", fine: "Rs 2500", status: "Missed" },
  { id: 58, name: "Amanda Lewis", location: "Houston", fine: "Rs 2800", status: "Paid" },
  { id: 59, name: "Nathan Perez", location: "Los Angeles", fine: "Rs 3500", status: "Pending" },
  { id: 60, name: "Laura White", location: "New York", fine: "Rs 2000", status: "Missed" },
];

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredData = data.filter(row => 
    (row.name.toLowerCase().includes(searchTerm.toLowerCase()) || row.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter ? row.status === statusFilter : true) &&
    (locationFilter ? row.location === locationFilter : true)
  );

  const getStatusColor = status => ({ Paid: "#C0F2C9", Pending: "#CCCFEB", Missed: "#FAC8C9" }[status] || "#ffffff");

  const handleRowClick = row => alert(`Row clicked: ${row.name}, Status: ${row.status}`);

  return (
    <div className="Reports-list">
      <h2>List of Fines</h2>

      <div className="filters">
        <TextField label="Search" variant="outlined" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ marginBottom: 20, width: 200 }} />
        <FormControl variant="outlined" style={{ marginBottom: 20, minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} label="Status">
            <MenuItem value=""><em>All</em></MenuItem>
            {["Paid", "Pending", "Missed"].map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ marginBottom: 20, minWidth: 200 }}>
          <InputLabel>Location</InputLabel>
          <Select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} label="Location">
            <MenuItem value=""><em>All</em></MenuItem>
            {[...new Set(data.map(row => row.location))].map(location => <MenuItem key={location} value={location}>{location}</MenuItem>)}
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              {["Name of Offender", "Location", "Fine", "Status"].map(header => <TableCell key={header} className="table-header">{header}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map(row => (
              <TableRow key={row.id} className="table-row" onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.fine}</TableCell>
                <TableCell>
                  <Button style={{ backgroundColor: getStatusColor(row.status), color: "black", borderRadius: 20, padding: "8px 20px", fontWeight: 600 }}>
                    {row.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Reports;


// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import axios from 'axios';
// import { TextField, Button } from '@mui/material';

// function ReverseGeocodingMap() {
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');
//   const [address, setAddress] = useState('');
//   const [position, setPosition] = useState([51.505, -0.09]); // Default to a London location

//   // Function to handle manual input of latitude and longitude
//   const handleGeocode = async () => {
//     if (!latitude || !longitude) {
//       alert('Please enter both latitude and longitude.');
//       return;
//     }

//     // Fetch the address using OpenStreetMap Nominatim API
//     const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

//     try {
//       const response = await axios.get(apiUrl);
//       const data = response.data;
//       if (data && data.display_name) {
//         setAddress(data.display_name);
//         setPosition([latitude, longitude]);
//       } else {
//         setAddress('Address not found');
//       }
//     } catch (error) {
//       console.error('Error fetching address:', error);
//       setAddress('Error fetching address');
//     }
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
//       <h2>Reverse Geocoding with Leaflet</h2>
      
//       <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <TextField
//           label="Latitude"
//           type="number"
//           variant="outlined"
//           value={latitude}
//           onChange={(e) => setLatitude(e.target.value)}
//           style={{ marginBottom: '10px', width: '300px' }}
//         />
//         <TextField
//           label="Longitude"
//           type="number"
//           variant="outlined"
//           value={longitude}
//           onChange={(e) => setLongitude(e.target.value)}
//           style={{ marginBottom: '10px', width: '300px' }}
//         />
//         <Button variant="contained" onClick={handleGeocode} style={{ marginBottom: '20px' }}>Get Address</Button>
//       </div>

//       <p>Address: {address}</p>

//       <MapContainer center={position} zoom={13} style={{ width: '100%', height: '500px' }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Marker position={position}>
//           <Popup>{address}</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// }

// export default ReverseGeocodingMap;
