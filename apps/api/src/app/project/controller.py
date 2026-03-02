from fastapi import APIRouter, Query
from .home_service import hello


router = APIRouter()

@router.get(
    '/',
    summary='Главная ручка',
    tags=['Главная']
)
async def home_route( name: str = Query(None), message: str = Query(None) ):
    return hello( name, message )