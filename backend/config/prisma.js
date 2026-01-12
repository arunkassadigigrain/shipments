// import { PrismaClient } from "@prisma/client"
// console.log('ItemController loaded');
// const prisma = new PrismaClient()

// export default prisma;


import dotenv from "dotenv";
dotenv.config();
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export default prisma ;