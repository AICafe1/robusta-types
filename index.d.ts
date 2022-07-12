declare namespace Robusta {

  interface CliParams {
    /** Running mode: trade|train|test */
    mode: string,
    /** User/strategy provided params */
    [custom: string]: string
  }

  interface Bar {
    /** Open price */
    o: number,
    /** Highest price */
    h: number,
    /** Lowest price */
    l: number,
    /** Close price */
    c: number,
    /** Deal volume */
    v: number,
    /** Put-through volume */
    p: number,
    /** Adjust ratio: u = c * Math.exp(a) */
    a: number,
    /** Stock share number */
    s: number,
    /** Unadjusted close price */
    u: number,
    /** Unadjusted open price (from) */
    f: number
    /** Fundamental indicators */
    [fundamental: string]: number
    /** Stock events */
    [event: string]: string
  }

  interface Weights {
    /** Weight of a ticker. Negative means short, absolute value > 1 means leverage */
    [ticker: string]: number
  }

  interface Context {
    params: CliParams,
    /** Strategy file path */
    strategy: string,
    /** Running mode: trade|train|test */
    mode: string,
    /** Backtest start date */
    startDate: string,
    /** Backtest end date */
    endDate: string|undefined,
    /** Start trading session: Minutes from midnight, example: 135 equal at 09:15:00 GMT+7 */
    startMarket: number,
    /** Start break session: Minutes from midnight, example: 271 equal at 11:31:00 GMT+7 */
    startBreak: number,
    /** End break session: Minutes from midnight, example: 360 equal at 13:00:00 GMT+7 */
    endBreak: number,
    /** End trading session: Minutes from midnight, example: 465 equal at 14:45:00 GMT+7 */
    endMarket: number,
    /** Bar period in minutes: 1440 for daily */
    barPeriod: number,
    /** Bar offset from 0 time: 465 equal at 14:45:00 GMT+7 */
    barOffset: number,
    /** Day offset in Microseconds from midnight, 30000 means run 30 seconds ahead */
    dayOffset: number,
    /** List of trading assets */
    assets: [ticker: string][],
    /** Trading market. Default: 'vn' */
    market: string,
    /** Data type/resolution to load. Ex: daily */
    dataType: string,
    /** Lookback period (number of bar) */
    lookback: number,
    /** Bar fields to select: Default: 'ohlcv', see @interface Bar */
    barFields: string,
    /** Current running bar */
    bar: number,
    /** Current running date of bar */
    date: Date,
    /** Slice data at current bar */
    data: {[ticker: string]: Bar},
    /** Check unstable period */
    isUnstable: boolean,
    /** Check lookback period */
    isLookback: boolean,
    /** Buy order to target weights */
    buyTarget: (weights: {[ticker: string]: number}) => void,
    /** Sell order to target weights */
    sellTarget: (weights: {[ticker: string]: number}) => void,
    /** Record/save values for later inspection */
    record: (data: {}) => void,
    /** User/strategy provided context */
    [custom: string]: any
  }

  interface State {
    /** User/strategy/trading state */
    [custom: string]: any
  }
}
