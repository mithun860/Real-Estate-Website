import Stats from '../models/statsModel.js';

export const trackAPIStats = async (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', async () => {
    try {
      if (req.method !== 'OPTIONS') { // Only track non-OPTIONS requests
        const duration = Date.now() - start;
        await Stats.create({
          endpoint: req.originalUrl,
          method: req.method,
          responseTime: duration,
          statusCode: res.statusCode
        });
      }
    } catch (error) {
      console.error('Error tracking API stats:', error);
    }
  });
  
  next();
};