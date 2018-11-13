module.exports = (app) => {
    // Responde status 200 (Ok) para monitoração do serviço
    app.get('/health', (req, res) => {
        res.status(200);
        res.send('OK.');
    });
};