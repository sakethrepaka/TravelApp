export const SelectTravelsList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'A solo travel exploration',
      icon: '🐧',
      people: '1',
    },
    {
      id: 2,
      title: 'Couple',
      desc: 'Traveling with your partner',
      icon: '❤️',
      people: '2',
    },
    {
      id: 3,
      title: 'Group',
      desc: 'A fun trip with friends or family',
      icon: '👨‍👩‍👦‍👦',
      people: '3+',
    }
  ];
  


  export const SelectBudgetOptions = [
    {
      id: 1,
      title: 'Cheap',
      desc: 'Stay conscious of costs',
      icon: '🙅‍♂️',
    },
    {
      id: 2,
      title: 'Moderate',
      desc: 'A balanced approach to spending',
      icon: '💵',
    },
    {
      id: 3,
      title: 'Luxury',
      desc: 'Experience the finest, no expense spared',
      icon: '💎',
    }
  ];
  

  export const AI_PROMPT = `
  Generate a travel plan for the location: {location}. 
  The plan should cover a total of {totalDays} days for {traveler} with a budget of {budget}. 
  
  Please provide the following information in JSON format:
  
  1. **Hotels**: 
     - A list of hotel options, each containing:
       - "hotelName": {String} - the name of the hotel.
       - "hotelAddress": {String} - the address of the hotel.
       - "price": {Number} - the price per night.
       - "hotelImageUrl": {String} - URL to the hotel image not an wikipeda url but another url which can be opened.
       - "geoCoordinates": {Array} - [latitude, longitude].
       - "rating": {Number} - hotel rating out of 5.
       - "description": {String} - a brief description of the hotel.
  
  2. **Itinerary**: 
     - A daily itinerary for each day of the trip, with each day containing:
       - "day": {Number} - the day number (1, 2, ..., {totalDays}).
       - "places": 
         - A list of places to visit on that day, each containing:
           - "placeName": {String} - name of the place.
           - "placeDetails": {String} - details about the place.
           - "placeImage": {String} - URL to the place image not an wikipeda url but another url which can be opened.
           - "placeUrl": {String} - URL for more information about the place.
           - "geoCoordinates": {Array} - [latitude, longitude].
           - "ticketPricing": {Number} - ticket price for entry.
           - "spendingTime": {String} - estimated time to explore the place.
           - "timeToVisit": {String} - recommended time to visit the place like between which period am-am or pm-pm.
  `;
  
  