import axios from "axios";
const url = "http://localhost:5072/api";
export const fetchData = async (businessPartner) => {
  let changeableUrl = url;
  if (businessPartner) {
    changeableUrl = `${url}/BusinessPartner/${businessPartner}`;
  }
  try {
    const {
      data: { 
        businessPartnerID,
        
      },
    } = await axios.get(changeableUrl);
    const modifiedData = { confirmed, recovered, deaths, lastUpdate };
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};