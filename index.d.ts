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
    /** Fundamental indicators or stock events */
    [name: string]: string|number|Object
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
    /** Floor price */
    f: number
    /** Basic price */
    b: number
    /** Ceil price */
    c: number
    /** Stock events */
    [event: string]: string|number|Object
  }

  interface Weights {
    /** Weight of a ticker. Negative means short, absolute value > 1 means leverage */
    [ticker: string]: number
  }

  interface Trade {
    account?: string|number
    strategy?: string|number
    /** Trade side: B=Buy, S=Sell, D=Dividend, X=Split */
    side: string
    symbol: string
    /** Current volume, negative for sell short */
    volume: number
    /** Volume at opening */
    open: number
    /** Price at opening */
    price: number
    /** When opening */
    openAt: Date
    /** Last update time */
    updateAt: Date
    /** Bars in the market */
    bars: number
    /** Days in the market */
    days: number
    /** Closed volume */
    close: number
    /** When closing */
    closeAt: Date
    /** Taked profit and loss */
    pnl: number
    /** Trade status */
    status: string
  }

  interface Trader {
    /** Create an empty order without send */
    create: (ticker: string, volume: number, price: number, side: string, account: string|number, strategy: string) => Trade
    /** Send market order */
    market: (order: Trade) => Trade
    /** Send limit order */
    limit: (order: Trade) => Trade
    /** Get trades by id or ticker */
    trades: (id?: number|string, status?: string) => Trade|Trade[]
    /** Get open trades by ticker */
    openTrades: (ticker?: string) => Trade[]
    /** Cancel trades by id or ticker, return canceled trades */
    cancel: (id?: number|string) => Trade|Trade[]
    /** Close trades by id or ticker, return closed trades */
    close: (id?: number|string) => Trade|Trade[]
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
    /** Strategy name */
    name: string
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
    /** Weekend Trading */
    weekendTrading: boolean
    /** Bar period in minutes: 1440 for daily */
    barPeriod: number
    /** Bar offset from 0 time: 465 equal at 14:45:00 GMT+7 */
    barOffset: number
    /** Day offset in Microseconds from midnight, 30000 means run 30 seconds ahead */
    dayOffset: number
    /** List of trading assets */
    assets: [ticker: string][]
    /** Universe to trade */
    universe: string
    /** Get list assets of universe on current bar's date */
    getUniverse: () => [ticker: string][]
    /** Quote asset of universe */
    quoteAsset: string
    /** Trading market. Default: 'vn' */
    market: string
    /** Data type/resolution to load. Ex: daily */
    dataType: string
    /** Lookback period (number of bar) */
    lookback: number
    /** Bar fields to select: Default: 'ohlcv', see @interface Bar */
    barFields: string
    /** Subscribe to dividend/split event. Default: false */
    divEvent: boolean
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
    /** Only load data from live when trading */
    onlyLive: boolean
    /** Who makes and manages trades */
    trader: Trader
    /** Generate time series data, index from current to past. arr[0] is the soonest data */
    series: (arr: [], value: any, len: number) => []
    /** Record/save values for later inspection */
    record: (data: string) => void
    /** Avoid record NAV */
    avoidNav: boolean
    /** User/strategy provided context */
    [custom: string]: any
  }

  interface State {
    /** User/strategy/trading state */
    [custom: string]: any
  }

  interface Broker {
    refineVolume: (volume: number, price: number, symbol: string) => number
    canShort: (symbol?: string) => boolean
    canClose: (trade: Trade) => boolean
    /** Make order */
    order: (options: {side: string, symbol: string, volume: number, price?: number, type?: string}) => {
      /** Fill volume */
      volume?: number,
      /** Fill price */
      price?: number,
    }
  }
}
