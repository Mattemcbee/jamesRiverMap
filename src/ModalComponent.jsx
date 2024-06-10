const ModalComponent = ({ show, onClose, image }) => {
  if (!show) {
    return null;
  }

  return (
    <div style={{ ...modalStyles.overlay, zIndex: 1001 }}>
      <div style={modalStyles.content}>
        <img src={image} alt="Large view" style={{ width: '100%', height: 'auto' }} />
        <button onClick={onClose} style={modalStyles.closeButton}>Close</button>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '360px', // Adjust width as needed
    height: '360px', // Adjust height as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    background: 'white',
    borderRadius: '8px',
    padding:'5px',

    position: 'relative',
    width: '100%', // Adjust width as needed
    maxWidth: '600px',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  }
};

export default ModalComponent;
