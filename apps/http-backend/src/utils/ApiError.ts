// Agar api errors aaenge to aise hi aaenge humare pass

class ApiError extends Error
{
    statusCode: number;
    errors: unknown[];
    data: any;
    success: boolean;

    constructor(
        statusCode: number,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.stack = stack;
        this.data = null;
        this.success = false;

        if (stack) {
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }

        this.name = this.constructor.name;
    }
}

export {ApiError}