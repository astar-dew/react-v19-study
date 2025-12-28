
export const REGEX = {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    // 비밀번호 (8자 이상, 영문+숫자+특수문자)
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    // 한국 전화번호 (010-1234-5678)
    PHONE_KR: /^01[016789]-\d{3,4}-\d{4}$/,
    // 한국 전화번호 (하이픈 없음)
    PHONE_KR_NO_DASH: /^01[016789]\d{7,8}$/,
    // URL
    URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    // 한글만
    KOREAN_ONLY: /^[가-힣]+$/,
    // 숫자만
    NUMBER_ONLY: /^\d+$/,

};

export const validate = {
  email: (value: string): boolean => REGEX.EMAIL.test(value),
  
  password: (value: string): boolean => REGEX.PASSWORD.test(value),
  
  phone: (value: string): boolean => 
    REGEX.PHONE_KR.test(value) || REGEX.PHONE_KR_NO_DASH.test(value),
  
  url: (value: string): boolean => REGEX.URL.test(value),
  
  // 커스텀 검증 (최소/최대 길이 포함)
  passwordWithLength: (value: string, minLength = 8, maxLength = 20): boolean => {
    if (value.length < minLength || value.length > maxLength) return false;
    return REGEX.PASSWORD.test(value);
  },
};

export const REGEX_ERROR_MESSAGE = {
  EMAIL: '올바른 이메일 형식이 아닙니다.',
  PASSWORD: '비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.',
  PHONE_KR: '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)',
  URL: '올바른 URL 형식이 아닙니다.',
  NUMBER_ONLY: '숫자만 입력 가능합니다.',
  KOREAN_ONLY: '한글만 입력 가능합니다.',
} as const;