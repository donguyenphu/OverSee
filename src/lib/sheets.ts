// Simple Google Sheets append helper.
// Requires environment variables:
// VITE_GOOGLE_API_KEY - API key with Sheets API enabled
// VITE_STUDENT_SHEET_ID - Spreadsheet ID for student registrations
// VITE_MENTOR_SHEET_ID - Spreadsheet ID for mentor registrations
// NOTE: Direct client-side writes to Google Sheets require the sheet to be shared publicly
// with edit or you must use a proxy (Apps Script / backend). Recommended: deploy an Apps Script
// web app that receives POST and appends to the sheet, then set VITE_SHEETS_WEBAPP_URL.

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

export async function appendStudent(category: string, data: RowData): Promise<AppendResult> {
  const studentWebapp = import.meta.env.VITE_STUDENT_WEBAPP_URL;
  if (!studentWebapp) {
    return { ok: false, message: 'Thiếu VITE_STUDENT_WEBAPP_URL trong file .env. Vui lòng cấu hình Apps Script webapp URL.' };
  }
  
  const ordered = [
    new Date().toISOString(),
    category,
    data.name || '',
    data.phone || '',
    data.email || '',
    data.school || '',
    data.grade || '',
    data.plannedDate || data.plannedDateSAT || '',
    data.currentScore || '',
    data.reading || data.rw || '',
    data.writing || '',
    data.listening || '',
    data.speaking || '',
    data.math || '',
    data.subject || '',
    data.currentResult || '',
    data.target || '',
    data.wishes || '',
    data.timeSlot || '',
    data.mockTest || '',
    data.facebook || ''
  ];

  return appendViaWebApp(studentWebapp, ordered);
}

export async function appendMentor(category: string, data: RowData): Promise<AppendResult> {
  const mentorWebapp = import.meta.env.VITE_MENTOR_WEBAPP_URL;
  if (!mentorWebapp) {
    return { ok: false, message: 'Thiếu VITE_MENTOR_WEBAPP_URL trong file .env. Vui lòng cấu hình Apps Script webapp URL.' };
  }
  
  const ordered = [
    new Date().toISOString(),
    category,
    data.phone || '',
    data.email || '',
    data.quote || '',
    data.experience || '',
    // IELTS scores or SAT scores / subject specifics
    data.r || data.rw || '',
    data.w || '',
    data.l || '',
    data.s || '',
    data.overall || '',
    data.math || '',
    data.subject || '',
    data.professionalScore || '',
    data.englishSpec || '',
    data.englishAward || '',
    data.award || '',
    data.focusSkill || data.focusArea || '',
    data.driveImg || ''
  ];
  
  return appendViaWebApp(mentorWebapp, ordered);
}
