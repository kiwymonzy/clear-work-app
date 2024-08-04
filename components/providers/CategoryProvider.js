// providers/CategoryProvider.js
import Config from '../Utls/Config';

class CategoryProvider {
  // FETCH CATEGORY DETAILS
  static async index(token, { limit = 10, offset = 1, zoneId = '' } = {}) {
    try {
      // Construct the query string with provided parameters
      const queryString = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      }).toString();

      // Construct the full URL with query parameters
      const url = `${Config.CATEGORY_URL}?${queryString}`;

      //console.log(url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'zoneid': '6e3ce413-462e-4f11-9e79-fc6b761c82d3',
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json();
      return res;
    } catch (error) {
      console.error('GetCategory error:', error);
      throw error; // Handle failed fetch
    }
  }
}

export default CategoryProvider;
