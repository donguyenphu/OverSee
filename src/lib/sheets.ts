// Simple Google Sheets append helper.
// Requires environment variables:
// VITE_STUDENT_WEBAPP_URL - Apps Script URL for student registrations (handles 3 tabs: IELTS, SAT, VN)
// VITE_MENTOR_WEBAPP_URL - Apps Script URL for mentor registrations (handles 3 tabs: IELTS, SAT, VN)
// VITE_ABLE_TO_TEST_SHEET_ID - Sheet ID for OverSee Able To Test
// VITE_MOCK_TESTED_SHEET_ID - Sheet ID for OverSee Mock Tested
// The Mock Tested web app is the write path for submitted IELTS results.

export interface AppendResult {
  ok: boolean;
  message?: string;
}

interface RowData { [key: string]: any }

async function appendViaApi(sheetId: string, values: any[]): Promise<AppendResult> {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!apiKey) return { ok: false, message: 'Missing VITE_GOOGLE_API_KEY' };
  // Append to first sheet (Sheet1) - adjust range if needed
  const range = 'Sheet1';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&key=${apiKey}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [values] })
    });
    if (!res.ok) return { ok: false, message: 'Google API error ' + res.status };
    return { ok: true };
  } catch (e: any) {
    return { ok: false, message: e.message };
  }
}

async function appendViaWebApp(webappUrl: string | undefined, values: any[]): Promise<AppendResult> {
  if (!webappUrl) return { ok: false, message: 'No webapp URL configured' };

  console.log('Sending to webapp:', webappUrl);
  console.log('Data:', values);

  try {
    const res = await fetch(webappUrl, {
      method: 'POST',
      headers: {
        // text/plain is CORS-safelisted; the body is still JSON for Apps Script.
        'Content-Type': 'text/plain;charset=utf-8',
      },
      mode: 'no-cors',
      body: JSON.stringify({ values })
    });

    // no-cors mode doesn't allow reading response, so we assume success if no error thrown
    return { ok: true };
  } catch (e: any) {
    console.error('Fetch error:', e);
    return { ok: false, message: 'Lỗi kết nối: ' + e.message };
  }
}

export async function getEmailsFromSheet(sheetId: string, column = 'A'): Promise<string[]> {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!apiKey) throw new Error('Missing VITE_GOOGLE_API_KEY');

  const range = `${column}:${column}`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Google API error ' + res.status);
    const data = await res.json();
    // Skip header row, return emails
    return data.values ? data.values.slice(1).flat() : [];
  } catch (e: any) {
    throw new Error(e.message);
  }
}

interface MockTestSheetConfig {
  ableToTestSheetId: string | undefined;
  mockTestedSheetId: string | undefined;
  mockTestedWebappUrl: string | undefined;
}

const getTestSheetConfig = (testId: string): MockTestSheetConfig => {
  if (testId === 'ielts-mock-2') {
    return {
      ableToTestSheetId: import.meta.env.VITE_ABLE_TO_TEST_2_SHEET_ID,
      mockTestedSheetId: import.meta.env.VITE_MOCK_TESTED_2_SHEET_ID,
      mockTestedWebappUrl: import.meta.env.VITE_MOCK_TESTED_2_WEBAPP_URL
    };
  }

  return {
    ableToTestSheetId: import.meta.env.VITE_ABLE_TO_TEST_SHEET_ID,
    mockTestedSheetId: import.meta.env.VITE_MOCK_TESTED_SHEET_ID,
    mockTestedWebappUrl: import.meta.env.VITE_MOCK_TESTED_WEBAPP_URL
  };
};

export async function checkMockTestEligibility(testId: string, email: string): Promise<{ eligible: boolean; message: string }> {
  const { ableToTestSheetId, mockTestedSheetId } = getTestSheetConfig(testId);

  if (!ableToTestSheetId || !mockTestedSheetId) {
    return { eligible: false, message: 'Thiếu cấu hình Google Sheets' };
  }

  try {
    const [ableEmails, testedEmails] = await Promise.all([
      getEmailsFromSheet(ableToTestSheetId),
      getEmailsFromSheet(mockTestedSheetId)
    ]);

    const inAble = ableEmails.includes(email);
    const inTested = testedEmails.includes(email);

    if (!inAble) {
      return { eligible: false, message: 'Email chưa được phép thi' };
    }

    if (inTested) {
      return { eligible: false, message: 'Email đã được sử dụng' };
    }

    return { eligible: true, message: 'Thỏa mãn' };
  } catch (e: any) {
    return { eligible: false, message: 'Lỗi kiểm tra: ' + e.message };
  }
}

export interface MockTestResult {
  testId: string;
  email: string;
  listeningPart1: number;
  listeningPart2: number;
  listeningPart3: number;
  listeningPart4: number;
  readingSection1: number;
  readingSection2: number;
  readingSection3: number;
  writingSection1: string;
  writingSection2: string;
}

export async function submitMockTestResults(data: MockTestResult): Promise<AppendResult> {
  const {
    mockTestedSheetId: sheetId,
    mockTestedWebappUrl: webappUrl
  } = getTestSheetConfig(data.testId);

  if (!sheetId && !webappUrl) {
    return { ok: false, message: 'Thiếu VITE_MOCK_TESTED_SHEET_ID hoặc VITE_MOCK_TESTED_WEBAPP_URL' };
  }

  const values = [
    data.email,
    data.listeningPart1,
    data.listeningPart2,
    data.listeningPart3,
    data.listeningPart4,
    data.readingSection1,
    data.readingSection2,
    data.readingSection3,
    data.writingSection1,
    data.writingSection2,
    new Date().toISOString()
  ];

  if (webappUrl) {
    return appendViaWebApp(webappUrl, values);
  }

  return appendViaApi(sheetId!, values);
}

export async function appendStudent(category: string, data: RowData): Promise<AppendResult> {
  const studentWebapp = import.meta.env.VITE_STUDENT_WEBAPP_URL;
  if (!studentWebapp) {
    return { ok: false, message: 'Thiếu VITE_STUDENT_WEBAPP_URL trong file .env. Vui lòng cấu hình Apps Script webapp URL.' };
  }

  // Common fields that all forms share
  const ordered = [
    new Date().toISOString(),
    category,
    data.name || '',
    data.phone || '',
    data.email || ''
  ];

  // Add form-specific fields in separate columns
  if (category === 'IELTS') {
    ordered.push(
      data.school || '',
      data.grade || '',
      data.wishes || '',
      data.timeSlot || '',
      data.plannedDate || '',
      data.reading || '',
      data.writing || '',
      data.listening || '',
      data.speaking || '',
      data.overall || '',
      data.mockTest || ''
    );
  } else if (category === 'SAT') {
    ordered.push(
      data.school || '',
      data.grade || '',
      data.wishes || '',
      data.timeSlot || '',
      data.plannedDate || '',
      data.currentScore || '',
      data.rw || '',
      data.math || '',
      data.mockTest || ''
    );
  } else if (category === 'VN') {
    ordered.push(
      data.subject || '',
      data.currentResult || '',
      data.target || '',
      data.facebook || ''
    );
  }

  return appendViaWebApp(studentWebapp, ordered);
}

export async function appendMentor(category: string, data: RowData): Promise<AppendResult> {
  const mentorWebapp = import.meta.env.VITE_MENTOR_WEBAPP_URL;
  if (!mentorWebapp) {
    return { ok: false, message: 'Thiếu VITE_MENTOR_WEBAPP_URL trong file .env. Vui lòng cấu hình Apps Script webapp URL.' };
  }

  // Common fields that all mentor forms share
  const ordered = [
    new Date().toISOString(),
    category,
    data.name || '',
    data.phone || '',
    data.email || '',
    data.quote || '',
    data.experience || '',
    data.driveImg || ''
  ];

  // Add form-specific fields in separate columns
  if (category === 'Mentor IELTS') {
    ordered.push(
      data.r || '',
      data.w || '',
      data.l || '',
      data.s || '',
      data.overall || '',
      data.englishSpec || '',
      data.englishAward || '',
      data.awardDriveLink || '',
      data.focusSkill || ''
    );
  } else if (category === 'Mentor SAT') {
    ordered.push(
      data.rw || '',
      data.math || '',
      data.overall || '',
      data.englishSpec || '',
      data.englishAward || '',
      data.awardDriveLink || '',
      data.focusArea || ''
    );
  } else if (category === 'Mentor VN') {
    ordered.push(
      data.subject || '',
      data.specScore || '',
      data.award || '',
      data.awardDriveLink || ''
    );
  }

  return appendViaWebApp(mentorWebapp, ordered);
}
