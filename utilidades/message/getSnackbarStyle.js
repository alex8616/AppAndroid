export const getSnackbarStyle = (type) => {
    switch (type) {
        case 'success':
            return { backgroundColor: 'green', fontWeight: 'bold' };
        case 'warning':
            return { backgroundColor: 'orange', fontWeight: 'bold' };
        case 'error':
        default:
            return { backgroundColor: '#FF204E', fontWeight: 'bold' };
    }
};
