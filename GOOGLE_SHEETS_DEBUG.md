# Google Sheets Integration - Diagnostic Report

## ✅ Fixes Applied

### 1. Toast Notifications Added
- Installed `react-toastify`
- Added ToastContainer to App.tsx
- All 6 forms now show toast.success() on successful submission
- All 6 forms now show toast.error() on failure

### 2. CORS Mode Updated
- Changed fetch mode to `no-cors` in sheets.ts
- This prevents CORS errors when calling Apps Script web apps
- Note: `no-cors` mode doesn't allow reading response, but Apps Script will still receive and process the data

### 3. Enhanced Error Logging
- Added console.log for debugging webapp URL and data being sent
- Better error messages in Vietnamese

## 🔍 Current Configuration

### Environment Variables (.env)
```
VITE_STUDENT_WEBAPP_URL=https://script.google.com/macros/s/AKfycbxlh_M0A7NWORxHk5lcYTypzKOZl-nFNGjtocAmPQvSvNF-2rYHPLon8HmB0DxyDDJ_/exec
VITE_MENTOR_WEBAPP_URL=https://script.google.com/macros/s/AKfycbwy9eK-3MJS6QwJocfmbSBNnHbxF2Dq7mwQtQOd8vVMB17TmvCzksjtLHqagr8n8gUbQQ/exec
```

### Data Format Being Sent
The frontend sends data in this format:
```json
{
  "values": [
    "2025-11-22T10:30:00.000Z",  // timestamp
    "IELTS",                      // category
    "Nguyen Van A",               // name
    "0901234567",                 // phone
    "email@example.com",          // email
    // ... more fields
  ]
}
```

## 🚨 CRITICAL: Apps Script Requirements

Your Apps Script **MUST** have this exact structure:

```javascript
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the spreadsheet
    const ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
    const sheet = ss.getSheetByName('Sheet1'); // Adjust sheet name
    
    // Append the data row
    sheet.appendRow(data.values);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Apps Script Deployment Settings
1. Click "Deploy" > "New deployment"
2. Select type: "Web app"
3. **Execute as:** "Me" (your account)
4. **Who has access:** "Anyone" (important!)
5. Click "Deploy"
6. Copy the web app URL (should end with /exec)
7. Paste into .env file

## 🐛 Troubleshooting Steps

### If still getting "failed to fetch":

1. **Check Browser Console** (F12)
   - Look for the console.log messages showing URL and data
   - Check for any CORS errors (should be resolved now)

2. **Verify Apps Script Deployment**
   - Make sure "Who has access" is set to "Anyone"
   - Make sure you deployed the LATEST version of the script
   - Try creating a NEW deployment if needed

3. **Test Apps Script Directly**
   ```bash
   # PowerShell command to test:
   $body = '{"values":["test","IELTS","Name","Phone","Email"]}'
   Invoke-WebRequest -Uri "YOUR_WEBAPP_URL" -Method POST -Body $body -ContentType "application/json"
   ```

4. **Check Apps Script Execution Logs**
   - In Apps Script editor, click "Executions" (clock icon)
   - Check if doPost is being called
   - Look for any error messages

## 📝 Data Mapping

### Student Forms Data Order:
1. Timestamp
2. Category (IELTS/SAT/VN)
3. name
4. phone
5. email
6. school
7. grade
8. plannedDate
9. currentScore (SAT total score)
10. reading/rw (Reading or Reading&Writing)
11. writing
12. listening
13. speaking
14. math
15. subject (VN only)
16. currentResult (VN only)
17. target (VN only)
18. wishes
19. timeSlot
20. mockTest
21. facebook (VN only)

### Mentor Forms Data Order:
1. Timestamp
2. Category (Mentor IELTS/SAT/VN)
3. phone
4. email
5. quote
6. experience
7. r/rw (Reading or Reading&Writing)
8. w (Writing)
9. l (Listening)
10. s (Speaking)
11. overall (IELTS overall or SAT total)
12. math (SAT only)
13. subject (VN only)
14. professionalScore
15. englishSpec
16. englishAward/award
17. focusSkill/focusArea
18. driveImg

## ✨ Expected Behavior After Fixes

1. User fills out form and clicks "Gửi đơn"
2. Form shows loading state (button disabled)
3. Data is sent to Apps Script webapp
4. **Success:** Green toast notification "Đăng ký thành công!" appears
5. **Error:** Red toast notification with error message appears
6. Browser console shows debug information
