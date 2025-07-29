export interface APIError {
  message: string;
  isUpgradeRequired: boolean;
  statusCode?: number;
}

interface ErrorResponse {
  response?: {
    data?: {
      error?: string;
    };
    status?: number;
  };
}

export function handleAPIError(error: unknown): APIError {
  // Handle Axios errors
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as ErrorResponse;
    const message = axiosError.response?.data?.error || 'An unexpected error occurred';
    const statusCode = axiosError.response?.status;
    
    // Check if this is a PRO plan requirement error
    const isUpgradeRequired = statusCode === 403 && 
      (message.includes('PRO') || message.includes('LIFETIME') || message.includes('upgrade'));
    
    return {
      message,
      isUpgradeRequired,
      statusCode
    };
  }
  
  // Handle standard Error objects
  if (error instanceof Error) {
    return {
      message: error.message,
      isUpgradeRequired: false
    };
  }
  
  // Handle unknown errors
  return {
    message: 'An unexpected error occurred',
    isUpgradeRequired: false
  };
}

export function isProFeatureError(error: unknown): boolean {
  const apiError = handleAPIError(error);
  return apiError.isUpgradeRequired;
}
