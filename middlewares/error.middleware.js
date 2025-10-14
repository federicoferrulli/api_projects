function ErrorMiddleware(err, req, res, next){
    console.warn(`${new Date().toISOString()} ErrorMiddleware ${req.method}:${req.path}:${req.ip}:${err?.code}:${err?.message}`);
    console.warn(`${err?.stack}`);
    return res.status(err?.code).send({
        message: err?.message,
        path: req?.path,
        method: req?.method,
        stack: process?.env?.ENV  !== 'DEV' ? '--': err?.stack,
    });
}

export default ErrorMiddleware; 