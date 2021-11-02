import { Request, Response } from 'express'
import { Router } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Hello Dev!' })
})

export default router
