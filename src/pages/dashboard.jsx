import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import '../css/dashboard.css';
import config from '../config/config';

const Dashboard = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [hotPoints, sethotPoints] = useState([]);

  const fetchData = async (year) => {
    try {
      const [yearsData, litterData] = await Promise.all([
        axios.get(`${config.API_BASE_URL}/dashboard/get_list_of_years`),
        axios.get(`${config.API_BASE_URL}/dashboard/get_litter_data`, { params: { year } })
      ]);
      setYears(yearsData.data);
      setData(litterData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchHotPoints = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/dashboard/get_hot_points`);
      sethotPoints(response.data);
    } catch (error) {
      console.error("Error fetching hot points:", error);
    }
  };

  const HeatmapLayer = () => {
    const map = useMap();
  
    useEffect(() => {
      if (hotPoints.length) {
        const heatLayer = L.heatLayer(hotPoints, { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);
        return () => heatLayer.remove();
      }
    }, [map, hotPoints]);  // Depend on hotPoints to re-render heatmap when they change
  
    return null;
  };
  


  useEffect(() => {
    fetchHotPoints();
  }, []);


  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>
      <div className="dashboard-content">

        <div className="chart-row">
          <ChartCard title="Litter Rate" data={data} years={years} selectedYear={selectedYear} onYearChange={setSelectedYear} />
          <MapContainer id="map" className="map-container" center={[33.6844, 73.0479]} zoom={12}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            <HeatmapLayer />
          </MapContainer>
        </div>


      </div>
    </div>

  );
  
  
};

const ChartCard = ({ title, data, years, selectedYear, onYearChange }) => (
  <div className="chart-card">
    <div className="chart-header">
      <h2>{title}</h2>
      <select className="data-selector" value={selectedYear} onChange={(e) => onYearChange(e.target.value)}>
        {years.map((year) => <option key={year} value={year}>{year}</option>)}
      </select>
    </div>
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="incidents" stroke="#06715A" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default Dashboard;



























// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// // import '../css/dashboard.css';
// // import config from '../config/config';


// // function Dashboard() {
// //   const [data, setData] = useState([]);
// //   const [years, setYears] = useState([]);
// //   const [selectedYear, setSelectedYear] = useState('2024');


  
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const yearsData = await fetchYears();
// //         setYears(yearsData);
        
// //         setSelectedYear(String(yearsData[0])); 

// //         const litterData = await fetchLitterData(selectedYear);
// //         setData(litterData);

// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       }
// //     };
    
// //     fetchData();
// //   }, []);

// //   const fetchLitterData = async (year) => {
// //     try {
// //       const response = await axios.get(`${config.API_BASE_URL}/dashboard/get_litter_data`, {
// //         params: { year },
// //       });
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error fetching litter data:', error);
// //       return [];
// //     }
// //   };

// //   const fetchYears = async () => {
// //     try {
// //       const response = await axios.get(`${config.API_BASE_URL}/dashboard/get_list_of_years`);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error fetching years:', error);
// //       return [];
// //     }
// //   };

// //   const handleYearChange = async (e) => {
// //     const selectedYear = e.target.value;
// //     setSelectedYear(selectedYear);
    
// //     const litterData = await fetchLitterData(selectedYear);
// //     setData(litterData);
// //   };

// //   return (
// //     <div className="dashboard">
// //       <header className="dashboard-header">
// //         <h1>Dashboard</h1>
// //       </header>
// //       <div className="dashboard-content">
// //         <div className="chart-row">
// //           <ChartCard 
// //             title="Litter Rate" 
// //             data={data} 
// //             years={years} 
// //             onYearChange={handleYearChange} 
// //             selectedYear={selectedYear} 
// //           />
          
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function ChartCard({ title, data, years, onYearChange, selectedYear }) {
// //   return (
// //     <div className="chart-card">
// //       <div className="chart-header">
// //         <h2>{title}</h2>
// //         <select 
// //           onChange={onYearChange} 
// //           className="data-selector" 
// //           value={selectedYear}
// //         >
// //           {years.map((year) => (
// //             <option key={year} value={year}>
// //               {year}
// //             </option>
// //           ))}
// //         </select>
// //       </div>
// //       <div className="chart-wrapper">
// //         <ResponsiveContainer width="100%" height="100%">
// //           <LineChart data={data}>
// //             <XAxis dataKey="month" />
// //             <YAxis />
// //             <Tooltip />
// //             <Legend />
// //             <Line type="monotone" dataKey="incidents" stroke="#06715A" strokeWidth={2} />
// //           </LineChart>
// //         </ResponsiveContainer>
// //       </div>
// //     </div>
// //   );
// // }




// // export default Dashboard;






// // // // export default Heatmaps;
// // // import React, { useEffect, useState } from 'react';
// // // import { MapContainer, TileLayer, useMap } from 'react-leaflet';
// // // import L from 'leaflet';
// // // import 'leaflet/dist/leaflet.css';
// // // import 'leaflet.heat';

// // // const HeatmapLayer = ({ heatmapData }) => {
// // //   const map = useMap();
// // //   useEffect(() => {
// // //     const heatLayer = L.heatLayer(heatmapData, { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);
// // //     return () => heatLayer.remove();
// // //   }, [heatmapData, map]);
// // //   return null;
// // // };

// // // const Heatmaps = () => {
// // //   const [heatmapData, setHeatmapData] = useState([]);
  
// // //   const getAddress = async (lat, lon) => {
// // //     try {
// // //       const response = await fetch(`https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1&lang=en`);
// // //       if (!response.ok) throw new Error('Failed to fetch address');
// // //       const data = await response.json();
// // //       return data.display_name;
// // //     } catch {
// // //       return 'Address not found';
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     const hotPoints = [
// // //       [33.6844, 73.0479], [33.6900, 73.0740], [33.6815, 73.0600], [33.7000, 73.0500], [33.6902, 73.0482], [33.6850, 73.0624], [33.6785, 73.0570], [33.6937, 73.0752], [33.6894, 73.0626], [33.6812, 73.0645], [33.6875, 73.0596], [33.6881, 73.0658], [33.6820, 73.0692], [33.6985, 73.0570], [33.6956, 73.0499], [33.6830, 73.0568],
// // //       [33.6873, 73.0505], [33.6880, 73.0733], [33.6909, 73.0561], [33.6927, 73.0611], [33.6945, 73.0607], [33.6823, 73.0683], [33.6905, 73.0663], [33.6898, 73.0680], [33.6914, 73.0678], [33.6932, 73.0696], [33.6921, 73.0515], [33.6869, 73.0724], [33.6867, 73.0635], [33.6826, 73.0553], [33.6952, 73.0619], [33.6899, 73.0640],
// // //       [33.6901, 73.0576], [33.6848, 73.0720], [33.6953, 73.0503], [33.6818, 73.0702], [33.6900, 73.0535], [33.6884, 73.0694], [33.6872, 73.0566], [33.6923, 73.0627], [33.6912, 73.0613], [33.6864, 73.0684], [33.6841, 73.0610], [33.6895, 73.0572], [33.6943, 73.0630], [33.6863, 73.0599], [33.6917, 73.0563], [33.6870, 73.0652],
// // //       [33.6947, 73.0592], [33.6876, 73.0735], [33.6903, 73.0642], [33.6935, 73.0665], [33.6950, 73.0573], [33.6825, 73.0654], [33.6867, 73.0622], [33.6939, 73.0507], [33.6907, 73.0689], [33.6878, 73.0548], [33.6954, 73.0614], [33.6916, 73.0726], [33.6931, 73.0679], [33.6885, 73.0598], [33.6903, 73.0624], [33.6930, 73.0650],
// // //       [33.6861, 73.0582], [33.6874, 73.0708], [33.6925, 73.0556], [33.6887, 73.0612], [33.6906, 73.0635], [33.6922, 73.0641], [33.6845, 73.0657], [33.6934, 73.0518], [33.6858, 73.0721], [33.6930, 73.0571], [33.6919, 73.0638], [33.6849, 73.0703], [33.6928, 73.0620], [33.6871, 73.0667], [33.6904, 73.0648], [33.6889, 73.0630],
// // //       [33.6902, 73.0594], [33.6938, 73.0657], [33.6951, 73.0585], [33.6842, 73.0670], [33.6862, 73.0632], [33.6935, 73.0626], [33.6900, 73.0660], [33.6875, 73.0574], [33.6921, 73.0617], [33.6934, 73.0582], [33.6844, 73.0682], [33.6910, 73.0655], [33.6908, 73.0639], [33.6937, 73.0622], [33.6893, 73.0650], [33.6952, 73.0615],
// // //       [33.6880, 73.0623], [33.6926, 73.0629], [33.6905, 73.0614], [33.6870, 73.0625], [33.6929, 73.0645], [33.6843, 73.0618], [33.6901, 73.0571], [33.6931, 73.0642], [33.6907, 73.0693], [33.6873, 73.0629], [33.6918, 73.0619], [33.6925, 73.0654], [33.6900, 73.0593], [33.6866, 73.0677], [33.6933, 73.0603], [33.6854, 73.0656],
// // //       [33.6927, 73.0637], [33.6891, 73.0651], [33.6889, 73.0644], [33.6902, 73.0621], [33.6955, 73.0633], [33.6864, 73.0609], [33.6923, 73.0625], [33.6884, 73.0601]
// // //     ];
    

// // //     setHeatmapData(hotPoints);
// // //   }, []);

// // //   return (
// // //     <MapContainer id="map" style={{ width: '100%', height: '500px' }} center={[33.6844, 73.0479]} zoom={12}>
// // //       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
// // //       <HeatmapLayer heatmapData={heatmapData} />
// // //     </MapContainer>
// // //   );
// // // };

// // // export default Heatmaps;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import '../css/dashboard.css';
// import config from '../config/config';
// import { MapContainer, TileLayer, useMap } from 'react-leaflet'; // Add necessary imports
// import L from 'leaflet'; // Ensure Leaflet is imported
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.heat'; // Import leaflet heat for heatmap functionality

// const hotPoints = [
//   [33.6844, 73.0479], [33.6900, 73.0740], [33.6815, 73.0600], [33.7000, 73.0500], [33.6902, 73.0482], [33.6850, 73.0624], [33.6785, 73.0570], [33.6937, 73.0752], [33.6894, 73.0626], [33.6812, 73.0645], [33.6875, 73.0596], [33.6881, 73.0658], [33.6820, 73.0692], [33.6985, 73.0570], [33.6956, 73.0499], [33.6830, 73.0568],
//   [33.6873, 73.0505], [33.6880, 73.0733], [33.6909, 73.0561], [33.6927, 73.0611], [33.6945, 73.0607], [33.6823, 73.0683], [33.6905, 73.0663], [33.6898, 73.0680], [33.6914, 73.0678], [33.6932, 73.0696], [33.6921, 73.0515], [33.6869, 73.0724], [33.6867, 73.0635], [33.6826, 73.0553], [33.6952, 73.0619], [33.6899, 73.0640],
//   [33.6901, 73.0576], [33.6848, 73.0720], [33.6953, 73.0503], [33.6818, 73.0702], [33.6900, 73.0535], [33.6884, 73.0694], [33.6872, 73.0566], [33.6923, 73.0627], [33.6912, 73.0613], [33.6864, 73.0684], [33.6841, 73.0610], [33.6895, 73.0572], [33.6943, 73.0630], [33.6863, 73.0599], [33.6917, 73.0563], [33.6870, 73.0652],
//   [33.6947, 73.0592], [33.6876, 73.0735], [33.6903, 73.0642], [33.6935, 73.0665], [33.6950, 73.0573], [33.6825, 73.0654], [33.6867, 73.0622], [33.6939, 73.0507], [33.6907, 73.0689], [33.6878, 73.0548], [33.6954, 73.0614], [33.6916, 73.0726], [33.6931, 73.0679], [33.6885, 73.0598], [33.6903, 73.0624], [33.6930, 73.0650],
//   [33.6861, 73.0582], [33.6874, 73.0708], [33.6925, 73.0556], [33.6887, 73.0612], [33.6906, 73.0635], [33.6922, 73.0641], [33.6845, 73.0657], [33.6934, 73.0518], [33.6858, 73.0721], [33.6930, 73.0571], [33.6919, 73.0638], [33.6849, 73.0703], [33.6928, 73.0620], [33.6871, 73.0667], [33.6904, 73.0648], [33.6889, 73.0630],
//   [33.6902, 73.0594], [33.6938, 73.0657], [33.6951, 73.0585], [33.6842, 73.0670], [33.6862, 73.0632], [33.6935, 73.0626], [33.6900, 73.0660], [33.6875, 73.0574], [33.6921, 73.0617], [33.6934, 73.0582], [33.6844, 73.0682], [33.6910, 73.0655], [33.6908, 73.0639], [33.6937, 73.0622], [33.6893, 73.0650], [33.6952, 73.0615],
//   [33.6880, 73.0623], [33.6926, 73.0629], [33.6905, 73.0614], [33.6870, 73.0625], [33.6929, 73.0645], [33.6843, 73.0618], [33.6901, 73.0571], [33.6931, 73.0642], [33.6907, 73.0693], [33.6873, 73.0629], [33.6918, 73.0619], [33.6925, 73.0654], [33.6900, 73.0593], [33.6866, 73.0677], [33.6933, 73.0603], [33.6854, 73.0656],
//   [33.6927, 73.0637], [33.6891, 73.0651], [33.6889, 73.0644], [33.6902, 73.0621], [33.6955, 73.0633], [33.6864, 73.0609], [33.6923, 73.0625], [33.6884, 73.0601]
// ];

// function Dashboard() {
//   const [data, setData] = useState([]);
//   const [years, setYears] = useState([]);
//   const [selectedYear, setSelectedYear] = useState('2024');
//   const [heatmapData, setHeatmapData] = useState([]);

//   const fetchData = async (year) => {
//     try {
//       const [yearsData, litterData] = await Promise.all([
//         axios.get(`${config.API_BASE_URL}/dashboard/get_list_of_years`),
//         axios.get(`${config.API_BASE_URL}/dashboard/get_litter_data`, { params: { year } }),
//       ]);
//       setYears(yearsData.data);
//       setData(litterData.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const getAddress = async (lat, lon) => {
//     try {
//       const response = await fetch(`https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1&lang=en`);
//       if (!response.ok) throw new Error('Failed to fetch address');
//       const data = await response.json();
//       return data.display_name;
//     } catch {
//       return 'Address not found';
//     }
//   };

//   useEffect(() => {
//     fetchData(selectedYear);
//   }, [selectedYear]);

//   const HeatmapLayer = ({ heatmapData }) => {
//     const map = useMap(); // Access the map instance

//     useEffect(() => {
//       if (heatmapData.length > 0) {
//         const heatLayer = L.heatLayer(heatmapData, { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);
//         return () => heatLayer.remove();
//       }
//     }, [heatmapData, map]);

//     return null;
//   };

//   useEffect(() => {
//     setHeatmapData(hotPoints);
//   }, []);

//   return (
//     <div className="dashboard">
//       <header className="dashboard-header">
//         <h1>Dashboard</h1>
//       </header>
//       <div className="dashboard-content">
//         <ChartCard 
//           title="Litter Rate" 
//           data={data} 
//           years={years} 
//           selectedYear={selectedYear} 
//           onYearChange={(e) => setSelectedYear(e.target.value)} 
//         />
        
//         <MapContainer id="map" style={{ width: '100%', height: '500px' }} center={[33.6844, 73.0479]} zoom={12}>
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
//           <HeatmapLayer heatmapData={heatmapData} />
//         </MapContainer>
//       </div>
//     </div>
//   );
// }

// function ChartCard({ title, data, years, onYearChange, selectedYear }) {
//   return (
//     <div className="chart-card">
//       <div className="chart-header">
//         <h2>{title}</h2>
//         <select className="data-selector" value={selectedYear} onChange={onYearChange}>
//           {years.map((year) => <option key={year} value={year}>{year}</option>)}
//         </select>
//       </div>
//       <div className="chart-wrapper">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="incidents" stroke="#06715A" strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


