function LoggerMiddleware(req, res, next){
    console.info(`${new Date().toISOString()} LoggerMiddleware ${req.method}:${req.path}:${req.ip}`)
    next();
}

export default LoggerMiddleware; 