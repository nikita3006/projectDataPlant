const apiUrl = 'https://json-server-nine-olive.vercel.app';

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
  export const patchData = async (endpoint: string, data: any) => {
    try {
      const response = await fetch(`${apiUrl}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://project-data-plant.vercel.app',
          'Access-Control-Allow-Headers': '*'
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
  export const deleteData = async (endpoint: string) => {
    try {
      const response = await fetch(`${apiUrl}/${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error calling API: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error calling API:', error);
      throw error;
    }
  };