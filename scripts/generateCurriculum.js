const fs = require('fs')
const path = require('path')

function uid(prefix, n) {
  return `${prefix}-${n.toString().padStart(4,'0')}`
}

function makeLesson(n, tagBase) {
  return {
    id: uid('lesson', n),
    title: `Lesson ${n} — ${tagBase}`,
    description: `Auto-generated lesson ${n}`,
    videoUrl: '',
    difficulty: n % 3 === 0 ? 'advanced' : (n % 2 === 0 ? 'intermediate' : 'beginner'),
    marketType: 'AutoMarket',
    tags: [tagBase, 'basics'],
    estimatedTime: 8 + (n % 12),
    prerequisites: n > 1 ? [uid('lesson', n - 1)] : [],
    version: '1.0',
    lastUpdated: new Date().toISOString(),
    mcqs: [],
    charts: []
  }
}

function generate({ instructors = 3, markets = 3, strategies = 3, phases = 3, lessons = 200 }) {
  const instArr = []
  let lessonCounter = 1
  for (let i = 1; i <= instructors; i++) {
    const marketsArr = []
    for (let m = 1; m <= markets; m++) {
      const strategiesArr = []
      for (let s = 1; s <= strategies; s++) {
        const phasesArr = []
        for (let p = 1; p <= phases; p++) {
          const lessonsArr = []
          for (let l = 1; l <= lessons; l++) {
            const tagBase = `tag-${((lessonCounter % 10) + 1)}`
            lessonsArr.push(makeLesson(lessonCounter, tagBase))
            lessonCounter++
          }
          phasesArr.push({ id: `phase-${i}-${m}-${s}-${p}`, title: `Phase ${p}`, lessons: lessonsArr })
        }
        strategiesArr.push({ id: `strat-${i}-${m}-${s}`, title: `Strategy ${s}`, phases: phasesArr })
      }
      marketsArr.push({ id: `market-${i}-${m}`, title: `Market ${m}`, strategies: strategiesArr })
    }
    instArr.push({ id: `instr-${i}`, name: `Instructor ${i}`, markets: marketsArr })
  }

  return {
    version: 'generated-1',
    lastUpdated: new Date().toISOString(),
    instructors: instArr
  }
}

const out = generate({ instructors: 2, markets: 3, strategies: 3, phases: 2, lessons: 40 })
const outPath = path.join(__dirname, '..', 'src', 'data', 'curriculum.generated.json')
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8')
console.log('Generated curriculum at', outPath)
