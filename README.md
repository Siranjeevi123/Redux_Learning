Redux Coin Market Cap App
A React application built with Redux Toolkit that displays cryptocurrency market data from the CoinGecko API. This project demonstrates modern Redux patterns with async thunks, state management, and responsive UI design.

https://img.shields.io/badge/React-18.2.0-blue
https://img.shields.io/badge/Redux_Toolkit-1.9.5-purple
https://img.shields.io/badge/CoinGecko_API-v3-green

Live Demo
🔗 View the Live Application

Features
📊 Display real-time cryptocurrency data

🔄 Asynchronous data fetching with Redux Toolkit

🎨 Responsive card-based UI design

⚡ Loading and error states handling

🏷️ Market cap rankings and current prices

Project Structure
text
src/
├── components/
│   ├── Coins.jsx          # Main component that fetches and displays coins
│   └── CoinCard.jsx       # Individual coin card component
├── stores.jsx             # Redux store configuration
├── slice1.jsx             # Redux slice with async thunk
└── main.jsx               # App entry point with Redux Provider
Key Code Snippets
Redux Store Configuration
javascript
// stores.jsx
import { configureStore } from "@reduxjs/toolkit";
import slice1Reducer from './slice1';

const stores = configureStore({
    reducer: {
        slice1: slice1Reducer,
    }
}) 

export default stores;
Async Thunk for Data Fetching
javascript
// slice1.jsx
const FetchData = createAsyncThunk(
    'Coin/fetch',
    async(args, thunkAPI)=>{
        try{
            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${args}&page=1&sparkline=false`;
            const responses = await fetch(url);
            if(!responses.ok){
                return thunkAPI.rejectWithValue(`HTTP ${responses.status}`);
            }
            const data = await responses.json();
            return data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)
Component with Redux Integration
javascript
// Coins.jsx
function Coins(){
    const dispatch = useDispatch();
    const {data,loading,error} = useSelector((state)=>state.slice1);
    
    useEffect(()=>{
        dispatch(FetchData(20));
    },[dispatch])

    if(loading) return <h1>Data is Loading</h1>
    if(error) return <h1>Error has Occured</h1>

    return(
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
            {data.map((value)=><CoinCard key={value.id} coin={value}/>)}
        </div>
    )
}
Installation & Setup
Clone the repository:

bash
git clone https://github.com/Siranjeevi123/Redux_Learning.git
cd Redux_Learning
Install dependencies:

bash
npm install
Start the development server:

bash
npm run dev
Technologies Used
React - UI framework

Redux Toolkit - State management

React-Redux - React bindings for Redux

CoinGecko API - Cryptocurrency data

CSS3 - Styling and responsive design

Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

License
This project is open source and available under the MIT License.

This response is AI-generated, for reference only.
