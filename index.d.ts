declare namespace Robusta {

  interface Params {
    /** Running interface: cli, web... */
    _I: string
    /** Running mode: trade|train|test */
    mode: string
    /** User/strategy provided params */
    [custom: string]: string
  }

  interface Bar {
    /** Open price */
    o: number
    /** Highest price */
    h: number
    /** Lowest price */
    l: number
    /** Close price */
    c: number
    /** Deal volume */
    v: number
    /** Put-through volume */
    p: number
    /** Adjust ratio: u = c * Math.exp(a) */
    a: number
    /** Stock share number */
    s: number
    /** Unadjusted close price */
    u: number
    /** Fundamental indicators */
    [fundamental: string]: number
    /** Stock events */
    [event: string]: string
  }

  interface Tick {
    /** Ask price 3 */
    a3: number
    /** Ask volume 3 */
    w3: number
    /** Ask price 2 */
    a2: number
    /** Ask volume 2 */
    w2: number
    /** Ask price 1 */
    a1: number
    /** Ask volume 1 */
    w1: number
    /** Bid price 1 */
    b1: number
    /** Bid volume 1 */
    v1: number
    /** Bid price 2 */
    b2: number
    /** Bid volume 2 */
    v2: number
    /** Bid price 3 */
    b3: number
    /** Bid volume 3 */
    v3: number
    /** Last matched price */
    p: number
    /** Last matched volume */
    v: number
    /** Stock events */
    [event: string]: string
  }

  interface Weights {
    /** Weight of a ticker. Negative means short, absolute value > 1 means leverage */
    [ticker: string]: number
  }

  interface Order {
    account?: string|number
    strategy?: string|number
    /** Order side: B or S */
    side: string
    symbol: string
    /** Current volume */
    volume: number
    /** Current price */
    price: number
    /** Volume at opening */
    open: number
    /** Price at opening */
    openPrice: number
    /** When opening */
    openAt: Date
    /** Days in the market */
    days: number
    /** Locked volume */
    lock: number
    /** Start lock time */
    lockAt: Date
    /** Closed volume */
    close: number
    /** Taked profit and loss */
    pnl?: number
    /** Order status */
    status: string
  }

  interface Trader {
    /** Create an empty order without send */
    create: (ticker: string, volume: number, price?: number) => Order
    /** Send market order */
    market: (order: Order) => Order
    /** Send limit order */
    limit: (order: Order) => Order
    /** Get orders by id or ticker */
    orders: (id?: number|string, status?: string) => Order|Order[]
    /** Cancel orders by id or ticker, return canceled orders */
    cancel: (id?: number|string) => Order|Order[]
    /** Close orders by id or ticker, return closed orders */
    close: (id?: number|string) => Order|Order[]
    /** Buy/Sell order to target weights */
    orderTarget: (weights: {[ticker: string]: number}) => Trader
    /** Buy order to target weights */
    buyTarget: (weights: {[ticker: string]: number}) => Trader
    /** Sell order to target weights */
    sellTarget: (weights: {[ticker: string]: number}) => Trader
  }

  interface Context {
    params: Params
    /** Strategy file path */
    strategy: string
    /** Running mode: trade|train|test */
    mode: string
    /** Backtest start date */
    startDate: string
    /** Backtest end date */
    endDate: string|undefined
    /** Start trading session: Minutes from midnight, example: 135 equal at 09:15:00 GMT+7 */
    startMarket: number
    /** Start break session: Minutes from midnight, example: 271 equal at 11:31:00 GMT+7 */
    startBreak: number
    /** End break session: Minutes from midnight, example: 360 equal at 13:00:00 GMT+7 */
    endBreak: number
    /** End trading session: Minutes from midnight, example: 465 equal at 14:45:00 GMT+7 */
    endMarket: number
    /** Bar period in minutes: 1440 for daily */
    barPeriod: number
    /** Bar offset from 0 time: 465 equal at 14:45:00 GMT+7 */
    barOffset: number
    /** Day offset in Microseconds from midnight, 30000 means run 30 seconds ahead */
    dayOffset: number
    /** List of trading assets */
    assets: [ticker: string][]
    /** Trading market. Default: 'vn' */
    market: string
    /** Data type/resolution to load. Ex: daily */
    dataType: string
    /** Lookback period (number of bar) */
    lookback: number
    /** Bar fields to select: Default: 'ohlcv', see @interface Bar */
    barFields: string
    /** Open trade at the end of simulation time */
    openEnd: boolean
    /** Current running bar */
    bar: number
    /** Current running date of bar */
    date: Date
    /** Slice data at current bar */
    data: {[ticker: string]: Bar|Tick}
    /** Check unstable period */
    isUnstable: boolean
    /** Check lookback period */
    isLookback: boolean
    /** Who makes and manages trades */
    trader: Trader
    /** Generate time series data, index from current to past. arr[0] is the soonest data */
    series: (arr: [], value: any, len: number) => []
    /** Record/save values for later inspection */
    record: (data: {}) => void
    /** User/strategy provided context */
    [custom: string]: any
  }

  interface State {
    /** User/strategy/trading state */
    [custom: string]: any
  }
}
