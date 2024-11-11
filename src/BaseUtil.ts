enum ResponseCode {
    OK = 200,
    BAD_REQUEST = 400
}

function r(code: ResponseCode, data?: object): Response {
    return new Response(JSON.stringify({
        code,
        data
    }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


export { r, ResponseCode }
