import React, { useState } from 'react'
import type { MCQ as MCQType } from '../lib/types'

type Props = {
  mcq: MCQType
  onAnswer: (correct: boolean, tags?: string[]) => void
}

export default function MCQ({ mcq, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  function submit() {
    if (selected === null) return
    const correct = selected === mcq.correctIndex
    setSubmitted(true)
    onAnswer(correct, mcq.tags)
  }

  return (
    <div className="space-y-3">
      <fieldset className="border-0 p-0">
        <legend className="font-medium">{mcq.question}</legend>
        <div role="radiogroup" aria-labelledby={mcq.id} className="space-y-2">
          {mcq.choices.map((c, i) => (
            <label key={i} className="flex items-center gap-2" aria-checked={selected === i} role="radio">
              <input
                type="radio"
                name={mcq.id}
                checked={selected === i}
                onChange={() => setSelected(i)}
              />
              <span className={`text-sm ${submitted && i === mcq.correctIndex ? 'text-profit' : ''} ${submitted && selected === i && selected !== mcq.correctIndex ? 'text-loss' : ''}`}>
                {c}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex items-center gap-2">
        <button className="px-3 py-1 bg-accent text-black rounded" onClick={submit} disabled={submitted} type="button">Submit</button>
        <button className="px-3 py-1 border border-border rounded text-secondaryText" onClick={() => setShowExplanation((s) => !s)} type="button">
          {showExplanation ? 'Hide Explanation' : 'Toggle Explanation'}
        </button>
      </div>

      {showExplanation && mcq.explanation && (
        <div className="p-2 border border-border rounded text-sm text-secondaryText">{mcq.explanation}</div>
      )}
    </div>
  )
}
