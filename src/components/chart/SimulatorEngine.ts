import type { Candle, Trade, TradeDirection } from './types'

type PlaceTradeInput = {
  direction: TradeDirection
  entry: number
  stop: number
  target: number
  positionSize: number
  openedAtIndex: number
}

export class SimulatorEngine {
  private trades: Trade[] = []

  private tradeCounter = 0

  placeTrade(input: PlaceTradeInput) {
    this.tradeCounter += 1
    const trade: Trade = {
      id: `trade-${this.tradeCounter}`,
      direction: input.direction,
      entry: input.entry,
      stop: input.stop,
      target: input.target,
      positionSize: input.positionSize,
      status: 'open',
      pnl: 0,
      openedAtIndex: input.openedAtIndex,
    }
    this.trades.push(trade)
    return trade
  }

  evaluateAtCandle(candle: Candle, candleIndex: number) {
    this.trades = this.trades.map((trade) => {
      if (trade.status === 'closed') return trade

      if (trade.direction === 'long') {
        if (candle.low <= trade.stop) {
          return this.closeTrade(trade, trade.stop, candleIndex)
        }
        if (candle.high >= trade.target) {
          return this.closeTrade(trade, trade.target, candleIndex)
        }
      }

      if (trade.direction === 'short') {
        if (candle.high >= trade.stop) {
          return this.closeTrade(trade, trade.stop, candleIndex)
        }
        if (candle.low <= trade.target) {
          return this.closeTrade(trade, trade.target, candleIndex)
        }
      }

      return trade
    })

    return this.trades
  }

  getTrades() {
    return this.trades
  }

  getMetrics() {
    const closedTrades = this.trades.filter((trade) => trade.status === 'closed')
    const wins = closedTrades.filter((trade) => trade.pnl > 0).length
    const totalPnL = closedTrades.reduce((sum, trade) => sum + trade.pnl, 0)
    return {
      totalTrades: this.trades.length,
      closedTrades: closedTrades.length,
      winRate: closedTrades.length ? (wins / closedTrades.length) * 100 : 0,
      totalPnL,
    }
  }

  private closeTrade(trade: Trade, exitPrice: number, candleIndex: number): Trade {
    const pnl =
      trade.direction === 'long'
        ? (exitPrice - trade.entry) * trade.positionSize
        : (trade.entry - exitPrice) * trade.positionSize

    return {
      ...trade,
      status: 'closed',
      exitPrice,
      closedAtIndex: candleIndex,
      pnl,
    }
  }
}