import { join } from 'node:path'

const editionsVotesFilePath = process.argv[2]
if (editionsVotesFilePath === undefined) {
  console.error('Must provide editions file path')
  process.exit(1)
}

const editionsVotesFile = Bun.file(editionsVotesFilePath)
const votes: [{
  categoryName: string,
  candidates: { name: string, image: string, link: string, id: string }[],
  id: string
}] = JSON.parse(await editionsVotesFile.text())
const inserts: string[] = []

votes.forEach(({ categoryName, candidates: categoryCandidates, id: categoryId }) => {
  inserts.push(
    `INSERT INTO Categories (category_id, category_name) VALUES ("${categoryId}", "${categoryName}")`
  )
  categoryCandidates.forEach((candidate) => {
    const { id: candidateId, name: candidateName } = candidate
    inserts.push(
      `INSERT INTO Options (option_id, category_id, option_name) VALUES ("${candidateId}", "${categoryId}", "${candidateName}")`
    )
  })
})

const outputPath = join(process.cwd(), 'src/data/vote-inserts.sql')
await Bun.write(outputPath, inserts.join('\n'))
