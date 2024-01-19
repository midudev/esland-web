import { z } from 'zod'

export const votesSchema = z.array(z.string().regex(/^\d\d?-\d\d?$/).array().length(4))