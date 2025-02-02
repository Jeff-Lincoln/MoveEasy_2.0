import axios from "axios";

const accessToken = process.env.EXPO_PUBLIC_MAPBOX_KEY;

interface Suggestion {
    place_name: string; // The human-readable name of the location
    center: [number, number]; // Longitude and latitude of the location
}

/**
 * Fetch suggestions from Mapbox Searchbox API
 *
 * @param query - The search text entered by the user.
 * @param sessionToken - A unique session token for grouping requests.
 * @param proximity - Coordinates for focusing the search.
 * @param origin - The origin coordinates for relevance.
 * @returns Promise<Suggestion[]> - Array of suggestion objects.
 */
export const getSuggestions = async (
    query: string,
    sessionToken: string,
    proximity: [number, number],
    origin: [number, number],
): Promise<Suggestion[]> => {
    if (!accessToken) {
        console.error(
            "Mapbox access token is missing. Please add it to the environment variables (EXPO_PUBLIC_MAPBOX_KEY).",
        );
        return [];
    }

    try {
        // Construct the URL for Mapbox Searchbox API
        const url =
            `https://api.mapbox.com/search/searchbox/v1/suggest?q=${
                encodeURIComponent(query)
            }&` +
            `language=en&navigation_profile=driving&country=ke&` +
            `proximity=${proximity.join(",")}&origin=${origin.join(",")}&` +
            `types=address,region,block,country,street,place,city,locality,district&` +
            `session_token=${sessionToken}&access_token=${accessToken}`;

        // Fetch suggestions
        const response = await axios.get(url);

        // If the response does not contain suggestions or is malformed, return an empty array
        if (!response.data || !response.data.suggestions) {
            console.error("No suggestions found in the response.");
            return [];
        }

        // Transform the response into a list of suggestions
        const suggestions: Suggestion[] = response.data.suggestions.map((
            suggestion: any,
        ) => ({
            place_name: suggestion.name || "Unnamed place", // Fallback to "Unnamed place" if name is missing
            center: suggestion.center, // Assuming the suggestion has a 'center' (coordinates)
        }));

        return suggestions;
    } catch (error: any) {
        console.error(
            "Error fetching suggestions from Mapbox API:",
            error.message || error,
        );
        return [];
    }
};

// import axios from "axios";

// const accessToken = process.env.EXPO_PUBLIC_MAPBOX_KEY || "";

// interface Suggestion {
//     place_name: string; // The human-readable name of the location
//     center: [number, number]; // Longitude and latitude of the location
//     // Add other fields from the Mapbox response as needed
// }

// /**
//  * Fetch suggestions from Mapbox Searchbox API
//  *
//  * @param query - The search text entered by the user.
//  * @param sessionToken - A unique session token for grouping requests.
//  * @param proximity - Coordinates for focusing the search.
//  * @param origin - The origin coordinates for relevance.
//  * @returns Promise<Suggestion[]> - Array of suggestion objects.
//  */
// export const getSuggestions = async (
//     query: string,
//     sessionToken: string,
//     proximity: [number, number],
//     origin: [number, number],
// ): Promise<Suggestion[]> => {
//     if (!accessToken) {
//         console.error(
//             "Mapbox access token is missing. Please add it to the environment variables.",
//         );
//         return [];
//     }

//     try {
//         // Construct the URL for Mapbox Searchbox API
//         const url =
//             `https://api.mapbox.com/search/searchbox/v1/suggest?q=${
//                 encodeURIComponent(query)
//             }&` +
//             `language=en&navigation_profile=driving&country=ke&` +
//             `proximity=${proximity.join(",")}&origin=${origin.join(",")}&` +
//             `types=address,region,block,country,street,place,city,locality,district&` +
//             `session_token=${sessionToken}&access_token=${accessToken}`;

//         // Fetch suggestions
//         const response = await axios.get(url);

//         // Transform response into a list of suggestions
//         return response.data.suggestions?.map((suggestion: any) => ({
//             place_name: suggestion.name, // Assuming the suggestion has a 'name' field
//             center: suggestion.center, // Assuming the suggestion has 'center' (coordinates)
//         })) || [];
//     } catch (error) {
//         console.error("Error fetching suggestions:", error);
//         return [];
//     }
// };
