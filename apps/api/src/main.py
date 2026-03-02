from fastapi import FastAPI
from .config.env import init_settings, api_settings
from .config.postgres import init_postgres
from .app.router import api_router
import uvicorn


def main() -> None:
    init_settings()
    # init_postgres(api_settings.psql_url)

    app = FastAPI(title="My API")
    app.include_router(api_router, prefix="")

    uvicorn.run(
        "main:app",
        host=api_settings.host,
        port=api_settings.port,
        reload=api_settings.debug,
    )

if __name__ == "__main__":
    main()
