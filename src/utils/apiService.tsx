const apiUrl = 'http://localhost:3000';

export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error fetching data from API: ${response.statusText}`);
    }
   
    return await response.json();
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error;
  }
};

export const postData = async (endpoint: string, data: any) => {
    try {
      const response = await fetch(`${apiUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error calling API: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error calling API:', error);
      throw error;
    }
  };
  