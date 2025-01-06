import {Request, Response, Router} from "express"
import bcrypt from 'bcrypt'
import {body, Result, ValidationError, validationResult} from 'express-validator'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User, IUser } from '../models/User'

const router: Router = Router()
const users: {email: string; password: string}[] = []

router.post("/api/user/register",
    body("email").isEmail().escape(),
    body("password"),
    async (req: Request, res: Response) => {
        const errors: Result<ValidationError> = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors);
            res.status(400).json({errors: errors.array()})
            return
        }
        try {
            const existingUser = users.find(user => user.email === req.body.email)
            if (existingUser) {
                res.status(403).json({email: "email already in use"})
                return
            }

            const salt: string = bcrypt.genSaltSync(10)
            const hash: string = bcrypt.hashSync(req.body.password, salt)

            await User.create({
                email: req.body.email,
                password: hash
            })

            res.status(200).json({"email": req.body.email, "password": hash})
        
    } catch (error: any) {
        console.error(`Error while registering ${error}`)
        res.status(500).json({message: 'Internal server error'})
    }
}
)

router.get("/api/user/list", async (req: Request, res: Response) => {
    try {
        res.status(200).json(users)
    } catch (error: any) {
        console.log(`Error whil fetching users ${error}`)
        res.status(500).json({error: "Internal Server Error"})
    }
})


export default router