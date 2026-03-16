// Simple Google Sheets append helper.
// Requires environment variables:
// VITE_STUDENT_WEBAPP_URL - Apps Script URL for student registrations (handles 3 tabs: IELTS, SAT, VN)
// VITE_MENTOR_WEBAPP_URL - Apps Script URL for mentor registrations (handles 3 tabs: IELTS, SAT, VN)
// VITE_ABLE_TO_TEST_SHEET_ID - Sheet ID for OverSee Able To Test
// VITE_MOCK_TESTED_SHEET_ID - Sheet ID for OverSee Mock Tested
// NOTE: Apps Script will route data to correct tab based on category field

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
        'Content-Type': 'application/json',
      },
      mode: 'no-cors', // Add this to handle CORS
      body: JSON.stringify({ values })
    });

    // no-cors mode doesn't allow reading response, so we assume success if no error thrown
    return { ok: true };
  } catch (e: any) {
    console.error('Fetch error:', e);
    return { ok: false, message: 'Lỗi kết nối: ' + e.message };
  }
}

export async function getEmailsFromSheet(sheetId: string): Promise<string[]> {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!apiKey) throw new Error('Missing VITE_GOOGLE_API_KEY');

  const range = 'A:A'; // Assuming emails are in column A
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

export async function checkMockTestEligibility(email: string): Promise<{ eligible: boolean; message: string }> {
  const ableToTestSheetId = import.meta.env.VITE_ABLE_TO_TEST_SHEET_ID;
  const mockTestedSheetId = import.meta.env.VITE_MOCK_TESTED_SHEET_ID;

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

export async function addToMockTested(email: string): Promise<AppendResult> {
  const sheetId = import.meta.env.VITE_MOCK_TESTED_SHEET_ID;
  if (!sheetId) return { ok: false, message: 'Thiếu VITE_MOCK_TESTED_SHEET_ID' };

  return appendViaApi(sheetId, [email]);
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
