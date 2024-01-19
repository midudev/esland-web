import { type Votes } from "@/types/votes";
import { createClient } from "@libsql/client";

const client = createClient({
  url: import.meta.env.DATABASE_URL ?? "",
  authToken: import.meta.env.DATABASE_TOKEN ?? ""
})

export const addUserVotes = async (username: string, allVotes: Votes) => {
  const sql = `INSERT INTO votes (username, category_id, option_id, rank) VALUES (?, ?, ?, ?)`

  const inserts = allVotes
    .flatMap((categoryVotes, index) => {
      const categoryId = (index + 1).toString()
      return categoryVotes.map((vote, index) => {
        const rank = index + 1
        return {
          sql,
          args: [username, categoryId, vote, rank]
        }
      })
    })

  const result = await client.batch(inserts, "write")

  return result
}

export const cleanUserVotes = async (username: string) => {
  const result = await client.execute({
    sql: `DELETE FROM votes WHERE username = ?`, // SQL INJECTION DE LOCURA
    args: [username]
  })

  return result
}


