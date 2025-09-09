import { createAsyncThunk,createSlice} from "@reduxjs/toolkit";

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

const slicer1 = createSlice({
    name:'slice1',
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(FetchData.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(FetchData.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.loading = false;
        })
        .addCase(FetchData.rejected,(state,action)=>{
            state.error  = action.payload;
            state.loading = false;
        })
    }
})

export default slicer1.reducer;
export {FetchData};