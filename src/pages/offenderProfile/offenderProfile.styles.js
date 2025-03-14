const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    borderBottom: '2px solid #dcdcdc',
    paddingBottom: '12px',
  },
  title: {
    fontSize: '26px',
    fontWeight: 'bold',
    margin: 0,
    color: '#222',
  },
  reportId: {
    fontSize: '18px',
    color: '#555',
    fontWeight: 'bold',
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '20px',
  },
  reportDetails: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    borderLeft: '5px solid #1976d2',
  },
  detailsText: {
    whiteSpace: 'pre-wrap',
    lineHeight: '1.6',
    color: '#333',
    marginTop: '8px',
    backgroundColor: '#fff',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    textAlign: 'center',
  },
  spinner: {
    color: '#1976d2',
    marginBottom: '16px',
  },
  loadingText: {
    color: '#444',
    fontSize: '17px',
    fontWeight: '500',
  },
};

export default styles;
