export function response(httpModuleRes) {
    function end(content) {
        if (httpModuleRes.getHeader("Content-Length") === undefined) {
            httpModuleRes.setHeader("Content-Length", content.length);
        }

        if (! httpModuleRes.statusCode) {
            console.log("Status code unset during end");
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
        const strContent = JSON.stringify(content);
        httpModuleRes.setHeader("Content-Type", "application/json");
        console.log("Sending json-ified results");
        httpModuleRes.end(strContent);
    }

    httpModuleRes.redirect = (url) => {
        httpModuleRes.setHeader("Location", url);
        httpModuleRes.status(301);
        httpModuleRes.end();
        return httpModuleRes;
    };
}
