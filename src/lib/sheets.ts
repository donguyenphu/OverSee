// Simple Google Sheets append helper.
// Requires environment variables:
// VITE_STUDENT_WEBAPP_URL - Apps Script URL for student registrations (handles 3 tabs: IELTS, SAT, VN)
// VITE_MENTOR_WEBAPP_URL - Apps Script URL for mentor registrations (handles 3 tabs: IELTS, SAT, VN)
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
      data.facebook || '',
      data.school || '',
      data.grade || '',
      data.wishes || '',
      data.timeSlot || '',
      data.subject || '',
      data.currentResult || '',
      data.target || ''
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
    data.quote || ''
  ];

  // Add form-specific fields in separate columns
  if (category === 'Mentor IELTS') {
    ordered.push(
      data.experience || '',
      data.driveImg || '',
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
      data.experience || '',
      data.driveImg || '',
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
      data.experience || '',
      data.professionalScore || '',
      data.award || '',
      data.awardDriveLink || '',
      data.driveImg || ''
    );
  }
  
  return appendViaWebApp(mentorWebapp, ordered);
}
