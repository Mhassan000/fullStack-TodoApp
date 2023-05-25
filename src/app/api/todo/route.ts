import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const client  =  await db.connect();
    try {
        await client.sql `CREATE TABLE IF NOT EXISTS Todos (id serial, task varchar(255));`;
        // const tasks  = ['learn Postgres', 'learn DrizzleORM']
        // await client.sql `INSERT INTO Todos (task) VALUES (${tasks[0]}), (${tasks[1]}) `
        
    }catch(error){
        return NextResponse.json({message:'Something went wrong'})
    }
    const todos = await client.sql `SELECT * FROM Todos;`;   
    return NextResponse.json({todos});
}


