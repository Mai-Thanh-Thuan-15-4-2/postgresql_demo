export const ERROR_MESSAGES = {
    AUTHENTICATION_EXIT_CODE: {
      1001: 'No token provided.',
      1002: 'Invalid token.',
      1003: 'Expired token.',
    },
    AUTHORIZATION_EXIT_CODE: {
      2001: 'Access denied.',
    },
    VALIDATION_EXIT_CODE: {
      3001: 'Field cannot be empty.',
      3002: 'Invalid format.',
      3003: 'Value must be unique.',
      3004: 'Invalid length.',
      3005: 'Invalid character.',
      3006: 'Not found.',
      3007: 'No matching value.',
      3008: 'Invalid value.',
    },
    DATABASE_EXIT_CODE: {
      4001: 'Cannot connect to the database.',
      4002: 'Unauthorized access to the database.',
      4003: 'Database connection timeout.',
      4004: 'Database operator error.',
      4005: 'Lost connection to the database.',
      4006: 'Unique field value violation.',
      4007: 'Unknown database error.',
      4008: 'No content found in the database.',
    },
    FILE_EXIT_CODE: {
      5001: 'Invalid file extension.',
      5002: 'Invalid file size.',
      5003: 'Invalid file name.',
      5004: 'Maximum number of files exceeded.',
      5005: 'Disk is full.',
      5006: 'File permission error.',
      5007: 'File not found.',
      5008: 'File corrupted.',
      5009: 'Unsupported file type.',
      5010: 'Error reading file.',
      5011: 'Error writing file.',
      5012: 'File is required.'
    },
    SERVER_EXIT_CODE: {
      6001: 'Internal server error.',
    },
    UNKNOW_EXIT_CODE: {
      9001: 'Unknown error occurred.',
    },
  };
  