// // const apiHost = "https://bakesaleforgood.com";
// //BakeSale API is down, hence using the api locally
// const apiHost = "http://localhost:3000";

// const fetchInitialDeals = async () => {
//   try {
//     // const response = await fetch(apiHost + "/api/deals");
//     const response = await fetch("/BakeSaleApi/deals.json");
//     const json = await response.json();
//     return json;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const fetchInitialDeals;

// const fetchDealDetails = async (dealId) => {
//   try {
//     // const response = await fetch(apiHost + "/api/deals" + dealId);
//     const response = await fetch("/BakeSaleApi/deal-details.json");
//     const json = await response.json();
//     return json;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const fetchInitialDeals;

// const fetchSearchResults = async (searchTerm) => {
//   try {
// const response = await fetch(apiHost + "/api/deals?searchTerm=" + searchTerm);
//     const response = await fetch("/BakeSaleApi/deal-details.json");
//     const json = await response.json();
//     return json;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const fetchInitialDeals;

export const dealsData = require("D:/BakeSale/BakeSaleApi/deals.json");
// console.log(Data);
export const dealDetails = require("D:/BakeSale/BakeSaleApi/deal-details.json");

export const SearchResults = (searchTerm) =>
  Object.values(dealsData).filter((d) =>
    d.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
