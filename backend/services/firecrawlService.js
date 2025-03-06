import FirecrawlApp from "@mendable/firecrawl-js";
import { config } from '../config/config.js';

class FirecrawlService {
    constructor() {
        this.firecrawl = new FirecrawlApp({
            apiKey: config.firecrawlApiKey
        });
    }

    async findProperties(city, maxPrice, propertyCategory = "Residential", propertyType = "Flat") {
        try {
            const formattedLocation = city.toLowerCase().replace(/\s+/g, '-');
            
            // URLs for property websites (using 99acres as an example)
            const urls = [
                `https://www.99acres.com/property-in-${formattedLocation}-ffid/*`
            ];

            const propertyTypePrompt = propertyType === "Flat" ? "Flats" : "Individual Houses";
            
            // Define schema directly as a JSON schema object
            const propertySchema = {
                type: "object",
                properties: {
                    properties: {
                        type: "array",
                        description: "List of property details",
                        items: {
                            type: "object",
                            properties: {
                                building_name: {
                                    type: "string",
                                    description: "Name of the building/property"
                                },
                                property_type: {
                                    type: "string",
                                    description: "Type of property (commercial, residential, etc)"
                                },
                                location_address: {
                                    type: "string",
                                    description: "Complete address of the property"
                                },
                                price: {
                                    type: "string",
                                    description: "Price of the property"
                                },
                                description: {
                                    type: "string",
                                    description: "Detailed description of the property"
                                },
                                amenities: {
                                    type: "array",
                                    items: { type: "string" },
                                    description: "List of amenities"
                                },
                                area_sqft: {
                                    type: "string",
                                    description: "Area in square feet"
                                }
                            },
                            required: ["building_name", "property_type", "location_address", "price", "description"]
                        }
                    }
                },
                required: ["properties"]
            };
            
            const extractResult = await this.firecrawl.extract(
                urls,
                {
                    prompt: `Extract ONLY 6 different ${propertyCategory} ${propertyTypePrompt} from ${city} that cost less than ${maxPrice} crores.
                    
                    Requirements:
                    - Property Category: ${propertyCategory} properties only
                    - Property Type: ${propertyTypePrompt} only
                    - Location: ${city}
                    - Maximum Price: ${maxPrice} crores
                    - Include essential property details (building name, price, location, area, amenities, and a brief description)
                    - IMPORTANT: Return data for EXACTLY 6 different properties. No more.
                    - Format as a list of properties with their respective details
                    `,
                    schema: propertySchema, // Using direct JSON schema instead of Zod schema
                    enableWebSearch: true
                }
            );

            if (!extractResult.success) {
                throw new Error(`Failed to extract property data: ${extractResult.error || 'Unknown error'}`);
            }

            console.log('Extracted properties:', extractResult.data);

            return extractResult.data;
        } catch (error) {
            console.error('Error finding properties:', error);
            throw error;
        }
    }

    async getLocationTrends(city) {
        try {
            const formattedLocation = city.toLowerCase().replace(/\s+/g, '-');
            
            // Define schema directly as a JSON schema object
            const locationSchema = {
                type: "object",
                properties: {
                    locations: {
                        type: "array",
                        description: "List of location data points",
                        items: {
                            type: "object",
                            properties: {
                                location: {
                                    type: "string"
                                },
                                price_per_sqft: {
                                    type: "number"
                                },
                                percent_increase: {
                                    type: "number"
                                },
                                rental_yield: {
                                    type: "number"
                                }
                            },
                            required: ["location", "price_per_sqft", "percent_increase", "rental_yield"]
                        }
                    }
                },
                required: ["locations"]
            };
            
            const extractResult = await this.firecrawl.extract(
                [`https://www.99acres.com/property-rates-and-price-trends-in-${formattedLocation}-prffid/*`],
                {
                    prompt: `Extract price trends data for 5 major localities in ${city}.
                    IMPORTANT:
                    - Return data for EXACTLY 5 different localities
                    - Include data points: location name, price per square foot, yearly percent increase, and rental yield
                    - Format as a list of locations with their respective data
                    `,
                    schema: locationSchema, // Using direct JSON schema instead of Zod schema
                    enableWebSearch: true
                }
            );

            if (!extractResult.success) {
                throw new Error(`Failed to extract location data: ${extractResult.error || 'Unknown error'}`);
            }

            return extractResult.data;
        } catch (error) {
            console.error('Error fetching location trends:', error);
            throw error;
        }
    }
}

export default new FirecrawlService();