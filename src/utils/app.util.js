const DEFAULT_ROUTE = process.env.DEFAULT_ROUTE || '/api/v1';

function setupRoutes(app, routes) {
    routes.forEach(route => {
        let path = DEFAULT_ROUTE + route.path;
        app.use(path, route.router);
    });
    
}

export { setupRoutes };