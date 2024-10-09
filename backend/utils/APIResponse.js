import { Response } from 'express';

class APIResponse {
    static success(res, message = 'Request successful', data) {
      return res.status(200).json({
        status: 'success',
        message,
        data
      });
    }
  
    static error(res: Response, message = 'Something went wrong', statusCode = 400) {
      const response = {
        status: 'error',
        message
      }
      return res.status(statusCode).json(response);
    }  
}
  
export default APIResponse;  