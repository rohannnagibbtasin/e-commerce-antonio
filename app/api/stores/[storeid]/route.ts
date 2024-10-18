import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    {params}: {params: {storeid: string}}
){
    try{
        const { userId } = auth();
        const body = await req.json();
        const { name } = body;

        if(!userId){
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        if(!name){
            return new NextResponse("Name is required", { status: 400});
        }
        if(!params.storeid){
            return new NextResponse("Store id is required", { status: 400 });
        }
        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeid,
                userId
            },
            data: {
                name
            }
        })
        return NextResponse.json(store);
    }catch(err){
        console.log('[STORE_PATH]: ', err);
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function DELETE(
    req: Request,
    {params}: {params: {storeid: string}}
){
    try{
        const { userId } = auth();

        if(!userId){
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        
        if(!params.storeid){
            return new NextResponse("Store id is required", { status: 400 });
        }
        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeid,
                userId
            }
        })
        return NextResponse.json(store);
    }catch(err){
        console.log('[STORE_DELETE]: ', err);
        return new NextResponse("Internal error", {status: 500})
    }
}