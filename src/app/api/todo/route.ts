import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const client  =  await db.connect();
    try {
        await client.sql `CREATE TABLE IF NOT EXISTS Todos (id serial, task varchar(255));`;
    }catch(error){
        return NextResponse.json({message:'Something went wrong'})
    }
    const todos = await client.sql `SELECT * FROM Todos;`;   
    return NextResponse.json({todos});
}


export async function POST(request:NextRequest){
    const client =  await db.connect();
    const req = await request.json();
    console.log(req);
    try {
        if (req.task){
            await client.sql `INSERT INTO Todos (task) VALUES (${req.task})`
        }else{
            throw new Error ('Task field is required')
        }
    }catch(error){
        return NextResponse.json({ message:'Something went wrong'})
    }
}