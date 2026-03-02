from fastapi import APIRouter, Query
from .home_service import hello

hello_router = APIRouter()

@hello_router.get(
    '/',
    summary='Главная ручка',
    tags=['Главная']
)
async def home_route( name: str = Query(None), message: str = Query(None) ):
    return hello( name, message )
