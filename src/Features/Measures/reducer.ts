import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metrics = {
  getMetrics: string[]
};

export type ApiErrorAction = {
  error: string;
};

export type MetricItem = {
  item: string;
}

const initialState = {
  items: [] as string[],
  selectedItems: [] as string[]
};


const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsDataRecevied: (state, action: PayloadAction<Metrics>) => {
      const { getMetrics } = action.payload;
      state.items = getMetrics;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    addItemToSelectedItems: (state, action: PayloadAction<string[]>) => {
      state.selectedItems = action.payload;
    }
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
