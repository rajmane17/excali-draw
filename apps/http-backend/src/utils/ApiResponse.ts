// Try making this on your own
// yaha koi class extend nhi hogi kyuki hum response express ke through bhejte hai
// aur express hume aise koi class provide nhi krta

interface ApiResponseType {
    statusCode: number;
    data: Record<string, any>;
    message: string;
}

class ApiResponse implements ApiResponseType {
    statusCode: number;
    data: Record<string, any>;
    message: string;
    success: boolean;
    
    constructor(
        statusCode: number,
        data: Record<string, any>,
        message: string = "success"
    ) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }