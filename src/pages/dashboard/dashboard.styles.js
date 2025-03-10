import { height, maxHeight } from "@mui/system";

const styles = {
  dashboard: {
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    top: 0,
    left: '300px',
    backgroundColor: '#F4F7F8',
    padding: '20px',
  },
  dashboardHeader: {
    fontFamily: "'Source Sans Pro', sans-serif",
    fontSize: '1.5rem',
    color: '#212529',
    paddingLeft: '40px',
    fontWeight: 'bold',
  },
  dashboardContent: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px',
  },
  chartRow: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    marginTop: '20px',
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: '25px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '40%',
    maxWidth: '48%',
  },
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  chartWrapper: {
    width: '100%',
    height: '370px',
    overflow: 'hidden',
  },
  dropdown: {
    padding: '5px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  mapContainer: {
    width: '40%',
    height: '500px',
    borderRadius: '25px',
    overflow: 'hidden',
  },
  headerText: {
    fontSize: '20px',
    color: '#333',
    fontWeight: 'bold',
  },
};

export default styles;
