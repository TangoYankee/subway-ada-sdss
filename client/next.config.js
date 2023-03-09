module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/map',
                permanent: false,
            }
        ]
    }
}
