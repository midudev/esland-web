import { z } from 'zod'

export default z.array(z.string().regex(/^\d\d?-\d\d?$/).array().length(4))
