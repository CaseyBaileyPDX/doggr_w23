export function response(httpModuleRes) {
    function end(content) {
        httpModuleRes.setHeader("Content-Length", content.length);
        if (! httpModuleRes.statusCode) {
            console.error("Status code unset during end");
            httpModuleRes.status(200);
        }
        httpModuleRes.end(content);
        return httpModuleRes;
    }

    httpModuleRes.status = (code) => {
        httpModuleRes.statusCode = code || httpModuleRes.statusCode;
        console.log("Setting status code to: " + code);
        return httpModuleRes;
    }

    httpModuleRes.send = (content) => {
        httpModuleRes.setHeader("Content-Type", "text/html");
        return end(content);
    }

    httpModuleRes.json = (content) => {
        content = JSON.stringify(content);
        httpModuleRes.setHeader("Content-Type", "application/json");
        return end(content);
    }

    httpModuleRes.redirect = (url) => {
        httpModuleRes.setHeader("Location", url);
        httpModuleRes.status(301);
        httpModuleRes.end();
        return httpModuleRes;
    };
}
