import { useEffect, useState } from "react";
import './App.css';
import axios from "axios";






function Barrchart() {

  const [chartData, setChartData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
          const {data} = await axios.get("https://64665758ba7110b6639e57a4.mockapi.io/api/attendance/Task")
          console.log(data)
    }
          fetchData()
  }, [])

  
  return (
    <div className="App">
 
    </div>
  );
}

export default Barrchart;