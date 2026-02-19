import React from 'react'
import PositionSizeCalculator from '../components/tools/PositionSizeCalculator'
import RiskRewardCalculator from '../components/tools/RiskRewardCalculator'
import PLSimulator from '../components/tools/PLSimulator'

export default function ToolsPage() {
  return (
    <div className="space-y-4">
      <div className="bg-panel border border-border rounded p-4">
        <h2 className="font-semibold">Trading Tools</h2>
        <div className="mt-3 grid md:grid-cols-3 gap-3">
          <div className="col-span-1"><RiskRewardCalculator /></div>
          <div className="col-span-1"><PositionSizeCalculator /></div>
          <div className="col-span-1"><PLSimulator /></div>
        </div>
      </div>
    </div>
  )
}
