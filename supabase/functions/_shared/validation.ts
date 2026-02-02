export interface ValidationError {
  field: string;
  message: string;
}

export function validateString(
  value: unknown,
  fieldName: string,
  options: { 
    required?: boolean; 
    minLength?: number; 
    maxLength?: number;
    allowedValues?: string[];
  } = {}
): { valid: boolean; value?: string; error?: ValidationError } {
  const { required = true, minLength = 1, maxLength = 1000, allowedValues } = options;

  if (value === undefined || value === null || value === '') {
    if (required) {
      return { valid: false, error: { field: fieldName, message: `${fieldName} is required` } };
    }
    return { valid: true, value: undefined };
  }

  if (typeof value !== 'string') {
    return { valid: false, error: { field: fieldName, message: `${fieldName} must be a string` } };
  }

  const trimmed = value.trim();

  if (trimmed.length < minLength) {
    return { valid: false, error: { field: fieldName, message: `${fieldName} must be at least ${minLength} characters` } };
  }

  if (trimmed.length > maxLength) {
    return { valid: false, error: { field: fieldName, message: `${fieldName} exceeds maximum length of ${maxLength} characters` } };
  }

  if (allowedValues && !allowedValues.includes(trimmed)) {
    return { valid: false, error: { field: fieldName, message: `${fieldName} must be one of: ${allowedValues.join(', ')}` } };
  }

  return { valid: true, value: trimmed };
}

export function sanitizeForPrompt(input: string): string {
  // Remove potential prompt injection patterns
  return input
    .replace(/ignore\s+(all\s+)?(previous|prior|above)\s+(instructions?|prompts?|rules?)/gi, '')
    .replace(/system\s*prompt/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export interface ValidationResult<T> {
  valid: boolean;
  data?: T;
  errors?: ValidationError[];
}

export function validateRequestBody<T extends Record<string, unknown>>(
  body: unknown,
  schema: Record<keyof T, { required?: boolean; minLength?: number; maxLength?: number; allowedValues?: string[] }>
): ValidationResult<T> {
  if (!body || typeof body !== 'object') {
    return { valid: false, errors: [{ field: 'body', message: 'Request body must be a valid JSON object' }] };
  }

  const errors: ValidationError[] = [];
  const data: Record<string, unknown> = {};
  const bodyRecord = body as Record<string, unknown>;

  for (const [key, options] of Object.entries(schema)) {
    const result = validateString(bodyRecord[key], key, options);
    if (!result.valid && result.error) {
      errors.push(result.error);
    } else if (result.value !== undefined) {
      data[key] = result.value;
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, data: data as T };
}
