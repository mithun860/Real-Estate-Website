import firecrawlService from '../services/firecrawlService.js';
import aiService from '../services/aiService.js';

export const searchProperties = async (req, res) => {
    try {
        const { city, maxPrice, propertyCategory, propertyType } = req.body;

        if (!city || !maxPrice) {
            return res.status(400).json({ success: false, message: 'City and maxPrice are required' });
        }

        // Extract property data using Firecrawl
        const propertiesData = await firecrawlService.findProperties(
            city, 
            maxPrice, 
            propertyCategory || 'Residential',
            propertyType || 'Flat'
        );

        // Analyze the properties using AI
        const analysis = await aiService.analyzeProperties(
            propertiesData.properties,
            city,
            maxPrice,
            propertyCategory || 'Residential',
            propertyType || 'Flat'
        );

        res.json({
            success: true,
            properties: propertiesData.properties,
            analysis
        });
    } catch (error) {
        console.error('Error searching properties:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to search properties',
            error: error.message
        });
    }
};

export const getLocationTrends = async (req, res) => {
    try {
        const { city } = req.params;

        if (!city) {
            return res.status(400).json({ success: false, message: 'City parameter is required' });
        }

        // Extract location trend data using Firecrawl
        const locationsData = await firecrawlService.getLocationTrends(city);

        // Analyze the location trends using AI
        const analysis = await aiService.analyzeLocationTrends(
            locationsData.locations,
            city
        );

        res.json({
            success: true,
            locations: locationsData.locations,
            analysis
        });
    } catch (error) {
        console.error('Error getting location trends:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to get location trends',
            error: error.message
        });
    }
};