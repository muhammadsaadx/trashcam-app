
const styles = {
  container: {
    background: '#f8fafb',
    minHeight: '100vh',
    padding: '2rem calc(300px + 2rem)',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#2d3436',
    letterSpacing: '-0.5px',
    margin: 0,
  },
  reportId: {
    fontSize: '1rem',
    color: '#636e72',
    fontWeight: '500',
    backgroundColor: '#f5fbf7',
    padding: '0.5rem 1.2rem',
    borderRadius: '8px',
  },
  row: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
    '@media (max-width: 768px)': {
      flexDirection: 'column'
    }
  },
  content: {
    flex: 1,
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    minWidth: '300px',
  },
  detailsText: {
    textAlign: 'justify',
    marginTop: '0.5rem',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
  spinner: {
    color: '#2ecc71',
    marginBottom: '1rem',
  },
  loadingText: {
    color: '#636e72',
    fontSize: '1.1rem',
    marginTop: '1rem',
  },
  '@media (max-width: 768px)': {
    container: {
      padding: '1rem',
    },
  },
};

export default styles;