import { NextRequest, NextResponse } from "next/server";
import { Todo,newTodo,db,todoTable } from '@/app/lib/drizzle';
import { sql } from "@vercel/postgres";


export async function GET(request: NextRequest) {
    // Get request using drizzle

    try{
        await sql `CREATE TABLE IF NOT EXISTS Todos (id serial, task varchar(255));`;
        const res = await db.select().from(todoTable);
        return NextResponse.json({data: res});
    }catch(error){
        console.log ((error as {message:string}).message);
        return NextResponse.json ({message:'Something went wrong'})

    }


    // Get request using postgres
    // const client  =  await db.connect(); 
    // try {
    //     await sql `CREATE TABLE IF NOT EXISTS Todos (id serial, task varchar(255));`;
    // }catch(error){
    //     return NextResponse.json({message:'Something went wrong'})
    // }
    // const todos = await client.sql `SELECT * FROM Todos;`;   
    // return NextResponse.json({todos});
}


// export async function POST(request:NextRequest){
//     const client =  await db.connect();
//     const req = await request.json();
//     console.log(req);
//     try {
//         if (req.task){
//             await client.sql `INSERT INTO Todos (task) VALUES (${req.task})`
//             return NextResponse.json({message: 'data added successfully'})
//         }else{
//             throw new Error ('Task field is required')
//         }
//     }catch(error){
//         return NextResponse.json(( error as {message:string}).message)
//     }
    
// }