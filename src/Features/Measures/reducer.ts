import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metrics = {
  getMetrics: string[];
};

export type ApiErrorAction = {
  error: string;
};

export type MetricItem = {
  item: string;
}

export type MetricObject = {
  metric: string;
  value: number;
  unit: string;
  at: number;
}

export type MetricListItem = {
  metric: string;
  measurements: MetricObject[];
}

export type MetricList = {
  getMultipleMeasurements: MetricListItem[];
}

const initialState = {
  items: [] as string[],
  selectedItems: [] as string[],
  values: [] as MetricListItem[]
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
    },
    updateMetricValues: (state, action: PayloadAction<MetricList>) => {
      const { getMultipleMeasurements } = action.payload;
      state.values = getMultipleMeasurements;
    }
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
