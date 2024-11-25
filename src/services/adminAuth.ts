const ADMIN_CREDENTIALS = {
    phone: '1234567890',
    otp: '1234'
};

export const adminAuth = {
    login: async (phone: string, otp: string): Promise<boolean> => {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        return phone === ADMIN_CREDENTIALS.phone && otp === ADMIN_CREDENTIALS.otp;
    },

    isAuthenticated: (): boolean => {
        return localStorage.getItem('adminToken') === 'admin-authenticated';
    },

    setAuthenticated: () => {
        localStorage.setItem('adminToken', 'admin-authenticated');
    },

    logout: () => {
        localStorage.removeItem('adminToken');
    }
};
