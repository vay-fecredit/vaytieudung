/**
 * eKYC Error Report API
 * Thu thập logs và ảnh khi người dùng gặp lỗi trong quá trình xác thực
 * Version: 1.0.0
 * Date: 2025-11-10
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPORTS_DIR = path.join(__dirname, '../reports/ekyc');

// Tạo thư mục nếu chưa có
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

/**
 * Handle error report submission
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function handleErrorReport(req, res) {
  try {
    const {
      sessionId,
      userId,
      timestamp,
      roll,
      pitch,
      yaw,
      confidence,
      message,
      imageBase64,
      deviceInfo,
      attemptCount,
      userConsent
    } = req.body;

    // Validation
    if (!sessionId || !timestamp) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields: sessionId and timestamp are required' 
      });
    }

    // Check user consent for image submission
    if (imageBase64 && !userConsent) {
      return res.status(403).json({ 
        success: false,
        error: 'User consent required for image submission' 
      });
    }

    // Generate unique report ID
    const reportId = crypto.randomBytes(16).toString('hex');
    const reportTimestamp = new Date().toISOString();

    // Prepare report data
    const reportData = {
      reportId,
      sessionId,
      userId: userId || 'anonymous',
      timestamp,
      metrics: {
        roll: roll || 0,
        pitch: pitch || 0,
        yaw: yaw || 0,
        confidence: confidence || 0
      },
      message: message || 'No message provided',
      deviceInfo: deviceInfo || {},
      attemptCount: attemptCount || 0,
      userConsent: userConsent || false,
      receivedAt: reportTimestamp,
      ipAddress: req.ip || req.connection.remoteAddress || 'unknown'
    };

    // Save metadata to JSON file
    const metadataPath = path.join(REPORTS_DIR, `${reportId}.json`);
    fs.writeFileSync(metadataPath, JSON.stringify(reportData, null, 2), 'utf8');

    // Save image if provided and consent given
    let imageSaved = false;
    if (imageBase64 && userConsent) {
      try {
        const imagePath = path.join(REPORTS_DIR, `${reportId}.jpg`);
        const imageBuffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        
        // Check image size (max 500KB as per config)
        const imageSizeKB = imageBuffer.length / 1024;
        if (imageSizeKB > 500) {
          console.warn(`[eKYC] Image too large: ${imageSizeKB.toFixed(2)}KB (max 500KB)`);
        } else {
          fs.writeFileSync(imagePath, imageBuffer);
          imageSaved = true;
        }
      } catch (imageError) {
        console.error('[eKYC] Error saving image:', imageError);
        // Don't fail the whole request if image saving fails
      }
    }

    // Log to console
    console.log(`[eKYC] Error report received: ${reportId}`);
    console.log(`  Session: ${sessionId}`);
    console.log(`  Message: ${message}`);
    console.log(`  Metrics: roll=${roll}°, pitch=${pitch}°, yaw=${yaw}°, confidence=${confidence}`);
    console.log(`  Attempts: ${attemptCount}`);
    console.log(`  Image saved: ${imageSaved}`);

    // Send success response
    res.status(200).json({
      success: true,
      reportId,
      message: 'Cảm ơn bạn đã gửi báo cáo. Chúng tôi sẽ phân tích và cải thiện hệ thống.',
      timestamp: reportTimestamp
    });

  } catch (error) {
    console.error('[eKYC] Error handling report:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: 'Đã xảy ra lỗi khi xử lý báo cáo. Vui lòng thử lại sau.'
    });
  }
}

/**
 * Get report statistics (admin only)
 * @param {Object} req 
 * @param {Object} res 
 */
async function getReportStats(req, res) {
  try {
    const files = fs.readdirSync(REPORTS_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    
    const stats = {
      totalReports: jsonFiles.length,
      reportsToday: 0,
      averageAttempts: 0,
      commonIssues: {},
      deviceBreakdown: {}
    };

    const today = new Date().toISOString().split('T')[0];
    let totalAttempts = 0;

    jsonFiles.forEach(file => {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(REPORTS_DIR, file), 'utf8'));
        
        // Count reports today
        if (data.receivedAt && data.receivedAt.startsWith(today)) {
          stats.reportsToday++;
        }

        // Average attempts
        if (data.attemptCount) {
          totalAttempts += data.attemptCount;
        }

        // Common issues
        if (data.message) {
          stats.commonIssues[data.message] = (stats.commonIssues[data.message] || 0) + 1;
        }

        // Device breakdown
        if (data.deviceInfo && data.deviceInfo.os) {
          stats.deviceBreakdown[data.deviceInfo.os] = (stats.deviceBreakdown[data.deviceInfo.os] || 0) + 1;
        }
      } catch (err) {
        console.error(`Error reading report ${file}:`, err);
      }
    });

    stats.averageAttempts = jsonFiles.length > 0 ? (totalAttempts / jsonFiles.length).toFixed(2) : 0;

    res.status(200).json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('[eKYC] Error getting stats:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
}

/**
 * Delete old reports (cleanup job)
 * @param {number} daysToKeep - Number of days to keep reports
 */
function cleanupOldReports(daysToKeep = 30) {
  try {
    const files = fs.readdirSync(REPORTS_DIR);
    const now = Date.now();
    const maxAge = daysToKeep * 24 * 60 * 60 * 1000; // Convert days to milliseconds
    
    let deletedCount = 0;

    files.forEach(file => {
      const filePath = path.join(REPORTS_DIR, file);
      const stats = fs.statSync(filePath);
      const age = now - stats.mtimeMs;

      if (age > maxAge) {
        fs.unlinkSync(filePath);
        deletedCount++;
      }
    });

    console.log(`[eKYC] Cleanup completed: ${deletedCount} old reports deleted`);
    return deletedCount;

  } catch (error) {
    console.error('[eKYC] Error during cleanup:', error);
    return 0;
  }
}

// Export functions
module.exports = {
  handleErrorReport,
  getReportStats,
  cleanupOldReports
};
