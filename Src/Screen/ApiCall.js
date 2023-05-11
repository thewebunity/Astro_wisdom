export const ApiCall = async (url,data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization:
        'Bearer ' + 'NjIyOTQ0OjE0NjMwNTdkZjM2ZTg4ZDE2Y2JlMDI5M2EyZWNjNDVl', // token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      day: data.day,
      month: data.month,
      year: data.year,
      hour: data.hour,
      min: parseInt(data.min),
      lat: data.lat,
      lon: data.lon,
      tzone:5.5
    }),
  });

  const Parseddata =await response.json();
  return Parseddata;
};
